# 聆心小开（psynknight）

心理陪伴与心理科普相关功能：Flask 后端 + Vue 前端（Vite）。本仓库用于**不同分支的代码维护**，主页：<https://github.com/psynknight/psynknight>。

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

## 阿里云服务器更新步骤

假设项目在 `~/psynknight/psynknight`，后端由 **psynknight.service**（systemd + Gunicorn）托管。

### 1. 拉取最新代码

```bash
cd ~/psynknight/psynknight
git pull origin main
```

### 2. 更新依赖（可选）

如 `requirements.txt` 有变动：

```bash
cd ~/psynknight/psynknight/templates
source ../venv/bin/activate   # 若有 venv，在 templates 上一级
pip install -r requirements.txt
```

若无 venv，用系统 Python 时可能遇到「externally managed」报错，需使用 `python3 -m venv venv` 创建虚拟环境后再安装。

### 3. 重新构建前端（可选）

仅当 `web/` 目录有改动时执行（心理陪伴/心理科普为静态 HTML，一般无需构建）：

```bash
cd ~/psynknight/psynknight/web
npm install
npm run build
```

如未安装 Node.js/npm，可跳过此步（本次侧边栏修复在 templates 静态 HTML 中，无需 build）。

### 4. 重启服务

```bash
sudo systemctl restart psynknight
```

### 5. 自检

```bash
# 查看服务状态
sudo systemctl status psynknight

# 查看 5000 端口占用（应为 gunicorn）
lsof -i :5000
# 或
ss -tlnp | grep 5000

# 测试接口（若配置了 curl）
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5000/
```

浏览器访问站点，手机端测试侧边栏按钮是否正常响应。

---

## 许可证

项目内部使用，请按需补充许可证。
