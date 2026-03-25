# 步步安 - 独居老人跌倒检测客户端

<p align="center">
  <img src="static/image/app/welcome.png" width="200" alt="步步安APP">
</p>

<p align="center">
  <strong>步步安，步步平安</strong>
</p>

## 项目简介

**步步安**是一款专为独居老人设计的跌倒检测与安全防护移动应用。通过与智能硬件设备配合，实时监测老人活动状态，检测跌倒等异常行为，并及时通知紧急联系人，为独居老人提供全天候的安全守护。

本项目为客户端部分，基于 UniApp 跨平台框架开发，一套代码可同时发布到 Android、iOS 以及微信小程序等多个平台。

## 技术栈

### 前端客户端

| 技术 | 版本 | 说明 |
|------|------|------|
| UniApp | 3.x | 跨平台应用开发框架 |
| Vue.js | 3.x | 渐进式 JavaScript 框架 |
| SCSS | - | CSS 预处理器 |
| moment-timezone | ^0.5.46 | 日期时间处理库 |

### 后端服务

| 技术 | 说明 |
|------|------|
| Spring Boot | Java 企业级应用框架 |
| MySQL | 关系型数据库，存储用户数据、设备信息、活动记录 |
| Redis | 缓存数据库，用于会话管理、实时数据处理 |
| WebSocket | 实时通信协议，用于设备状态实时推送 |

### 开发工具

- **HBuilderX** - UniApp 官方推荐 IDE
- **Git** - 版本控制

## 功能特性

### 核心功能

- **实时活动监测** - 通过 WebSocket 连接，实时查看老人活动状态（正常/风险/跌倒）
- **跌倒检测报警** - 自动检测跌倒行为，触发报警并记录
- **设备管理** - 绑定/解绑检测设备，管理设备位置与状态
- **紧急联系人** - 添加紧急联系人，报警时自动通知
- **活动历史** - 查看老人活动记录，分析日常行为模式
- **报警反馈** - 支持漏报反馈，优化检测算法

### 用户功能

- **用户注册/登录** - 手机号注册，支持密码找回
- **个人资料** - 头像上传、昵称修改、个人简介
- **多设备支持** - 一个账户可绑定多台检测设备
- **实时切换** - 多设备间快速切换查看

### UI 特性

- **响应式设计** - 适配各种屏幕尺寸
- **自定义组件** - 统一的组件库（ssc-* 系列）
- **实时状态展示** - 动态活动状态图标与颜色提示
- **数据可视化** - 集成图表展示活动统计数据

## 项目结构

```
SafeStep-Client/
├── App.vue                      # 应用根组件
├── main.js                      # 应用入口
├── manifest.json                # 应用配置（平台、权限等）
├── pages.json                   # 页面路由、导航栏、TabBar 配置
├── uni.scss                     # 全局 SCSS 变量
├── package.json                 # 依赖配置
│
├── pages/                       # 页面目录
│   ├── launch/                  # 启动页
│   ├── login/                   # 登录页
│   ├── register/                # 注册页
│   ├── pwd-reset/               # 密码重置
│   ├── pwd-update/              # 密码修改
│   ├── home/                    # 首页（监控、统计、快捷入口）
│   ├── status/                  # 状态页（实时监测）
│   ├── user/                    # 用户中心
│   ├── profile/                 # 个人资料
│   ├── list-device/             # 设备列表
│   ├── detail-device/           # 设备详情
│   ├── register-device/         # 添加设备
│   ├── list-contact/            # 联系人列表
│   ├── detail-contact/          # 联系人详情
│   ├── register-contact/        # 添加联系人
│   ├── history-activity/        # 活动历史
│   ├── list-alarm/              # 报警记录
│   ├── detail-alarm/            # 报警详情
│   └── omission-alarm/          # 漏报反馈
│
├── components/                  # 自定义组件（ssc-* 系列）
│   ├── ssc-button-primary/      # 主按钮
│   ├── ssc-button-default/      # 默认按钮
│   ├── ssc-button-warn/         # 警告按钮
│   ├── ssc-title/               # 标题栏
│   ├── ssc-banner/              # 轮播图
│   ├── ssc-profile/             # 用户信息卡片
│   ├── ssc-item-card/           # 通用卡片项
│   ├── ssc-item-device/         # 设备列表项
│   ├── ssc-item-contact/        # 联系人列表项
│   ├── ssc-item-alarm/          # 报警列表项
│   ├── ssc-icon/                # 图标组件
│   └── ssc-logo/                # Logo 组件
│
├── utils/                       # 工具函数
│   ├── httpUtil.js              # HTTP 请求封装
│   ├── timeUtil.js              # 时间日期处理
│   ├── stringUtil.js            # 字符串验证
│   └── imageUtil.js             # 图片处理
│
├── common/                      # 公共样式
│   ├── scss/self.scss           # 自定义 SCSS 变量
│   └── css/self.css             # 全局 CSS
│
├── static/                      # 静态资源
│   └── image/                   # 图片资源
│       ├── app/                 # 应用图标
│       ├── avatar/              # 头像
│       ├── banner/              # 轮播图
│       ├── activity/            # 活动状态图
│       ├── option/              # 操作图标
│       ├── setting/             # 设置图标
│       ├── tabbar/              # TabBar 图标
│       └── alarm/               # 报警相关图标
│
└── uni_modules/                 # UniApp 插件
    ├── uni-icons/               # 图标库
    ├── uni-list/                # 列表组件
    ├── uni-badge/               # 徽章组件
    └── qiun-data-charts/        # 图表组件
```

