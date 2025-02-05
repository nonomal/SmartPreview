# Smart Preview

Smart Preview 是一个强大的浏览器扩展，旨在提升您的网页浏览体验。它允许用户快速预览链接内容，而无需打开新的标签页，同时提供智能的窗口管理和自定义设置选项。

<img width="100%" alt="image" src="https://github.com/user-attachments/assets/04477426-b625-4024-8993-a9b86a0f51a8">

## 主要特性

- **快速预览**：通过Shift+点击链接，在弹出窗口中预览内容。
- **智能窗口管理**：
  - 居中模式：将预览窗口居中显示。
  - 智能模式：记忆并恢复上次的窗口位置和大小。
- **自定义设置**：
  - 调整预览窗口的宽度和高度。
  - 支持多语言设置。
- **便捷操作**：
  - 复制链接
  - 在新标签页中打开
  - 在当前标签页中打开
  - 使用Esc键快速关闭预览窗口
- **跨浏览器兼容**：使用WXT框架开发，支持多种主流浏览器。

## 安装

1. 从[发布页面](https://github.com/XiCheng148/SmartPreview/releases)下载最新版本的扩展文件（.zip）。
2. 解压下载的文件。
3. 在浏览器中打开扩展管理页面。
4. 启用"开发者模式"。
5. 点击"加载已解压的扩展程序"，然后选择解压后的文件夹。

## 使用方法

1. 安装扩展后，在任何网页上按住Shift键并点击链接。
2. 预览窗口将会打开，显示链接内容。
3. 使用窗口顶部的按钮进行复制链接、新标签页打开等操作。
4. 按Esc键或点击窗口外部区域关闭预览。

## 🚀 Feature

- [ ] 始终小窗模式
  - 白名单中的网站，点击链接都始终小窗打开。
- [X] 记忆小窗功能
  - 不仅仅记忆小窗的大小位置，还记忆打开的次数，当以小窗打开的次数达到多少次的时候，就都用小窗打开。

## 开发

使用 [Vue](https://vuejs.org/) + [wxt](https://wxt.dev/) + [daisyui](https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg)

```bash
# 安装依赖
pnpm i

# 启动项目
pnpm run dev

# 构建项目
pnpm run build

# 打包扩展
pnpm run zip
```

## 星标

<a href="https://star-history.com/#XiCheng148/SmartPreview&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=XiCheng148/SmartPreview&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=XiCheng148/SmartPreview&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=XiCheng148/SmartPreview&type=Date" />
 </picture>
</a>
