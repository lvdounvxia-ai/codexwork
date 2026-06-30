const SAMPLE_NOVEL = window.IMPORTED_SAMPLE_SCRIPT || `《一夜未眠，冤家成了我孩子他爸》

第一章：醒来就当妈

苏晚星是被一通电话吵醒的。凌晨四点，手机屏幕在黑暗里发出刺眼的白光。她伸手摸过去，指尖还沾着昨夜命案现场的消毒水味。

“喂。”她的声音沙哑。

“苏小姐，您的儿子高烧39度8，请尽快来儿童医院。”

苏晚星愣了三秒，平静地回：“打错了。”挂断。

三秒后，电话再次响起。这次是个带着哭腔的护士：“孩子一直在喊妈妈，他爸爸傅先生还在手术台上下不来，孩子已经抽搐了一次，求您快点过来。”

啪地一声，床头的玻璃杯被她碰倒，碎在地板上。

傅。先。生。

第二章：亲子鉴定

儿童医院急诊灯白得刺眼。小男孩躺在病床上，烧得脸颊通红，却在看见苏晚星时伸出手，小声喊：“妈妈。”

苏晚星站在门口，脑子里所有推理都失效了。

傅沉舟从手术区赶来，白大褂还沾着血。他看见苏晚星，眼神比急诊室的灯更冷：“你终于肯出现了。”

苏晚星冷笑：“傅医生，造谣之前先做亲子鉴定。”

第三章：同居协议

鉴定结果出来那天，雨下得很大。苏晚星盯着报告最底下的百分比，第一次觉得自己可能活在一场荒唐的戏里。

傅沉舟把伞递到她面前：“孩子需要稳定环境。搬过来。”

“命令我？”苏晚星挑眉。

“合作。”傅沉舟把一份协议递给她，“三个月，查清当年的事，也给孩子一个答案。”`;

const PROMPT_POLICY = {
  role: "剧本格式校验与补丁规划",
  goal: "只补全剧本格式结构，输出严格 JSON",
  hardRules: [
    "绝不改写原文内容",
    "不输出最终全文，只输出当前场次 JSON",
    "仅补充集标题、场次信息、出场人物、场景前缀、角色内心OS、台词格式",
  ],
};

const state = {
  view: "upload",
  uploadMethod: "link",
  uploadSampleLang: "cn",
  rawText: "",
  fileName: "",
  sourceLabel: "示例文本",
  episodes: [],
  activeEpisode: 0,
  activeScene: 0,
  sidebarTab: "script",
  englishSidebar: false,
  outlineText: "",
  bioText: "",
  hookText: "",
  addDialog: null,
  toast: "",
  lastSaved: "未保存",
  loadingLabel: "",
  showValidationIssues: false,
  validationStatus: "idle",
  aiFixInline: null,
};

const DEMO_VALIDATION_GROUPS = [
  { key: "location", label: "地点缺失", issues: ["第二集 2-1 地点缺失"] },
  { key: "body", label: "正文缺失", issues: ["第一集1-3 正文为空"] },
  { key: "continuity", label: "剧集连续性", issues: [] },
];

function demoValidationIssueCount() {
  return DEMO_VALIDATION_GROUPS.reduce((total, group) => total + (group.issues?.length || 0), 0);
}

const app = document.querySelector("#app");
let loadingTimer = null;

function render() {
  app.innerHTML = state.view === "upload" ? uploadTemplate() : state.view === "loading" ? loadingTemplate() : editorTemplate();
  bindEvents();
}

function shell(inner, mode = "default") {
  return `
    <div class="app ${mode === "editor" ? "editor-mode" : ""}">
      ${
        mode === "editor"
          ? ""
          : `
        <header class="topbar">
          <div class="brand">
            <span class="brand-mark"></span>
            <span>漫剧脚本工坊</span>
          </div>
          <div class="top-actions">
            <span class="status-pill">创作状态｜国内推文</span>
            <span class="status-pill">任务队列 · 0 · 0</span>
            <span class="credit">19520</span>
          </div>
        </header>
      `
      }
      ${inner}
    </div>
  `;
}

function editorRouteTemplate() {
  return `
    <div class="editor-routebar">
      <button type="button" class="editor-back" data-action="back-upload">‹ 返回</button>
      <nav class="editor-flow" aria-label="创作步骤">
        <span class="editor-flow-item active">剧本内容</span>
        <span class="editor-flow-arrow">›</span>
        <span class="editor-flow-item">贡献要素</span>
        <span class="editor-flow-arrow">›</span>
        <span class="editor-flow-item">分镜视频</span>
      </nav>
    </div>
  `;
}

function editorTitleTemplate(scene) {
  return `
    <section class="editor-titlebar">
      <div class="editor-title-left">
        <span class="editor-spark">✣</span>
        <div>
          <h1>剧本编辑</h1>
          <p>${escapeHtml(scene?.episodeTitle || "第一集")} · ${escapeHtml(scene?.title || "第一场")}｜${escapeHtml(scene?.summary || "已完成初步结构化")}</p>
        </div>
      </div>
      <div class="editor-actions">
        <select class="small-button" data-action="export">
          <option>导出剧本</option>
          <option>导出 TXT</option>
          <option>导出 JSON</option>
        </select>
        <button type="button" class="small-button" data-action="replace">替换剧本</button>
        <button type="button" class="primary-button" data-action="next-step">下一步</button>
      </div>
    </section>
  `;
}

function routeTemplate() {
  return `
    <div class="route">
      <button type="button" data-action="back-upload">‹ 返回</button>
      <strong>剧本编辑</strong>
      <span>${state.view === "upload" ? "导入小说并自动校验生成漫剧剧本" : "已生成可校验预览"}</span>
    </div>
  `;
}

