# 聆心小开（psynknight）

心理陪伴与心理科普相关功能：Flask 后端 + Vue 前端（Vite），详见 [GitHub 仓库](https://github.com/psynknight/psynknight)。

## 目录结构

| 目录 | 说明 |
|------|------|
| `templates/` | Flask 服务器 `server.py`、静态页面、构建产物 `dist/` |
| `web/` | Vue 3 + Vite 源码 |

## 本地运行

### 1. Python 后端

```bash
cd templates
pip install flask flask-cors requests python-dotenv werkzeug itsdangerous
copy .env.example .env   # Windows；然后编辑 .env 填入 DEEPSEEK_API_KEY 等
python server.py
```

默认 <http://127.0.0.1:5000>。

### 2. 前端（开发/重新构建）

```bash
cd web
npm install
npm run build
```

构建产物输出到 `templates/dist/`，供 Flask 作为 SPA 入口。

### 3. 前端开发联调（可选）

```bash
cd web
npm run dev
```

Vite 代理 `/api` 到 `http://127.0.0.1:5000`，需先启动后端。

## 环境变量

复制 `templates/.env.example` 为 `templates/.env`，配置 `DEEPSEEK_API_KEY` 等。**不要将 `.env` 提交到 Git。**

## 许可证

项目内部使用，请按需补充许可证。