## 快速开始

### 环境要求

- [HBuilderX](https://www.dcloud.io/hbuilderx.html) 3.0+
- Node.js 14+
- 后端服务已启动（Spring Boot 项目）

### 安装运行

1. **克隆项目**

```bash
git clone <repository-url>
cd SafeStep-Client
```

2. **安装依赖**

```bash
npm install
```

3. **配置后端地址**

修改 `utils/httpUtil.js` 中的 `baseUrl`：

```javascript
const baseUrl = "http://localhost:8080"  // 改为你的后端地址
```

同时修改 `pages/status/status.vue` 中的 WebSocket 地址：

```javascript
uni.connectSocket({
    url: 'ws://localhost:8080/wsserver/' + userCode.value
});
```

4. **HBuilderX 运行**

- 使用 HBuilderX 打开项目
- 点击菜单栏 **运行** → **运行到浏览器** 或 **运行到手机/模拟器**
- 首次运行需要安装插件，按提示操作即可

### 打包发布

**App 打包（Android/iOS）**

1. HBuilderX 中点击 **发行** → **原生App-云打包**
2. 配置应用证书（Android 需要.keystore 文件）
3. 等待云端打包完成，下载安装包

**微信小程序**

1. HBuilderX 中点击 **发行** → **小程序-微信**
2. 在微信开发者工具中导入生成的 `unpackage/dist/build/mp-weixin`
3. 上传代码并提交审核

## API 接口

### 接口规范

- 基础 URL: `http://localhost:8080`
- 认证方式: Header 中携带 `token`
- 响应格式: `{ code: number, msg: string, data: any }`
  - `code: 1` - 成功
  - `code: 0` - 失败
  - `code: 900` - 登录过期

### 主要接口

| 模块 | 接口 | 方法 | 说明 |
|------|------|------|------|
| 用户 | `/user/login` | POST | 用户登录 |
| 用户 | `/user/detail` | GET | 获取用户信息 |
| 设备 | `/device/find-ava` | GET | 获取可用设备列表 |
| 设备 | `/device/add` | POST | 添加设备 |
| 设备 | `/device/update` | POST | 更新设备 |
| 设备 | `/device/delete` | POST | 删除设备 |
| 联系人 | `/contact/add` | POST | 添加联系人 |
| 联系人 | `/contact/update` | POST | 更新联系人 |
| 联系人 | `/contact/delete` | POST | 删除联系人 |
| 活动 | `/activity/history` | GET | 获取活动历史 |
| 报警 | `/alarm/list` | GET | 获取报警列表 |
| 报警 | `/alarm/feedback` | POST | 漏报反馈 |
| 文件 | `/upload/avatar` | POST | 上传头像 |

### WebSocket 接口

- **连接地址**: `ws://localhost:8080/wsserver/{userCode}`
- **心跳机制**: 每 5 秒发送一次用户-设备绑定信息
- **推送内容**: 实时活动状态（正常/风险/跌倒）

## 更新日志

### v1.0.0 (2025-03-04)

**新增功能**
- 报警查询和反馈功能
- 首页 UI 改版：监控、统计、联系人、设备快捷入口
- 状态页实时活动监测（WebSocket）
- 联系人管理（增删改查）
- 设备管理（增删改查）
- 图片上传功能
- 用户信息更新
- 活动历史查看与图表展示

### v0.9.0 (2024-10-25)

**新增功能**
- HTTP 请求封装（自动 loading、错误处理、Token 注入）
- 用户注册/登录实现
- 用户页面 UI
- 设备列表/联系人列表页面 UI

### v0.8.0 (2024-10-20)

**新增功能**
- 项目初始化
- 自定义组件库（按钮、标题、卡片等）
- 启动页设计
- TabBar 导航（首页、状态、我的）
- 登录/注册页面 UI

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

- 项目主页：[GitHub Repository](<your-repo-url>)
- 问题反馈：[Issues](<your-repo-url>/issues)

---

<p align="center">
  步步安，让独居老人的每一步都平安
</p>
