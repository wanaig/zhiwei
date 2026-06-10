# 知微工作室 - Zhiwei Studio

专业软件开发工作室，专注于网站开发、App开发、系统开发、小程序、AI/数据和电商开发。

## 🚀 技术栈

- **前端框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion + Canvas API
- **国际化**: next-intl (中文/英文)
- **图标**: Phosphor Icons
- **邮件**: Nodemailer (QQ邮箱)

## 📁 项目结构

```
zhiwei/
├── src/
│   ├── app/
│   │   ├── [locale]/          # 国际化路由
│   │   │   ├── about/         # 关于我们
│   │   │   ├── blog/          # 博客
│   │   │   ├── contact/       # 联系我们
│   │   │   ├── portfolio/     # 作品集
│   │   │   └── services/      # 服务
│   │   ├── api/               # API 路由
│   │   │   └── contact/       # 联系表单 API
│   │   └── layout.tsx         # 根布局
│   ├── components/
│   │   ├── home/              # 首页组件
│   │   │   ├── Hero.tsx       # 主视觉
│   │   │   ├── PortfolioHero.tsx
│   │   │   ├── ServicesHero.tsx
│   │   │   ├── AboutHero.tsx
│   │   │   ├── BlogHero.tsx
│   │   │   └── ContactHero.tsx
│   │   └── layout/            # 布局组件
│   │       ├── Header.tsx     # 头部导航
│   │       ├── Footer.tsx     # 底部
│   │       └── PageHeader.tsx # 页面头部
│   └── i18n.ts                # 国际化配置
├── messages/
│   ├── zh.json                # 中文翻译
│   └── en.json                # 英文翻译
├── public/                    # 静态资源
├── .env.local                 # 环境变量
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 主要功能

### 1. 首页
- Canvas 动态背景动画
- 技术栈无限滚动
- 服务亮点展示
- 精选作品展示

### 2. 作品集
- 项目列表（筛选功能）
- 项目详情页
- 滚动动画效果

### 3. 服务
- 滚动视差效果
- 服务详情展示
- 动态背景

### 4. 关于我们
- DNA 双螺旋动画
- 时间线展示
- 团队成员

### 5. 博客
- 文章列表（标签筛选）
- 文章详情页
- 代码语法高亮
- 左侧目录导航

### 6. 联系我们
- 联系表单
- 邮件发送功能
- 联系信息展示

## 🛠️ 安装与运行

### 1. 克隆项目
```bash
git clone https://github.com/wanaig/zhiwei.git
cd zhiwei
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
创建 `.env.local` 文件：
```env
# QQ邮箱配置
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
```

### 4. 运行开发服务器
```bash
npm run dev
```

### 5. 构建生产版本
```bash
npm run build
npm start
```

## 📧 邮件配置

联系表单使用 QQ 邮箱发送邮件：

1. 登录 QQ 邮箱
2. 进入 设置 → 账户
3. 开启 POP3/SMTP 服务
4. 生成授权码
5. 将授权码填入 `.env.local` 的 `EMAIL_PASS`

## 🌐 国际化

支持中文和英文两种语言：
- 中文（默认）：`/zh/...`
- 英文：`/en/...`

翻译文件位于 `messages/` 目录。

## 🎯 性能优化

- Canvas 动画使用 `requestAnimationFrame`
- 图片懒加载 (`loading="lazy"`)
- IntersectionObserver 滚动动画
- 代码分割和懒加载
- 生产环境静态生成

## 📱 响应式设计

完全响应式设计，支持：
- 桌面端（1200px+）
- 平板端（768px - 1199px）
- 移动端（< 768px）

## 🚀 部署

### Vercel 部署
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 自动部署

### 其他平台
```bash
npm run build
npm start
```

## 📄 许可证

MIT License

## 👥 团队

**知微工作室**
- 创始人：全栈开发 / 项目负责人
- 设计师：UI/UX 设计
- 开发者：前端/后端开发

## 📞 联系方式

- 邮箱：3279406579@qq.com
- 微信：wanai_zhiwei
- GitHub：[github.com/wanaig](https://github.com/wanaig)
- 位置：中国

## 🔗 相关链接

- [GitHub 仓库](https://github.com/wanaig/zhiwei)
- [在线预览](#) (待部署)

---

**知微** - 小团队，精工细作。专注网站、应用与系统开发。