function stepsTemplate(active = 1) {
  const steps = ["剧本内容", "贡献要素", "分镜视频"];
  return `
    <div class="steps">
      ${steps
        .map(
          (step, index) => `
            <div class="step ${index + 1 === active ? "active" : ""}">
              <span class="step-dot">${index + 1}</span>
              <span>${step}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function uploadTemplate() {
  const method = activeUploadMethod();
  const sampleLang = activeUploadSampleLang();
  return shell(`
    <main class="upload-page">
      ${routeTemplate()}
      ${stepsTemplate(1)}
      <section class="upload-workspace">
        <div class="upload-shell-card">
          <div class="upload-shell-head">
            <div class="upload-shell-title">
              <span class="upload-shell-mark">✢</span>
              <span>剧本编辑</span>
            </div>
            <div class="upload-shell-actions">
              <button type="button" class="small-button" data-action="pick-file">导入剧本</button>
            </div>
          </div>
          <div class="upload-panel">
            <div class="upload-panel-tabs">
              <button type="button" class="upload-panel-tab active">剧本编辑</button>
              <button type="button" class="upload-panel-tab">剧本预览</button>
              <button type="button" class="upload-panel-tab">剧本设定</button>
            </div>
            <div class="upload-panel-body">
              <aside class="upload-format-sample" aria-label="剧本格式示例">
                <div class="upload-format-title">剧本格式示例</div>
                <div class="upload-format-tabs">
                  <button type="button" class="upload-format-tab ${sampleLang === "cn" ? "active" : ""}" data-action="switch-upload-sample" data-lang="cn">中文示例</button>
                  <button type="button" class="upload-format-tab ${sampleLang === "en" ? "active" : ""}" data-action="switch-upload-sample" data-lang="en">英文示例</button>
                </div>
                <pre class="upload-format-text">${escapeHtml(uploadFormatSampleText(sampleLang))}</pre>
              </aside>
              <aside class="upload-methods">
                ${uploadMethodOptions()
                  .map(
                    (item) => `
                      <button type="button" class="upload-method-option ${method === item.value ? "active" : ""}" data-action="switch-upload-method" data-method="${item.value}">
                        <span class="upload-method-radio"></span>
                        <span>${escapeHtml(item.label)}</span>
                      </button>
                    `
                  )
                  .join("")}
              </aside>
              <div class="upload-method-content">
                ${uploadMethodContentTemplate(method)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `);
}

function uploadMethodOptions() {
  return [
    { value: "upload", label: "本地上传" },
    { value: "link", label: "导入链接" },
    { value: "paste", label: "粘贴剧本" },
  ];
}

function activeUploadMethod() {
  return state.uploadMethod || "link";
}

function activeUploadSampleLang() {
  return state.uploadSampleLang === "en" ? "en" : "cn";
}

function uploadFormatGuideText() {
  return `参考格式 
集标题    格式为“第 X 集 ”
场次信息  格式为“场次编号  地点  时间（日/夜景） 内/外景 ”。
出场人物；格式为“出场人物：角色A、角色B……”。
场景描写  统一在句首补 ▲。
内心独白  统一整理为 【角色名 OS：……】。
画外音 统一整理为 【角色名 OV：……】。
台词 统一整理为“角色名（神态动作）：台词内容”。`;
}

function uploadFormatSampleText(lang = "cn") {
  const guide = uploadFormatGuideText();
  if (lang === "en") {
    return `Reference Format
Episode title Format: "Episode X"
Scene Info Format: "Scene No.  Location  Time (Day/Night)  Int/Ext"
Characters Format: "Characters: Character A, Character B……"
Scene Description: Start each sentence with ▲ uniformly.
Inner Monologue: Standardized as 【Character OS: ...】
Voice-over: Standardized as 【Character OV: ...】
Dialogue: Standardized as "Character (expression & movement): Dialogue content"

English Sample
Episode 1
1.1 INT. REEFBACK CLAN, MORVENE'S PALLACE - DAY
Characters:Nerina、Morvane
▲A shot of a luxurious and fancy underwater palace.
▲Nerina (female mermaid, 20) wearing a fancy dress and delicate jewelry, puts down a bowl of food on a banquet table full of fancy dishes. She sits down, anticipating.
NERINA (V.O.)
Today marks the 10th year of our marriage.
Footsteps echo.
▲MORVANE (male mermaid, 20) approaches from the shadows. His eyes are cold and murderous. Energy coils in his palm,condensing into a blade of light.
▲Nerina rises, turns toward him, smiling warmly.
NERINA
Morvane, you're home.
▲The blade slams into her chest.
▲A wet, brutal sound. The moment of penetration. Blood blooms across her gown.`;
  }
  return `${guide}

中文示例：
第一集
1-1 苏家-堂屋 日景 内景 
出场人物：苏父、沈家媒婆、苏念禾（15岁）
▲桌上摆着几锭白花花的银子，光泽诱人。苏父眼睛直勾勾地盯着银子，手还在衣服上贪婪地蹭了蹭。
▲媒婆一身喜庆打扮，脸上挂着职业假笑，手里摇着帕子。
沈家媒婆（精明）：苏老爹，咱们明人不说暗话。沈家可是镇上的首富，这二少爷虽说病得重了些，急需个八字相合的姑娘冲喜，但这排场、这银子，那可是别人几辈子都挣不来的。
▲苏念禾躲在门帘后，透过缝隙看着那一桌银子，眼神麻木。
苏念禾os：沈家二少爷快病死了，镇上都知道，这时候嫁进去，若是人死了，弄不好是要殉葬的。这不亚于送死。
苏父（满脸堆笑，手按在银子上）：是是是，沈家大气！
沈家媒婆：只是有一点，这婚事急，三天内就得过门！您家这三丫头的八字，可是跟二少爷绝配。
苏父（毫不犹豫，拍大腿）：嫁！只要沈家不嫌弃她是哑巴，别说三天，明天都能嫁！这闺女，我养这么大，也该回报家里了。
苏念禾os：大姐出嫁了，二姐嘴甜手巧，爹舍不得。
苏念禾os：而我，是一个哑巴，自出生起就没说过话。用我这个看不顺眼的哑巴换这么多钱，在他心里，值了。"`;
}

function uploadMethodContentTemplate(method) {
  if (method === "upload") {
    return `
      <div class="upload-mode-panel upload-mode-panel-upload">
        <div class="upload-mode-box drop-zone" data-drop-zone>
          <div class="upload-mode-intro">
            <div class="folder-symbol"></div>
            <div>
              <h3>上传剧本文件</h3>
              <p class="support">支持 TXT、Markdown、DOCX。拖入文件或点击按钮选择本地文件。</p>
            </div>
          </div>
          <div class="upload-mode-footer">
            <p class="note">支持格式：TXT | DOCX。DOCX 在 demo 中使用同名样例脚本。</p>
            <div class="upload-actions">
              <input class="hidden" id="fileInput" type="file" accept=".txt,.md,.doc,.docx" />
              <button type="button" class="secondary-button" data-action="pick-file">本地上传</button>
              <button type="button" class="primary-button" data-action="use-sample">使用示例导入</button>
            </div>
          </div>
          ${state.fileName ? `<p class="selected-file">已选择：${escapeHtml(state.fileName)}</p>` : ""}
        </div>
      </div>
    `;
  }
  if (method === "link") {
    return `
      <div class="upload-mode-panel">
        <div class="upload-mode-box">
          <input class="text-input upload-link-input" id="linkInput" placeholder="把在线文档链接粘贴到这里" />
          <p class="note">支持公开可访问的 TXT 链接，其他文档源可在后端接入解析服务。</p>
          <div class="upload-mode-actions">
            <button type="button" class="secondary-button" data-action="import-link">导入链接</button>
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="upload-mode-panel">
      <div class="upload-mode-box">
        <textarea class="paste-input upload-main-textarea" id="pasteInput" placeholder="${escapeHtml(pasteTextareaInputPlaceholder())}">${escapeHtml(state.rawText)}</textarea>
        <div class="upload-mode-footer">
          <p class="note">粘贴内容会被自动识别为第几集，并继续拆成第几场</p>
          <button type="button" class="secondary-button ${shouldShowPasteImportButton(state.rawText) ? "" : "hidden"}" data-action="import-paste-next" data-paste-import-button>导入文本</button>
        </div>
      </div>
    </div>
  `;
}

function shouldShowPasteImportButton(text) {
  return countCharacters(text) >= 20;
}

function pasteTextareaInputPlaceholder() {
  return "请输入剧本内容，不超过20万字...";
}

function pasteTextareaPlaceholder() {
  return `参考格式 
集标题    格式为“第 X 集 ”
场次信息  格式为“场次编号  地点  时间（日/夜景） 内/外景 ”。
出场人物；格式为“出场人物：角色A、角色B……”。
场景描写  统一在句首补 ▲。
内心独白  统一整理为 【角色名 OS：……】。
画外音 统一整理为 【角色名 OV：……】。
台词 统一整理为“角色名（神态动作）：台词内容”。

示例：
第一集
1-1 苏家-堂屋 日景 内景 
出场人物：苏父、沈家媒婆、苏念禾（15岁）
▲桌上摆着几锭白花花的银子，光泽诱人。苏父眼睛直勾勾地盯着银子，手还在衣服上贪婪地蹭了蹭。
▲媒婆一身喜庆打扮，脸上挂着职业假笑，手里摇着帕子。
沈家媒婆（精明）：苏老爹，咱们明人不说暗话。沈家可是镇上的首富，这二少爷虽说病得重了些，急需个八字相合的姑娘冲喜，但这排场、这银子，那可是别人几辈子都挣不来的。
▲苏念禾躲在门帘后，透过缝隙看着那一桌银子，眼神麻木。
苏念禾os：沈家二少爷快病死了，镇上都知道，这时候嫁进去，若是人死了，弄不好是要殉葬的。这不亚于送死。
苏父（满脸堆笑，手按在银子上）：是是是，沈家大气！
沈家媒婆：只是有一点，这婚事急，三天内就得过门！您家这三丫头的八字，可是跟二少爷绝配。
苏父（毫不犹豫，拍大腿）：嫁！只要沈家不嫌弃她是哑巴，别说三天，明天都能嫁！这闺女，我养这么大，也该回报家里了。
苏念禾os：大姐出嫁了，二姐嘴甜手巧，爹舍不得。
苏念禾os：而我，是一个哑巴，自出生起就没说过话。用我这个看不顺眼的哑巴换这么多钱，在他心里，值了。"`;
}

function loadingTemplate() {
  return shell(`
    <main class="loading-page">
      ${routeTemplate()}
      ${stepsTemplate(1)}
      <section class="loading-workspace">
        <div class="loading-card">
          <div class="loading-orbit" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p class="eyebrow">Script Parsing</p>
          <h1>拆解中</h1>
          <div class="loading-progress"><span></span></div>
          <p class="note">${escapeHtml(state.loadingLabel || "导入内容")} · 演示流程约 3 秒后自动完成</p>
          <button type="button" class="secondary-button loading-cancel-button" data-action="cancel-loading">取消拆解</button>
        </div>
      </section>
    </main>
  `);
}

function fileImportTemplate() {
  return `
    <section class="method-card method-upload">
      <div class="method-head">
        <span class="method-index">01</span>
        <div>
          <h2>本地上传</h2>
          <p>适合 TXT、Markdown；DOCX 在 demo 中使用同名样例脚本。</p>
        </div>
      </div>
      <div class="drop-zone" data-drop-zone>
        <div class="drop-inner">
        <div class="folder-symbol"></div>
        <h3>上传剧本文件</h3>
        <p class="support">点击选择文件，也可以把 TXT 文档拖入此区域。</p>
        <div class="upload-actions">
          <input class="hidden" id="fileInput" type="file" accept=".txt,.md,.doc,.docx" />
          <button type="button" class="secondary-button" data-action="pick-file">本地上传</button>
          <button type="button" class="primary-button" data-action="use-sample">使用示例导入</button>
        </div>
        <p class="note">支持格式：TXT | DOCX。DOCX 示例来自你提供的导入剧本。</p>
        ${state.fileName ? `<p class="selected-file">已选择：${escapeHtml(state.fileName)}</p>` : ""}
        </div>
      </div>
    </section>
  `;
}

function linkImportTemplate() {
  return `
    <section class="method-card method-link">
      <div class="method-head">
        <span class="method-index">02</span>
        <div>
          <h2>导入链接</h2>
          <p>粘贴在线文档或公开文本地址，一键拉取内容。</p>
        </div>
      </div>
      <div class="compact-zone">
        <div class="input-row">
          <input class="text-input" id="linkInput" placeholder="https://..." />
          <button type="button" class="secondary-button" data-action="import-link">导入链接</button>
        </div>
        <p class="note">支持公开可访问的 TXT 链接，其他文档源可在后端接入解析服务。</p>
      </div>
    </section>
  `;
}

function pasteImportTemplate() {
  return `
    <section class="method-card method-paste">
      <div class="method-head">
        <span class="method-index">03</span>
        <div>
          <h2>直接粘贴剧本</h2>
          <p>适合从小说正文、已有剧本或编辑器里快速复制。</p>
        </div>
      </div>
      <div class="paste-content">
        <textarea class="paste-input" id="pasteInput" placeholder="把小说正文或已有剧本文本粘贴到这里...">${escapeHtml(state.rawText)}</textarea>
        <button type="button" class="primary-button method-next-button" data-action="import-paste-next">下一步</button>
        <p class="note">粘贴内容会被自动识别为第几集，并继续拆成第几场。</p>
      </div>
    </section>
  `;
}

function editorTemplate() {
  const scene = currentScene();
  const editorState = sceneEditorState(scene);
  const displayText = editorState.body;
  const displaySceneNumber = formatSceneMetaSceneNumber(editorState.sceneNumber);
  const displayLocation = formatSceneMetaLocation(editorState.location);
  const review = state.aiFixInline;
  const sidebarTab = state.sidebarTab || "script";
  const showAux = sidebarTab !== "script";
  const sceneTypeOptions = sceneMetaSceneTypeOptions();
  const dayPartOptions = sceneMetaDayPartOptions();
  return shell(`
    <main class="editor-page">
      ${editorRouteTemplate()}
      ${editorTitleTemplate(scene)}
      <section class="editor-shell">
        <div class="workbench-tabs">
          <div class="workbench-tabs-left">
            <button type="button" class="tab-button active">剧本编辑</button>
            <button type="button" class="tab-button">剧本预览</button>
          </div>
          <div class="workbench-actions">
            <button type="button" class="small-button workbench-language" data-action="toggle-english-sidebar">
              <span>${state.englishSidebar ? "切换中文" : "切换英文"}</span>
              <span class="workbench-note">仅做展示非功能</span>
            </button>
            <button type="button" class="small-button workbench-add" data-action="workbench-add">添加</button>
          </div>
        </div>
        <div class="workbench-metrics">
          <div class="workbench-source">剧集 ｜ ${state.episodes.length} 集</div>
          <div class="metric-row">
            <span class="metric">字数 ${countCharacters(state.rawText)}</span>
            <span class="metric">对白 ${dialogueRatio()}%</span>
            <span class="metric">阅读 19分钟</span>
            <span class="metric">拍摄 约19分钟</span>
          </div>
          <div class="remote-save">
            <span>✓ 远程已保存 ${state.lastSaved === "未保存" ? "11:17:12" : escapeHtml(state.lastSaved.replace("已保存 ", ""))}</span>
            <button type="button" class="title-save-button" data-action="save-preview">保存</button>
            <button type="button" class="title-check-button" data-action="validate-preview">校验</button>
          </div>
        </div>
        <div class="editor-body">
          <aside class="sidebar">
          <div class="sidebar-catalog">
            <button type="button" class="sidebar-catalog-item ${sidebarTab === "outline" ? "active" : ""}" data-action="sidebar-tab" data-tab="outline">${escapeHtml(sidebarTabLabel("outline"))}</button>
            <button type="button" class="sidebar-catalog-item ${sidebarTab === "bio" ? "active" : ""}" data-action="sidebar-tab" data-tab="bio">${escapeHtml(sidebarTabLabel("bio"))}</button>
            <button type="button" class="sidebar-catalog-item ${sidebarTab === "hook" ? "active" : ""}" data-action="sidebar-tab" data-tab="hook">${escapeHtml(sidebarTabLabel("hook"))}</button>
          </div>
          <div class="episode-list">
            ${state.episodes.map(episodeTemplate).join("")}
          </div>
          </aside>

          <section class="content">
          <div class="compare-grid">
            <section class="pane">
              <div class="script-box">
                ${
                  showAux
                    ? auxPanelTemplate(sidebarTab)
                    : review
                    ? inlineDiffTemplate(review)
                    : `
                  <div class="script-editor-panel">
                    <div class="scene-meta-grid">
                      <label class="scene-meta-field">
                        <span class="scene-meta-label">${escapeHtml(sceneMetaFieldLabel("sceneNumber"))}</span>
                        <input class="scene-meta-input" data-scene-meta="sceneNumber" type="text" value="${escapeHtml(displaySceneNumber)}" spellcheck="false" readonly />
                      </label>
                      <label class="scene-meta-field">
                        <span class="scene-meta-label">${escapeHtml(sceneMetaFieldLabel("location"))}</span>
                        <input class="scene-meta-input" data-scene-meta="location" data-raw-value="${escapeHtml(editorState.location)}" type="text" value="${escapeHtml(displayLocation)}" spellcheck="false" />
                      </label>
                      <label class="scene-meta-field">
                        <span class="scene-meta-label">${escapeHtml(sceneMetaFieldLabel("sceneType"))}</span>
                        <select class="scene-meta-input" data-scene-meta="sceneType">
                          ${sceneTypeOptions
                            .map(
                              (option) =>
                                `<option value="${escapeHtml(option.value)}" ${editorState.sceneType === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`
                            )
                            .join("")}
                        </select>
                      </label>
                      <label class="scene-meta-field">
                        <span class="scene-meta-label">${escapeHtml(sceneMetaFieldLabel("dayPart"))}</span>
                        <select class="scene-meta-input" data-scene-meta="dayPart">
                          ${dayPartOptions
                            .map(
                              (option) =>
                                `<option value="${escapeHtml(option.value)}" ${editorState.dayPart === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`
                            )
                            .join("")}
                        </select>
                      </label>
                    </div>
                    <div class="script-editor-wrap">
                      <pre class="script-line-gutter" data-display-line-nos aria-hidden="true">${editorLineNumbers(displayText)}</pre>
                      <pre class="script-highlight" data-display-highlight aria-hidden="true">${highlightEditableScript(displayText)}</pre>
                      <textarea class="script-editor" data-display-editor spellcheck="false" placeholder="${escapeHtml(scriptEditorPlaceholder())}">${escapeHtml(displayText)}</textarea>
                    </div>
                  </div>
                `
                }
              </div>
            </section>
          </div>
          </section>
        </div>
        ${state.showValidationIssues ? issuePopoverTemplate() : ""}
        ${state.addDialog ? addDialogTemplate(state.addDialog) : ""}
      </section>
    </main>
  `, "editor");
}

function addDialogTemplate(dialog) {
  const type = dialog?.type || "episode";
  const content = dialog?.content || "";
  const episodeCount = Math.max(1, Number(dialog?.episodeCount || 1));
  const sceneCount = Math.max(1, Number(dialog?.sceneCount || 1));
  const sceneSpec = `${episodeCount}-${sceneCount}`;
  const duplicateScene = type === "episode" ? findSceneDuplicateInfo(episodeCount, sceneCount) : null;
  const contentError = dialog?.contentError || "";
  const contentPlaceholder =
    type === "outline"
      ? "请输入正文内容，剧本大纲可为空"
      : type === "episode"
        ? "请输入正文内容，剧集内容不可为空"
        : "请输入正文内容";
  return `
    <div class="modal-overlay" role="dialog" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-head">
          <div class="modal-title">添加</div>
        </div>
        <div class="modal-body">
          ${
            type === "episode"
              ? `
          <label class="modal-label">添加集数</label>
          <input class="modal-input" data-add-episode-count type="number" min="1" step="1" value="${episodeCount}" />
          <label class="modal-label">添加场次数</label>
          <div class="modal-stepper">
            <input class="modal-input modal-input-stepper" data-add-scene-count type="text" inputmode="numeric" value="${escapeHtml(sceneSpec)}" />
            <div class="modal-stepper-buttons">
              <button type="button" class="modal-stepper-button" data-action="scene-count-up" aria-label="增加场次数">▲</button>
              <button type="button" class="modal-stepper-button" data-action="scene-count-down" aria-label="减少场次数">▼</button>
            </div>
          </div>
          ${duplicateScene ? `<div class="modal-toast toast" role="status">已有第${escapeHtml(toChineseNumber(duplicateScene.episodeNo))}集第${escapeHtml(toChineseNumber(duplicateScene.sceneNo))}场，不可重复添加剧集</div>` : ""}
          `
              : ""
          }
          <label class="modal-label">添加正文</label>
          <textarea class="modal-textarea" data-add-content spellcheck="false" placeholder="${escapeHtml(contentPlaceholder)}">${escapeHtml(content)}</textarea>
          ${contentError ? `<div class="modal-toast toast" role="status">${escapeHtml(contentError)}</div>` : ""}
        </div>
        <div class="modal-actions">
          <button type="button" class="secondary-button" data-action="add-cancel">取消</button>
          <button type="button" class="primary-button" data-action="add-confirm">确定</button>
        </div>
      </div>
    </div>
  `;
}

function auxPanelTemplate(tab) {
  const meta = tabMeta(tab);
  const value = tabItems(tab);
  const placeholder =
    tab === "outline"
      ? "请输入正文内容，剧本大纲可为空"
      : tab === "bio"
        ? "请输入正文内容，人物小传可为空"
        : tab === "hook"
          ? "请输入正文内容，前置钩子可为空"
        : "请输入正文内容";
  return `
    <div class="aux-panel" data-aux-tab="${escapeHtml(tab)}">
      <textarea class="aux-main-editor" data-aux-main-editor data-tab="${escapeHtml(tab)}" placeholder="${escapeHtml(placeholder)}" spellcheck="false">${escapeHtml(value || "")}</textarea>
    </div>
  `;
}

function tabMeta(tab) {
  if (tab === "outline") return { title: "剧本大纲", subtitle: "以要点形式整理剧情脉络与节奏" };
  if (tab === "bio") return { title: "人物小传", subtitle: "补充人物背景、关系与动机" };
  return { title: "前置钩子", subtitle: "放在开头的画面/冲突钩子" };
}

function sidebarTabLabel(tab) {
  if (!state.englishSidebar) {
    if (tab === "outline") return "剧本大纲";
    if (tab === "bio") return "人物小传";
    return "前置钩子";
  }
  if (tab === "outline") return "Outline";
  if (tab === "bio") return "Character Bio";
  return "Cold Open";
}

function sceneMetaFieldLabel(field) {
  if (!state.englishSidebar) {
    if (field === "sceneNumber") return "场次号";
    if (field === "location") return "地点";
    if (field === "sceneType") return "内/外景";
    return "日/夜景";
  }
  if (field === "sceneNumber") return "Scene No.";
  if (field === "location") return "Location";
  if (field === "sceneType") return "INT/EXT";
  return "Day/Night";
}

function sceneMetaSceneTypeOptions() {
  return [
    { value: "内景", label: state.englishSidebar ? "INT" : "内景" },
    { value: "外景", label: state.englishSidebar ? "EXT" : "外景" },
  ];
}

function sceneMetaDayPartOptions() {
  return [
    { value: "", label: state.englishSidebar ? "Unset" : "未填" },
    { value: "日景", label: state.englishSidebar ? "Day" : "日景" },
    { value: "夜景", label: state.englishSidebar ? "Night" : "夜景" },
  ];
}

function scriptEditorPlaceholder() {
  return state.englishSidebar ? "Enter body text; episode content cannot be empty" : "请输入正文，剧集正文不可为空";
}

function formatSceneMetaSceneNumber(sceneNumber) {
  return state.englishSidebar ? String(sceneNumber || "").replace(/-/g, ".") : String(sceneNumber || "");
}

function formatSceneMetaLocation(location) {
  if (!state.englishSidebar) return String(location || "");
  const translated = translateLocationLabel(String(location || ""));
  return translated ? translated.toUpperCase() : "";
}

function tabItems(tab) {
  if (tab === "outline") return state.outlineText;
  if (tab === "bio") return state.bioText;
  return state.hookText;
}

function setTabItems(tab, items) {
  if (tab === "outline") state.outlineText = items;
  else if (tab === "bio") state.bioText = items;
  else state.hookText = items;
}

function sceneButtonLabel(scene, episodeIndex, sceneIndex) {
  if (state.englishSidebar) return englishSceneButtonLabel(scene, episodeIndex, sceneIndex);
  const fallbackNumber = `${episodeIndex + 1}-${sceneIndex + 1}`;
  const parsed = scene?.generated ? safeParseJson(scene.generated) : null;
  const sceneNumber = parsed?.scene_description?.scene_number || fallbackNumber;
  const location = parsed?.scene_description?.location || "场景名称";
  const time = parsed?.scene_description?.time_of_day || "";
  let locationLabel = normalizeSidebarLocationLabel(location);
  if (!locationLabel || locationLabel === "场景名称" || locationLabel === "内景" || locationLabel === "外景") locationLabel = "空地点";
  const timeLabel = normalizeTimeOfDay(time);
  const typeLabel = displaySceneType(location);
  return `${sceneNumber} ${locationLabel} ${timeLabel} ${typeLabel}`;
}

function normalizeSidebarLocationLabel(location) {
  return normalizeLocation(location)
    .replace(/^(内景|外景)\s*/g, "")
    .replace(/\s+(内景|外景)\s*/g, " ")
    .trim();
}

function truncateSidebarLabel(label, maxChars = 10) {
  const chars = Array.from(String(label || ""));
  if (chars.length <= maxChars) return String(label || "");
  return `${chars.slice(0, maxChars).join("")}...`;
}

function episodeTemplate(episode, episodeIndex) {
  const isEpisodeActive = state.activeEpisode === episodeIndex;
  const title = state.englishSidebar ? englishEpisodeTitle(episode, episodeIndex) : episode.title;
  const countLabel = state.englishSidebar ? `${episode.scenes.length} Scenes` : `${episode.scenes.length} 场`;
  const deleteEpisodeLabel = state.englishSidebar ? "Delete" : "删除";
  const deleteSceneLabel = state.englishSidebar ? "Delete" : "删除";
  return `
    <div class="episode-block">
      <div class="episode-title-row ${isEpisodeActive ? "active" : ""}">
        <button type="button" class="episode-title ${isEpisodeActive ? "active" : ""}" data-episode="${episodeIndex}">
          <span>${escapeHtml(title)}</span>
          <span class="episode-count">${escapeHtml(countLabel)}</span>
        </button>
        <button type="button" class="sidebar-delete-button" data-action="delete-episode" data-episode-index="${episodeIndex}" aria-label="${escapeHtml(deleteEpisodeLabel)}" title="${escapeHtml(deleteEpisodeLabel)}">${escapeHtml(deleteEpisodeLabel)}</button>
      </div>
      <div class="scene-list">
        ${episode.scenes
          .map(
            (scene, sceneIndex) => `
              <div class="scene-item-row ${isEpisodeActive && state.activeScene === sceneIndex ? "active" : ""}" data-scene-row="${episodeIndex}:${sceneIndex}">
                <button type="button" class="scene-item ${isEpisodeActive && state.activeScene === sceneIndex ? "active" : ""}" data-scene="${episodeIndex}:${sceneIndex}">
                  <span>${escapeHtml(truncateSidebarLabel(sceneButtonLabel(scene, episodeIndex, sceneIndex)))}</span>
                </button>
                <button type="button" class="sidebar-delete-button" data-action="delete-scene" data-episode-index="${episodeIndex}" data-scene-index="${sceneIndex}" aria-label="${escapeHtml(deleteSceneLabel)}" title="${escapeHtml(deleteSceneLabel)}">${escapeHtml(deleteSceneLabel)}</button>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function issuePopoverTemplate() {
  if (state.validationStatus === "fixed") {
    return `
      <aside class="issue-popover issue-popover-success">
        <div class="issue-head">
          <span class="issue-success-mark">✓</span>
          <h3>AI 已自动补全</h3>
        </div>
        <p class="issue-tip">已补齐缺失场次头，并修正不连续场号。可继续保存或进入下一步。</p>
      </aside>
    `;
  }
  return `
    <aside class="issue-popover">
      <div class="issue-head">
        <span class="issue-warning">△</span>
        <h3>${demoValidationIssueCount()} 处格式问题</h3>
        <span class="issue-chevron">⌄</span>
      </div>
      <p class="issue-tip">修改错误后行号定位可能会有误差</p>
      <div class="issue-list">
        ${DEMO_VALIDATION_GROUPS.map((group) => issueGroupTemplate(group)).join("")}
      </div>
    </aside>
  `;
}

function issueGroupTemplate(group) {
  const issues = group?.issues || [];
  const headAction =
    group?.key === "location"
      ? `<button type="button" class="ai-fix-button" data-action="ai-fix-issues">AI自动补全</button>`
      : "";
  const body = issues.length
    ? issues
        .map(
          (issue) => `
            <div class="issue">
              <span class="issue-checkbox"></span>
              <span>${escapeHtml(issue)}</span>
            </div>
          `
        )
        .join("")
    : `<div class="issue-empty">暂无问题</div>`;
  return `
    <section class="issue-group" data-issue-group="${escapeHtml(group?.key || "")}">
      <div class="issue-group-head">
        <div class="issue-group-title">${escapeHtml(group?.label || "")}</div>
        ${headAction}
      </div>
      <div class="issue-group-body">
        ${body}
      </div>
    </section>
  `;
}

function scriptLines(text) {
  const lines = text.split("\n");
  if (!text.trim()) return [`<div class="empty-state">暂无内容</div>`];
  return lines
    .map((line, index) => {
      const className = classifyLine(line);
      return `
        <div class="line">
          <span class="line-no">${index + 1}</span>
          <span class="${className}">${line ? escapeHtml(line) : "&nbsp;"}</span>
        </div>
      `;
    })
    .join("");
}

function highlightEditableScript(text) {
  if (!text.trim()) return "";
  return text
    .split("\n")
    .map((line) => {
      const escaped = escapeHtml(line) || "&nbsp;";
      if (/^\d+-\d+/.test(line)) return `<span class="editor-scene-meta">${escaped}</span>`;
      if (/^出场人物/.test(line)) return `<span class="editor-people">${escaped}</span>`;
      return escaped;
    })
    .join("\n");
}

function editorLineNumbers(text) {
  const lineCount = Math.max(1, text.split("\n").length);
  return Array.from({ length: lineCount }, (_, index) => index + 1).join("\n");
}

function sceneEditorState(scene) {
  const fallback = defaultSceneMeta(scene);
  const parsed = parseSceneHeader(scene?.display ?? "");
  const lines = String(scene?.display ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const body =
    parsed.headerIndex >= 0
      ? lines.filter((_, index) => index !== parsed.headerIndex).join("\n").replace(/^\n+/, "")
      : String(scene?.display ?? "");
  return {
    sceneNumber: parsed.sceneNumber || fallback.sceneNumber,
    location: parsed.location || fallback.location,
    sceneType: parsed.sceneType || fallback.sceneType,
    dayPart: parsed.dayPart || "",
    body,
  };
}

function defaultSceneMeta(scene) {
  const parsed = scene?.generated ? safeParseJson(scene.generated) : null;
  const sceneNumber = parsed?.scene_description?.scene_number || `${state.activeEpisode + 1}-${state.activeScene + 1}`;
  const location = parsed?.scene_description?.location || "场景名称";
  return {
    sceneNumber,
    location: normalizeSceneMetaLocation(location),
    sceneType: displaySceneType(location),
  };
}

function normalizeSceneMetaLocation(location) {
  const normalized = normalizeLocation(location);
  if (!normalized || normalized === "场景名称") return "";
  if (normalized === "内景" || normalized === "外景") return "";
  return normalized;
}

function parseSceneHeader(text) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*\d+-\d+/.test(line));
  if (headerIndex < 0) {
    return { headerIndex: -1, sceneNumber: "", location: "", sceneType: "", dayPart: "" };
  }
  const header = lines[headerIndex].trim();
  const match = header.match(/^(\d+-\d+)\s*(.*)$/);
  if (!match) {
    return { headerIndex, sceneNumber: "", location: "", sceneType: "", dayPart: "" };
  }
  const sceneNumber = match[1];
  const tokens = match[2]
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  let sceneType = "";
  let dayPart = "";
  const locationTokens = [];
  tokens.forEach((token) => {
    if (!sceneType && /^(内景|外景)$/.test(token)) {
      sceneType = token;
      return;
    }
    if (!dayPart && /^(日景|夜景|日|夜)$/.test(token)) {
      dayPart = token === "日" ? "日景" : token === "夜" ? "夜景" : token;
      return;
    }
    locationTokens.push(token);
  });
  return {
    headerIndex,
    sceneNumber,
    location: locationTokens.join(" ").trim(),
    sceneType,
    dayPart,
  };
}

function buildSceneHeaderLine(meta) {
  const sceneNumber = String(meta?.sceneNumber || `${state.activeEpisode + 1}-${state.activeScene + 1}`).trim() || `${state.activeEpisode + 1}-${state.activeScene + 1}`;
  const dayPart = String(meta?.dayPart || "").trim();
  const sceneType = String(meta?.sceneType || "内景").trim() || "内景";
  const location = String(meta?.location || "").trim();
  return [sceneNumber, dayPart, sceneType, location].filter(Boolean).join(" ");
}

function sceneMetaFromDom(scene) {
  const editorState = sceneEditorState(scene);
  const sceneNumberInput = document.querySelector('[data-scene-meta="sceneNumber"]');
  const locationInput = document.querySelector('[data-scene-meta="location"]');
  const sceneTypeInput = document.querySelector('[data-scene-meta="sceneType"]');
  const dayPartInput = document.querySelector('[data-scene-meta="dayPart"]');
  const rawLocation = locationInput?.dataset.rawValue || editorState.location;
  const displayedRawLocation = formatSceneMetaLocation(rawLocation);
  const nextLocationValue = locationInput?.value.trim() || "";
  return {
    sceneNumber: normalizeSceneMetaSceneNumber(sceneNumberInput?.value.trim() || editorState.sceneNumber),
    location: state.englishSidebar && nextLocationValue === displayedRawLocation ? rawLocation : nextLocationValue || editorState.location,
    sceneType: sceneTypeInput?.value || editorState.sceneType,
    dayPart: dayPartInput?.value || "",
  };
}

function normalizeSceneMetaSceneNumber(value) {
  return String(value || "").replace(/\./g, "-");
}

function updateSceneGeneratedMeta(scene, meta, bodyText = "") {
  if (!scene?.generated) return;
  const parsed = safeParseJson(scene.generated);
  if (!parsed) return;
  parsed.scene_description = parsed.scene_description || {};
  parsed.scene_description.scene_number = meta.sceneNumber;
  parsed.scene_description.location = `${meta.sceneType} ${meta.location}`.trim();
  parsed.scene_description.time_of_day = meta.dayPart || "";
  scene.generated = JSON.stringify(parsed, null, 2);
  scene.minutes = Math.max(1, Math.ceil(countCharacters(bodyText) / 260));
}

function syncSceneEditorState() {
  const scene = currentScene();
  const displayEditor = document.querySelector("[data-display-editor]");
  if (!displayEditor || !scene) return;
  const bodyText = displayEditor.value;
  const meta = sceneMetaFromDom(scene);
  scene.display = [buildSceneHeaderLine(meta), bodyText].filter((part, index) => index === 0 || part !== "").join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
  updateSceneGeneratedMeta(scene, meta, bodyText);
}

function classifyLine(line) {
  if (/^第.+集/.test(line)) return "script-heading";
  if (/^\d+-\d+|^第.+场|^场景/.test(line)) return "script-scene";
  if (/^出场人物/.test(line)) return "script-heading";
  if (/^[^：:]{1,8}[：:]/.test(line)) return "script-role";
  if (/^▲|^\[|^（|^【/.test(line)) return "script-note";
  return "";
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.action;
      if (action === "pick-file") document.querySelector("#fileInput")?.click();
      if (action === "use-sample") importText(SAMPLE_NOVEL, "示例文本");
      if (action === "import-paste-next") {
        const value = document.querySelector("#pasteInput")?.value || "";
        importText(value || SAMPLE_NOVEL, value ? "粘贴文本" : "示例文本");
      }
      if (action === "switch-upload-method") {
        state.uploadMethod = event.currentTarget.dataset.method || "link";
        render();
      }
      if (action === "switch-upload-sample") {
        state.uploadSampleLang = event.currentTarget.dataset.lang === "en" ? "en" : "cn";
        render();
      }
      if (action === "import-current-method") {
        const method = activeUploadMethod();
        if (method === "upload") {
          document.querySelector("#fileInput")?.click();
          return;
        }
        if (method === "link") {
          importFromLink();
          return;
        }
        const value = document.querySelector("#pasteInput")?.value || "";
        importText(value || SAMPLE_NOVEL, value ? "粘贴文本" : "示例文本");
      }
      if (action === "import-link") importFromLink();
      if (action === "back-upload" || action === "replace") {
        clearLoadingTimer();
        state.view = "upload";
        render();
      }
      if (action === "cancel-loading") {
        clearLoadingTimer();
        state.loadingLabel = "";
        state.view = "upload";
        render();
      }
      if (action === "next-step") {
        state.toast = "已进入贡献要素步骤";
        render();
      }
      if (action === "save-preview") {
        syncDisplayEditor();
        state.lastSaved = "已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
        render();
      }
      if (action === "validate-preview") {
        syncDisplayEditor();
        state.showValidationIssues = true;
        state.validationStatus = "failed";
        render();
      }
      if (action === "ai-fix-issues") {
        syncDisplayEditor();
        const scene = currentScene();
        if (!scene) return;
        const from = scene.display ?? "";
        const to = autoFixSceneText(from, scene);
        state.showValidationIssues = false;
        const inline = buildInlineDiff(from, to);
        if (!inline.changes.length) {
          state.validationStatus = "fixed";
          state.lastSaved = "已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
          render();
          return;
        }
        state.aiFixInline = inline;
        render();
      }
      if (action === "inline-accept") {
        const index = Number(event.currentTarget.dataset.index);
        resolveInlineChange(index, "accept");
      }
      if (action === "inline-reject") {
        const index = Number(event.currentTarget.dataset.index);
        resolveInlineChange(index, "reject");
      }
      if (action === "inline-cancel") {
        state.aiFixInline = null;
        state.showValidationIssues = true;
        render();
      }
      if (action === "inline-apply") {
        const scene = currentScene();
        if (!state.aiFixInline || !scene) return;
        scene.display = applyInlineDiff(state.aiFixInline);
        state.validationStatus = "fixed";
        state.lastSaved = "已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
        state.aiFixInline = null;
        state.showValidationIssues = true;
        render();
      }
      if (action === "help") alert("Demo 提示：左侧选择集和场，预览区展示结构化后的漫剧脚本，可直接修改并保存。");
      if (action === "toggle-english-sidebar") {
        state.englishSidebar = !state.englishSidebar;
        render();
      }
      if (action === "scene-count-up") {
        if (!state.addDialog) return;
        state.addDialog = {
          ...state.addDialog,
          contentError: "",
          sceneCount: Math.max(1, Number(state.addDialog.sceneCount || 1)) + 1,
        };
        render();
        focusSceneSpecInput();
      }
      if (action === "scene-count-down") {
        if (!state.addDialog) return;
        state.addDialog = {
          ...state.addDialog,
          contentError: "",
          sceneCount: Math.max(1, Math.max(1, Number(state.addDialog.sceneCount || 1)) - 1),
        };
        render();
        focusSceneSpecInput();
      }
      if (action === "sidebar-tab") {
        const tab = event.currentTarget.dataset.tab || "outline";
        state.sidebarTab = tab;
        state.aiFixInline = null;
        render();
        focusAuxEditor();
      }
      if (action === "workbench-add") {
        state.addDialog = { type: currentAddDialogType(), content: "", contentError: "", episodeCount: nextAvailableEpisodeNumber(), sceneCount: 1 };
        render();
        focusAddDialog();
      }
      if (action === "delete-episode") {
        const episodeIndex = Number(event.currentTarget.dataset.episodeIndex);
        deleteEpisodeAt(episodeIndex);
      }
      if (action === "delete-scene") {
        const episodeIndex = Number(event.currentTarget.dataset.episodeIndex);
        const sceneIndex = Number(event.currentTarget.dataset.sceneIndex);
        deleteSceneAt(episodeIndex, sceneIndex);
      }
      if (action === "add-cancel") {
        state.addDialog = null;
        render();
      }
      if (action === "add-confirm") {
        const dialog = state.addDialog;
        if (!dialog) return;
        const type = dialog.type || "episode";
        const content = dialog.content || "";
        if (type === "episode") {
          const episodeCount = Math.max(1, Number(dialog.episodeCount || 1));
          const sceneCount = Math.max(1, Number(dialog.sceneCount || 1));
          const duplicateScene = findSceneDuplicateInfo(episodeCount, sceneCount);
          if (duplicateScene) {
            render();
            focusAddDialog();
            return;
          }
          if (!String(content).trim()) {
            state.addDialog = { ...dialog, contentError: "请先填写正文后再添加剧集" };
            render();
            focusAddContentInput();
            return;
          }
          state.addDialog = null;
          addEpisodeSceneWithContent(content, episodeCount, sceneCount);
          state.sidebarTab = "script";
          render();
          return;
        }
        state.addDialog = null;
        const prev = tabItems(type) || "";
        const next = prev ? `${prev}\n\n${content}` : content;
        setTabItems(type, next);
        state.sidebarTab = type;
        render();
        focusAuxEditor();
      }
    });
  });

  document.querySelector("#fileInput")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
  });

  const displayEditor = document.querySelector("[data-display-editor]");
  const displayHighlight = document.querySelector("[data-display-highlight]");
  const displayLineNos = document.querySelector("[data-display-line-nos]");
  if (displayEditor) {
    displayEditor.addEventListener("input", () => {
      syncSceneEditorState();
      if (displayHighlight) displayHighlight.innerHTML = highlightEditableScript(displayEditor.value);
      if (displayLineNos) displayLineNos.textContent = editorLineNumbers(displayEditor.value);
    });
    displayEditor.addEventListener("scroll", () => {
      if (displayHighlight) {
        displayHighlight.scrollTop = displayEditor.scrollTop;
        displayHighlight.scrollLeft = displayEditor.scrollLeft;
      }
      if (displayLineNos) displayLineNos.scrollTop = displayEditor.scrollTop;
    });
  }

  document.querySelectorAll("[data-scene-meta]").forEach((input) => {
    const syncMetaOnly = () => syncSceneEditorState();
    input.addEventListener("input", syncMetaOnly);
    input.addEventListener("change", syncMetaOnly);
  });

  document.querySelectorAll("[data-inline-after-editor]").forEach((editor) => {
    const resizeEditor = () => {
      editor.style.height = "auto";
      editor.style.height = `${editor.scrollHeight}px`;
    };
    resizeEditor();
    editor.addEventListener("input", () => {
      if (!state.aiFixInline) return;
      const index = Number(editor.dataset.index);
      const changes = state.aiFixInline.changes.slice();
      if (!changes[index]) return;
      changes[index] = { ...changes[index], after: editor.value };
      state.aiFixInline = { ...state.aiFixInline, changes };
      resizeEditor();
    });
  });

  const dropZone = document.querySelector("[data-drop-zone]");
  if (dropZone) {
    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("dragover");
    });
    dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      dropZone.classList.remove("dragover");
      const file = event.dataTransfer.files?.[0];
      if (file) readFile(file);
    });
  }

  const pasteInput = document.querySelector("#pasteInput");
  const pasteImportButton = document.querySelector("[data-paste-import-button]");
  if (pasteInput && pasteImportButton) {
    const syncPasteImportButton = () => {
      pasteImportButton.classList.toggle("hidden", countCharacters(pasteInput.value) < 20);
    };
    syncPasteImportButton();
    pasteInput.addEventListener("input", syncPasteImportButton);
  }

  document.querySelectorAll("[data-episode]").forEach((button) => {
    button.addEventListener("click", () => {
      syncDisplayEditor();
      state.activeEpisode = Number(button.dataset.episode);
      state.activeScene = 0;
      state.sidebarTab = "script";
      state.showValidationIssues = false;
      state.validationStatus = "idle";
      render();
    });
  });

  document.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      syncDisplayEditor();
      const [episodeIndex, sceneIndex] = button.dataset.scene.split(":").map(Number);
      state.activeEpisode = episodeIndex;
      state.activeScene = sceneIndex;
      state.sidebarTab = "script";
      state.showValidationIssues = false;
      state.validationStatus = "idle";
      render();
    });
  });

  document.querySelectorAll("[data-aux-main-editor]").forEach((editor) => {
    const resizeEditor = () => {
      editor.style.height = "auto";
      editor.style.height = `${editor.scrollHeight}px`;
    };
    resizeEditor();
    editor.addEventListener("input", () => {
      const tab = editor.dataset.tab || "";
      if (!(tab === "outline" || tab === "bio" || tab === "hook")) return;
      setTabItems(tab, editor.value);
      resizeEditor();
    });
  });

  const addContent = document.querySelector("[data-add-content]");
  if (addContent) {
    addContent.addEventListener("input", () => {
      if (!state.addDialog) return;
      state.addDialog = { ...state.addDialog, content: addContent.value, contentError: "" };
    });
  }

  const addEpisodeCount = document.querySelector("[data-add-episode-count]");
  if (addEpisodeCount) {
    addEpisodeCount.addEventListener("input", () => {
      if (!state.addDialog) return;
      const nextEpisodeCount = Math.max(1, Number(addEpisodeCount.value || 1));
      state.addDialog = { ...state.addDialog, episodeCount: nextEpisodeCount, contentError: "" };
      const addSceneCount = document.querySelector("[data-add-scene-count]");
      if (addSceneCount) addSceneCount.value = `${nextEpisodeCount}-${Math.max(1, Number(state.addDialog.sceneCount || 1))}`;
      render();
      focusEpisodeCountInput();
    });
  }

  const addSceneCount = document.querySelector("[data-add-scene-count]");
  if (addSceneCount) {
    addSceneCount.addEventListener("input", () => {
      if (!state.addDialog) return;
      const parsed = parseSceneSpecInput(addSceneCount.value, state.addDialog.episodeCount);
      state.addDialog = {
        ...state.addDialog,
        contentError: "",
        episodeCount: parsed.episodeCount,
        sceneCount: parsed.sceneCount,
      };
      const addEpisodeCountInput = document.querySelector("[data-add-episode-count]");
      if (addEpisodeCountInput) addEpisodeCountInput.value = String(parsed.episodeCount);
      addSceneCount.value = `${parsed.episodeCount}-${parsed.sceneCount}`;
      render();
      focusSceneSpecInput();
    });
  }
}

