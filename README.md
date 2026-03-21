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

## 阿里云服务器更新策略

假设项目在 `~/psynknight/psynknight`，后端由 **psynknight.service**（systemd + Gunicorn）托管。

---

### 策略 A：正常网络（首选）

当服务器能稳定访问 GitHub 时使用。

```bash
cd ~/psynknight/psynknight
git pull origin main
sudo systemctl restart psynknight
```

**若 `git pull` 报 HTTP2/TLS 错误**，可先执行：

```bash
git config --global http.version HTTP/1.1
```

---

### 策略 B：网络不稳定（中国大陆常见）

服务器访问 GitHub 易失败时，采用 **本地拉取 → 上传到服务器**。

#### 步骤 1：在本地电脑（Windows，能访问 GitHub 的环境）

```bash
cd 你的项目目录
git pull origin main
```

#### 步骤 2：上传到服务器

**方式 1：SCP 命令行（在本地 PowerShell/CMD）**

```bash
scp -r templates root@服务器IP:~/psynknight/psynknight/
```

**方式 2：图形工具**

- 用 WinSCP、FileZilla 等
- 将本地 `templates` 目录上传到服务器 `~/psynknight/psynknight/`
- 选择覆盖同名文件

#### 步骤 3：在服务器上重启服务

```bash
ssh root@服务器IP
sudo systemctl restart psynknight
```

---

### 策略 C：仅改动了 templates 静态 HTML

心理陪伴、心理科普页面在 `templates/` 下，**无需 pip、npm**，只更新文件并重启即可。

| 策略 | 拉取代码 | pip | npm build | 重启 |
|------|----------|-----|-----------|------|
| 仅 templates 变更 | ✅ 或 策略 B | ❌ | ❌ | ✅ |
| requirements 变更 | ✅ | ✅ | ❌ | ✅ |
| web/ 变更 | ✅ | ❌ | ✅ | ✅ |

---

### 可选：pip 与 npm（有变更时）

```bash
# 依赖变更时
cd ~/psynknight/psynknight/templates
source ../venv/bin/activate
pip install -r requirements.txt

# 前端变更时（需 Node.js）
cd ~/psynknight/psynknight/web
npm install && npm run build
```

---

### 自检清单

```bash
# 1. 服务状态
sudo systemctl status psynknight

# 2. 5000 端口（应为 gunicorn）
lsof -i :5000

# 3. 接口测试
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5000/
# 期望输出 200 或 302

# 4. 手机访问，测试侧边栏按钮是否响应
```

---

### 策略选择速查

| 情况 | 建议策略 |
|------|----------|
| `git pull` 正常 | 策略 A |
| `git pull` 报 HTTP2/TLS 错误 | 策略 B |
| 仅修复了 HTML/JS/CSS | 策略 B 或 A，无需 pip/npm |

---

## 许可证

项目内部使用，请按需补充许可证。
