
/**
 * @file src/modules/site-config.ts
 * @description 动态加载和热更新网站配置的 Nuxt 模块。
 *              该模块负责：
 *              1. 读取 `site.config.yaml` 用户配置。
 *              2. 与 `src/config/site/defaults.ts` 的默认配置进行深度合并。
 *              3. 解析配置中的占位符 (例如 `{class.name}` 和 `{year}` )。
 *              4. 将最终的配置写入 `src/config/site/site.data.json`。
 *              5. 将生成的配置注入到 Nuxt 的 `appConfig` 中。
 *              6. 在开发模式下，监视配置文件变动并实现热更新 (HMR)。
 * @author 青色漫地_wait
 * @version 2.0.0
 */

import { defineNuxtModule, createResolver, updateTemplates, useLogger } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import { deepmerge } from 'deepmerge-ts';
import { resolve as resolvePath } from 'pathe';
import { writeFile, readFile } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';
import { defaultSiteConfig, type SiteConfig } from '../config/site/defaults';

// --- 路径解析器 ---
const resolver = createResolver(import.meta.url);

// --- 辅助函数 ---

/**
 * 递归地解析对象或数组中字符串值的占位符。
 * @param target - 要在其中解析占位符的对象、数组或任何值。
 * @param context - 用于查找替换值的数据源。
 * @returns 解析了占位符的新对象、数组或值。
 */
function resolvePlaceholders<T>(target: T, context: Record<string, any>): T {
  // 如果是数组，则递归遍历每个元素
  if (Array.isArray(target)) {
    return target.map(item => resolvePlaceholders(item, context)) as T;
  }

  // 如果是对象，则递归遍历每个属性值
  if (target && typeof target === 'object') {
    const newObj = { ...target } as Record<string, any>;
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        newObj[key] = resolvePlaceholders(newObj[key], context);
      }
    }
    return newObj as T;
  }

  // 如果是字符串，则进行占位符替换
  if (typeof target === 'string') {
    const replacedString = target.replace(/\{([^}]+)}/g, (match: string, placeholder: string): string => {
      // 特殊处理 {year} 占位符
      if (placeholder === 'year') {
        return new Date().getFullYear().toString();
      }

      // 处理嵌套路径的占位符，例如 {class.name}
      const keys = placeholder.split('.');
      let replacement: any = context;
      for (const k of keys) {
        replacement = replacement?.[k];
        if (replacement === undefined) break;
      }

      // 如果找到替换值，则使用它，否则保持原样。
      // 关键：必须使用 String() 将替换值转换为字符串，以防止当占位符指向一个对象时，
      // replace 回调尝试返回一个非字符串值而导致 TypeScript 报错。
      return replacement !== undefined ? String(replacement) : match;
    });
    return replacedString as T;
  }

  // 对于其他类型，直接返回原值
  return target;
}

/**
 * 加载、合并、解析配置，并生成 site.data.json 文件。
 * @param nuxt - Nuxt 实例。
 * @returns 返回最终的网站配置。
 */
async function loadConfigAndGenerateJson(nuxt: Nuxt): Promise<SiteConfig> {
  const userConfigPath = resolvePath(nuxt.options.rootDir, 'site.config.yaml');
  const generatedDataPath = resolvePath(nuxt.options.buildDir, 'site.data.json');

  // 1. 加载用户配置 (site.config.yaml)
  let userConfig: Partial<SiteConfig> = {};
  try {
    const userConfigFile = await readFile(userConfigPath, 'utf-8');
    userConfig = parseYaml(userConfigFile) || {};
  } catch (e) {
    // 如果文件不存在或解析失败，则忽略，使用默认配置
    console.log('未找到或无法解析 `site.config.yaml`，将完全使用默认配置。喵~');
  }

  // 2. 深度合并默认配置和用户配置
  const mergedConfig = deepmerge(defaultSiteConfig, userConfig);

  // 3. 解析合并后配置中的占位符
  const resolvedConfig = resolvePlaceholders(mergedConfig, mergedConfig);

  // 4. 将最终配置写入 site.data.json
  try {
    await writeFile(generatedDataPath, JSON.stringify(resolvedConfig, null, 2), 'utf-8');
  } catch (error) {
    console.error('写入 `site.data.json` 文件失败！喵！', error);
  }

  return resolvedConfig as SiteConfig;
}

// --- Nuxt 模块定义 ---

export default defineNuxtModule({
  meta: {
    name: 'site-config',
    configKey: 'site',
  },
  async setup(options, nuxt) {
    const logger = useLogger('site-config');

    // --- 路径解析器 ---
    const resolver = createResolver(import.meta.url);

    const defaultsConfigPath = resolver.resolve('../config/site/defaults.ts');
    const userConfigPath = resolvePath(nuxt.options.rootDir, 'site.config.yaml');

    // 定义更新配置的函数
    const updateConfig = async (): Promise<number> => {
      const startTime = performance.now();
      try {
        const siteConfig = await loadConfigAndGenerateJson(nuxt);
        nuxt.options.appConfig.site = siteConfig;
        // 触发模板更新以实现 HMR
        if (nuxt.options.dev) {
          await updateTemplates({ filter: t => t.filename.includes('app.config') });
        }
      } catch (error) {
        logger.error('❌ Load or Parse Config Error | 加载或解析配置文件时出错:', error);
      }
      const endTime = performance.now();
      return endTime - startTime;
    };

    // 初始加载配置
    const initialDuration = await updateConfig();
    // 仅在开发模式下打印成功日志，保持生产环境日志清洁
    if (nuxt.options.dev) {
      logger.success(`Site Config Loaded | 网站配置已加载 (耗时 ${initialDuration.toFixed(2)} ms)`);
    }

    // 在开发模式下，使用 Nuxt 的构建钩子来监听文件变化
    if (nuxt.options.dev) {
      // 将配置文件添加到 Nuxt 的监听列表
      nuxt.hook('builder:watch', async (event, path) => {
        const filesToWatch = [userConfigPath, defaultsConfigPath];
        // 检查变动的文件是否是我们需要关心的配置文件
        if (filesToWatch.includes(resolvePath(nuxt.options.rootDir, path))) {
          logger.info(`Change Detected | 侦测到配置文件变动: ${path}`);
          const hotReloadDuration = await updateConfig();
          logger.success(`Site Config Hot-reloaded | 网站配置已热重载 (耗时 ${hotReloadDuration.toFixed(2)} ms)`);
        }
      });
    }
  },
});