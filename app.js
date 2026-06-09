const STORAGE_KEY = "jumeng_infinite_canvas_mvp";
const TEXT_PROMPT_PLACEHOLDER = "写下你想讲的故事，例如：一个来自未来的人在屋顶看星星..";
const IMAGE_PROMPT_PLACEHOLDER = "描述你想生成的图片..";
const IMAGE_TO_TEXT_PROMPT = "根据图片生成结构化中文提示词，包括主题描述、环境、光影、镜头语言、风格。";
const PANORAMA_PROMPT_TAG = "@720全景";
const TEXT_MODELS = ["GVLM 3.1", "GVLM 3.0", "DeepStory 1.8"];
const IMAGE_MODELS = ["GPT Image 2", "GPT Image 1", "Dream Render"];
const IMAGE_RATIOS = ["9:16", "16:9", "3:4", "4:3", "1:1"];
const IMAGE_RESOLUTIONS = ["720P", "480P", "1080P", "2K", "4K"];
const IMAGE_COUNTS = ["1", "2", "3", "4"];
const EXPAND_MODELS = ["seedance4.0", "seedance3.0", "GPT Image 2"];
const EXPAND_SCALES = ["1.5X", "2X", "3X"];
const EXPAND_RATIOS = ["原比例", "9:16", "16:9", "1:1", "3:4", "4:3"];
const CROP_RATIOS = ["原图比例", "1:1", "3:4", "4:3", "9:16", "16:9"];
const RESIZE_LIMITS = {
  text: { minW: 260, minH: 220, maxW: 760, maxH: 620 },
  image: { minW: 240, minH: 240, maxW: 720, maxH: 720 },
};

const icon = {
  home: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h7l2 3h9v9H3z"/></svg>`,
  box: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/></svg>`,
  lab: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/></svg>`,
  prompt: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2z"/></svg>`,
  infinity: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6.5 8.8C3.8 8.8 2 10.5 2 12s1.8 3.2 4.5 3.2c4.2 0 6.8-6.4 11-6.4 2.7 0 4.5 1.7 4.5 3.2s-1.8 3.2-4.5 3.2c-4.2 0-6.8-6.4-11-6.4z"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M20 16v4H4v-4"/></svg>`,
  import: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h8l2 3h8v11H3z"/><path d="M12 12H5"/><path d="m8 9-3 3 3 3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  image: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1.5"/><path d="m21 16-5-5L5 19"/></svg>`,
  text: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14"/><path d="M12 5v14"/><path d="M8 19h8"/></svg>`,
  layer: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  brush: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c2.2-5.1 4.9-5.2 6.8-1.2 1.8 3.8 4.4 3.6 6.2-1.1"/><path d="M15.8 11.3 20.5 6.6a1.9 1.9 0 0 0-2.7-2.7l-4.7 4.7"/><path d="m12.9 8.9 2.6 2.6"/><path d="M11.8 10.1c-.9.9-1.3 2.1-1.1 3.3 1.2.2 2.4-.2 3.3-1.1"/></svg>`,
};

const assetImages = [
  ["person", "程秀（定制）", "#d9d9dd", "#3b3840"],
  ["person", "Svetlana", "#ead5dd", "#9d6b82"],
  ["person", "唐月宁", "#f5efe6", "#92836f"],
  ["person", "谢灼华", "#421a22", "#d4aaa5"],
  ["person", "阿萨德", "#25212d", "#b28a62"],
  ["person", "卡米拉", "#211917", "#bb9a68"],
  ["person", "许彦", "#d8dbe0", "#66748a"],
  ["person", "周承", "#1d2529", "#88948f"],
  ["person", "女主 林晚", "#233048", "#8258d8"],
  ["person", "男主 周砚", "#2c3842", "#e06b78"],
  ["person", "少年配角", "#31263d", "#6eb4ff"],
  ["prop", "旧怀表", "#3b2d24", "#d5a44f"],
  ["prop", "信件", "#36322a", "#d8d0b8"],
  ["prop", "银色钥匙", "#242a33", "#a5b8c8"],
  ["scene", "雨夜街口", "#16232c", "#337bb4"],
  ["scene", "旧宅书房", "#31251f", "#95694d"],
  ["scene", "城市天台", "#1c2532", "#6486d8"],
].map(([category, name, a, b], index) => ({
  id: `asset-${index + 1}`,
  category,
  name,
  src: makeMockImage(name, a, b),
}));

const projects = [
  { id: "p1", name: "测试demo自由模式", date: "2026-06-02", description: "按分类选择资产，多选后导入到画布" },
  { id: "p2", name: "一夜未眠，冤家成了我孩子他爹爹", date: "2026-06-02", description: "按分类选择资产，多选后导入到画布" },
];

let state = loadState();
let drag = null;
let saveTimer = null;
let toastTimer = null;
let globalEventsBound = false;
let textEditSession = null;
let frameRequest = null;

function initialState() {
  return {
    view: "projects",
    title: "未命名项目",
    transform: { x: 760, y: 380, scale: 1 },
    nodes: [],
    edges: [],
    selectedNodeId: null,
    selectedEdgeId: null,
    addMenu: null,
    drawer: null,
    selectedProjectId: "p1",
    selectedAssetCategory: "person",
    assetSearch: "",
    selectedAssets: [],
    history: [],
    historyLog: [{ label: "创建画布", time: timeLabel() }],
    confirm: null,
    previewNodeId: null,
    imageEditMode: null,
    guideStep: null,
    openImageSelect: null,
    openExpandSelect: null,
    toast: "",
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.nodes && saved.edges) {
      return { ...initialState(), ...saved, view: "projects", addMenu: null, drawer: null, guideStep: null };
    }
  } catch (error) {
    console.warn(error);
  }
  return initialState();
}

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    writePersistedState();
  }, 260);
}

