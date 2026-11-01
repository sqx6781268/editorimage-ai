<p align="center"><img src="frontend/public/logo.svg" alt="pedit 图标" width="96"/></p>

<h1 align="center">pedit —— 能用一句话驱动的开源 AI 图像编辑器（MCP）</h1>

<p align="center">
  <strong>一个免费的分层照片编辑器 —— Photoshop / GIMP 的替代品 —— AI 智能体可以替你动手。</strong><br/>
  图层、分组、蒙版、剪切蒙版、27 种混合模式、调整图层、仿制图章与修复画笔，
  外加生成式填充、画布外扩、图生图、文生图、去背景与放大 ——
  全部可以本地跑，也可以用你自己的 OpenAI、Gemini、Stability AI、Replicate 或 OpenRouter 密钥。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MCP%20tools-62-blueviolet?style=flat-square" alt="62 个 MCP 工具"/>
  <img src="https://img.shields.io/badge/AI-local%20or%20your%20API%20key-brightgreen?style=flat-square" alt="本地 AI 或你自己的 API 密钥"/>
  <img src="https://img.shields.io/badge/python-3.10%2B-3776ab?style=flat-square" alt="Python 3.10+"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT 许可"/>
</p>

<p align="center"><img src="docs/promo.gif" alt="pedit 演示：AI 智能体通过 MCP 编辑图像" width="720"/></p>