function focusAuxEditor() {
  requestAnimationFrame(() => {
    const target = document.querySelector("[data-aux-main-editor]");
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: "smooth" });
    target.focus();
  });
}

function focusAddDialog() {
  requestAnimationFrame(() => {
    const first = document.querySelector("[data-add-episode-count]") || document.querySelector("[data-add-content]");
    first?.focus();
  });
}

function focusAddContentInput() {
  requestAnimationFrame(() => {
    const target = document.querySelector("[data-add-content]");
    target?.focus();
  });
}

function currentAddDialogType() {
  return state.sidebarTab === "script" ? "episode" : state.sidebarTab || "episode";
}

function focusEpisodeCountInput() {
  requestAnimationFrame(() => {
    const input = document.querySelector("[data-add-episode-count]");
    if (!input) return;
    input.focus();
    input.select?.();
  });
}

function focusSceneSpecInput() {
  requestAnimationFrame(() => {
    const input = document.querySelector("[data-add-scene-count]");
    if (!input) return;
    input.focus();
    const value = input.value || "";
    input.setSelectionRange(value.length, value.length);
  });
}

function parseSceneSpecInput(value, fallbackEpisodeCount = 1) {
  const raw = String(value || "").trim();
  const pairMatch = raw.match(/^(\d+)\s*-\s*(\d+)$/);
  if (pairMatch) {
    return {
      episodeCount: Math.max(1, Number(pairMatch[1])),
      sceneCount: Math.max(1, Number(pairMatch[2])),
    };
  }
  const sceneOnlyMatch = raw.match(/^(\d+)$/);
  if (sceneOnlyMatch) {
    return {
      episodeCount: Math.max(1, Number(fallbackEpisodeCount || 1)),
      sceneCount: Math.max(1, Number(sceneOnlyMatch[1])),
    };
  }
  return {
    episodeCount: Math.max(1, Number(fallbackEpisodeCount || 1)),
    sceneCount: 1,
  };
}

