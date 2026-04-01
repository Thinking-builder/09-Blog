export const siteConfig = {
  title: '夜航博客',
  titleEn: 'Night Watch Blog',
  description: '记录技术、设计与生活交界处，那些值得在夜里慢慢读完的文字。',
  hero:
    '给那些在深夜仍想把一件事想清楚的人。这里写技术，也写留白，写构建，也写生活的回声。',
  homeTagline: 'A quiet place for long attention.',
  author: 'Your Name',
  nav: [
    { href: '/blog', labelZh: '日志', labelEn: 'Blog' },
    { href: '/essays', labelZh: '随笔', labelEn: 'Essays' },
    { href: '/categories', labelZh: '分类', labelEn: 'Categories' },
    { href: '/about', labelZh: '关于', labelEn: 'About' },
  ],
  social: [
    { href: 'https://github.com/', label: 'GitHub' },
    { href: 'mailto:hello@example.com', label: 'Email' },
  ],
} as const;

export const collectionMeta = {
  blog: {
    label: 'Blog',
    path: '/blog',
    description: '偏技术与观察的常规文章，保留足够的呼吸感。',
  },
  essays: {
    label: 'Essays',
    path: '/essays',
    description: '更长、更完整，也更适合一口气读完的专题与长文。',
  },
} as const;

export const pageMeta = {
  categories: {
    label: 'Categories',
    path: '/categories',
    description: '按 Blog 与 Essays 两个分区查看关键词，并从关键词进入对应文章列表。',
  },
} as const;

export const aboutBlocks = [
  '这个站点被设计成一个入口，而不是信息流。首页不是归档页，而是情绪和节奏的开始。',
  '内容目前保留 Blog 与 Essays 两层：一层是日常写作，一层是更完整的长时思考；关键词导引页负责把内容重新组织出来。',
  '当前只提供夜航主题，但结构已为搜索、RSS、浅色主题与相关推荐留出扩展点。',
] as const;