你用大白话说要什么 —— *"去掉背景，把天空往外扩一点，调暖一些"* —— 它就在真实图层上一步步做给你看。
任何时候你都可以拿过鼠标自己改。支持 **Claude Code、Cursor、Codex、VS Code**
以及任何 [Model Context Protocol](https://modelcontextprotocol.io) 客户端。

> 🇮🇹 Italiano: [README.it.md](README.it.md) · 🇨🇳 简体中文: [README.zh.md](README.zh.md) · 姊妹项目（视频版）：[editorvideo-ai (vedit)](https://github.com/metiutek/editorvideo-ai)

> **本仓库是 [metiutek/editorimage-ai](https://github.com/metiutek/editorimage-ai) 的 fork**，
> 相比上游多了一套界面国际化层（中/英可切换），详见下面[界面语言](#界面语言本仓库新增)一节。

## 安装 —— 3 步

**1. 安装 uv**（它替你装 Python 应用），装完关掉终端再重开。

| Windows（PowerShell） | macOS | Linux |
|---|---|---|
| `winget install astral-sh.uv` | `brew install uv` | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |

**2. 安装 pedit**

```bash
uv tool install "pedit-mcp[ai]"
```

`[ai]` 会加上本地去背景与物体移除能力。

**3. 打开编辑器**

```bash
pedit ui
```

编辑器开在 <http://127.0.0.1:8770>。**可选 —— 让 Claude Code 替你改图：**
`claude mcp add pedit -- pedit-mcp`。出问题？`pedit doctor` 会告诉你缺了什么。

## 界面语言（本仓库新增）

顶栏最右侧有一个 **EN / 中文** 按钮，点一下就切换，选择记在浏览器 `localStorage` 里，
下次打开还在。浏览器语言是 `zh-*` 时默认就是中文。

实现只在 `frontend/src/i18n.js` 一个文件里：

- **英文原文就是字典的 key**，所以漏译的条目会自动退回英文，不可能出现空白界面；
- 后端下发的文字**按稳定 id 查表**翻译（37 个效果名、34 个参数键、28 个混合模式、
  10 个预设风格的名字与描述、7 个图层类型、12 个助手供应商），不改任何 Python、不动 API 契约；
- 切换语言时整页重载：文档在服务端且有自动保存，重载不丢东西，换来的是零侵入。

已知还没中文化的部分：`cloud.py` / `llm.py` 下发的自由文本提示句（服务商说明、就绪诊断、
密钥输入框占位符）、`pedit doctor` 的命令行输出，以及 62 个 MCP 工具的描述（那是给 agent 读的）。

### ⚠️ 中文用户必读：文本图层的字体

界面是浏览器渲染，中文没问题；但**画进图里的文字**由后端 Pillow 渲染，默认字体是 arial，
汉字会变成豆腐块 □□□。而且字体索引是按**文件名**建的（`msyh.ttc` → `msyh`），
所以写显示名 `Microsoft YaHei` 会查不到并**静默回落**到 arial。正确写法是给文件名或绝对路径：

```python
add_text(text="中文标题", font="msyh")                          # 微软雅黑
add_text(text="中文标题", font="C:\\Windows\\Fonts\\simhei.ttf") # 黑体
```

Windows 上常用的可选值：`msyh` / `msyhbd` / `msyhl`（雅黑常规/粗/细）、`simhei`（黑体）、
`simsun`（宋体）、`simkai`（楷体）、`Deng`（等线）、`NotoSansSC-VF`。

## 它是什么

pedit 就是一个常规意义上的图像编辑器：一块画布、一叠图层、蒙版、混合模式、调整图层、
滤镜、图层样式、画笔、文字和形状。

不同之处在于：**你用鼠标能做的一切，AI 也能按一句话做** —— 按钮、内置助手、任何 MCP
智能体调用的都是同一批操作。没有"只有 AI 能做"的事，也没有"只有鼠标能做"的事。
所以你不必拿钢笔工具抠二十分钟，只需要敲一句：

> *"去掉背景，把她放到柔和的蓝色渐变上，调暖一点，底部加个标题带淡淡的投影。"*

图层就一条条出现在面板里。投影不满意？点中那个图层拖滑块就行。

**一切都不破坏原图。** 滤镜是图层效果里的一条记录，预设风格是一个调整图层，
AI 抠图是一张*蒙版*，移除物体是*新图层上的一块补丁*。你的照片永远不会被重写，
每一步都能 Ctrl+Z 退回去。

## 靠什么做到

| | |
|---|---|
| **智能体真的能改图** | 62 个 MCP 工具，和按钮是*同一批*操作：图层与分组、剪切蒙版、手绘蒙版、变换、33 种滤镜与样式、27 种混合模式、预设风格、仿制图章、裁剪、缩放、AI 工具、导出。 |
| **智能体看得见自己做了什么** | `preview` 返回真实渲染出的图（可叠坐标网格，或只看某个方框）。`analyze_image` 会量曝光、溢出、偏色和锐度，所以修图是照着数字修，不是猜。 |
| **它会检查自己的作业** | `review_image` 会挑出被边裁掉的文字或在背景上看不清的文字、跑到画布外的图层、过曝的高光、放大的图 —— 每条都指名该用哪个工具修。 |
| **AI 本地跑，或用你的密钥走在线** | 去背景（rembg/ONNX）、物体移除与污点修复（OpenCV，或 numpy 兜底）；再接 [ComfyUI](https://github.com/comfyanonymous/ComfyUI) 或在线服务，点亮文生图、图生图、生成式填充、画布外扩和模型放大。在线服务用你自己的密钥：OpenAI（GPT Image）、Google Gemini（Nano Banana）、Stability AI、OpenRouter、Replicate（FLUX…）、任何 OpenAI 兼容端点；图生文可用 Gemini、OpenAI、Claude 或本地 Ollama 视觉模型。 |
| **同一份文档，同一份像素** | 文档就是一个 JSON 文件，渲染是它的纯函数：预览、智能体看到的、导出的文件，都出自同一段代码。 |

## 让智能体来驱动（MCP）

正在运行的编辑器本身**就是**一个 MCP 服务，地址 `http://127.0.0.1:8770/mcp/`。
连上去的智能体直接改你浏览器里打开的那份文档，实时可见：

```bash
claude mcp add --transport http pedit-live http://127.0.0.1:8770/mcp/
```

或者用经典的 stdio 服务，适合不先开界面的智能体（之后用 `open_ui` 把编辑器打开到它那份文档上）：

```bash
claude mcp add pedit -- uvx pedit-mcp
```

Cursor、Codex、VS Code 用同样的 JSON：`{ "mcpServers": { "pedit": { "command": "pedit-mcp" } } }`。

典型流程：

```
project_create / project_open(照片) → add_image / add_text / add_shape / add_fill
  → analyze_image → auto_enhance 或 add_adjustment → apply_look
  → remove_background / set_mask / mask_stroke / inpaint / edit_image / expand_canvas
  → preview（先看！）→ review_image → export_image
```

`batch` 能把一串编辑在一次调用里原子提交，且只占一步撤销；`batch(look=true)` 顺带把预览一起返回。
那套编辑规矩（说完成之前先看、修正之前先量、先打底再谈风格、保持非破坏、没让导出就别导出）
写在服务端 instructions 里，所以每个客户端都拿得到。

## 网页界面

```
┌──────────────────────────────────────────────────────────────────────┐
│ 新建 · 打开 · 保存 · ↶↷ · 导入 · 生成 · 自动优化 · AI 模型            │
│ 工具选项（画笔大小、文字、选区操作…）                                  │
├────┬──────────────────────────────────────────┬──────────────────────┤
│   │                                          │ 图层 | 风格 | 助手   │
│ ⬚  │                  画布                    │  图层堆叠            │
│ ◯  │        （服务端渲染，像素精确）           │  属性、蒙版、        │
│ ✂  │                                          │  效果、AI 按钮       │
│ ✎  │                                          │                      │
└────┴──────────────────────────────────────────┴──────────────────────┘
```

- **工具：** 移动/缩放 (V)、矩形选区 (M) 与椭圆选区 (L)、裁剪 (C)、画笔 (B)、橡皮擦 (E)、
  仿制图章 (S，Alt+单击设定源点，勾上*修复*就是修复画笔)、污点修复画笔 (J)、文字 (T)、
  形状 (U)、抓手平移 (H)。画笔和橡皮都能画在图层蒙版上（隐藏/显示），也用来修 AI 抠图的边缘。
  有选区时可用：*建立图层蒙版*、*移除物体*、*生成式填充*、*用 AI 编辑该区域*、*描述*、*裁剪到选区*。
- **图层：** 分组（穿透或独立，各有自己的不透明度、混合、蒙版与效果）、剪切蒙版、显隐、锁定、
  重命名（双击）、拖动排序或拖进组、复制、向下合并、不透明度与全部 27 种 Photoshop 混合模式。
  图层类型有图像、文字、形状、填充/渐变、绘制、调整和分组。
- **AI：** 生成、生成式填充、用 AI 编辑（图生图，带强度）、外扩画布、描述（图生文）、放大、
  去背景 —— 每一项都能选本地或在线模型。*AI 模型* 里存 API 密钥（只存本机，
  `~/.pedit/ai_api.json`，若设了 `PEDIT_HOME` 则在 `$PEDIT_HOME/ai_api.json`）以及哪个模型干哪件事；
  *自动* 只在你把某个在线服务设为默认时才会用在线。
- **预设风格：** 电影感、高反差黑白、暖阳、冷调、褪色胶片、鲜艳、哑光、复古、戏剧、干净人像 ——
  每一个都是一条可编辑的滤镜链。
- **助手：** Claude Code（用你的订阅，不需要密钥）、带密钥的 Anthropic，或任何 OpenAI 兼容服务
  （OpenAI、Gemini、OpenRouter、Ollama、LM Studio…）。可以 `+ 区域` 或 `+ 图层` 指个位置，
  然后用话描述。导出前一定会先问你。
- 把图片拖到窗口里就能导入。Ctrl+Z/Y 撤销重做，Ctrl+S 保存，Ctrl+J 复制图层，Del 删除，
  0 适应窗口，1 回到 100%，Ctrl+滚轮缩放。

## 命令行

```bash
pedit new poster.json --preset instagram_post
pedit add poster.json photo.jpg --fit cover
pedit text poster.json "SUMMER SALE" --size 140 --bold --align center-bottom
pedit enhance poster.json
pedit look poster.json warm
pedit cutout poster.json <layer-id>          # 需要 ai 附加包
pedit export poster.json poster.jpg --quality 90
pedit review poster.json
pedit effects -v | pedit looks | pedit doctor | pedit ui
```

## 可选附加包

| 附加包 | 加了什么 |
|---|---|
| `ai` | `rembg` + `onnxruntime`（去背景，模型首次使用时下载）和 OpenCV（更好的物体移除） |
| `chat` | `anthropic` —— 用 Anthropic 密钥的助手（其它引擎什么都不用装） |
| ComfyUI | 不是 pip 包：本地跑起来（默认 `127.0.0.1:8188`），`generate_image`、`edit_image`、`inpaint(prompt=…)`、`expand_canvas` 和模型 `upscale` 就点亮了。用 `comfy_settings` 指定地址、checkpoint 和放大模型。 |
| 在线模型 | 也不是包：在 *AI 模型* 里粘贴密钥（或设 `OPENAI_API_KEY`、`GEMINI_API_KEY`、`STABILITY_API_KEY`、`OPENROUTER_API_KEY`、`REPLICATE_API_TOKEN`、`ANTHROPIC_API_KEY`），调用时传 `backend=<服务>` —— 或者把某个服务设为 `auto` 的默认。 |

## 常见问题

**pedit 算 Photoshop 或 GIMP 的免费替代品吗？**
它是一个免费、MIT 许可的分层位图编辑器，两者的核心都有：图层与图层组、蒙版、剪切蒙版、
调整图层、27 种混合模式、滤镜、图层样式、画笔、仿制图章、修复画笔、文字和形状。
它不追求功能全覆盖（没有 CMYK、没有 16 位、暂时不支持 PSD）；重点是你和 AI 智能体都能驱动的
非破坏式编辑。

**没有 GPU 能用生成式填充和 AI 生图吗？**
能。在 *AI 模型* 里贴 OpenAI（GPT Image）、Google Gemini（Nano Banana）、Stability AI、
Replicate（FLUX）或 OpenRouter 的密钥即可。有 GPU 就能通过 ComfyUI 全本地跑。
物体移除、污点修复和去背景在纯 CPU 下也能离线工作。

**能描述图片（图生文）吗？**
能：`describe_image` / *描述* 会用视觉模型 —— Gemini、OpenAI、Claude、OpenRouter 或本地
Ollama —— 给整图、某个图层或某个区域写说明，或者回答你关于它的问题。

**哪些 AI 智能体能用 pedit 改图？**
任何 MCP 客户端：Claude Code、Claude Desktop、Cursor、OpenAI Codex、VS Code，
以及内置助手（Claude、OpenAI、Gemini、OpenRouter、Ollama、LM Studio）。
智能体拿到 62 个工具，并用 `preview` 看到真实渲染结果。

**我的 API 密钥安全吗？**
密钥只留在你本机，在 `~/.pedit/ai_api.json`（或环境变量）里；设了 `PEDIT_HOME` 时在该目录下。
它们不会写进文档，也不会作为 MCP 工具参数传递。
注意：如果密钥文件和你的项目文档在同一个 `PEDIT_HOME` 目录里，那么**整个目录被拷走就等于密钥被拷走** ——
同步或备份这个目录要按同步密钥的规格对待。

## 内部结构

```
backend/pedit/
  model.py      文档（dataclass ↔ JSON）：图层、蒙版、效果、素材
  effects.py    滤镜与图层样式注册表：参数、校验、numpy 核
  render.py     文档 → 像素（W3C 混合模式、蒙版、样式）、导出
  store.py      每次编辑 + 撤销/重做 + 原子保存 —— 改文档的唯一入口
  ai.py         去背景、填充、生成、图生图、放大（带兜底）
  cloud.py      用用户密钥的在线图像模型（OpenAI、Gemini、Stability…）
  comfy.py      极简 ComfyUI 客户端（txt2img、inpaint、upscale 工作流）
  analyze.py    测量与文档体检
  mcp_server.py MCP 工具        api.py  给界面用的 REST/WebSocket
  chat.py/llm.py 应用内助手（它用的工具就是那批 MCP 工具）
frontend/       React + Vite 界面（本仓库多了 src/i18n.js 国际化层）
tests/          每个效果、混合模式、蒙版和操作的像素级测试
```

**唯一真源：** 界面、助手、MCP 智能体调的都是 `Store` 的方法。
要加操作，先在 `Store` 里实现，再往外暴露。

## 测试

```bash
pytest                         # 约 180 个测试，约 25 秒，不联网、不加载模型
cd frontend && npm run build && npm test
```

## 开发

```bash
git clone https://github.com/sqx6781268/editorimage-ai && cd editorimage-ai
python scripts/setup.py --venv        # 依赖、构建界面、注册 MCP、体检、跑测试
```

改界面文案时，开发回路更快：`cd frontend && npm run dev` 起 5174 端口，
它会把 `/api` 和 `/ws` 代理到 8770（后端先 `pedit ui` 起着），存盘即热重载。

上游仓库的代码与注释用意大利语（项目约定），给用户看的都是英文；
本仓库新增的 `frontend/src/i18n.js` 注释用中文。
另见 [AGENTS.md](AGENTS.md) 与 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可

MIT —— 见 [LICENSE](LICENSE)。

---

由 [metiu.xyz](https://metiu.xyz/) 制作 · 中文界面由 [sqx6781268](https://github.com/sqx6781268) 在本 fork 中补充