function addEpisodeSceneWithContent(content, episodeCount = 1, sceneCount = 1) {
  const novelTitle = state.rawText.match(/《([^》]+)》/)?.[1] || "新增剧集";
  const nextEpisodes = state.episodes.slice();
  const episodeNo = Math.max(1, Number(episodeCount || 1));
  const targetSceneNo = Math.max(1, Number(sceneCount || 1));
  const raw = String(content || "").trim() || "（正文开始）";
  const title = `第${toChineseNumber(episodeNo)}集`;
  const episodeIndex = findEpisodeIndexByNumber(episodeNo);
  if (episodeIndex >= 0) {
    const episode = nextEpisodes[episodeIndex];
    const scene = buildTargetScene(raw, episodeNo, targetSceneNo, title, novelTitle);
    const insertSceneIndex = episode.scenes.findIndex((item, index) => sceneNumberParts(item, episodeNo, index + 1).sceneNo > targetSceneNo);
    const nextSceneIndex = insertSceneIndex >= 0 ? insertSceneIndex : episode.scenes.length;
    episode.scenes.splice(nextSceneIndex, 0, scene);
    state.episodes = nextEpisodes;
    state.activeEpisode = episodeIndex;
    state.activeScene = nextSceneIndex;
  } else {
    const scene = buildTargetScene(raw, episodeNo, targetSceneNo, title, novelTitle);
    const insertEpisodeIndex = nextEpisodes.findIndex((episode) => episodeNumberFromTitle(episode.title) > episodeNo);
    const nextEpisodeIndex = insertEpisodeIndex >= 0 ? insertEpisodeIndex : nextEpisodes.length;
    nextEpisodes.splice(nextEpisodeIndex, 0, { title, scenes: [scene] });
    state.episodes = nextEpisodes;
    state.activeEpisode = nextEpisodeIndex;
    state.activeScene = 0;
  }
  state.showValidationIssues = false;
  state.validationStatus = "idle";
}

