<div align="center">

# 🚀 PromptLayer API 代理服务

[![GitHub stars](https://img.shields.io/github/stars/Rfym21/PromptlayerProxy?style=social)](https://github.com/Rfym21/PromptlayerProxy)
[![Docker Pulls](https://img.shields.io/docker/pulls/rfym21/promptlayer-proxy)](https://hub.docker.com/r/rfym21/promptlayer-proxy)

*一个强大的 PromptLayer API 代理服务，支持多种主流 AI 模型*

**🔗 [交流群](https://t.me/nodejs_project) | 🐳 [Docker Hub](https://hub.docker.com/r/rfym21/promptlayer-proxy)**

</div>

## ✨ 功能特点

<div align="center">

| 功能 | 状态 | 描述 |
|------|------|------|
| 🔄 **OpenAI API 兼容** | ✅ | 完全兼容 OpenAI API 格式 |
| 🌊 **流式输出** | ✅ | 支持实时流式响应 |
| 🖼️ **图像处理** | ✅ | 支持图像上传和识别 |
| ⚖️ **负载均衡** | ✅ | 多账户轮询负载均衡 |
| 🐳 **容器化部署** | ✅ | Docker 一键部署 |
| 🔄 **自动刷新** | ✅ | 智能 Token 自动刷新 |
| 🛠️ **Tools 支持** | ✅ | 支持Tools参数 |
| 🔌 **其他参数(温度,Max_Tokens)** | ✅ | 支持配置其他参数，设置的参数将覆盖默认参数 |

</div>

---

## 🤖 支持的模型

<div align="center">

| 🏷️ 模型名称 | 📊 最大输出长度 | 🧠 思考长度 | 📈 类型 |
|-----------|-------------|---------|-------|
| 🔮 `claude-3-7-sonnet-20250219` | `64,000` | `-` | Anthropic |
| 🧠 `claude-3-7-sonnet-20250219-thinking` | `64,000` | `32,000` | Anthropic |
| 🔮 `claude-sonnet-4-20250514` | `64,000` | `-` | Anthropic |
| 🧠 `claude-sonnet-4-20250514-thinking` | `64,000` | `32,000` | Anthropic |
| 🔮 `claude-opus-4-20250514` | `32,000` | `-` | Anthropic |
| 🧠 `claude-opus-4-20250514-thinking` | `32,000` | `16,000` | Anthropic |
| 🤖 `o4-mini` | `100,000` | `-` | OpenAI |
| 🤖 `o3` | `100,000` | `-` | OpenAI |
| 🤖 `o3-mini` | `100,000` | `-` | OpenAI |
| 🤖 `chatgpt-4o-latest` | `-` | `-` | OpenAI |
| 🤖 `gpt-4o` | `-` | `-` | OpenAI |
| 🤖 `gpt-4o-mini` | `-` | `-` | OpenAI |
| 🤖 `gpt-4o-search-preview` | `-` | `-` | OpenAI |
| 🤖 `gpt-4o-mini-search-preview` | `-` | `-` | OpenAI |
| 🤖 `gpt-4.1` | `-` | `-` | OpenAI |
| 🤖 `gpt-4.1-mini` | `-` | `-` | OpenAI |
| 🤖 `gpt-4.1-nano` | `-` | `-` | OpenAI |
| 🤖 `gpt-4.5-preview` | `-` | `-` | OpenAI |

</div>

---

## 🚀 快速开始

### 方式一：🐳 Docker Compose（推荐）

#### 📥 **Step 1**: 下载配置文件

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/Rfym21/PromptlayerProxy/refs/heads/main/docker-compose.yml
```

#### ⚙️ **Step 2**: 配置环境变量

在 `docker-compose.yml` 文件中设置以下参数：

```yaml
services:
  promptlayer-proxy:
    image: rfym21/promptlayer-proxy:latest
    container_name: promptlayer-proxy
    restart: always
    ports:
      - "3000:3000"
    environment:
       # 🔐 PromptLayer 账号密码
      - ACCOUNTS=your_account1:your_password1,your_account2:your_password2...
       # 🔑 API 认证密钥
      - AUTH_TOKEN=your_auth_token_here
```

#### 🚀 **Step 3**: 启动服务

```bash
docker-compose up -d
```

---

### 方式二：🐳 Docker CLI

```bash
docker run -d \
  --name promptlayer-proxy \
  -p 3000:3000 \
  -e ACCOUNTS=your_account:your_password \
  -e AUTH_TOKEN=your_auth_token_here \
  rfym21/promptlayer-proxy:latest
```

---

### 方式三：💻 本地开发

#### 📦 **Step 1**: 安装依赖

```bash
npm install
```

#### 📝 **Step 2**: 环境配置

创建 `.env` 文件：

```env
ACCOUNTS=your_email1:your_password1,your_email2:your_password2,at1,at2... # at和账号密码可以混用，但是不配置 YES_CAPTCHA_CLIENT_KEY 无法使用账号密码登录
AUTH_TOKEN=your_auth_token_here # 自行设置的鉴权密钥
YES_CAPTCHA_CLIENT_KEY=your_yes_captcha_client_key_here # 因为promptlayer官方登录接口有谷歌验证，所以: 如果你需要使用"账号密码登录"，则需要填写该参数
```

#### 🏃 **Step 3**: 启动开发模式

```bash
npm run dev
```

---

<div align="center">

## 💬 交流与支持

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/nodejs_project)

</div>
