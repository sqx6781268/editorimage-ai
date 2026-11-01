// 界面国际化层：字典 + 取值函数 + 语言切换。
// 设计约束（改这里前先读）：
//   1. 英文原文就是 key，字典缺项时自动退回英文，所以漏译不会白屏，只会露英文。
//   2. 后端下发的名字（效果 / 参数 / 混合模式 / Look / 图层类型）都有稳定 id，
//      一律按 id 查表，不去改后端，也不依赖它的英文描述文案。
//   3. 切换语言写 localStorage 后整页 reload：文档在服务端且有自动保存，
//      reload 不丢东西，换来的是零侵入（不必给每个组件塞 context）。

const KEY = 'pedit.lang'

export function getLang() {
  const saved = localStorage.getItem(KEY)
  if (saved === 'en' || saved === 'zh') return saved
  return (navigator.language || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function setLang(lang) {
  localStorage.setItem(KEY, lang)
  window.location.reload()
}

export function toggleLang() {
  setLang(getLang() === 'zh' ? 'en' : 'zh')
}

// ---------------------------------------------------------------- 界面文案
// key = 组件里那句英文原文（含省略号与括号里的快捷键，原样照抄）
const UI = {
  zh: {
    // 顶栏
    New: '新建', Open: '打开', Save: '保存', 'Ctrl+S': 'Ctrl+S（保存）',
    'Undo (Ctrl+Z)': '撤销 (Ctrl+Z)', 'Redo (Ctrl+Y)': '重做 (Ctrl+Y)',
    Import: '导入', Generate: '生成', 'Auto enhance': '自动优化',
    'AI models': 'AI 模型',
    'Online AI models: API keys and which model does what': '在线 AI 模型：填 API 密钥，并指定哪个模型干哪件事',
    '(unsaved)': '（未保存）', Export: '导出',
    'made by metiu.xyz': '由 metiu.xyz 制作',
    Language: '界面语言',

    // 工具条提示
    'Move / select layer (V)': '移动 / 选中图层 (V)',
    'Rectangle selection (M)': '矩形选区 (M)',
    'Ellipse selection (L)': '椭圆选区 (L)',
    'Crop (C)': '裁剪 (C)',
    'Brush (B)': '画笔 (B)',
    'Eraser (E)': '橡皮擦 (E)',
    'Clone stamp (S) — Alt+click sets the source': '仿制图章 (S) — Alt+单击设定源点',
    'Spot healing brush (J) — paint over a blemish': '污点修复画笔 (J) — 涂在瑕疵上',
    'Text (T)': '文字 (T)',
    'Shape (U)': '形状 (U)',
    'Pan (H)': '抓手平移 (H)',
    Tools: '工具',

    // 选项条
    Color: '颜色', Size: '大小', Hardness: '硬度', Opacity: '不透明度',
    'Paint on': '绘制目标',
    'Paint on the selected layer\'s mask instead of pixels': '画在所选图层的蒙版上，而不是像素上',
    'new paint': '新建绘制层',
    'hide (black)': '隐藏（黑）', 'reveal (white)': '显示（白）',
    'Eraser reveals the mask.': '橡皮擦会擦显蒙版。',
    'Painting the mask: nothing is deleted.': '正在绘制蒙版：不会删除任何东西。',
    'Paints on the selected paint layer, or a new one.': '画在所选绘制层上，没有就新建一个。',
    Heal: '修复',
    'Healing brush: copy the texture, keep the light and color of where you paint': '修复画笔：复制纹理，但保留落笔处的明暗与颜色',
    'Alt+click to set the source.': 'Alt+单击设定源点。',
    'Reset source': '重设源点',
    'Paint over a blemish or a small object: it is removed on a new layer.': '涂过瑕疵或小物体：会在一个新图层上把它们去掉。',
    Fill: '填充', Stroke: '描边', Radius: '圆角', Bold: '粗体',
    'Click on the image to place text.': '在图上点一下放置文字。',
    rect: '矩形', ellipse: '椭圆',
    'Crop to selection': '裁剪到选区',
    'Mask layer': '建立图层蒙版',
    'Remove object': '移除物体',
    'Generative fill': '生成式填充',
    'Edit area with AI': '用 AI 编辑该区域',
    'Image-to-image on this area': '对该区域做图生图',
    Describe: '描述', Deselect: '取消选区',
    'Click a layer to select it, drag to move, corners to resize.': '点击图层选中，拖动移动，拖角缩放。',
    'Drag on the image to select an area.': '在图上拖出一个选区。',
    'Loading…': '加载中…',
    'Text:': '文字内容：',
    'Save document as (.json):': '文档另存为 (.json)：',
    'Source': '源点',

    // 忙碌提示
    'Enhancing…': '优化中…', 'Importing…': '导入中…', 'Generating…': '生成中…',
    'Filling…': '填充中…', 'Editing…': '编辑中…', 'Expanding…': '外扩中…',
    'Removing…': '移除中…',

    // 欢迎页
    'A layered image editor that an AI can use for you — and you can always take the mouse back.':
      '一个分层图像编辑器，AI 能替你动手——而你随时可以把鼠标拿回去。',
    'New document': '新建文档',
    'Open a photo or document': '打开照片或文档',
    '…or drop an image here.': '……或者把图片拖到这里。',

    // 右侧面板
    Layers: '图层', Looks: '预设风格', Assistant: '助手',
    'Applies to the whole image as an adjustment layer.': '作为调整图层作用于整张图。',
    'Adjustment layers': '调整图层',

    // 状态栏
    fit: '适应', 'Any MCP client can edit this document live': '任何 MCP 客户端都能实时编辑这份文档',

    // 对话框文案
    'Generate image': '生成图像',
    'Lands on a new layer.': '结果会落在一个新图层上。',
    'a misty pine forest at dawn, cinematic light': '清晨薄雾中的松林，电影感光线',
    'a wooden bench': '一条木质长凳',
    'Fills the selection; the result is a new layer with a soft mask.': '填充选区；结果是带柔和蒙版的新图层。',
    'Edit layer with AI': '用 AI 编辑该图层', 'Edit with AI': '用 AI 编辑',
    'make it a snowy winter evening': '改成下雪的冬夜',
    'Image-to-image. Low strength keeps the picture, high reinvents it. The result is a new layer above; the original stays.':
      '图生图。强度低则尽量保留原图，高则大幅重绘。结果是上方的新图层，原图层保持不动。',

    // 属性面板
    Document: '文档', Background: '背景', transparent: '透明',
    'Resize image…': '重设图像尺寸…',
    'New width in px (proportions kept):': '新宽度（像素，等比缩放）：',
    'Expand canvas…': '外扩画布…',
    'Select a layer to edit it. Drag a box with the selection tool to mask, crop or remove things.':
      '选中一个图层才能编辑。用选框工具拖出区域，可做蒙版、裁剪或移除物体。',
    Blend: '混合模式', 'Linear dodge (add)': '线性减淡（添加）',
    'Clip to layer below': '剪切到下层',
    'Show this layer only where the layer below has pixels': '仅在下层有像素的范围内显示本图层',
    'Pass through: adjustments inside the group affect everything below it.':
      '穿透：组内的调整会影响组下方所有内容。',
    'Isolated: adjustments inside the group affect only the group.':
      '独立：组内的调整只影响本组。',
    Transform: '变换', Center: '居中', 'Flip H': '水平翻转', 'Flip V': '垂直翻转',
    Text: '文字', Font: '字体', Outline: '描边', Shape: '形状', 'Stroke px': '描边像素',
    'Color 2': '颜色 2', Kind: '类型', Angle: '角度',
    Mask: '蒙版', Invert: '反相', 'Undo stroke': '撤销这一笔',
    'Remove the last brush stroke on the mask': '撤销蒙版上最后一笔',
    Remove: '移除',
    'Brush and eraser are painting on this mask (black hides, white reveals).':
      '画笔与橡皮正作用在这个蒙版上（黑隐藏、白显示）。',
    'Pick the brush and switch “Paint on: mask” to refine it.':
      '想细化就切到画笔，并把「绘制目标」设为蒙版。',
    Feather: '羽化',
    'From selection': '来自选区', 'Use the current selection as mask': '把当前选区变成蒙版',
    'Paint mask': '可绘制蒙版', 'A mask to paint with the brush (starts fully visible)':
      '新建一个可用画笔涂抹的蒙版（初始完全显示）',
    'Hide all': '全部隐藏', 'A mask to paint that starts fully hidden: paint to reveal':
      '初始完全隐藏的绘制蒙版：涂哪里显示哪里',
    'Remove BG': '去背景',
    AI: 'AI', Enhance: '优化', 'Upscale ×2': '放大 ×2',
    'Image-to-image: redo this layer following a prompt': '图生图：按提示词重绘该图层',
    'Image-to-text: a vision model describes this layer': '图生文：让视觉模型描述该图层',
    Rasterize: '栅格化', 'Bake effects and mask into pixels': '把效果与蒙版烘焙进像素',
    Effects: '图层效果', '+ Add effect…': '+ 添加效果…', On: '启用', Off: '关闭',
    'On/off': '开 / 关', Earlier: '上移', 'strokes': '笔',

    // 带占位符的句子
    'mask of “{name}”': '“{name}”的蒙版',
    'Applies to “{name}”.': '作用于「{name}」。',
    'Exported {w}×{h} → {path}': '已导出 {w}×{h} → {path}',
    ' · aligned': ' · 已对齐',

    // 属性面板补漏
    'Rot°': '旋转°', solid: '纯色', linear: '线性', radial: '径向', inverted: '反相',
    'Edit with AI…': '用 AI 编辑…',

    // 图层面板
    'Open group': '展开分组', 'Close group': '折叠分组',
    'Clipped to the layer below': '已剪切到下层', Show: '显示', Hide: '隐藏',
    'Has a mask': '带蒙版', 'Double click to rename': '双击重命名',
    Unlock: '解锁', Lock: '锁定',
    'No layers yet. Import an image, add text, or ask the assistant.':
      '还没有图层。导入图片、添加文字，或者直接吩咐助手。',
    'Drop here: bottom of the document': '拖到这里：放到文档最底层',
    'Paint layer': '绘制层', 'Fill layer (background)': '填充层（背景）',
    'Gradient layer': '渐变层',
    'Put the selected layer in a new group': '把选中图层放进一个新分组',
    'New empty group': '新建空分组',
    'Clip to the layer below (clipping mask)': '剪切到下层（剪切蒙版）',
    'Move up': '上移', 'Move down': '下移', 'Take out of the group': '移出分组',
    Duplicate: '复制', Ungroup: '取消分组', 'Merge down': '向下合并',
    'Delete layer': '删除图层',
    image: '图像', text: '文字', shape: '形状', fill: '填充', adjust: '调整',
    paint: '绘制', group: '组', layer: '图层', area: '区域',

    // 助手面板
    Model: '模型', 'paste the key': '粘贴密钥', Address: '地址',
    'Model id': '模型 ID', default: '默认', 'Use this model': '使用该模型',
    'no model': '未选模型', 'New conversation': '新会话', Settings: '设置',
    'Ask for an edit in plain words:': '用大白话说要怎么改，比如：',
    '“remove the background and put it on a soft blue gradient”':
      '“去掉背景，放到柔和的蓝色渐变上”',
    '“make it warmer and add a title at the bottom”': '“调暖一点，在底部加个标题”',
    '“remove the person on the left”': '“把左边那个人去掉”',
    'Every step lands in the layers and undoes with Ctrl+Z.':
      '每一步都会落到图层上，Ctrl+Z 可退。',
    '+ area': '+ 区域', '+ layer': '+ 图层',
    'What should change?': '要改什么？', Stop: '停止', Send: '发送',
    stopped: '已停止',
    'Healing…': '修复中…',

    // 对话框：新建 / 打开 / 导入 / 导出
    Name: '名称', Preset: '预设', custom: '自定义', Width: '宽度', Height: '高度',
    'Save as': '另存为', '(optional, enables autosave)': '（可选，填了才自动保存）',
    Cancel: '取消', Create: '创建',
    'Open document or photo': '打开文档或照片',
    'Import images as layers': '把图片导入为图层', Up: '上一级',
    'No images or documents here.': '这里没有图片或文档。',
    '{n} selected': '已选 {n} 个',
    'Export image': '导出图像', File: '文件',
    'The extension picks the format:': '扩展名决定格式：',
    Quality: '质量', Scale: '缩放', 'keep transparency': '保留透明',
    'Exporting…': '导出中…', Run: '执行',

    // 引擎选择
    'ComfyUI (local)': 'ComfyUI（本机）', 'Lanczos (local)': 'Lanczos（本机）',
    'rembg (local)': 'rembg（本机）', 'Auto ({name})': '自动（{name}）',
    'Auto (first service with a key)': '自动（第一个已配密钥的服务）',
    'Auto (local)': '自动（本机）',
    Strength: '强度', 'No online model set up yet.': '还没有可用的在线模型。',
    'Add an API key…': '去加一个 API 密钥…',

    // 外扩画布
    'Expand canvas (generative)': '外扩画布（生成式）', '+{p}% all sides': '四边各 +{p}%',
    Wider: '更宽', Taller: '更高',
    left: '左', right: '右', top: '上', bottom: '下',
    'New size {w}×{h}px. The new borders go on a new top layer masked to them: the original layers stay untouched.':
      '新尺寸 {w}×{h}px。新增的边框会落在一个带对应蒙版的新顶层图层上，原图层保持不动。',
    'What is outside the frame? (optional)': '画框之外是什么？（可留空）',
    'Auto (local) without a prompt fills the borders with the classic remover: fine for sky, walls, plain backgrounds. For real new content use a prompt with ComfyUI or an online model.':
      '「自动（本机）」在不填提示词时用传统修补填充边框：适合天空、墙面、纯色背景。要真的新增内容，就配提示词走 ComfyUI 或在线模型。',
    Expand: '外扩',

    // 描述图像
    'Describe layer': '描述该图层', 'Describe image': '描述图像',
    'Ask something about the image (optional)': '关于这张图你想问什么？（可留空）',
    'Describing needs a vision model.': '描述需要视觉模型。',
    Copy: '复制', Close: '关闭', 'Looking…': '看图中…', 'Ask again': '再问一次',
    'Saved.': '已保存。',

    // AI 模型设置
    Service: '服务商', '(default)': '（默认）', '(from assistant or env)': '（来自助手或环境变量）',
    'Text to image': '文生图', 'Image to image': '图生图', 'Fill (inpaint)': '填充（修补）',
    'Image to text': '图生文', Upscale: '放大', 'Background removal': '去背景',
    'Forget key': '忘记密钥',
    'Auto uses this service to generate, fill and edit': '「自动」会用该服务来生成、填充与编辑',
    'default for Auto': '作为「自动」的默认',
    'The assistant asks': '助手在问你', No: '否', Yes: '是',
    'Local AI (rembg, OpenCV, ComfyUI) works without keys. Add a key to use online models too: the provider bills your account. Keys stay on this computer (~/.pedit/ai_api.json), never in documents.':
      '本地 AI（rembg、OpenCV、ComfyUI）不需要密钥。填了密钥才能用在线模型：费用由该服务商向你的账号计费。密钥只留在本机（PEDIT_HOME 目录下的 ai_api.json，未设该变量时是 ~/.pedit/ai_api.json），不会写进文档。',
  },
}

const pick = (s) => (getLang() === 'zh' ? UI.zh[s] ?? s : s)

// 界面句子：英文原文即 key，缺译自动退回英文
export const t = (s) => pick(s)

// 带变量的句子：模板里写成 {n} 占位
export const tf = (s, vars) => {
  let out = pick(s)
  for (const [k, v] of Object.entries(vars || {})) out = out.split(`{${k}}`).join(v)
  return out
}

// ------------------------------------------------------- 后端下发的稳定 id
const FX = {
  zh: {
    brightness: '亮度', contrast: '对比度', exposure: '曝光', gamma: '中间调 Gamma',
    saturation: '饱和度', vibrance: '自然饱和度', temperature: '色温', tint: '色调',
    hue: '色相', levels: '色阶', curves: '曲线', shadows_highlights: '阴影 / 高光',
    auto_contrast: '自动对比度', color_match: '颜色匹配', grayscale: '黑白',
    sepia: '复古棕褐', invert: '反相', posterize: '色调分离', threshold: '阈值',
    blur: '高斯模糊', motion_blur: '动态模糊', sharpen: '锐化', denoise: '降噪',
    noise: '噪点', pixelate: '像素化', vignette: '暗角', emboss: '浮雕',
    edges: '查找边缘', chromatic_aberration: '色差', drop_shadow: '投影',
    outer_glow: '外发光', stroke: '描边', color_overlay: '颜色叠加',
  },
}
const PM = {
  zh: {
    amount: '数量', angle: '角度', b: '蓝', black: '黑点', blur: '模糊', clip: '裁切',
    color: '颜色', degrees: '角度', distance: '距离', dst_mean: '目标均值',
    dst_std: '目标标准差', dx: '水平位移', dy: '垂直位移', g: '绿', gamma: 'Gamma',
    highlights: '高光', level: '级数', levels: '色阶点', mono: '单色', opacity: '不透明度',
    out_black: '输出黑场', out_white: '输出白场', r: '红', radius: '半径', rgb: 'RGB',
    seed: '随机种子', shadows: '阴影', size: '尺寸', softness: '柔和度',
    src_mean: '源均值', src_std: '源标准差', stops: '档数', white: '白点', width: '宽度',
  },
}
const BLEND = {
  zh: {
    normal: '正常', dissolve: '溶解', darken: '变暗', multiply: '正片叠底',
    color_burn: '颜色加深', linear_burn: '线性加深', darker_color: '深色',
    lighten: '变亮', screen: '滤色', color_dodge: '颜色减淡', add: '线性减淡（添加）',
    lighter_color: '浅色', overlay: '叠加', soft_light: '柔光', hard_light: '强光',
    vivid_light: '亮光', linear_light: '线性光', pin_light: '点光', hard_mix: '硬混合',
    difference: '差值', exclusion: '排除', subtract: '减去', divide: '划分',
    hue: '色相', saturation: '饱和度', color: '颜色', luminosity: '明度',
    pass_through: '穿透',
  },
}
const LOOK = {
  zh: {
    cinematic: '电影感', black_white: '高反差黑白', warm: '暖阳', cool: '冷调',
    faded_film: '褪色胶片', vivid: '鲜艳', matte: '哑光', vintage: '复古',
    dramatic: '戏剧', clean_portrait: '干净人像',
  },
}
const LOOKDESC = {
  zh: {
    'Teal shadows, warm highlights, gentle contrast': '青调阴影 + 暖高光，柔和对比',
    'Contrasty black and white': '高反差黑白',
    'Golden hour warmth': '黄金时刻的暖意',
    'Cold, clean blue cast': '偏冷的干净蓝调',
    'Lifted blacks, soft contrast, grain': '抬黑、柔对比、带颗粒',
    'Punchy colors for social': '适合社交平台的浓烈色彩',
    'Flat matte with muted colors': '低饱和哑光',
    'Sepia-tinted, faded and vignetted': '棕褐、褪色带暗角',
    'Deep shadows, strong local contrast': '深沉阴影 + 强局部对比',
    'Soft skin-friendly brightening': '柔和、显肤质的提亮',
  },
}
const LTYPE = {
  zh: {
    image: '图像', text: '文字', shape: '形状', fill: '填充', paint: '绘制',
    adjustment: '调整', group: '组',
  },
}
const GROUP = { zh: { color: '色彩', detail: '细节', stylize: '风格化', style: '样式' } }
const FONT = { zh: { sans: '无衬线', serif: '衬线', mono: '等宽', display: '标题', handwriting: '手写' } }

// 通用查表：按 id 取中文名，缺项退回 titleCase(id)
const byId = (dict, id, fallback = true) => {
  if (getLang() !== 'zh') return fallback ? titleCase(id) : id
  const hit = dict.zh[id]
  if (hit) return hit
  return fallback ? titleCase(id) : id
}

export const fxName = (id) => byId(FX, id)
export const pmName = (id) => byId(PM, id)
export const blendName = (id) => byId(BLEND, id)
export const lookName = (id) => byId(LOOK, id)
export const lookDesc = (s) => (getLang() === 'zh' ? LOOKDESC.zh[s] ?? s : s)
export const typeName = (id) => byId(LTYPE, id)
export const groupName = (id) => byId(GROUP, id)
export const fontName = (id) => (getLang() === 'zh' ? FONT.zh[id] ?? id : id)

// 助手供应商：后端给的名字多是英文品牌名，只翻带说明的那几个
const PROV = {
  zh: {
    claude_code: 'Claude Code（订阅）', ollama: 'Ollama（本机）',
    lmstudio: 'LM Studio（本机）', custom: '其它（OpenAI 兼容）',
  },
}
export const provName = (id, fallback) => (getLang() === 'zh' ? PROV.zh[id] ?? fallback ?? id : fallback ?? id)

// 与 util.js 的 titleCase 保持一致（不 import 以免和 util 形成环）
function titleCase(s) {
  return (s || '').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())
}