function buildTargetScene(raw, episodeNo, sceneNo, episodeTitle, novelTitle) {
  const scene = buildScene(raw, Math.max(0, sceneNo - 1), episodeTitle, novelTitle);
  const parsed = safeParseJson(scene.generated);
  const sceneNumber = `${episodeNo}-${sceneNo}`;
  const rawLocation = parsed?.scene_description?.location || inferLocation(raw);
  const normalizedTime = normalizeTimeOfDay(parsed?.scene_description?.time_of_day || inferTime(raw));
  const normalizedSceneType = displaySceneType(rawLocation);
  const normalizedLocation = normalizeSceneMetaLocation(rawLocation);
  if (parsed) {
    parsed.episode = episodeTitle;
    parsed.scene_description = parsed.scene_description || {};
    parsed.scene_description.scene_number = sceneNumber;
    scene.generated = JSON.stringify(parsed, null, 2);
  }
  scene.title = `第${toChineseNumber(sceneNo)}场`;
  scene.display = [buildSceneHeaderLine({ sceneNumber, dayPart: normalizedTime === "日景/夜景" ? "" : normalizedTime, sceneType: normalizedSceneType, location: normalizedLocation }), sceneEditorState(scene).body]
    .filter((part, index) => index === 0 || part !== "")
    .join("\n")
    .trimEnd();
  return scene;
}

