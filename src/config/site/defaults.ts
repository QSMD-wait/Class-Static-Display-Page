
/**
 * @file src/config/site/defaults.ts
 * @description 网站的默认配置。
 * 这里的配置是最低优先级，会被 `site.config.yaml` 中的用户配置覆盖。
 * 这个文件定义了所有配置的“基础形态”和“默认值”，确保即使在用户配置不完整时，
 * 系统也能获得一个完整、可预测的配置对象。
 *
 * @author 青色漫地_wait
 * @version 1.2.0
 * @see {@link https://github.com/qsmd-wait/Class-Static-Display-Page}
 */

// =============================================================================
// 接口定义 (Interface Definitions)
// 将大型配置分解为模块化的接口，提高可读性和可维护性。
// =============================================================================

/**
 * @description SEO 和网站基础信息
 */
export interface InfoConfig {
  title: string;        // 网站标题
  description: string;  // 网站描述
  keywords: string;     // 网站关键词
  author: string;       // 作者
}

/**
 * @description 班级信息
 */
export interface ClassConfig {
  name: string;     // 班级名称
  school: string;   // 学校名称
  slogan: string;   // 班级口号或简介
}

/**
 * @description 主题相关配置
 */
export interface ThemeConfig {
  preset: string; // 预设主题名称
  custom: {
    colors: {
      primary: string | null;    // 主色调
      background: string | null; // 背景色
    };
    layout: {
      borderRadius: string; // 全局圆角
    };
  };
  images: {
    logo: string | null;       // 网站 Logo
    banner: string | null;     // 首页横幅
    background: string | null; // 全局背景图
  };
}

/**
 * @description 功能开关
 */
export interface FeaturesConfig {
  darkMode: boolean;  // 启用/禁用暗色模式切换
  customCSS: boolean; // 启用/禁用自定义 CSS
}

/**
 * @description 导航链接项
 */
export interface NavItem {
  name: string;         // 显示名称
  path: string;         // 路径或 URL
  children?: NavItem[]; // 子菜单
}

/**
 * @description 页脚配置
 */
export interface FooterConfig {
  copyright: string; // 版权信息模板
  extra: string;     // 额外信息 (如备案号)
}

/**
 * @description 社交链接
 */
export interface SocialConfig {
  bilibili: string | null;
  github: string | null;
  // 未来可扩展...
  // twitter: string | null;
}

/**
 * @description 第三方服务集成 (为未来扩展预留)
 */
export interface IntegrationsConfig {
  analytics: {
    provider: 'google' | 'umami' | null; // 分析服务提供商
    id: string | null;                   // 跟踪 ID
  };
  comments: {
    provider: 'giscus' | 'waline' | null; // 评论系统提供商
    repo: string | null;                  // Giscus 仓库
  };
}

/**
 * @description 网站的完整配置类型定义
 */
export interface SiteConfig {
  info: InfoConfig;
  class: ClassConfig;
  theme: ThemeConfig;
  features: FeaturesConfig;
  navigation: NavItem[];
  footer: FooterConfig;
  social: SocialConfig;
  integrations: IntegrationsConfig;
}

// =============================================================================
// 默认配置 (Default Configuration)
// 为所有配置项提供一个健全的、非空的默认值。
// =============================================================================

export const defaultSiteConfig: SiteConfig = {
  /**
   * @description 网站信息与 SEO
   * 这些信息主要用于 <head> 中的 meta 标签，对搜索引擎优化至关重要。
   */
  info: {
    title: '班级静态展示页',
    description: '一个美观、快速、可自定义的班级静态网站模板。',
    keywords: '班级,主页,静态网站,Nuxt,Vue',
    author: '青色漫地_wait',
  },

  /**
   * @description 班级核心信息
   * 用于在网站的各个角落展示班级身份。
   */
  class: {
    name: "未命名班级",
    school: "未知学校",
    slogan: "每一天，都充满无限可能。",
  },

  /**
   * @description 视觉主题
   * 控制网站的整体外观。用户可以通过 `site.config.yaml` 轻松覆盖这些默认值。
   */
  theme: {
    preset: "default",
    custom: {
      colors: {
        primary: null,    // 留空，将使用预设主题的颜色
        background: null, // 留空，将使用预设主题的颜色
      },
      layout: {
        borderRadius: "12px",
      },
    },
    images: {
      logo: "/uploads/class-logo.png",
      banner: "/uploads/class-banner.jpg",
      background: null, // 默认不使用全局背景图
    },
  },

  /**
   * @description 功能开关
   * 用于启用或禁用网站的某些功能。
   */
  features: {
    darkMode: true,
    customCSS: false, // 默认禁用自定义 CSS，以避免意外样式注入
  },

  /**
   * @description 导航菜单
   * 定义了网站的主要导航结构。
   */
  navigation: [
    { name: '班级首页', path: '/' },
    { name: '班级相册', path: '/album' },
    { name: '荣誉墙', path: '/honors' },
    { name: '关于我们', path: '/about' },
  ],

  /**
   * @description 页脚
   * 页脚的版权和额外信息。支持 `{year}` 和 `{class.name}` 等占位符。
   */
  footer: {
    copyright: '© {year} {class.name}. All rights reserved.',
    extra: '', // 默认无额外信息
  },

  /**
   * @description 社交媒体链接
   * 显示在页脚或个人资料区域。
   */
  social: {
    bilibili: 'https://space.bilibili.com/482891296',
    github: 'https://github.com/qsmd-wait/Class-Static-Display-Page',
  },

  /**
   * @description 第三方集成
   * 为未来的分析、评论等功能预留的配置空间。
   * 默认全部禁用。
   */
  integrations: {
    analytics: {
      provider: null,
      id: null,
    },
    comments: {
      provider: null,
      repo: null,
    },
  },
};