function writePersistedState() {
  const { addMenu, drawer, toast, confirm, previewNodeId, imageEditMode, guideStep, openImageSelect, openExpandSelect, ...persisted } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

function captureState() {
  return {
    title: state.title,
    transform: { ...state.transform },
    nodes: clone(state.nodes),
    edges: clone(state.edges),
  };
}

function snapshot(label, captured = captureState()) {
  state.history.push({
    label,
    time: timeLabel(),
    ...captured,
  });
  if (state.history.length > 50) state.history.shift();
  state.historyLog.unshift({ label, time: timeLabel() });
  state.historyLog = state.historyLog.slice(0, 20);
}

function commit(label) {
  snapshot(label);
  persist();
  render();
}

function restoreLast() {
  const last = state.history.pop();
  if (!last) return;
  state.title = last.title;
  state.transform = last.transform;
  state.nodes = last.nodes;
  state.edges = last.edges;
  state.selectedNodeId = null;
  state.selectedEdgeId = null;
  state.historyLog.unshift({ label: `撤销：${last.label}`, time: timeLabel() });
  persist();
  render();
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = state.view === "projects" ? projectPage() : canvasPage();
  bindCommon();
  if (state.view === "projects") bindProjectPage();
  if (state.view === "canvas") bindCanvasPage();
}

function commonTopbar({ canvas = false } = {}) {
  return `
    <header class="topbar">
      <div class="top-left">
        <button class="brand" data-action="${canvas ? "back-projects" : "noop"}" title="返回项目列表">
          <span class="brand-mark"></span><span>剧梦</span>
        </button>
        ${canvas ? `<div class="top-divider"></div><button class="hamburger" data-action="back-projects" title="返回项目页">${icon.menu}</button><div class="canvas-title" data-title-wrap>${escapeHtml(state.title)}</div>` : ""}
      </div>
      <div class="top-right">
        <div class="top-pill">${icon.menu}<span style="color:#fff">任务队列</span><span class="queue-dot"></span>0<span class="queue-dot blue"></span>0</div>
        <button class="top-icon" title="通知">♧<span class="notify-dot"></span></button>
        ${!canvas ? `<button class="top-icon" title="设置">⚙</button>` : `<button class="top-icon" title="帮助">?</button>`}
        <div class="top-pill credit"><span class="diamond">◆</span>19,920</div>
        <div class="avatar">绿</div>
      </div>
    </header>
  `;
}

function projectPage() {
  return `
    <div class="app-shell">
      ${commonTopbar()}
      <main class="projects-layout">
        <aside class="project-sidebar">
          ${navItem(icon.home, "首页")}
          ${navItem(icon.folder, "项目库")}
          ${navItem(icon.infinity, "无限画布<br>beta版", true)}
          ${navItem(icon.box, "资产库")}
          ${navItem(icon.lab, "AI实验室")}
          ${navItem(icon.prompt, "提示词库")}
        </aside>
        <section class="project-main">
          <div class="filters">
            <button class="filter-pill">我创建的(2)⌄</button>
            <button class="filter-pill">类型 <span>选择类型⌄</span></button>
            <div class="search-pill">名称：<span>名称</span></div>
          </div>
          <div class="project-grid">
            <button class="new-project-card" data-action="create-canvas">
              <div class="new-project-hit">
                <div>
                  <div class="new-plus">+</div>
                  <strong>新建画布</strong>
                </div>
              </div>
              <p>创建一个新的无限画布</p>
            </button>
            <article class="project-card">
              <span class="created-badge">我创建的</span>
              <div class="thumb"><div style="width:68px;height:46px;border-radius:6px;background:rgba(255,255,255,.12)"></div></div>
              <div class="project-meta">
                <div class="price-tag">✎ 80</div>
                <h3>测试demo自由模式</h3>
                <p>绿豆 | 创建于2026年06月02日</p>
              </div>
            </article>
            <article class="project-card alt">
              <span class="created-badge">我创建的</span>
              <div class="thumb">
                <div style="text-align:center;color:#888b96">
                  <span class="brand-mark" style="display:block;margin:0 auto 12px"></span>
                  <strong>剧梦</strong>
                </div>
              </div>
              <div class="project-meta">
                <div class="price-tag">✎ 80</div>
                <h3>一夜未眠，冤家成了我孩子他爹爹</h3>
                <p>绿豆 | 创建于2026年06月02日</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  `;
}

function canvasPage() {
  return `
    <div class="app-shell canvas-page">
      ${commonTopbar({ canvas: true })}
      <aside class="canvas-toolbar">
        <button class="tool-btn primary" data-action="open-add-menu" title="添加节点">+</button>
        <button class="tool-btn" data-action="open-import" title="资产库导入">${icon.import}</button>
        <button class="tool-btn" data-action="open-asset-library" title="导入资产">${icon.import}</button>
        <button class="tool-btn bottom" data-action="center-view" title="重置回中心">⌾</button>
      </aside>
      <input class="hidden-file" type="file" accept="image/png,image/jpeg" data-file-input />
      <section class="canvas-viewport" data-canvas>
        <div class="world" data-world style="transform: translate(${state.transform.x}px, ${state.transform.y}px) scale(${state.transform.scale});">
          <svg class="edge-layer" data-edge-layer>
            <defs>
              <marker id="edge-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
                <path d="M2 2 L10 6 L2 10 Z"></path>
              </marker>
            </defs>
            ${edgeMarkup()}
          </svg>
          ${state.nodes.map(nodeMarkup).join("")}
        </div>
        ${state.nodes.length === 0 ? `<div class="empty-hint"><span class="empty-hint-icon">${icon.layer}</span>首个资产添加处，双击画布，进入创作</div>` : ""}
      </section>
      ${state.addMenu ? addMenuMarkup() : ""}
      ${state.drawer === "import" ? importDrawer() : ""}
      ${state.drawer === "asset-library" ? assetLibraryDrawer() : ""}
      ${state.drawer === "history" ? historyDrawer() : ""}
      ${state.confirm ? confirmDialog() : ""}
      ${state.previewNodeId ? previewDialog() : ""}
      ${["inpaint", "annotate", "panorama", "crop"].includes(state.imageEditMode?.type) ? imageEditOverlay() : ""}
      ${state.guideStep !== null ? canvasGuideMarkup() : ""}
      <div class="zoom-control">
        <button data-action="center-view" title="重置">↻</button>
        <div class="divider"></div>
        <button data-action="zoom-out" title="缩小">−</button>
        <span>${Math.round(state.transform.scale * 100)}%</span>
        <button data-action="zoom-in" title="放大">＋</button>
      </div>
      ${state.toast ? `<div class="status-toast">${escapeHtml(state.toast)}</div>` : ""}
    </div>
  `;
}

function navItem(svg, label, active = false) {
  return `<div class="nav-item ${active ? "active" : ""}"><span class="nav-icon">${svg}</span><span>${label}</span></div>`;
}

function nodeMarkup(node) {
  const selected = node.id === state.selectedNodeId ? "selected" : "";
  const connecting = drag?.type === "edge" && drag.from !== node.id ? "connect-target" : "";
  const sizeStyle = `left:${node.x}px;top:${node.y}px;width:${node.w}px;height:${node.h}px;`;
  if (node.type === "text") {
    const hasText = Boolean(node.text);
    return `
      <article class="node text-node ${selected} ${connecting}" data-node-id="${node.id}" style="${sizeStyle}">
        <span class="port in" data-port="in" data-node-id="${node.id}"></span>
        <span class="port out" data-port="out" data-node-id="${node.id}"></span>
        <div class="node-header" data-drag-handle>
          ${icon.menu}<span>${escapeHtml(node.title)}</span><button data-action="copy-text" data-node-id="${node.id}" title="复制文本">${icon.copy}</button>
        </div>
        <div class="node-body">
          ${hasText ? `<textarea data-node-text="${node.id}">${escapeHtml(node.text)}</textarea>` : textEmptyMarkup()}
        </div>
        ${selected ? `<span class="resize-handle" data-resize-handle data-node-id="${node.id}" title="拖动调整大小"></span>` : ""}
        ${selected && !hasText ? textComposer(node) : ""}
      </article>
    `;
  }

  const current = node.versions[node.currentVersion] || null;
  const expanding = state.imageEditMode?.type === "expand" && state.imageEditMode.nodeId === node.id;
  const stacked = current && node.versions.length > 1 && !expanding ? "stacked" : "";
  return `
    <article class="node image-node ${current ? "has-image" : ""} ${stacked} ${expanding ? "expanding" : ""} ${selected} ${connecting}" data-node-id="${node.id}" style="${sizeStyle}">
      <span class="port in" data-port="in" data-node-id="${node.id}"></span>
      <span class="port out" data-port="out" data-node-id="${node.id}"></span>
      ${selected && current && !expanding ? imageToolPanel(node) : ""}
      <div class="node-header" data-drag-handle>${icon.image}<span>${escapeHtml(node.title)}</span></div>
      ${selected && current ? `<div class="image-size-label">${imageDimensions(node)}</div>` : ""}
      <div class="node-body">
        ${current ? imageNodeBody(node, current, expanding) : imageDropMarkup(node.id)}
      </div>
      ${node.taskStatus ? taskStatusMarkup(node) : ""}
      ${selected ? `<span class="resize-handle" data-resize-handle data-node-id="${node.id}" title="拖动调整大小"></span>` : ""}
      ${selected && !expanding ? imageComposer(node) : ""}
      ${expanding ? expandInlinePanel(node) : ""}
    </article>
  `;
}

function imageNodeBody(node, current, expanding) {
  if (!expanding) return `
    ${node.versions.length > 1 ? versionStackLayers(node) : ""}
    <img class="image-preview ${node.asset ? "asset-preview" : ""}" src="${current.src}" alt="${escapeHtml(node.title)}" />
    ${node.versions.length > 1 ? `<button class="stack-badge" data-action="next-version" data-node-id="${node.id}" title="切换下一张">↗ ${(node.currentVersion || 0) + 1}/${node.versions.length}张</button>` : ""}
  `;
  return `
    <div class="node-expand-canvas">
      <img class="image-preview ${node.asset ? "asset-preview" : ""}" src="${current.src}" alt="${escapeHtml(node.title)}" />
    </div>
  `;
}

function versionStackLayers(node) {
  const count = Math.min(node.versions.length - 1, 3);
  const currentIndex = node.currentVersion || 0;
  return `
    <button class="version-stack-layers" data-action="next-version" data-node-id="${node.id}" title="切换下一张">
      ${Array.from({ length: count }).map((_, index) => {
        const offset = count - index;
        const versionIndex = (currentIndex - offset + node.versions.length) % node.versions.length;
        const version = node.versions[versionIndex];
        return `<img src="${version.src}" alt="版本 ${versionIndex + 1}" style="--stack-x:${offset * 15}px;--stack-y:${offset * 16}px;--stack-rotate:${offset * -1.15}deg;--stack-opacity:${0.32 + offset * 0.12}" />`;
      }).join("")}
    </button>
  `;
}

function expandInlinePanel(node) {
  const mode = state.imageEditMode;
  return `
    <div class="node-expand-panel">
      <button class="expand-exit" data-action="close-expand">×<span>退出</span></button>
      ${selectInline("expandModel", EXPAND_MODELS, mode.model || EXPAND_MODELS[0], "模型")}
      ${selectInline("expandScale", EXPAND_SCALES, mode.scale || EXPAND_SCALES[0], "倍数")}
      ${selectInline("expandRatio", EXPAND_RATIOS, mode.ratio || EXPAND_RATIOS[0], "比例")}
      <button class="expand-apply" data-action="apply-expand" data-node-id="${node.id}" title="执行扩图">↑</button>
    </div>
  `;
}

function taskStatusMarkup(node) {
  const map = {
    running: ["任务执行中", "正在生成..."],
    success: ["生成完成", "已输出结果"],
    failed: ["生成失败", "请重新发起任务"],
  };
  const [title, detail] = map[node.taskStatus] || map.running;
  return `<div class="task-state ${node.taskStatus}"><strong>${title}</strong><span>${detail}</span></div>`;
}

function imageToolPanel(node) {
  const tools = [
    ["panorama", "◎", "全景"],
    ["enhance", "HD", "高清"],
    ["expand", "↗", "扩图"],
    ["cutout", "♙", "抠图"],
    ["inpaint", "▧", "局部重绘"],
    ["annotate", "✎", "标记"],
    ["crop", "⌗", "裁剪"],
    ["preview", "◉", "预览"],
    ["download", "↓", "下载"],
  ];
  const inverseScale = 1 / (state.transform.scale || 1);
  return `
    <div class="image-tool-panel" style="--toolbar-scale:${inverseScale}">
      ${tools.map(([tool, mark, label]) => `
        <button class="image-tool" data-action="image-tool" data-tool="${tool}" data-node-id="${node.id}">
          <span>${mark}</span><strong>${label}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function textEmptyMarkup() {
  return `
    <div class="text-node-empty">
      <div style="width:168px">
        <div class="skeleton-line" style="width:100%"></div>
        <div class="skeleton-line" style="width:96%"></div>
        <div class="skeleton-line" style="width:62%"></div>
      </div>
    </div>
    <p class="try-title">尝试:</p>
    <button class="quick-row" data-action="text-self"><span style="color:#4d92ff">${icon.menu}</span>自己撰写内容<span>›</span></button>
    <button class="quick-row" data-action="text-from-image"><span style="color:#22d68b">${icon.image}</span>图片反推提示词<span>›</span></button>
  `;
}

function imageDropMarkup(nodeId) {
  return `
    <button class="image-drop" data-action="node-upload" data-node-id="${nodeId}">
      <div>${icon.upload}<strong>点击上传图片</strong><small>支持 JPG, PNG</small></div>
    </button>
  `;
}

function textComposer(node) {
  const canGenerate = Boolean((node.prompt || "").trim());
  const reference = node.referenceImageNodeId ? state.nodes.find(item => item.id === node.referenceImageNodeId) : null;
  const referenceVersion = reference?.versions?.[reference.currentVersion || 0];
  return `
    <div class="composer compact">
      ${referenceVersion ? `<div class="composer-reference"><img src="${referenceVersion.src}" alt="${escapeHtml(reference.title)}" /><span>${escapeHtml(reference.title)}</span></div>` : ""}
      <textarea data-text-prompt="${node.id}" placeholder="${TEXT_PROMPT_PLACEHOLDER}">${escapeHtml(node.prompt || "")}</textarea>
      <div class="composer-footer">
        <label class="composer-select">✣
          <select data-model-select="${node.id}">
            ${TEXT_MODELS.map(model => `<option value="${model}" ${(node.model || TEXT_MODELS[0]) === model ? "selected" : ""}>${model}</option>`).join("")}
          </select>
        </label>
        <span style="margin-left:auto">⚡ 1</span>
        <button class="send" data-action="request-text-generate" data-node-id="${node.id}" title="文生文" ${canGenerate ? "" : "disabled"}>↑</button>
      </div>
    </div>
  `;
}

function imageComposer(node) {
  ensurePanoramaPrompt(node);
  const canGenerate = Boolean((node.prompt || "").trim());
  const hasImage = Boolean(node.versions?.[node.currentVersion || 0]);
  return `
    <div class="composer image-composer ${hasImage ? "with-image" : ""}">
      <span style="display:block;color:#8b8e98;margin-bottom:14px">${icon.prompt} 提示词</span>
      <textarea data-image-prompt="${node.id}" placeholder="${IMAGE_PROMPT_PLACEHOLDER}">${escapeHtml(node.prompt || "")}</textarea>
      <div class="composer-footer">
        ${selectControl("imageModel", node.id, "✦", IMAGE_MODELS, node.imageModel || IMAGE_MODELS[0])}
        ${selectControl("imageRatio", node.id, "▭", IMAGE_RATIOS, node.imageRatio || IMAGE_RATIOS[0])}
        ${selectControl("imageResolution", node.id, "⌁", IMAGE_RESOLUTIONS, node.imageResolution || IMAGE_RESOLUTIONS[0])}
        ${selectControl("imageCount", node.id, "", IMAGE_COUNTS, String(node.imageCount || "1"), "张")}
        <button class="panorama-chip ${node.imagePanorama720 ? "active" : ""}" data-action="toggle-panorama" data-node-id="${node.id}" title="720°全景">
          <span>720</span><strong>全景</strong>
        </button>
        <span>⚡ ${imageCost(node)}</span>
        <button class="send" data-action="request-image-generate" data-node-id="${node.id}" title="生成或修改图片" ${canGenerate ? "" : "disabled"}>↑</button>
      </div>
    </div>
  `;
}

function ensurePanoramaPrompt(node) {
  if (!node.imagePanorama720 || promptHasTag(node.prompt || "", PANORAMA_PROMPT_TAG)) return;
  node.prompt = syncPromptTag(node.prompt || "", PANORAMA_PROMPT_TAG, true);
}

function selectControl(setting, nodeId, prefix, options, value, suffix = "") {
  return `
    <div class="composer-select custom-select ${state.openImageSelect?.nodeId === nodeId && state.openImageSelect?.setting === setting ? "open" : ""}">
      <button class="select-trigger" data-action="toggle-image-select" data-node-id="${nodeId}" data-setting="${setting}">
        <span>${prefix}</span><strong>${escapeHtml(value)}${suffix}</strong><em>⌄</em>
      </button>
      ${state.openImageSelect?.nodeId === nodeId && state.openImageSelect?.setting === setting ? `
        <div class="select-menu">
          ${options.map(option => `<button class="${String(value) === String(option) ? "active" : ""}" data-action="choose-image-setting" data-node-id="${nodeId}" data-setting="${setting}" data-value="${option}">${option}${suffix}</button>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function edgeMarkup() {
  const savedEdges = state.edges.map(edge => {
    const from = state.nodes.find(n => n.id === edge.from);
    const to = state.nodes.find(n => n.id === edge.to);
    if (!from || !to) return "";
    const d = edgePathBetween(from, to);
    return `
      <path class="edge-path hit" d="${d}" data-edge-id="${edge.id}"></path>
      <path class="edge-path ${edge.id === state.selectedEdgeId ? "selected" : ""}" d="${d}" data-edge-id="${edge.id}" marker-end="url(#edge-arrow)"></path>
    `;
  }).join("");

  if (drag?.type !== "edge" || !drag.current) return savedEdges;
  const from = state.nodes.find(n => n.id === drag.from);
  if (!from) return savedEdges;
  const d = pendingEdgePath(from, drag.current);
  return `${savedEdges}<path class="edge-path pending" d="${d}"></path>`;
}

function edgePathBetween(from, to) {
  return pendingEdgePath(from, { x: to.x, y: to.y + to.h / 2 });
}

function pendingEdgePath(from, point) {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = point.x;
  const y2 = point.y;
  const c = Math.max(80, Math.abs(x2 - x1) * 0.45);
  return `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
}

function addMenuMarkup() {
  return `
    <div class="floating-menu" style="left:${state.addMenu.x}px;top:${state.addMenu.y}px" data-floating-menu>
      <div class="menu-kicker">节点</div>
      <button class="menu-row" data-action="add-text">${icon.text}<span>文本节点</span></button>
      <button class="menu-row" data-action="add-image">${icon.image}<span>图片节点</span></button>
      <div class="menu-separator"></div>
      <div class="menu-kicker">资源</div>
      <button class="menu-row" data-action="upload-resource">${icon.upload}<span>上传资源</span></button>
    </div>
  `;
}

function importDrawer() {
  const filtered = projects.filter(p => p.name.includes(state.assetSearch));
  const currentProject = projects.find(p => p.id === state.selectedProjectId) || projects[0];
  const selectedCount = state.selectedAssets.length;
  return `
    <div class="asset-import-mask">
      <aside class="asset-import-modal">
        <div class="asset-import-header">资产库导入<button class="drawer-close" data-action="close-drawer">${icon.close}</button></div>
        <div class="asset-import-content">
          <section class="asset-project-pane">
            <input class="drawer-search" data-asset-search placeholder="搜索项目名称" value="${escapeHtml(state.assetSearch)}" />
            <div class="asset-project-list">
              ${filtered.map(p => `<button class="project-choice ${p.id === state.selectedProjectId ? "active" : ""}" data-action="select-project" data-project-id="${p.id}">${escapeHtml(p.name)}</button>`).join("")}
            </div>
          </section>
          <section class="asset-detail-pane">
            <div class="asset-detail-head">
              <h2>${escapeHtml(currentProject.name)}</h2>
              <p>${escapeHtml(currentProject.description)}</p>
            </div>
            <div class="asset-tabs">
              ${assetTab("person", "人物")}
              ${assetTab("scene", "场景")}
              ${assetTab("prop", "道具")}
            </div>
            ${assetSection(state.selectedAssetCategory, categoryLabel(state.selectedAssetCategory))}
          </section>
        </div>
        <div class="asset-import-footer">
          <span style="color:#8c8f99">已选 ${selectedCount} 个资产</span>
          <div>
            <button class="secondary-action" data-action="close-drawer">取消</button>
            <button class="primary-action" data-action="import-assets">导入到画布</button>
          </div>
        </div>
      </aside>
    </div>
  `;
}

function assetLibraryDrawer() {
  const keyword = state.assetSearch.trim();
  const assets = assetImages.filter(asset => asset.category === "person" && (!keyword || asset.name.includes(keyword)));
  const selected = assetImages.filter(asset => state.selectedAssets.includes(asset.id));
  const preview = selected[0] || null;
  return `
    <div class="asset-import-mask">
      <aside class="asset-library-modal">
        <button class="asset-library-close" data-action="close-drawer" title="关闭">${icon.close}</button>
        <header class="asset-library-head">
          <h2>选择角色</h2>
        </header>
        <div class="asset-library-content">
          <section class="asset-library-main">
            <div class="library-tabs">
              <button class="library-tab active">公共资产</button>
              <button class="library-tab">团队资产</button>
              <button class="library-tab">个人资产</button>
              <button class="library-tab">我的收藏</button>
            </div>
            <div class="library-filter-row">
              <button>选择地区 <span>⌄</span></button>
              <button>选择性别 <span>⌄</span></button>
              <button>选择年龄阶段 <span>⌄</span></button>
              <button>选择风格 <span>⌄</span></button>
              <label>开始日期 <span>→</span> 结束日期 <em>□</em></label>
            </div>
            <div class="library-card-grid">
              ${assets.map((asset, index) => assetLibraryCard(asset, index)).join("")}
            </div>
          </section>
          <aside class="asset-library-side">
            <input class="library-search" data-asset-search placeholder="支持名称、描述、prompt搜索" value="${escapeHtml(state.assetSearch)}" />
            <button class="library-sort">默认 <span>⌄</span></button>
            <div class="library-side-preview">
              <strong>选择角色的形象图片</strong>
              ${preview ? `
                <div class="library-preview-card">
                  <img src="${preview.src}" alt="${escapeHtml(preview.name)}" />
                  <span>${escapeHtml(preview.name)}</span>
                </div>
              ` : `
                <div class="library-empty-state">${icon.box}<span>暂无角色形象图片</span></div>
              `}
            </div>
          </aside>
        </div>
        <footer class="asset-library-footer">
          <button class="asset-library-action" data-action="import-assets" ${selected.length ? "" : "disabled"}>替换当前图片</button>
          <button class="asset-library-action" data-action="import-assets" ${selected.length ? "" : "disabled"}>导入为新形象</button>
        </footer>
      </aside>
    </div>
  `;
}

function assetLibraryCard(asset, index) {
  const tags = [["少年感", "秀气"], ["甜心", "都市千金"], ["世家贵女", "端庄贵气"], ["江南藩主", "海棠系御姐"]];
  const tagSet = tags[index % tags.length];
  return `
    <button class="asset-library-card ${state.selectedAssets.includes(asset.id) ? "selected" : ""}" data-action="toggle-asset" data-asset-id="${asset.id}">
      <img src="${asset.src}" alt="${escapeHtml(asset.name)}" />
      <span class="library-card-fade"></span>
      <span class="library-card-count">${index % 2 === 0 ? "3" : "2"} 个形象</span>
      <span class="library-card-like">♡ ${index % 3}</span>
      <span class="library-card-meta">
        <strong>${escapeHtml(asset.name)}</strong>
        <em>${tagSet.map(tag => `<i>${escapeHtml(tag)}</i>`).join("")}</em>
      </span>
    </button>
  `;
}

function assetTab(category, label) {
  return `<button class="asset-tab ${state.selectedAssetCategory === category ? "active" : ""}" data-action="select-asset-category" data-category="${category}">${label}</button>`;
}

function assetSection(category, label) {
  const assets = assetImages.filter(a => a.category === category);
  const allSelected = assets.every(a => state.selectedAssets.includes(a.id));
  return `
    <section class="asset-section">
      <div class="asset-section-head">
        <span>${label}</span>
        <div>
          <button class="asset-mini-action" data-action="toggle-category" data-category="${category}" data-checked="${allSelected ? "false" : "true"}">${allSelected ? "取消全选" : "全选"}</button>
          <button class="asset-mini-action" data-action="clear-assets">清空</button>
        </div>
      </div>
      <div class="asset-grid">
        ${assets.map(asset => `
          <label class="asset-card ${state.selectedAssets.includes(asset.id) ? "selected" : ""}">
            <input type="checkbox" data-action="toggle-asset" data-asset-id="${asset.id}" ${state.selectedAssets.includes(asset.id) ? "checked" : ""} />
            <img src="${asset.src}" alt="${escapeHtml(asset.name)}" />
            <p>${escapeHtml(asset.name)}</p>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function categoryLabel(category) {
  return ({ person: "人物", scene: "场景", prop: "道具" })[category] || "人物";
}

function historyDrawer() {
  return `
    <aside class="drawer">
      <div class="drawer-header">历史记录<button class="drawer-close" data-action="close-drawer">${icon.close}</button></div>
      <div class="drawer-body">
        ${state.historyLog.length ? state.historyLog.map(item => `<div class="history-row"><strong>${escapeHtml(item.label)}</strong><span>${item.time}</span></div>`).join("") : `<p style="color:#898c96">暂无历史记录</p>`}
      </div>
      <div class="drawer-footer">
        <span style="color:#8c8f99">支持 Ctrl+Z 撤销</span>
        <button class="secondary-action" data-action="undo">撤销</button>
      </div>
    </aside>
  `;
}

function canvasGuideMarkup() {
  const steps = [
    {
      title: "画布功能引导介绍",
      body: "这里是自由创作画布，可以拖动画面、缩放视图，把文本、图片和生成结果用连线组织成故事流程。",
      accent: "无限画布",
      className: "canvas",
    },
    {
      title: "添加节点",
      body: "点击左侧加号，或双击画布空白处，可以添加文本节点和图片节点，开始写提示词、生成内容或连接上下游。",
      accent: "添加",
      className: "add",
    },
    {
      title: "上传项目",
      body: "点击左侧资产库导入按钮，从项目资产里选择人物、场景和道具，一次导入到当前画布继续创作。",
      accent: "导入",
      className: "upload",
    },
  ];
  const stepIndex = clamp(Number(state.guideStep || 0), 0, steps.length - 1);
  const step = steps[stepIndex];
  return `
    <div class="guide-layer guide-${step.className}">
      <div class="guide-scrim"></div>
      <div class="guide-spotlight" aria-hidden="true"></div>
      <section class="guide-card">
        <div class="guide-kicker"><span>${stepIndex + 1}</span><em>/ ${steps.length}</em>${escapeHtml(step.accent)}</div>
        <h2>${escapeHtml(step.title)}</h2>
        <p>${escapeHtml(step.body)}</p>
        <div class="guide-dots">
          ${steps.map((_, index) => `<span class="${index === stepIndex ? "active" : ""}"></span>`).join("")}
        </div>
        <div class="guide-actions">
          <button class="secondary-action" data-action="skip-guide">${stepIndex === steps.length - 1 ? "关闭" : "跳过"}</button>
          <div>
            ${stepIndex > 0 ? `<button class="secondary-action" data-action="prev-guide">上一步</button>` : ""}
            <button class="primary-action" data-action="next-guide">${stepIndex === steps.length - 1 ? "完成" : "下一步"}</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function confirmDialog() {
  const node = state.nodes.find(item => item.id === state.confirm.nodeId);
  if (!node) return "";
  const isImage = state.confirm.type === "image";
  return `
    <div class="confirm-mask">
      <section class="confirm-card">
        <div class="confirm-title">积分消耗详情</div>
        <p>模型：${escapeHtml(isImage ? (node.imageModel || IMAGE_MODELS[0]) : (node.model || TEXT_MODELS[0]))}</p>
        ${isImage ? `<p>比例：${escapeHtml(node.imageRatio || IMAGE_RATIOS[0])} / 清晰度：${escapeHtml(node.imageResolution || IMAGE_RESOLUTIONS[0])}</p><p>张数：${escapeHtml(node.imageCount || "1")} 张${node.imagePanorama720 ? " / 720全景图" : ""}</p>` : ""}
        <p>任务：${isImage ? (node.versions?.length ? "图片修改" : "文生图") : "文本生成"}</p>
        <p>预计消耗：<strong>${isImage ? imageCost(node) : 1} 积分</strong></p>
        <div class="confirm-actions">
          <button class="secondary-action" data-action="cancel-generate">取消</button>
          <button class="primary-action" data-action="${isImage ? "confirm-image-generate" : "confirm-text-generate"}" data-node-id="${node.id}">确认生成</button>
        </div>
      </section>
    </div>
  `;
}

function previewDialog() {
  const node = state.nodes.find(item => item.id === state.previewNodeId);
  const current = node?.versions?.[node.currentVersion || 0];
  if (!node || !current) return "";
  return `
    <div class="confirm-mask preview-mask" data-action="close-preview">
      <section class="preview-card">
        <button class="drawer-close preview-close" data-action="close-preview">${icon.close}</button>
        <img src="${current.src}" alt="${escapeHtml(node.title)}" />
      </section>
    </div>
  `;
}

function imageEditOverlay() {
  const mode = state.imageEditMode;
  const node = state.nodes.find(item => item.id === mode.nodeId);
  const current = node?.versions?.[node.currentVersion || 0];
  if (!node || !current) return "";
  if (mode.type === "panorama") return panoramaOverlay(node, current, mode);
  if (mode.type === "crop") return cropOverlay(node, current, mode);
  return inpaintOverlay(node, current, mode);
}

function cropOverlay(node, current, mode) {
  return `
    <div class="image-edit-mask crop-mask">
      <section class="crop-workspace">
        <div class="crop-toolbar">
          <button class="crop-exit" data-action="close-image-edit" title="退出">×</button>
          <div class="crop-divider"></div>
          ${selectInline("cropRatio", CROP_RATIOS, mode.ratio || CROP_RATIOS[0], "")}
          <button class="crop-confirm" data-action="apply-crop" data-node-id="${node.id}">确认</button>
        </div>
        <div class="crop-stage">
          <div class="crop-title">${icon.image}<span>${escapeHtml(node.title)}</span><em>${imageDimensions(node)}</em></div>
          <div class="crop-frame">
            <img src="${current.src}" alt="${escapeHtml(node.title)}" />
            <div class="crop-box">
              <span class="crop-grid v1"></span>
              <span class="crop-grid v2"></span>
              <span class="crop-grid h1"></span>
              <span class="crop-grid h2"></span>
              <i class="crop-handle tl"></i><i class="crop-handle tr"></i><i class="crop-handle bl"></i><i class="crop-handle br"></i>
              <i class="crop-handle tm"></i><i class="crop-handle bm"></i><i class="crop-handle lm"></i><i class="crop-handle rm"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function panoramaOverlay(node, current) {
  return `
    <div class="image-edit-mask panorama-mask">
      <section class="panorama-workspace">
        <nav class="panorama-nav">
          <button data-action="close-image-edit"><span>↪</span><strong>退出</strong></button>
          <button data-action="panorama-capture" data-node-id="${node.id}" data-count="1"><span>▣</span><strong>截图</strong></button>
          <button data-action="panorama-capture" data-node-id="${node.id}" data-count="4"><span>▦</span><strong>4视角截图</strong></button>
          <button data-action="panorama-capture" data-node-id="${node.id}" data-count="9"><span>▩</span><strong>9视角截图</strong></button>
        </nav>
        <div class="panorama-content">
          <section class="panorama-main">
            <div class="panorama-title">${icon.image}<span>Image</span></div>
            <div class="panorama-image-frame">
              <img src="${current.src}" alt="${escapeHtml(node.title)}" />
            </div>
          </section>
        </div>
      </section>
    </div>
  `;
}

function annotateOverlay(node, current, mode) {
  return `
    <div class="image-edit-mask annotate-mask">
      <section class="annotate-stage">
        <div class="annotate-toolbar">
          <button class="annotate-exit" data-action="close-image-edit">↪<span>标注</span></button>
          <span class="toolbar-divider"></span>
          <button class="${mode.tool === "brush" ? "active" : ""}" data-action="set-inpaint-tool" data-tool="brush" title="画笔">${icon.brush}</button>
          <button class="${mode.tool === "eraser" ? "active" : ""}" data-action="set-inpaint-tool" data-tool="eraser" title="橡皮擦">⌫</button>
          <span class="toolbar-divider"></span>
          <span class="annotate-color"></span>
          <label class="brush-size-control" title="画笔大小">〽
            <input type="range" min="18" max="96" step="2" value="${mode.size || 42}" data-brush-size />
          </label>
          <span class="toolbar-divider"></span>
          <button data-action="undo-mask" title="撤销">↶</button>
          <button data-action="redo-mask" title="前进">↷</button>
          <button class="annotate-save" data-action="apply-annotate" data-node-id="${node.id}">保存</button>
        </div>
        <div class="annotate-image-wrap ${mode.tool === "eraser" ? "eraser-mode" : ""}" data-mask-canvas data-node-id="${node.id}">
          <img src="${current.src}" alt="${escapeHtml(node.title)}" />
          ${(mode.marks || []).map(mark => `<span class="mask-mark annotate-mark" style="left:${mark.x}%;top:${mark.y}%;width:${mark.size}px;height:${mark.size}px"></span>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function inpaintOverlay(node, current, mode) {
  const confirmAction = mode.type === "annotate" ? "apply-annotate" : "apply-inpaint";
  return `
    <div class="image-edit-mask light">
      <section class="inpaint-stage">
        <div class="inpaint-title">${icon.image}<span>图片</span></div>
        <div class="inpaint-image-wrap ${mode.tool === "eraser" ? "eraser-mode" : ""}" data-mask-canvas data-node-id="${node.id}">
          <img src="${current.src}" alt="${escapeHtml(node.title)}" />
          <div class="inpaint-border"></div>
          ${(mode.marks || []).map(mark => `<span class="mask-mark" style="left:${mark.x}%;top:${mark.y}%;width:${mark.size}px;height:${mark.size}px"></span>`).join("")}
        </div>
        <div class="inpaint-toolbar">
          <button data-action="close-image-edit" title="退出">×</button>
          <button class="${mode.tool === "brush" ? "active" : ""}" data-action="set-inpaint-tool" data-tool="brush" title="画笔">${icon.brush}</button>
          <button class="${mode.tool === "eraser" ? "active" : ""}" data-action="set-inpaint-tool" data-tool="eraser" title="橡皮擦">◌</button>
          <button data-action="undo-mask" title="上一步">↶</button>
          <button data-action="redo-mask" title="下一步">↷</button>
          <button class="inpaint-confirm" data-action="${confirmAction}" data-node-id="${node.id}" title="确认">确认</button>
        </div>
      </section>
    </div>
  `;
}

function selectInline(setting, options, value, label = "") {
  return `
    <div class="expand-select ${state.openExpandSelect === setting ? "open" : ""}">
      <button data-action="toggle-expand-select" data-setting="${setting}">${label ? `<small>${label}</small>` : ""}${value} <span>⌄</span></button>
      ${state.openExpandSelect === setting ? `
        <div class="expand-select-menu">
          ${options.map(option => `<button class="${option === value ? "active" : ""}" data-action="choose-expand-setting" data-setting="${setting}" data-value="${option}">${option}</button>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function bindCommon() {
  document.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", handleAction);
  });
}

function bindProjectPage() {
  document.querySelector('[data-action="create-canvas"]').addEventListener("click", () => {
    state.view = "canvas";
    state.title = state.title || "未命名项目";
    state.guideStep = 0;
    snapshot("进入画布");
    persist();
    render();
  });
}

function bindCanvasPage() {
  const canvas = document.querySelector("[data-canvas]");
  canvas.addEventListener("pointerdown", onCanvasPointerDown);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("dblclick", onCanvasDoubleClick);
  canvas.addEventListener("contextmenu", onCanvasContext);

  document.querySelectorAll("[data-node-id]").forEach(el => {
    if (el.classList.contains("node")) el.addEventListener("pointerdown", onNodePointerDown);
  });
  document.querySelectorAll("[data-node-text]").forEach(el => {
    el.addEventListener("focus", onNodeTextFocus);
    el.addEventListener("input", onNodeTextInput);
    el.addEventListener("blur", onNodeTextBlur);
  });
  document.querySelectorAll("[data-text-prompt]").forEach(el => el.addEventListener("input", onPromptInput));
  document.querySelectorAll("[data-image-prompt]").forEach(el => el.addEventListener("input", onPromptInput));
  document.querySelectorAll("[data-model-select]").forEach(el => el.addEventListener("change", onModelChange));
  document.querySelectorAll("[data-image-setting]").forEach(el => el.addEventListener("change", onImageSettingChange));
  document.querySelectorAll("[data-edit-setting]").forEach(el => el.addEventListener("change", onEditSettingChange));
  document.querySelectorAll("[data-brush-size]").forEach(el => el.addEventListener("input", onBrushSizeInput));
  document.querySelectorAll("[data-mask-canvas]").forEach(el => el.addEventListener("pointerdown", onMaskPointerDown));
  document.querySelectorAll("[data-port='out']").forEach(el => el.addEventListener("pointerdown", onPortStart));
  document.querySelectorAll("[data-port='in']").forEach(el => el.addEventListener("pointerup", onPortEnd));
  document.querySelectorAll("[data-edge-id]").forEach(el => el.addEventListener("click", onEdgeClick));

  const titleWrap = document.querySelector("[data-title-wrap]");
  if (titleWrap) titleWrap.addEventListener("click", editTitle);

  const fileInput = document.querySelector("[data-file-input]");
  fileInput.addEventListener("change", onFilePicked);

  const search = document.querySelector("[data-asset-search]");
  if (search) search.addEventListener("input", event => {
    state.assetSearch = event.target.value;
    render();
  });

  if (!globalEventsBound) {
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("pointerdown", onDocumentPointerDown, true);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    globalEventsBound = true;
  }
}

function onDocumentPointerDown(event) {
  if (!state.addMenu) return;
  if (event.target.closest(".floating-menu")) return;
  if (event.target.closest("[data-canvas]")) return;
  state.addMenu = null;
  render();
}

function handleAction(event) {
  const el = event.currentTarget;
  const action = el.dataset.action;
  if (action === "noop") return;
  if (action === "back-projects") {
    state.view = "projects";
    state.addMenu = null;
    state.drawer = null;
    state.guideStep = null;
    render();
  }
  if (action === "next-guide") {
    advanceGuide();
    return;
  }
  if (action === "prev-guide") {
    state.guideStep = Math.max(0, Number(state.guideStep || 0) - 1);
    render();
    return;
  }
  if (action === "skip-guide") {
    closeGuide();
    return;
  }
  if (action === "open-add-menu") openAddMenu(66, 70, screenToWorldCenter());
  if (action === "add-text") addNode("text", state.addMenu.world);
  if (action === "add-image") addNode("image", state.addMenu.world);
  if (action === "upload-resource") document.querySelector("[data-file-input]")?.click();
  if (action === "open-import") {
    state.drawer = state.drawer === "import" ? null : "import";
    state.addMenu = null;
    render();
  }
  if (action === "open-asset-library") {
    state.drawer = state.drawer === "asset-library" ? null : "asset-library";
    state.addMenu = null;
    state.selectedAssetCategory = "person";
    render();
  }
  if (action === "open-history") {
    state.drawer = state.drawer === "history" ? null : "history";
    state.addMenu = null;
    render();
  }
  if (action === "close-drawer") {
    state.drawer = null;
    render();
  }
  if (action === "center-view") centerView();
  if (action === "zoom-in") setZoom(state.transform.scale + 0.1);
  if (action === "zoom-out") setZoom(state.transform.scale - 0.1);
  if (action === "copy-text") copyNodeText(el.dataset.nodeId);
  if (action === "text-self") focusSelectedText();
  if (action === "text-from-image") createImageToTextRoute();
  if (action === "request-text-generate") requestTextGeneration(el.dataset.nodeId);
  if (action === "request-image-generate") requestImageGeneration(el.dataset.nodeId);
  if (action === "cancel-generate") {
    state.confirm = null;
    render();
  }
  if (action === "confirm-text-generate") mockText(el.dataset.nodeId);
  if (action === "confirm-image-generate") mockImage(el.dataset.nodeId);
  if (action === "mock-image") mockImage(el.dataset.nodeId);
  if (action === "toggle-image-select") {
    toggleImageSelect(el.dataset.nodeId, el.dataset.setting);
    return;
  }
  if (action === "choose-image-setting") {
    chooseImageSetting(el.dataset.nodeId, el.dataset.setting, el.dataset.value);
    return;
  }
  if (action === "toggle-panorama") {
    toggleImagePanorama(el.dataset.nodeId);
    return;
  }
  if (action === "image-tool") imageToolAction(el.dataset.nodeId, el.dataset.tool);
  if (action === "close-preview") {
    if (event.target.closest(".preview-card") && !event.target.closest(".preview-close")) return;
    state.previewNodeId = null;
    render();
  }
  if (action === "close-image-edit") {
    state.imageEditMode = null;
    render();
  }
  if (action === "panorama-capture") {
    createPanoramaCaptures(el.dataset.nodeId, Number(el.dataset.count || 1));
    return;
  }
  if (action === "close-expand") closeExpandMode(true);
  if (action === "toggle-expand-select") {
    state.openExpandSelect = state.openExpandSelect === el.dataset.setting ? null : el.dataset.setting;
    render();
  }
  if (action === "choose-expand-setting") {
    chooseExpandSetting(el.dataset.setting, el.dataset.value);
  }
  if (action === "apply-expand") applyExpand(el.dataset.nodeId);
  if (action === "apply-crop") applyCrop(el.dataset.nodeId);
  if (action === "set-inpaint-tool") {
    state.imageEditMode.tool = el.dataset.tool;
    render();
  }
  if (action === "paint-mask") paintMask(event, el);
  if (action === "undo-mask") undoMask();
  if (action === "redo-mask") redoMask();
  if (action === "apply-inpaint") applyInpaint(el.dataset.nodeId);
  if (action === "apply-annotate") applyAnnotate(el.dataset.nodeId);
  if (action === "node-upload") {
    state.pendingUploadNodeId = el.dataset.nodeId;
    document.querySelector("[data-file-input]")?.click();
  }
  if (action === "next-version") nextVersion(el.dataset.nodeId);
  if (action === "switch-version") switchVersion(el.dataset.nodeId, Number(el.dataset.version));
  if (action === "select-project") {
    state.selectedProjectId = el.dataset.projectId;
    render();
  }
  if (action === "select-asset-category") {
    state.selectedAssetCategory = el.dataset.category;
    render();
  }
  if (action === "toggle-asset") toggleAsset(el.dataset.assetId);
  if (action === "toggle-category") toggleCategory(el.dataset.category, el.dataset.checked === "true");
  if (action === "clear-assets") {
    clearCurrentCategoryAssets();
    render();
  }
  if (action === "import-assets") importAssets();
  if (action === "undo") restoreLast();
}

function advanceGuide() {
  const current = Number(state.guideStep || 0);
  if (current >= 2) {
    closeGuide();
    return;
  }
  state.guideStep = current + 1;
  render();
}

function closeGuide() {
  state.guideStep = null;
  persist();
  render();
}

function openAddMenu(x, y, world) {
  state.addMenu = { x, y, world };
  state.drawer = null;
  render();
}

function addNode(type, point) {
  const id = `${type}-${Date.now()}`;
  snapshot(type === "text" ? "添加文本节点" : "添加图片节点");
  state.nodes.push(type === "text" ? {
    id,
    type,
    x: point.x - 170,
    y: point.y - 160,
    w: 340,
    h: 320,
    title: `文本节点 ${Math.floor(Math.random() * 9000 + 1000)}`,
    text: "",
    prompt: "",
  } : {
    id,
    type,
    x: point.x - 170,
    y: point.y - 140,
    w: 340,
    h: 280,
    title: "图片节点",
    prompt: "",
    versions: [],
    currentVersion: 0,
  });
  state.selectedNodeId = id;
  state.selectedEdgeId = null;
  state.addMenu = null;
  persist();
  render();
}

function onCanvasPointerDown(event) {
  if (event.button !== 0) return;
  if (event.target.closest(".node, .floating-menu, .drawer, .zoom-control")) return;
  const hadAddMenu = Boolean(state.addMenu);
  state.openImageSelect = null;
  state.addMenu = null;
  state.selectedNodeId = null;
  state.selectedEdgeId = null;
  if (hadAddMenu) {
    render();
    return;
  }
  drag = { type: "pan", startX: event.clientX, startY: event.clientY, origin: { ...state.transform } };
  event.currentTarget.classList.add("panning");
  render();
}

function onNodePointerDown(event) {
  const resizeHandle = event.target.closest("[data-resize-handle]");
  if (resizeHandle) {
    const node = state.nodes.find(n => n.id === resizeHandle.dataset.nodeId);
    if (!node) return;
    state.selectedNodeId = node.id;
    state.selectedEdgeId = null;
    drag = {
      type: "resize",
      nodeId: node.id,
      startX: event.clientX,
      startY: event.clientY,
      originW: node.w,
      originH: node.h,
      before: captureState(),
      moved: false,
    };
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (event.target.closest("textarea, button, input, .port")) return;
  const nodeId = event.currentTarget.dataset.nodeId;
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  state.selectedNodeId = nodeId;
  state.selectedEdgeId = null;
  state.addMenu = null;
  drag = {
    type: "node",
    nodeId,
    startX: event.clientX,
    startY: event.clientY,
    originX: node.x,
    originY: node.y,
    before: captureState(),
    moved: false,
  };
  event.stopPropagation();
  render();
}

function onPointerMove(event) {
  if (!drag) return;
  if (drag.type === "mask") {
    const el = document.querySelector("[data-mask-canvas]");
    if (el) addMaskMarkFromEvent(event, el);
    return;
  }
  if (drag.type === "pan") {
    state.transform.x = drag.origin.x + event.clientX - drag.startX;
    state.transform.y = drag.origin.y + event.clientY - drag.startY;
    updateWorldTransform();
  }
  if (drag.type === "node") {
    const node = state.nodes.find(n => n.id === drag.nodeId);
    if (!node) return;
    const dx = (event.clientX - drag.startX) / state.transform.scale;
    const dy = (event.clientY - drag.startY) / state.transform.scale;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
    node.x = drag.originX + dx;
    node.y = drag.originY + dy;
    scheduleDragFrame();
  }
  if (drag.type === "resize") {
    const node = state.nodes.find(n => n.id === drag.nodeId);
    if (!node) return;
    const limits = RESIZE_LIMITS[node.type];
    const dx = (event.clientX - drag.startX) / state.transform.scale;
    const dy = (event.clientY - drag.startY) / state.transform.scale;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
    node.w = clamp(drag.originW + dx, limits.minW, limits.maxW);
    node.h = clamp(drag.originH + dy, limits.minH, limits.maxH);
    scheduleDragFrame();
  }
  if (drag.type === "edge") {
    drag.current = screenToWorld(event.clientX, event.clientY);
    scheduleDragFrame();
  }
}

function onPointerUp(event) {
  if (!drag) return;
  if (frameRequest) {
    cancelAnimationFrame(frameRequest);
    frameRequest = null;
    flushDragFrame();
  }
  if (drag.type === "mask") {
    drag = null;
    render();
    return;
  }
  if (drag.type === "node" && drag.moved) {
    snapshot("移动节点", drag.before);
    persist();
    render();
  }
  if (drag.type === "resize" && drag.moved) {
    snapshot("调整节点大小", drag.before);
    persist();
    render();
  }
  if (drag.type === "pan") {
    document.querySelector("[data-canvas]")?.classList.remove("panning");
    persist();
  }
  if (drag.type === "edge") {
    const port = getInputPortAt(event.clientX, event.clientY);
    if (port) connectNodes(drag.from, port.dataset.nodeId);
    else {
      removePendingEdge();
      drag = null;
      render();
    }
  }
  drag = null;
}

function onWheel(event) {
  event.preventDefault();
  const oldScale = state.transform.scale;
  const next = clamp(oldScale + (event.deltaY > 0 ? -0.08 : 0.08), 0.3, 2);
  const rect = event.currentTarget.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;
  const wx = (px - state.transform.x) / oldScale;
  const wy = (py - state.transform.y) / oldScale;
  state.transform.scale = next;
  state.transform.x = px - wx * next;
  state.transform.y = py - wy * next;
  updateWorldTransform();
  persist();
}

function onCanvasDoubleClick(event) {
  if (event.target.closest(".node, .floating-menu, .drawer")) return;
  const world = screenToWorld(event.clientX, event.clientY);
  openAddMenu(event.clientX, event.clientY, world);
}

function onCanvasContext(event) {
  event.preventDefault();
  if (event.target.closest(".node, .drawer")) return;
  const world = screenToWorld(event.clientX, event.clientY);
  openAddMenu(event.clientX, event.clientY, world);
}

function onPortStart(event) {
  event.preventDefault();
  const nodeId = event.currentTarget.dataset.nodeId;
  state.selectedNodeId = nodeId;
  state.selectedEdgeId = null;
  drag = {
    type: "edge",
    from: nodeId,
    current: screenToWorld(event.clientX, event.clientY),
    before: captureState(),
  };
  event.stopPropagation();
  render();
}

function onPortEnd(event) {
  if (!drag || drag.type !== "edge") return;
  connectNodes(drag.from, event.currentTarget.dataset.nodeId);
  drag = null;
}

function connectNodes(from, to) {
  const before = drag?.before || captureState();
  drag = null;
  if (to && to !== from && !state.edges.some(e => e.from === from && e.to === to)) {
    snapshot("创建连线", before);
    state.edges.push({ id: `edge-${Date.now()}`, from, to });
    state.selectedEdgeId = state.edges[state.edges.length - 1].id;
    state.selectedNodeId = to;
    persist();
    render();
  } else {
    render();
  }
}

function onEdgeClick(event) {
  state.selectedEdgeId = event.currentTarget.dataset.edgeId;
  state.selectedNodeId = null;
  render();
}

function onNodeTextInput(event) {
  const node = state.nodes.find(n => n.id === event.target.dataset.nodeText);
  if (!node) return;
  node.text = event.target.value;
  persist();
}

function onNodeTextFocus(event) {
  const node = state.nodes.find(n => n.id === event.target.dataset.nodeText);
  if (!node) return;
  textEditSession = {
    nodeId: node.id,
    original: node.text,
    before: captureState(),
  };
}

function onNodeTextBlur(event) {
  const node = state.nodes.find(n => n.id === event.target.dataset.nodeText);
  if (!node || !textEditSession || textEditSession.nodeId !== node.id) return;
  if (node.text !== textEditSession.original) {
    snapshot("保存文本节点", textEditSession.before);
    persist();
  }
  textEditSession = null;
}

function onPromptInput(event) {
  const id = event.target.dataset.textPrompt || event.target.dataset.imagePrompt;
  const node = state.nodes.find(n => n.id === id);
  if (!node) return;
  node.prompt = event.target.value;
  persist();
  const send = event.target.closest(".composer")?.querySelector('[data-action="request-text-generate"], [data-action="request-image-generate"]');
  if (send) send.disabled = !event.target.value.trim();
}

function onModelChange(event) {
  const node = state.nodes.find(n => n.id === event.target.dataset.modelSelect);
  if (!node) return;
  node.model = event.target.value;
  persist();
}

function onImageSettingChange(event) {
  const node = state.nodes.find(n => n.id === event.target.dataset.nodeId);
  if (!node) return;
  const setting = event.target.dataset.imageSetting;
  if (setting === "imageCount") node[setting] = Number(event.target.value);
  else node[setting] = event.target.value;
  persist();
  render();
}

function toggleImageSelect(nodeId, setting) {
  const isSame = state.openImageSelect?.nodeId === nodeId && state.openImageSelect?.setting === setting;
  state.openImageSelect = isSame ? null : { nodeId, setting };
  render();
}

function chooseImageSetting(nodeId, setting, value) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  node[setting] = setting === "imageCount" ? Number(value) : value;
  state.openImageSelect = null;
  persist();
  render();
}

function chooseExpandSetting(setting, value) {
  if (!state.imageEditMode) return;
  if (setting === "expandScale" || setting === "expandRatio" || setting === "expandModel") {
    if (setting === "expandScale") state.imageEditMode.scale = value;
    if (setting === "expandRatio") state.imageEditMode.ratio = value;
    if (setting === "expandModel") state.imageEditMode.model = value;
    state.openExpandSelect = null;
    resizeExpandNode();
    render();
  }
  if (setting === "cropRatio") {
    state.imageEditMode.ratio = value;
    state.openExpandSelect = null;
    render();
  }
}

function toggleImagePanorama(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  const hasTag = promptHasTag(node.prompt || "", PANORAMA_PROMPT_TAG);
  const next = node.imagePanorama720 && !hasTag ? true : !node.imagePanorama720;
  node.imagePanorama720 = next;
  node.prompt = syncPromptTag(node.prompt || "", PANORAMA_PROMPT_TAG, next);
  persist();
  render();
}

function promptHasTag(prompt, tag) {
  return new RegExp(`(^|\\s)${escapeRegExp(tag)}(?=\\s|$)`).test(prompt);
}

function syncPromptTag(prompt, tag, enabled) {
  const withoutTag = prompt
    .replace(new RegExp(`(^|\\s)${escapeRegExp(tag)}(?=\\s|$)`, "g"), " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!enabled) return withoutTag;
  return withoutTag ? `${withoutTag} ${tag}` : tag;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function onEditSettingChange(event) {
  if (!state.imageEditMode) return;
  if (event.target.dataset.editSetting === "expandScale") {
    state.imageEditMode.scale = event.target.value;
    resizeExpandNode();
    render();
  }
}

function onBrushSizeInput(event) {
  if (!state.imageEditMode || !["inpaint", "annotate"].includes(state.imageEditMode.type)) return;
  state.imageEditMode.size = Number(event.target.value) || 42;
  render();
}

function onFilePicked(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    snapshot("上传资源");
    if (state.pendingUploadNodeId) {
      const node = state.nodes.find(n => n.id === state.pendingUploadNodeId);
      if (node) {
        node.versions.push({ src: reader.result, note: "上传图片" });
        node.currentVersion = node.versions.length - 1;
      }
      state.pendingUploadNodeId = null;
    } else {
      const point = screenToWorldCenter();
      state.nodes.push({
        id: `image-${Date.now()}`,
        type: "image",
        x: point.x - 170,
        y: point.y - 140,
        w: 340,
        h: 280,
        title: file.name.replace(/\.[^.]+$/, "") || "上传图片",
        prompt: "",
        versions: [{ src: reader.result, note: "上传图片" }],
        currentVersion: 0,
      });
    }
    event.target.value = "";
    persist();
    render();
  };
  reader.readAsDataURL(file);
}

function editTitle() {
  const wrap = document.querySelector("[data-title-wrap]");
  const oldValue = state.title;
  wrap.innerHTML = `<input class="title-input" value="${escapeHtml(oldValue)}" />`;
  const input = wrap.querySelector("input");
  input.focus();
  input.select();
  const save = () => {
    const next = input.value.trim() || "未命名项目";
    if (next !== oldValue) {
      snapshot("修改项目名称");
      state.title = next;
      persist();
    }
    render();
  };
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") save();
    if (event.key === "Escape") render();
  });
  input.addEventListener("blur", save);
}

function copyNodeText(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  navigator.clipboard?.writeText(node.text || node.prompt || "");
  showToast("文本已复制");
}

function focusSelectedText() {
  const node = state.nodes.find(n => n.id === state.selectedNodeId);
  if (node && !node.text) {
    snapshot("编辑文本节点");
    node.text = "在这里输入多行文本内容。";
    persist();
  }
  render();
}

function fillSelectedPrompt(text) {
  const node = state.nodes.find(n => n.id === state.selectedNodeId);
  if (!node) return;
  node.prompt = text;
  render();
}

function requestTextGeneration(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  if (!(node.prompt || "").trim()) return;
  state.confirm = { type: "text", nodeId };
  render();
}

function requestImageGeneration(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  if (!(node.prompt || "").trim()) return;
  state.confirm = { type: "image", nodeId };
  render();
}

function mockText(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  if (!(node.prompt || "").trim()) return;
  snapshot("文生文");
  const prompt = node.prompt;
  if (node.referenceImageNodeId) {
    node.text = `结构化中文提示词\n主题描述：画面主体清晰，人物或物体关系明确。\n环境：室内外空间层次分明，背景信息服务叙事。\n光影：柔和主光配合局部高光，突出情绪氛围。\n镜头语言：中景构图，视线引导自然，主体位于视觉中心。\n风格：电影感、细腻写实、短剧宣传图质感。\n\n原始要求：${prompt}`;
  } else {
    node.text = `生成文本：${prompt}\n\n她站在霓虹灯后的风里，把沉默写成一段新的开场。`;
  }
  state.confirm = null;
  persist();
  render();
}

function createImageToTextRoute() {
  const textNode = state.nodes.find(n => n.id === state.selectedNodeId && n.type === "text");
  if (!textNode) return;
  snapshot("图片反推提示词");
  const imageId = `image-${Date.now()}-reverse`;
  const imageNode = {
    id: imageId,
    type: "image",
    x: textNode.x - 420,
    y: textNode.y,
    w: 340,
    h: 280,
    title: "图片",
    prompt: "",
    versions: [{ src: makeMockImage("参考图片", "#463a2a", "#d8b46a"), note: "图片反推参考" }],
    currentVersion: 0,
  };
  state.nodes.push(imageNode);
  state.edges.push({ id: `edge-${Date.now()}`, from: imageId, to: textNode.id });
  textNode.referenceImageNodeId = imageId;
  textNode.prompt = IMAGE_TO_TEXT_PROMPT;
  state.selectedNodeId = textNode.id;
  state.selectedEdgeId = null;
  persist();
  render();
}

function mockImage(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  if (!(node.prompt || "").trim()) return;
  snapshot(node.versions.length ? "修改图片" : "生成图片");
  const prompt = node.prompt;
  const meta = `${node.imageModel || IMAGE_MODELS[0]} · ${node.imageRatio || IMAGE_RATIOS[0]} · ${node.imageResolution || IMAGE_RESOLUTIONS[0]}`;
  const count = Number(node.imageCount || 1);
  if (count > 1) {
    createBatchImageResults(node, prompt, count);
  } else {
    const src = makeMockImage(`${prompt.slice(0, 8)}${node.imagePanorama720 ? "全景" : ""}`, randomColor(), randomColor());
    node.versions.push({ src, note: prompt });
    node.currentVersion = node.versions.length - 1;
  }
  node.title = node.title || "图片";
  state.confirm = null;
  showToast(`已生成 ${count} 张 · ${meta}`);
  persist();
  render();
}

function createBatchImageResults(sourceNode, prompt, count) {
  const gap = 28;
  const cols = count === 2 ? 2 : 2;
  const rows = Math.ceil(count / cols);
  const baseX = sourceNode.x + sourceNode.w + 72;
  const baseY = sourceNode.y - ((rows - 1) * (sourceNode.h + gap)) / 2;
  const stamp = Date.now();
  const resultIds = [];

  Array.from({ length: count }).forEach((_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const id = `image-${stamp}-result-${index + 1}`;
    const src = makeMockImage(`${prompt.slice(0, 8)}${sourceNode.imagePanorama720 ? "全景" : ""} ${index + 1}`, randomColor(), randomColor());
    const resultNode = {
      id,
      type: "image",
      x: baseX + col * (sourceNode.w + gap),
      y: baseY + row * (sourceNode.h + gap),
      w: sourceNode.w,
      h: sourceNode.h,
      title: `生成结果 ${index + 1}`,
      prompt,
      versions: [{ src, note: prompt }],
      currentVersion: 0,
      imageModel: sourceNode.imageModel,
      imageRatio: sourceNode.imageRatio,
      imageResolution: sourceNode.imageResolution,
      imageCount: 1,
      imagePanorama720: sourceNode.imagePanorama720,
      generatedFrom: sourceNode.id,
    };
    state.nodes.push(resultNode);
    resultIds.push(id);
    state.edges.push({ id: `edge-${stamp}-result-${index + 1}`, from: sourceNode.id, to: id });
  });

  state.selectedNodeId = resultIds[0] || sourceNode.id;
  state.selectedEdgeId = null;
}

function createPanoramaCaptures(nodeId, count) {
  const sourceNode = state.nodes.find(n => n.id === nodeId);
  const current = sourceNode?.versions?.[sourceNode.currentVersion || 0];
  if (!sourceNode || !current) return;
  snapshot(count === 1 ? "全景截图" : `${count}视角截图`);
  const gap = 28;
  const cols = count === 9 ? 3 : count === 4 ? 2 : 1;
  const rows = Math.ceil(count / cols);
  const w = count === 1 ? sourceNode.w : Math.max(220, Math.min(320, sourceNode.w * 0.72));
  const h = count === 1 ? sourceNode.h : Math.max(160, Math.min(240, sourceNode.h * 0.72));
  const baseX = sourceNode.x + sourceNode.w + 96;
  const baseY = sourceNode.y - ((rows - 1) * (h + gap)) / 2;
  const stamp = Date.now();
  const resultIds = [];

  Array.from({ length: count }).forEach((_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const id = `image-${stamp}-panorama-${index + 1}`;
    const label = count === 1 ? "全景截图" : `${index + 1}视角`;
    state.nodes.push({
      id,
      type: "image",
      x: baseX + col * (w + gap),
      y: baseY + row * (h + gap),
      w,
      h,
      title: label,
      prompt: `${PANORAMA_PROMPT_TAG} ${label}`,
      versions: [{ src: makeMockImage(label, "#111827", "#19d6b1"), note: label }],
      currentVersion: 0,
      imagePanorama720: true,
      generatedFrom: sourceNode.id,
    });
    state.edges.push({ id: `edge-${stamp}-panorama-${index + 1}`, from: sourceNode.id, to: id });
    resultIds.push(id);
  });

  state.imageEditMode = null;
  state.selectedNodeId = resultIds[0] || sourceNode.id;
  state.selectedEdgeId = null;
  persist();
  render();
}

function imageToolAction(nodeId, tool) {
  const node = state.nodes.find(n => n.id === nodeId);
  const current = node?.versions?.[node.currentVersion || 0];
  if (!node || !current) return;
  if (tool === "expand") {
    snapshot("进入扩图");
    state.imageEditMode = {
      type: "expand",
      nodeId,
      model: EXPAND_MODELS[0],
      scale: "1.5X",
      ratio: "原比例",
      original: { w: node.w, h: node.h },
    };
    resizeExpandNode();
    render();
    return;
  }
  if (tool === "inpaint") {
    state.imageEditMode = {
      type: "inpaint",
      nodeId,
      tool: "brush",
      prompt: "请输入如何修改画面内容",
      size: 54,
      marks: [],
      undone: [],
    };
    render();
    return;
  }
  if (tool === "annotate") {
    state.imageEditMode = {
      type: "annotate",
      nodeId,
      tool: "brush",
      prompt: "请输入如何修改画面内容",
      size: 54,
      marks: [],
      undone: [],
    };
    render();
    return;
  }
  if (tool === "cutout") {
    createDownstreamTask(node, "cutout");
    return;
  }
  if (tool === "enhance") {
    createDownstreamTask(node, "enhance");
    return;
  }
  if (tool === "crop") {
    state.imageEditMode = {
      type: "crop",
      nodeId,
      ratio: CROP_RATIOS[0],
    };
    render();
    return;
  }
  if (tool === "preview") {
    state.previewNodeId = node.id;
    render();
    return;
  }
  if (tool === "download") {
    downloadImage(node, current);
    return;
  }
  if (tool === "panorama") {
    node.imagePanorama720 = true;
    node.prompt = syncPromptTag(node.prompt || "", PANORAMA_PROMPT_TAG, true);
    state.imageEditMode = { type: "panorama", nodeId };
    persist();
    render();
    return;
  }
  const labels = {
    inpaint: "局部重绘",
  };
  snapshot(labels[tool] || "图片工具");
  const label = labels[tool] || "图片";
  node.versions.push({
    src: makeMockImage(`${label}${node.title}`.slice(0, 10), randomColor(), randomColor()),
    note: label,
  });
  node.currentVersion = node.versions.length - 1;
  persist();
  render();
}

function createDownstreamTask(sourceNode, taskType) {
  const current = sourceNode.versions[sourceNode.currentVersion || 0];
  const labelMap = { enhance: "高清", cutout: "抠图", crop: "裁剪" };
  const label = labelMap[taskType] || "图片";
  const taskId = `image-${Date.now()}-${taskType}`;
  snapshot(`${label}任务`);
  const taskNode = {
    id: taskId,
    type: "image",
    x: sourceNode.x + sourceNode.w + 140,
    y: sourceNode.y,
    w: sourceNode.w,
    h: sourceNode.h,
    title: `${label}结果`,
    prompt: `${label} + 当前图片`,
    versions: current ? [{ src: current.src, note: "任务输入图" }] : [],
    currentVersion: 0,
    taskType,
    taskStatus: "running",
  };
  state.nodes.push(taskNode);
  const edge = { id: `edge-${Date.now()}-${taskType}`, from: sourceNode.id, to: taskId };
  if (!state.edges.some(item => item.from === edge.from && item.to === edge.to)) state.edges.push(edge);
  state.selectedNodeId = taskId;
  state.selectedEdgeId = edge.id;
  persist();
  render();

  window.setTimeout(() => finishDownstreamTask(taskId, taskType), 1100);
}

function finishDownstreamTask(taskId, taskType) {
  const taskNode = state.nodes.find(n => n.id === taskId);
  if (!taskNode) return;
  const failed = false;
  if (failed) {
    taskNode.taskStatus = "failed";
  } else {
    const labelMap = { enhance: "高清完成", cutout: "抠图完成", crop: "裁剪完成" };
    const colors = {
      enhance: ["#26364b", "#9db7ff"],
      cutout: ["#101214", "#3b66c4"],
      crop: ["#1e2434", "#8a7dff"],
    };
    const label = labelMap[taskType] || "图片完成";
    const [start, end] = colors[taskType] || colors.cutout;
    taskNode.taskStatus = "success";
    taskNode.versions.push({
      src: makeMockImage(label, start, end),
      note: label,
    });
    taskNode.currentVersion = taskNode.versions.length - 1;
  }
  persist();
  render();
}

function resizeExpandNode() {
  const mode = state.imageEditMode;
  const node = state.nodes.find(n => n.id === mode?.nodeId);
  if (!node || mode?.type !== "expand") return;
  const original = mode.original || { w: node.w, h: node.h };
  const scale = Number(String(mode.scale || "1.5X").replace("X", "")) || 1.5;
  const ratio = mode.ratio || "原比例";
  let width = original.w * scale;
  let height = original.h * scale;
  if (ratio !== "原比例") {
    const [rw, rh] = ratio.split(":").map(Number);
    if (rw && rh) {
      const area = width * height;
      width = Math.sqrt(area * rw / rh);
      height = width * rh / rw;
    }
  }
  node.w = clamp(width, original.w, RESIZE_LIMITS.image.maxW * 1.8);
  node.h = clamp(height, original.h, RESIZE_LIMITS.image.maxH * 1.8);
}

function closeExpandMode(restore) {
  const mode = state.imageEditMode;
  const node = state.nodes.find(n => n.id === mode?.nodeId);
  if (restore && node && mode?.original) {
    node.w = mode.original.w;
    node.h = mode.original.h;
  }
  state.imageEditMode = null;
  state.openExpandSelect = null;
  persist();
  render();
}

function downloadImage(node, version) {
  showToast("正在下载图片...");
  window.setTimeout(() => {
    const link = document.createElement("a");
    link.href = version.src;
    link.download = `${node.title || "图片"}-v${(node.currentVersion || 0) + 1}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("下载完成");
  }, 600);
}

function applyExpand(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node || state.imageEditMode?.type !== "expand") return;
  snapshot("扩图");
  const mode = state.imageEditMode;
  node.imageRatio = mode.ratio === "原比例" ? node.imageRatio : mode.ratio;
  node.versions.push({
    src: makeMockImage(`扩图${mode.scale}`.slice(0, 10), "#262b35", "#7d8fa9"),
    note: `图片扩展${mode.scale} + 当前图片 / ${mode.model || EXPAND_MODELS[0]} / ${mode.ratio || EXPAND_RATIOS[0]}`,
  });
  node.currentVersion = node.versions.length - 1;
  state.imageEditMode = null;
  state.openExpandSelect = null;
  persist();
  render();
}

function applyCrop(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  const mode = state.imageEditMode;
  if (!node || mode?.type !== "crop") return;
  snapshot("裁剪图片");
  const ratio = mode.ratio || CROP_RATIOS[0];
  node.imageRatio = ratio === "原图比例" ? node.imageRatio : ratio;
  node.versions.push({
    src: makeMockImage(`裁剪${ratio}`.slice(0, 10), "#1a2134", "#8f7cff"),
    note: `裁剪 / ${ratio}`,
  });
  node.currentVersion = node.versions.length - 1;
  state.imageEditMode = null;
  state.openExpandSelect = null;
  persist();
  render();
}

function applyInpaint(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node || !state.imageEditMode?.prompt?.trim()) return;
  snapshot("局部重绘");
  node.versions.push({
    src: makeMockImage("局部重绘", "#213044", "#70a6bb"),
    note: state.imageEditMode.prompt,
  });
  node.currentVersion = node.versions.length - 1;
  state.imageEditMode = null;
  persist();
  render();
}

function applyAnnotate(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  const current = node?.versions?.[node.currentVersion || 0];
  const mode = state.imageEditMode;
  if (!node || !current || mode?.type !== "annotate") return;
  snapshot("标记图片");
  const resultId = `image-${Date.now()}-annotate`;
  const resultNode = {
    id: resultId,
    type: "image",
    x: node.x + node.w + 140,
    y: node.y,
    w: node.w,
    h: node.h,
    title: "标记结果",
    prompt: `标记区域 ${mode.marks?.length || 0} 处 + 当前图片`,
    versions: [{ src: makeMockImage("标记结果", "#301a24", "#ff4d58"), note: "标记确认" }],
    currentVersion: 0,
    taskType: "annotate",
    generatedFrom: node.id,
  };
  state.nodes.push(resultNode);
  const edge = { id: `edge-${Date.now()}-annotate`, from: node.id, to: resultId };
  state.edges.push(edge);
  state.selectedNodeId = resultId;
  state.selectedEdgeId = edge.id;
  state.imageEditMode = null;
  persist();
  render();
}

function paintMask(event, el) {
  addMaskMarkFromEvent(event, el);
}

function onMaskPointerDown(event) {
  if (!state.imageEditMode || !["inpaint", "annotate"].includes(state.imageEditMode.type)) return;
  event.preventDefault();
  event.stopPropagation();
  drag = { type: "mask", el: event.currentTarget };
  addMaskMarkFromEvent(event, event.currentTarget);
}

function addMaskMarkFromEvent(event, el) {
  const mode = state.imageEditMode;
  if (!mode || !["inpaint", "annotate"].includes(mode.type)) return;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  if (mode.tool === "eraser") {
    if (!mode.marks.length) return;
    const target = { x: clamp(x, 0, 100), y: clamp(y, 0, 100) };
    let nearestIndex = -1;
    let nearestDistance = Infinity;
    mode.marks.forEach((mark, index) => {
      const distance = Math.hypot(mark.x - target.x, mark.y - target.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    if (nearestIndex >= 0 && nearestDistance < 7) mode.undone.push(mode.marks.splice(nearestIndex, 1)[0]);
  } else {
    const next = { x: clamp(x, 0, 100), y: clamp(y, 0, 100), size: Number(mode.size || 54) };
    const last = mode.marks[mode.marks.length - 1];
    if (last && Math.hypot(last.x - next.x, last.y - next.y) < 1.8) return;
    mode.marks.push(next);
    mode.undone = [];
  }
  render();
}

function undoMask() {
  const mode = state.imageEditMode;
  if (!mode || !["inpaint", "annotate"].includes(mode.type) || !mode.marks.length) return;
  mode.undone.push(mode.marks.pop());
  render();
}

function redoMask() {
  const mode = state.imageEditMode;
  if (!mode || !["inpaint", "annotate"].includes(mode.type) || !mode.undone.length) return;
  mode.marks.push(mode.undone.pop());
  render();
}

function imageCost(node) {
  const resolutionCost = {
    "480P": 8,
    "720P": 14,
    "1080P": 22,
    "2K": 36,
    "4K": 60,
  };
  const base = resolutionCost[node.imageResolution || IMAGE_RESOLUTIONS[0]] || 14;
  const count = Number(node.imageCount || 1);
  return base * count + (node.imagePanorama720 ? 6 : 0);
}

function imageDimensions(node) {
  if (node.imagePanorama720) return "1440 x 720";
  const resolutionMap = {
    "480P": 480,
    "720P": 720,
    "1080P": 1080,
    "2K": 1440,
    "4K": 2160,
  };
  const ratio = node.imageRatio || IMAGE_RATIOS[0];
  const base = resolutionMap[node.imageResolution || IMAGE_RESOLUTIONS[0]] || 720;
  const [rw, rh] = ratio.split(":").map(Number);
  if (!rw || !rh) return "720 x 1280";
  if (rw >= rh) return `${Math.round(base * rw / rh)} x ${base}`;
  return `${base} x ${Math.round(base * rh / rw)}`;
}

function switchVersion(nodeId, index) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node) return;
  snapshot("切换图片版本");
  node.currentVersion = index;
  persist();
  render();
}

function nextVersion(nodeId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (!node || node.versions.length < 2) return;
  node.currentVersion = ((node.currentVersion || 0) + 1) % node.versions.length;
  persist();
  render();
}

function toggleAsset(assetId) {
  if (state.selectedAssets.includes(assetId)) {
    state.selectedAssets = state.selectedAssets.filter(id => id !== assetId);
  } else {
    state.selectedAssets.push(assetId);
  }
  render();
}

function toggleCategory(category, checked) {
  const ids = assetImages.filter(a => a.category === category).map(a => a.id);
  state.selectedAssets = checked
    ? Array.from(new Set([...state.selectedAssets, ...ids]))
    : state.selectedAssets.filter(id => !ids.includes(id));
  render();
}

function clearCurrentCategoryAssets() {
  const ids = assetImages.filter(a => a.category === state.selectedAssetCategory).map(a => a.id);
  state.selectedAssets = state.selectedAssets.filter(id => !ids.includes(id));
}

function importAssets() {
  const selected = assetImages.filter(asset => state.selectedAssets.includes(asset.id));
  if (!selected.length) {
    showToast("请先选择资产");
    return;
  }
  snapshot("导入资产到画布");
  const center = screenToWorldCenter();
  const categories = ["person", "prop", "scene"];
  const columnOffsets = { person: -320, prop: 0, scene: 320 };
  const created = [];

  categories.forEach(category => {
    const group = selected.filter(asset => asset.category === category);
    group.forEach((asset, index) => {
      const extraColumn = Math.floor(index / 5);
      const row = index % 5;
      created.push({
        id: `image-${Date.now()}-${asset.id}`,
        type: "image",
        x: center.x + columnOffsets[category] + extraColumn * 320,
        y: center.y - 160 + row * 400,
        w: 240,
        h: 320,
        title: asset.name,
        prompt: `@${asset.name}`,
        versions: [{ src: asset.src, note: "资产导入" }],
        currentVersion: 0,
        asset: true,
      });
    });
  });

  state.nodes.push(...created);
  const minX = Math.min(...created.map(n => n.x));
  const minY = Math.min(...created.map(n => n.y));
  focusWorldPoint(minX + 420, minY + 220);
  state.selectedNodeId = created[0]?.id || null;
  state.selectedAssets = [];
  state.drawer = null;
  persist();
  render();
}

function centerView() {
  state.transform = { x: 760, y: 380, scale: 1 };
  persist();
  render();
}

function setZoom(scale) {
  state.transform.scale = clamp(scale, 0.3, 2);
  persist();
  render();
}

function onKeydown(event) {
  if (event.target.matches("input, textarea")) return;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    restoreLast();
  }
  if (event.key === "Delete" || event.key === "Backspace") {
    if (state.selectedNodeId) {
      deleteSelectedNode();
    } else if (state.selectedEdgeId) {
      snapshot("删除连线");
      state.edges = state.edges.filter(edge => edge.id !== state.selectedEdgeId);
      state.selectedEdgeId = null;
      persist();
      render();
    }
  }
}

function deleteSelectedNode() {
  const nodeId = state.selectedNodeId;
  if (!nodeId) return;
  snapshot("删除节点");
  state.nodes = state.nodes.filter(node => node.id !== nodeId);
  state.edges = state.edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId);
  state.selectedNodeId = null;
  state.selectedEdgeId = null;
  persist();
  render();
}

function getInputPortAt(clientX, clientY) {
  const stack = document.elementsFromPoint(clientX, clientY);
  const port = stack.find(el => el.dataset?.port === "in");
  if (port) return port;
  const node = stack
    .map(el => el.closest?.(".node"))
    .find(Boolean);
  return node ? { dataset: { nodeId: node.dataset.nodeId } } : null;
}

function screenToWorld(clientX, clientY) {
  const rect = document.querySelector("[data-canvas]").getBoundingClientRect();
  return {
    x: (clientX - rect.left - state.transform.x) / state.transform.scale,
    y: (clientY - rect.top - state.transform.y) / state.transform.scale,
  };
}

function screenToWorldCenter() {
  const rect = document.querySelector("[data-canvas]")?.getBoundingClientRect();
  if (!rect) return { x: 0, y: 0 };
  return screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function focusWorldPoint(x, y) {
  const rect = document.querySelector("[data-canvas]")?.getBoundingClientRect();
  if (!rect) return;
  state.transform.scale = 1;
  state.transform.x = rect.width / 2 - x;
  state.transform.y = rect.height / 2 - y;
}

function updateWorldTransform() {
  const world = document.querySelector("[data-world]");
  if (world) world.style.transform = `translate(${state.transform.x}px, ${state.transform.y}px) scale(${state.transform.scale})`;
  const zoom = document.querySelector(".zoom-control span");
  if (zoom) zoom.textContent = `${Math.round(state.transform.scale * 100)}%`;
}

function scheduleDragFrame() {
  if (frameRequest) return;
  frameRequest = requestAnimationFrame(() => {
    frameRequest = null;
    flushDragFrame();
  });
}

function flushDragFrame() {
  if (!drag) return;
  if (drag.type === "node" || drag.type === "resize") {
    const node = state.nodes.find(n => n.id === drag.nodeId);
    const el = document.querySelector(`[data-node-id="${drag.nodeId}"].node`);
    if (node && el) {
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
      el.style.width = `${node.w}px`;
      el.style.height = `${node.h}px`;
      updateEdgesForNode(node.id);
    }
  }
  if (drag.type === "edge") updatePendingEdge();
}

function updateEdgesForNode(nodeId) {
  state.edges.forEach(edge => {
    if (edge.from !== nodeId && edge.to !== nodeId) return;
    const from = state.nodes.find(n => n.id === edge.from);
    const to = state.nodes.find(n => n.id === edge.to);
    if (!from || !to) return;
    document.querySelectorAll(`[data-edge-id="${edge.id}"]`).forEach(path => {
      path.setAttribute("d", edgePathBetween(from, to));
    });
  });
}

function updatePendingEdge() {
  const layer = document.querySelector("[data-edge-layer]");
  const from = state.nodes.find(n => n.id === drag?.from);
  if (!layer || !from || !drag?.current) return;
  let pending = layer.querySelector(".edge-path.pending");
  if (!pending) {
    pending = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pending.classList.add("edge-path", "pending");
    layer.appendChild(pending);
  }
  pending.setAttribute("d", pendingEdgePath(from, drag.current));
}

function removePendingEdge() {
  document.querySelector(".edge-path.pending")?.remove();
}

function showToast(text) {
  state.toast = text;
  clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => {
    state.toast = "";
    render();
  }, 1300);
}

function makeMockImage(label, colorA, colorB) {
  const safe = escapeHtml(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0 0 480 640">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${colorA}" offset="0"/>
          <stop stop-color="${colorB}" offset="1"/>
        </linearGradient>
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      </defs>
      <rect width="480" height="640" fill="url(#g)"/>
      <rect width="480" height="640" opacity=".12" filter="url(#noise)"/>
      <circle cx="356" cy="160" r="88" fill="rgba(255,255,255,.16)"/>
      <rect x="64" y="260" width="352" height="210" rx="28" fill="rgba(0,0,0,.24)"/>
      <text x="240" y="365" text-anchor="middle" fill="white" font-family="PingFang SC, sans-serif" font-size="36" font-weight="700">${safe}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function randomColor() {
  const colors = ["#26364b", "#774252", "#314b3f", "#4d3d72", "#744b2e", "#223f56", "#5a2f47"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function timeLabel() {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

render();