function findSceneDuplicateInfo(episodeNo, sceneNo) {
  const episodeIndex = findEpisodeIndexByNumber(episodeNo);
  if (episodeIndex < 0) return null;
  const episode = state.episodes[episodeIndex];
  const sceneIndex = episode.scenes.findIndex((scene, index) => sceneNumberParts(scene, episodeNo, index + 1).sceneNo === Number(sceneNo));
  if (sceneIndex < 0) return null;
  return {
    episodeNo: Number(episodeNo),
    sceneNo: Number(sceneNo),
    episodeIndex,
    sceneIndex,
  };
}

function sceneNumberParts(scene, fallbackEpisodeNo, fallbackSceneNo) {
  const parsed = scene?.generated ? safeParseJson(scene.generated) : null;
  const sceneNumber = parsed?.scene_description?.scene_number || `${fallbackEpisodeNo}-${fallbackSceneNo}`;
  const match = String(sceneNumber).match(/^(\d+)-(\d+)$/);
  return {
    episodeNo: Number(match?.[1] || fallbackEpisodeNo || 1),
    sceneNo: Number(match?.[2] || fallbackSceneNo || 1),
  };
}

function addEpisodeWithContent(content, episodeCount = 1, sceneCount = 1) {
  addEpisodeSceneWithContent(content, episodeCount, sceneCount);
}

function deleteEpisodeAt(episodeIndex) {
  if (!Number.isInteger(episodeIndex) || episodeIndex < 0 || episodeIndex >= state.episodes.length) return;
  if (state.episodes.length <= 1) {
    alert(state.englishSidebar ? "Keep at least one episode." : "请至少保留一集");
    return;
  }
  const episodeTitle = state.episodes[episodeIndex]?.title || `第${toChineseNumber(episodeIndex + 1)}集`;
  const confirmed = window.confirm(state.englishSidebar ? `Delete ${episodeTitle}?` : `确认删除${episodeTitle}？`);
  if (!confirmed) return;
  state.episodes.splice(episodeIndex, 1);
  state.activeEpisode = Math.max(0, Math.min(state.activeEpisode, state.episodes.length - 1));
  state.activeScene = Math.min(state.activeScene, Math.max(0, (state.episodes[state.activeEpisode]?.scenes.length || 1) - 1));
  state.aiFixInline = null;
  state.showValidationIssues = false;
  render();
}

function deleteSceneAt(episodeIndex, sceneIndex) {
  const episode = state.episodes[episodeIndex];
  if (!episode || !Number.isInteger(sceneIndex) || sceneIndex < 0 || sceneIndex >= episode.scenes.length) return;
  if (episode.scenes.length <= 1) {
    deleteEpisodeAt(episodeIndex);
    return;
  }
  const sceneTitle = episode.scenes[sceneIndex]?.title || `${episodeIndex + 1}-${sceneIndex + 1}`;
  const confirmed = window.confirm(state.englishSidebar ? `Delete ${sceneTitle}?` : `确认删除${sceneTitle}？`);
  if (!confirmed) return;
  episode.scenes.splice(sceneIndex, 1);
  state.activeEpisode = episodeIndex;
  state.activeScene = Math.max(0, Math.min(state.activeScene, episode.scenes.length - 1));
  state.aiFixInline = null;
  state.showValidationIssues = false;
  render();
}

function findEpisodeIndexByNumber(episodeNo) {
  return state.episodes.findIndex((episode) => episodeNumberFromTitle(episode.title) === Number(episodeNo));
}

function episodeNumberFromTitle(title) {
  return chineseNumberToArabic(String(title || "").match(/第(.+)集/)?.[1] || "0");
}

function nextAvailableEpisodeNumber() {
  return state.episodes.reduce((max, episode) => Math.max(max, episodeNumberFromTitle(episode.title)), 0) + 1;
}

function syncDisplayEditor() {
  syncSceneEditorState();
}

function readFile(file) {
  state.fileName = file.name;
  if (!/\.(txt|md)$/i.test(file.name)) {
    importText(SAMPLE_NOVEL, `${file.name}（DOCX demo 使用内置同名样例）`);
    return;
  }
  const reader = new FileReader();
  reader.onload = () => importText(String(reader.result || ""), file.name);
  reader.readAsText(file, "utf-8");
}

async function importFromLink() {
  const input = document.querySelector("#linkInput");
  const url = input?.value.trim();
  if (!url) {
    importText(SAMPLE_NOVEL, "示例链接文本");
    return;
  }
  try {
    const response = await fetch(url);
    const text = await response.text();
    importText(text, "链接导入");
  } catch {
    importText(SAMPLE_NOVEL, "链接导入失败，使用示例文本");
  }
}

function importText(text, label) {
  const normalized = normalizeText(text || SAMPLE_NOVEL);
  clearLoadingTimer();
  state.rawText = normalized;
  state.sourceLabel = label;
  state.loadingLabel = label;
  state.episodes = [];
  state.activeEpisode = 0;
  state.activeScene = 0;
  state.view = "loading";
  state.lastSaved = "未保存";
  state.showValidationIssues = false;
  state.validationStatus = "idle";
  render();
  loadingTimer = setTimeout(() => completeImport(normalized, label), 3000);
}

function completeImport(normalized, label) {
  state.rawText = normalized;
  state.sourceLabel = label;
  state.episodes = parseEpisodes(normalized);
  if (label === "示例文本") {
    if (state.episodes[1]?.scenes?.[0]) {
      const sampleScene = state.episodes[1].scenes[0];
      const sampleBody = `苏晚星在医院走廊的长椅上坐了整整一夜。傅念星的烧退了，小小一团蜷在她腿上睡着，呼吸均匀。她低头看着孩子的睫毛，长得出奇，像一把小扇子。

和傅景珩一模一样。

“喝点水。”男人在她对面坐下，递过一杯温水。

苏晚星没接：“傅景珩，我要做亲子鉴定。”

“好。”

“我不记得我什么时候和你……”她顿了一下，没把那个词说出口，“我不记得我们之间有过任何关系。”

傅景珩端着水杯的手紧了紧：“我知道。”

“你知道？”她抬眼，“你知道我失忆了？”

“我知道你‘被’失忆了。”他一字一顿。

苏晚星瞳孔骤缩。

她是法医，是S市公安局法医中心最年轻的副主任。她的记忆力是经过严格训练的。她可以记得三年前某具尸体的指甲缝里有几粒沙子，可以记得每一个案卷的细节。

可她想不起来，自己什么时候和傅景珩有过孩子。

这不正常。`;
      const parsed = sampleScene.generated ? safeParseJson(sampleScene.generated) : null;
      const sceneNumber = parsed?.scene_description?.scene_number || "2-1";
      const timeOfDay = parsed?.scene_description?.time_of_day || "";
      const sceneType = displaySceneType(parsed?.scene_description?.location || "内景");
      sampleScene.raw = sampleBody;
      sampleScene.display = [buildSceneHeaderLine({ sceneNumber, dayPart: normalizeTimeOfDay(timeOfDay), sceneType, location: "" }), sampleBody].join("\n");
      sampleScene.summary = sampleBody.split(/[。！？]/)[0] || sampleScene.summary;
      sampleScene.minutes = Math.max(1, Math.ceil(countCharacters(sampleBody) / 260));
      if (parsed) {
        parsed.scene_description.location = "";
        parsed.scene_content = sampleBody;
        sampleScene.generated = JSON.stringify(parsed, null, 2);
      }
    }
    if (state.episodes[0]?.scenes?.[2]) {
      state.episodes[0].scenes[2].raw = "";
      state.episodes[0].scenes[2].display = "";
    }
  }
  state.activeEpisode = 0;
  state.activeScene = 0;
  state.view = "editor";
  state.loadingLabel = "";
  state.lastSaved = "远程已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
  state.showValidationIssues = false;
  state.validationStatus = "idle";
  loadingTimer = null;
  render();
}

function clearLoadingTimer() {
  if (!loadingTimer) return;
  clearTimeout(loadingTimer);
  loadingTimer = null;
}

function parseEpisodes(text) {
  const structured = parseStructuredScript(text);
  if (structured.length) return structured;

  const titleMatch = text.match(/《([^》]+)》/);
  const novelTitle = titleMatch ? titleMatch[1] : "未命名故事";
  const matches = [...text.matchAll(/(^|\n)(第[一二三四五六七八九十百千万\d]+[章节集回][：:\s\S]*?)(?=\n第[一二三四五六七八九十百千万\d]+[章节集回][：:\s]|$)/g)];
  const chunks = matches.length ? matches.map((match) => match[2].trim()) : [text.trim()];

  return chunks.map((chunk, index) => {
    const heading = chunk.match(/^第[一二三四五六七八九十百千万\d]+[章节集回][：:\s]*(.*)/);
    const titleTail = heading?.[1]?.split("\n")[0].trim();
    const title = `第${toChineseNumber(index + 1)}集${titleTail ? `：${titleTail}` : ""}`;
    const body = heading ? chunk.replace(/^第[一二三四五六七八九十百千万\d]+[章节集回][^\n]*\n?/, "").trim() : chunk;
    const scenes = splitScenes(body, title, novelTitle);
    return { title, scenes };
  });
}

function splitScenes(body, episodeTitle, novelTitle) {
  const explicit = [...body.matchAll(/(^|\n)(第[一二三四五六七八九十百千万\d]+场[：:\s\S]*?)(?=\n第[一二三四五六七八九十百千万\d]+场[：:\s]|$)/g)];
  if (explicit.length) {
    return explicit.map((match, index) => buildScene(match[2].trim(), index, episodeTitle, novelTitle));
  }

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const sceneCount = Math.max(1, Math.min(4, Math.ceil(paragraphs.length / 3)));
  const size = Math.ceil(paragraphs.length / sceneCount);
  const chunks = [];
  for (let i = 0; i < paragraphs.length; i += size) {
    chunks.push(paragraphs.slice(i, i + size).join("\n\n"));
  }
  return (chunks.length ? chunks : [body]).map((chunk, index) => buildScene(chunk, index, episodeTitle, novelTitle));
}

function buildScene(raw, index, episodeTitle, novelTitle) {
  const title = `第${toChineseNumber(index + 1)}场`;
  const firstSentence = raw.replace(/\s+/g, " ").split(/[。！？]/)[0] || "关键剧情推进";
  const sceneJson = buildPromptJson({
    episode: episodeTitle.replace(/[：:].*$/, ""),
    sceneNumber: `${state.episodes.length + 1}-${index + 1}`,
    time: inferTime(raw),
    location: inferLocation(raw),
    people: inferActor(raw),
    content: raw,
  });
  const generated = JSON.stringify(sceneJson, null, 2);
  const display = buildReadableScript({
    sceneNumber: sceneJson.scene_description.scene_number,
    time: sceneJson.scene_description.time_of_day,
    location: sceneJson.scene_description.location,
    people: sceneJson.persone,
    content: formatSceneContent(raw, sceneJson.persone),
  });
  return {
    title,
    raw,
    generated,
    display,
    summary: `${novelTitle} · ${firstSentence}`,
    minutes: Math.max(1, Math.ceil(countCharacters(raw) / 260)),
    issues: validateScene(raw, generated),
  };
}

function parseStructuredScript(text) {
  if (!/\n场次[：:]\s*\d+-\d+/.test(text)) return [];
  const chunks = text.split(/(?=\n?场次[：:]\s*\d+-\d+)/).map((chunk) => chunk.trim()).filter(Boolean);
  const preface = chunks[0] && !/^场次[：:]/.test(chunks[0]) ? chunks.shift() : "";
  const episodeTitles = [...text.matchAll(/第([一二三四五六七八九十百千万\d]+)[幕集章节回][：:：]?[^\n]*/g)].map((match) => ({
    index: match.index || 0,
    title: `第${match[1]}集`,
  }));
  const fallbackTitle = preface.match(/《([^》]+)》/)?.[1] || "导入剧本";
  const episodes = new Map();

  chunks.forEach((chunk) => {
    const absoluteIndex = text.indexOf(chunk);
    const sceneNumber = chunk.match(/场次[：:]\s*([0-9]+-[0-9]+)/)?.[1] || "";
    const episodeNo = Number(sceneNumber.split("-")[0]) || findEpisodeNumber(episodeTitles, absoluteIndex) || 1;
    const episode = `第${toChineseNumber(episodeNo)}集`;
    const sceneIndex = Number(sceneNumber.split("-")[1]) || 1;
    const meta = extractSceneMeta(chunk);
    const body = extractSceneBody(chunk);
    const content = formatSceneContent(body, meta.people);
    const sceneJson = buildPromptJson({
      episode,
      sceneNumber: sceneNumber || `${episodeNo}-${sceneIndex}`,
      time: normalizeTimeOfDay(meta.time),
      location: normalizeLocation(meta.location),
      people: meta.people || "未标注",
      content,
    });
    const display = buildReadableScript({
      sceneNumber: sceneJson.scene_description.scene_number,
      time: meta.time,
      location: meta.location,
      people: sceneJson.persone,
      content: sceneJson.scene_content,
    });
    const summary = meta.summary || body.split(/[。！？\n]/).find(Boolean) || fallbackTitle;
    const scene = {
      title: `第${toChineseNumber(sceneIndex)}场`,
      episodeTitle: episode,
      raw: chunk,
      generated: JSON.stringify(sceneJson, null, 2),
      display,
      summary,
      minutes: Math.max(1, Math.ceil(countCharacters(body) / 260)),
      issues: validateScene(chunk, JSON.stringify(sceneJson)),
    };
    if (!episodes.has(episodeNo)) episodes.set(episodeNo, { title: episode, scenes: [] });
    episodes.get(episodeNo).scenes.push(scene);
  });

  return [...episodes.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, episode]) => episode);
}

function validateScene(raw, generated) {
  const issues = [];
  try {
    const parsed = JSON.parse(generated);
    if (!parsed.episode) issues.push("缺少 episode 字段。");
    if (!parsed.scene_description?.scene_number) issues.push("缺少 scene_number。");
    if (!parsed.scene_description?.time_of_day) issues.push("缺少 time_of_day。");
    if (!parsed.scene_description?.location) issues.push("缺少 location。");
    if (!parsed.persone) issues.push("缺少 persone。");
    if (!parsed.scene_content) issues.push("缺少 scene_content。");
  } catch {
    issues.push("输出不是严格 JSON。");
  }
  if (!raw.trim()) issues.push("导入原文为空。");
  return issues;
}

function inferActor(text) {
  const names = ["苏晚星", "傅景珩", "傅念星", "沈知夏", "护士", "警察", "傅振邦", "神秘杀手", "老年苏晚星", "老年傅景珩"];
  return names.filter((name) => text.includes(name)).join("、") || "未标注";
}

function inferLocation(text) {
  if (/医院|急诊|病床/.test(text)) return "儿童医院";
  if (/床|床头|凌晨/.test(text)) return "卧室";
  if (/雨|伞/.test(text)) return "医院门口";
  return "核心场景";
}

function inferTime(text) {
  if (/凌晨|四点|黑暗/.test(text)) return "凌晨";
  if (/雨/.test(text)) return "雨夜";
  return "日内";
}

function findEpisodeNumber(episodeTitles, index) {
  const matched = episodeTitles.filter((item) => item.index <= index).at(-1);
  if (!matched) return null;
  return chineseNumberToArabic(matched.title.match(/第(.+)集/)?.[1] || "一");
}

function extractSceneMeta(chunk) {
  return {
    sceneNumber: chunk.match(/场次[：:]\s*([^\n]+)/)?.[1]?.trim() || "",
    location: chunk.match(/场景[：:]\s*([^\n]+)/)?.[1]?.trim() || "",
    time: chunk.match(/时间[：:]\s*([^\n]+)/)?.[1]?.trim() || "",
    people: chunk.match(/人物[：:]\s*([^\n]+)/)?.[1]?.trim() || "",
    summary: chunk.match(/【剧情梗概】[：:]\s*([^\n]+)/)?.[1]?.trim() || "",
  };
}

function extractSceneBody(chunk) {
  return chunk
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^(场次|场景|时间|人物)[：:]/.test(line) && !/^【剧情梗概】/.test(line) && line !== "（正文开始）")
    .join("\n");
}

function buildPromptJson({ episode, sceneNumber, time, location, people, content }) {
  return {
    episode,
    scene_description: {
      scene_number: sceneNumber,
      time_of_day: time,
      location,
    },
    persone: people,
    scene_content: content,
  };
}

function buildReadableScript({ sceneNumber, time, location, people, content }) {
  return [
    `${sceneNumber} ${displaySceneType(location)} ${normalizeLocation(location)}`,
    `出场人物：${people || "未标注"}`,
    displaySceneContent(content),
  ]
    .filter(Boolean)
    .join("\n");
}

function displaySceneContent(content) {
  return content
    .split("\n")
    .map((line) => line.replace(/\sOS[：:]/g, "os："))
    .join("\n");
}

function formatSceneContent(body, people = "") {
  const peopleList = people.split(/[、,，]/).map((name) => name.trim()).filter(Boolean);
  return body
    .split("\n")
    .map((line) => formatSceneLine(line.trim(), peopleList))
    .filter(Boolean)
    .join("\n");
}

function formatSceneLine(line, peopleList) {
  if (!line) return "";
  if (/^▲/.test(line)) return line;

  const osMatch = line.match(/^【?([^】：:]{1,12})(旁白|内心|OS|os)】?[：:](.+)$/);
  if (osMatch) return `${osMatch[1]}os：${osMatch[3].trim()}`;

  const namedDialogue = line.match(/^([^“”：:]{1,18}?)([^“”：:]{0,18})[：:]?[“"](.+)[”"]$/);
  if (namedDialogue) {
    const speaker = namedDialogue[1].trim();
    const action = namedDialogue[2].trim();
    const dialogue = namedDialogue[3].trim();
    if (peopleList.some((name) => speaker.includes(name)) || /^[\u4e00-\u9fa5]{2,6}$/.test(speaker)) {
      return `${speaker}${action ? `（${action}）` : ""}：${dialogue}`;
    }
  }

  const directDialogue = line.match(/^[“"](.+)[”"]([^“”"]*)$/);
  if (directDialogue && peopleList.length === 1) {
    if (directDialogue[1].length <= 2 && /声|响|碎|倒/.test(directDialogue[2])) {
      return shouldUseScenePrefix(line) ? `▲${line}` : line;
    }
    const action = directDialogue[2].trim().replace(/^。/, "");
    return `${peopleList[0]}${action ? `（${action}）` : ""}：${directDialogue[1].trim()}`;
  }

  return shouldUseScenePrefix(line) ? `▲${line}` : line;
}

function shouldUseScenePrefix(line) {
  if (/^【[^】]*(特写|镜头|画面|环境|动作|音效)[^】]*】/.test(line)) return true;
  if (/^(桌上|墙上|门口|窗外|屋内|房间|客厅|走廊|医院|街道|灯光|镜头|画面|场内|天空|雨|阳光|黑暗|电梯|办公室|档案室|地下室|婚礼现场)/.test(line)) return true;

  const visualAction = /(走|坐|站|躲|伸出|递|拿|推开|打开|关上|抱|握|抬头|低头|看着|盯着|笑|哭|拍|倒|碎|响起|亮起|端着|走进|走出|冲出|踩过|翻开|合上|放下|塞进|戴上|吻上|靠在)/;
  const innerOrExposition = /(以为|觉得|知道|明白|想起来|不记得|应该|可以|一定|必须|这不正常|真相|秘密|意思|为什么|她是|他是)/;
  return visualAction.test(line) && !innerOrExposition.test(line);
}

function normalizeTimeOfDay(time) {
  if (/夜|凌晨|晚/.test(time)) return "夜景";
  if (/晨|早|日|下午|阳光|白天/.test(time)) return "日景";
  return time || "日景/夜景";
}

function normalizeLocation(location) {
  return location.split("/").pop()?.trim() || location || "场景名称";
}

function displayDayPart(time) {
  if (/夜|凌晨|晚/.test(time)) return "夜";
  if (/晨|早/.test(time)) return "晨";
  if (/日|下午|阳光|白天/.test(time)) return "日";
  if (/夜景/.test(time)) return "夜";
  if (/日景/.test(time)) return "日";
  return "日";
}

function displaySceneType(location) {
  if (/外景/.test(location)) return "外景";
  if (/内景/.test(location)) return "内景";
  return "内景";
}

function englishEpisodeTitle(episode, episodeIndex) {
  const number = chineseNumberToArabic(String(episode?.title || "").match(/第(.+)集/)?.[1] || "") || episodeIndex + 1;
  return `Episode ${number}`;
}

function englishSceneButtonLabel(scene, episodeIndex, sceneIndex) {
  const fallbackNumber = `${episodeIndex + 1}-${sceneIndex + 1}`;
  const parsed = scene?.generated ? safeParseJson(scene.generated) : null;
  const sceneNumber = parsed?.scene_description?.scene_number || fallbackNumber;
  const location = parsed?.scene_description?.location || "场景名称";
  const time = parsed?.scene_description?.time_of_day || "";
  const normalizedSceneNumber = String(sceneNumber).replace(/-/g, ".");
  const sceneType = displaySceneTypeEnglish(location);
  const sceneLocation = translateLocationLabel(normalizeEnglishLocation(location)).toUpperCase();
  const dayPart = translateTimeOfDay(time).toUpperCase();
  return `${normalizedSceneNumber} ${sceneType}. ${sceneLocation} - ${dayPart}`;
}

function normalizeEnglishLocation(location) {
  const normalized = normalizeLocation(location);
  return String(normalized || "")
    .replace(/^(内景|外景)\s*/g, "")
    .replace(/\s+(内景|外景)\s*/g, " ")
    .trim();
}

function translateTimeOfDay(time) {
  if (/凌晨|夜|晚/.test(time)) return "Night";
  if (/晨|早/.test(time)) return "Morning";
  if (/昏|夕阳|黄昏/.test(time)) return "Dusk";
  if (/日|下午|阳光|白天/.test(time)) return "Day";
  return "Day/Night";
}

function displaySceneTypeEnglish(location) {
  if (/外景/.test(location)) return "EXT";
  if (/内景/.test(location)) return "INT";
  return "INT";
}

function translateLocationLabel(location) {
  const exactMap = {
    "苏晚星卧室": "Su Wanxing Bedroom",
    "街道、马路": "Street",
    "儿童医院急诊走廊": "MORVENE'S PALLACE",
    "医院走廊长椅": "Hospital Corridor Bench",
    "法医中心苏晚星办公室": "Su Wanxing Office",
    "傅家别墅客厅": "Fu Villa Living Room",
    "傅家别墅餐厅": "Fu Villa Dining Room",
    "傅家别墅书房": "Fu Villa Study",
    "傅家祖宅地下室密室": "Fu Manor Basement Chamber",
    "医院档案室": "Hospital Archive Room",
    "医院病房": "Hospital Ward",
    "沈知夏家客厅": "Shen Zhixia Living Room",
    "书房内": "Study",
    "酒店房间": "Hotel Room",
    "傅家别墅后院薰衣草花园": "Fu Villa Lavender Garden",
    "傅家别墅主卧": "Fu Villa Master Bedroom",
    "电视屏幕": "TV Screen",
    "警局门口": "Police Station Gate",
    "法国普罗旺斯薰衣草田": "Provence Lavender Field",
    "法国普罗旺斯薰衣草田旁木屋前": "Cabin by Lavender Field",
    "场景名称": "Location",
  };
  if (exactMap[location]) return exactMap[location];

  return String(location || "Location")
    .replace(/法医中心/g, "Forensics Center ")
    .replace(/别墅/g, "Villa ")
    .replace(/祖宅/g, "Manor ")
    .replace(/儿童医院/g, "Children's Hospital ")
    .replace(/医院/g, "Hospital ")
    .replace(/警局/g, "Police Station ")
    .replace(/卧室/g, "Bedroom")
    .replace(/客厅/g, "Living Room")
    .replace(/餐厅/g, "Dining Room")
    .replace(/书房/g, "Study")
    .replace(/走廊/g, "Corridor")
    .replace(/长椅/g, "Bench")
    .replace(/地下室/g, "Basement")
    .replace(/密室/g, "Chamber")
    .replace(/档案室/g, "Archive Room")
    .replace(/病房/g, "Ward")
    .replace(/花园/g, "Garden")
    .replace(/后院/g, "Backyard ")
    .replace(/主卧/g, "Master Bedroom")
    .replace(/门口/g, "Gate")
    .replace(/木屋前/g, "Cabin Front")
    .replace(/木屋/g, "Cabin")
    .replace(/薰衣草田/g, "Lavender Field")
    .replace(/电视屏幕/g, "TV Screen")
    .replace(/街道、马路/g, "Street")
    .trim() || "Location";
}

function chineseNumberToArabic(value) {
  if (/^\d+$/.test(value)) return Number(value);
  const digits = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  if (value === "十") return 10;
  if (value.startsWith("十")) return 10 + (digits[value[1]] || 0);
  if (value.includes("十")) {
    const [ten, one] = value.split("十");
    return (digits[ten] || 1) * 10 + (digits[one] || 0);
  }
  return digits[value] || 1;
}

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function currentScene() {
  return state.episodes[state.activeEpisode]?.scenes[state.activeScene] || null;
}

function countScenes() {
  return state.episodes.reduce((total, episode) => total + episode.scenes.length, 0);
}

function countIssues() {
  const scene = currentScene();
  return scene?.issues.length || 0;
}

function countCharacters(text) {
  return (text || "").replace(/\s/g, "").length;
}

function dialogueRatio() {
  const scene = currentScene();
  if (!scene) return 0;
  const dialogue = (scene.generated.match(/[：:]/g) || []).length;
  const lines = scene.generated.split("\n").filter(Boolean).length;
  return Math.min(100, Math.round((dialogue / Math.max(1, lines)) * 100));
}

function toChineseNumber(number) {
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (number <= 10) return number === 10 ? "十" : digits[number];
  if (number < 20) return `十${digits[number % 10]}`;
  const tens = Math.floor(number / 10);
  const ones = number % 10;
  return `${digits[tens]}十${ones ? digits[ones] : ""}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function autoFixSceneText(text, scene) {
  const normalized = String(text || "").replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const next = [];
  const firstLine = lines.find((line) => line.trim()) || "";
  if (/^\d+-\d+/.test(firstLine.trim())) {
    next.push(...lines);
  } else {
    const fallbackNumber = scene?.generated ? safeParseJson(scene.generated)?.scene_description?.scene_number : "";
    const sceneNumber = fallbackNumber || `${state.activeEpisode + 1}-${state.activeScene + 1}`;
    next.push(`${sceneNumber} 内景 场景名称`);
    next.push(...lines);
  }

  const headerIndex = next.findIndex((line) => /^\d+-\d+/.test(line.trim()));
  if (headerIndex >= 0) {
    const header = next[headerIndex].trim();
    const match = header.match(/^(\d+-\d+)\s+(.*)$/);
    if (match) {
      const sceneNumber = match[1];
      const rest = match[2];
      const normalizedRest = rest.replace(/^夜景\s+/, "").replace(/^夜\s+/, "");
      if (/^内景/.test(normalizedRest)) {
        next[headerIndex] = `${sceneNumber} 夜景 ${normalizedRest}`;
      }
    }
  }

  const hasPeople = next.some((line) => /^出场人物/.test(line.trim()));
  if (!hasPeople) {
    const people = scene?.generated ? safeParseJson(scene.generated)?.persone : "";
    const insertIndex = next.findIndex((line) => line.trim());
    const idx = insertIndex >= 0 ? insertIndex + 1 : 1;
    next.splice(idx, 0, `出场人物：${people || "未标注"}`);
  }
  return next.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function buildInlineDiff(from, to) {
  const baseLines = String(from || "").split("\n");
  const suggestedLines = String(to || "").split("\n");
  const ops = diffLineOps(baseLines, suggestedLines);
  const groups = [];
  let aIndex = 0;
  let current = null;

  function flush() {
    if (!current) return;
    if (current.del.length || current.add.length) groups.push(current);
    current = null;
  }

  ops.forEach((op) => {
    if (op.type === "equal") {
      aIndex += 1;
      flush();
      return;
    }
    if (!current) current = { start: aIndex, del: [], add: [] };
    if (op.type === "del") {
      current.del.push(op.line);
      aIndex += 1;
    }
    if (op.type === "add") {
      current.add.push(op.line);
    }
  });
  flush();

  const lines = [];
  const changes = [];
  let cursor = 0;

  groups.forEach((group) => {
    const start = Math.max(0, Math.min(baseLines.length, group.start));
    for (let i = cursor; i < start; i += 1) {
      lines.push({ type: "equal", line: baseLines[i] });
    }

    const maxLen = Math.max(group.del.length, group.add.length);
    for (let i = 0; i < maxLen; i += 1) {
      const before = group.del[i] ?? null;
      const after = group.add[i] ?? null;
      const index = changes.length;
      changes.push({ before, after, decision: "pending" });
      lines.push({ type: "change", index });
    }

    cursor = start + group.del.length;
  });

  for (let i = cursor; i < baseLines.length; i += 1) {
    lines.push({ type: "equal", line: baseLines[i] });
  }

  return { baseText: from, title: "AI 补全建议", lines, changes };
}

function applyInlineDiff(review) {
  const out = [];
  review.lines.forEach((item) => {
    if (item.type === "equal") {
      out.push(item.line);
      return;
    }
    const change = review.changes[item.index];
    if (!change) return;
    if (change.decision === "accept") {
      if (change.after !== null) out.push(change.after);
      return;
    }
    if (change.before !== null) out.push(change.before);
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function inlineDiffTargetText(review) {
  const out = [];
  review.lines.forEach((item) => {
    if (item.type === "equal") {
      out.push(item.line);
      return;
    }
    const change = review.changes[item.index];
    if (!change) return;
    if (change.decision === "reject") {
      if (change.before !== null) out.push(change.before);
      return;
    }
    if (change.after !== null) out.push(change.after);
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function resolveInlineChange(index, decision) {
  const scene = currentScene();
  const review = state.aiFixInline;
  if (!scene || !review) return;
  const changes = review.changes.slice();
  if (!changes[index]) return;
  changes[index] = { ...changes[index], decision };
  const resolvedReview = { ...review, changes };
  const currentText = applyInlineDiff(resolvedReview);
  const targetText = inlineDiffTargetText(resolvedReview);
  scene.display = currentText;
  const nextReview = buildInlineDiff(currentText, targetText);
  if (!nextReview.changes.length) {
    state.aiFixInline = null;
    state.showValidationIssues = false;
    state.validationStatus = "fixed";
    state.lastSaved = "已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
    render();
    return;
  }
  state.aiFixInline = nextReview;
  state.lastSaved = "已保存 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
  render();
  focusNextInlineChange();
}

function focusNextInlineChange() {
  requestAnimationFrame(() => {
    const nextChange = document.querySelector(".inline-diff-change");
    if (!nextChange) return;
    nextChange.scrollIntoView({ block: "center", behavior: "smooth" });
    nextChange.querySelector("[data-inline-after-editor]")?.focus();
  });
}

function inlineDiffTemplate(review) {
  const pending = review.changes.filter((change) => change.decision === "pending").length;
  const accepted = review.changes.filter((change) => change.decision === "accept").length;
  const rejected = review.changes.filter((change) => change.decision === "reject").length;
  return `
    <div class="inline-diff">
      <div class="inline-diff-bar">
        <div>
          <div class="inline-diff-title">${escapeHtml(review.title || "AI 补全建议")}</div>
          <div class="inline-diff-subtitle">${pending}条待确认　${accepted}条已应用　${rejected}条已跳过</div>
        </div>
        <div class="inline-diff-actions">
          <button type="button" class="secondary-button" data-action="inline-cancel">取消</button>
          <button type="button" class="primary-button" data-action="inline-apply">全部应用</button>
        </div>
      </div>
      <div class="inline-diff-body">
        ${inlineDiffLinesTemplate(review)}
      </div>
    </div>
  `;
}

function inlineDiffLinesTemplate(review) {
  let visualLine = 0;
  return review.lines
    .map((item) => {
      if (item.type === "equal") {
        visualLine += 1;
        return `
          <div class="inline-diff-row">
            <span class="inline-diff-no">${visualLine}</span>
            <span class="inline-diff-prefix">&nbsp;</span>
            <span class="inline-diff-text">${escapeHtml(item.line) || "&nbsp;"}</span>
          </div>
        `;
      }
      const change = review.changes[item.index];
      const beforeLine = change.before;
      const afterLine = change.after;
      const decision = change.decision;
      const beforeBlock =
        beforeLine === null
          ? ""
          : `
        <div class="inline-diff-row del">
          <span class="inline-diff-no">${visualLine + 1}</span>
          <span class="inline-diff-prefix">原</span>
          <span class="inline-diff-text">${escapeHtml(beforeLine) || "&nbsp;"}</span>
        </div>
      `;
      const afterBlock =
        afterLine === null
          ? ""
          : `
        <div class="inline-diff-row add">
          <span class="inline-diff-no">${visualLine + 1}</span>
          <span class="inline-diff-prefix">修正后</span>
          <textarea class="inline-diff-edit" data-inline-after-editor data-index="${item.index}" spellcheck="false">${escapeHtml(afterLine)}</textarea>
        </div>
      `;
      visualLine += 1;
      return `
        <div class="inline-diff-change" data-change-index="${item.index}">
          <div class="inline-diff-change-head">
            <div class="inline-diff-change-actions">
              <button type="button" class="inline-diff-action accept ${decision === "accept" ? "active" : ""}" data-action="inline-accept" data-index="${item.index}" aria-label="接受" title="接受">&#10003;</button>
              <button type="button" class="inline-diff-action skip ${decision === "reject" ? "active" : ""}" data-action="inline-reject" data-index="${item.index}" aria-label="跳过" title="跳过">&#10005;</button>
            </div>
          </div>
          ${beforeBlock}
          ${afterBlock}
        </div>
      `;
    })
    .join("");
}

function diffLineOps(aLines, bLines) {
  const a = aLines;
  const b = bLines;
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= m; j += 1) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const ops = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      ops.push({ type: "equal", line: a[i - 1] });
      i -= 1;
      j -= 1;
      continue;
    }
    if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: "add", line: b[j - 1] });
      j -= 1;
      continue;
    }
    if (i > 0) {
      ops.push({ type: "del", line: a[i - 1] });
      i -= 1;
    }
  }
  return ops.reverse();
}

render();
