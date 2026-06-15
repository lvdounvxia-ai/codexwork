const A = "./assets/";

const cases = [
  ["case-zombie.png", "《ZOMBIE 末日纪元》", "@MoChef"],
  ["case-silver.png", "《恶仙》", "@雾嗯"],
  ["case-mask.png", "《窗台里的张桂梅》", "@MoChef"],
  ["case-dragon.png", "《龙怪》", "@东方glom"],
  ["case-train.png", "《千禧夏日》", "@MoChef"],
  ["case-machine.png", "《ZOMBIE 末日纪元》", "@机械侠"],
  ["case-text.png", "《末日纪元》", "@MoChef"],
  ["case-soldier.png", "《ZOMBIE 末日纪元》", "@MoChefdfrr"],
  ["case-monster.png", "《深海之下》", "@MoChef"],
  ["case-gorilla.png", "《雾城巨影》", "@MoChef"],
  ["case-robot.png", "《赤甲计划》", "@MoChef"],
  ["case-warrior.png", "《雨夜忍者》", "@MoChef"]
];

const projects = [
  ["case-silver.png", "《一夜未眠》剧本视频制作"],
  ["case-mask.png", "芜湖人文美食宣传短片"],
  ["case-dragon.png", "七龙珠数码宝贝联动剧"],
  ["case-train.png", "NBA湖人队场间视频制作"],
  ["case-machine.png", "《ZOMBIE 末日纪元》"]
];

const storyboardEpisodes = [
  { episode: 1, title: "惊醒凌晨：法医的从天而降儿子", roles: 4, scenes: 2, shots: 9, status: "待生成", action: "编辑", cover: "shot-rain.png", ready: true },
  { episode: 2, title: "被抹去的三个月", roles: 4, scenes: 2, shots: 12, status: "待生成", action: "编辑", cover: "story-main.png", ready: true },
  { episode: 3, title: "同居协议", roles: 2, scenes: 1, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 4, title: "话痨萌娃神提问", roles: 3, scenes: 1, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 5, title: "第一块记忆碎片", roles: 2, scenes: 1, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 6, title: "咖啡投毒师姐背叛", roles: 3, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 7, title: "亲子鉴定的错位", roles: 3, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 8, title: "雨夜追踪旧案", roles: 4, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 9, title: "妹妹留下的钥匙", roles: 3, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 10, title: "沉默证人开口", roles: 4, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 11, title: "医院走廊的录音", roles: 3, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 12, title: "旧工作室重启", roles: 4, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 13, title: "父亲藏起的病例", roles: 5, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 14, title: "黑客少年入局", roles: 4, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 15, title: "假遗嘱的破绽", roles: 5, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 16, title: "天台上的交易", roles: 4, scenes: 2, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 17, title: "真正的坠楼者", roles: 5, scenes: 4, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 18, title: "亲情反噬", roles: 4, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 19, title: "审判前夜", roles: 5, scenes: 3, shots: 0, status: "待生成", action: "生成脚本" },
  { episode: 20, title: "月光下的真相", roles: 6, scenes: 4, shots: 0, status: "待生成", action: "生成脚本" }
];

const models = ["seedance 2.0", "seedance 2.0fast", "happyhorse 1.0"];
const ratios = ["9:16", "16:9", "3:4", "4:3", "1:1"];
const styles = [
  ["真人都市", "live-city"],
  ["真人悬疑", "live-mystery"],
  ["古风真人柔光", "gufeng-soft"],
  ["美式经典好莱坞", "hollywood"],
  ["二次元", "anime"],
  ["国漫二次元", "guoman"],
  ["美漫动画", "american-comic"],
  ["厚涂插画", "painted"],
  ["3D厚涂", "thick-3d"],
  ["3D卡通动画", "toon-3d"]
];

const roleAssets = [
  {
    name: "苏念薇",
    sheetIndex: 0,
    intro: "将门嫡女，被迫和亲入宫，清醒果决，擅长在危局中反击。",
    prompt: "红色嫁衣，凤冠霞帔，眼神凌厉，古风真人柔光"
  },
  {
    name: "萧景川",
    sheetIndex: 1,
    intro: "少年将军，表面深情，实则以婚约换取前程。",
    prompt: "白色铠甲，冷峻眉眼，权谋感，电影级侧光"
  },
  {
    name: "柳如烟",
    sheetIndex: 2,
    intro: "柔弱外表下心思缜密，擅长利用眼泪挑拨关系。",
    prompt: "粉裙，柔弱姿态，暗藏锋芒，古风半身像"
  },
  {
    name: "宇文渊",
    sheetIndex: 3,
    intro: "传闻嗜血的帝王，真实目的未明，对苏念薇保持试探。",
    prompt: "银发帝王，玄色长袍，冷白肤色，压迫感"
  },
  {
    name: "禁军统领",
    sheetIndex: 4,
    intro: "宫门守卫统领，沉默执行皇命，是宫廷秩序的象征。",
    prompt: "黑甲禁军，长枪，肃杀站姿，宫门背景"
  },
  {
    name: "沈嬷嬷",
    sheetIndex: 5,
    intro: "深宫老人，熟悉宫中规矩，表面严苛但心有隐情。",
    prompt: "年长女官，深色宫装，克制神情，柔和侧光"
  },
  {
    name: "小桃",
    sheetIndex: 6,
    intro: "苏念薇贴身侍女，胆小却忠诚，是她在宫中的第一位盟友。",
    prompt: "年轻侍女，浅青衣裙，清澈眼神，国漫二次元"
  },
  {
    name: "宇文珩",
    sheetIndex: 7,
    intro: "王府世子，笑意温和，暗中观察朝局变化。",
    prompt: "贵族青年，玉冠锦袍，温润笑容，古风柔光"
  },
  {
    name: "影卫",
    sheetIndex: 8,
    intro: "潜伏在暗处的护卫，只听命于宇文渊。",
    prompt: "黑衣暗卫，半遮面，夜色屋檐，悬疑氛围"
  }
];

const sceneAssets = [
  {
    name: "家别墅的薰衣草花园",
    thumbIndex: 0,
    intro: "沈家别墅后院，花圃、玻璃花房与长椅构成苏念薇记忆里的柔软角落。",
    prompt: "现代别墅庭院，薰衣草花海，午后柔光，精致园林，电影感"
  },
  {
    name: "皇宫长街",
    thumbIndex: 1,
    intro: "汉白玉石路与红毯贯穿宫门，是和亲花轿经过的高压场景。",
    prompt: "古代皇宫长街，红毯，雨后石路，压抑氛围，广角构图"
  },
  {
    name: "冷宫偏院",
    thumbIndex: 2,
    intro: "荒凉偏僻的宫院，雨夜灯影摇晃，适合承载试探与反击戏。",
    prompt: "雨夜冷宫，石阶积水，暖色壁灯，阴冷宫墙，悬疑感"
  },
  {
    name: "宫门外",
    thumbIndex: 3,
    intro: "护卫往来、车马停驻的转场空间，用于制造分别与危机感。",
    prompt: "古风宫门，雨中伞影，远景人物，灰蓝色调，电影运镜"
  },
  {
    name: "凤仪殿",
    thumbIndex: 4,
    intro: "后宫议事与权力交锋的核心室内空间，陈设庄重克制。",
    prompt: "古代宫殿内景，屏风，金色烛光，庄重对称，柔焦质感"
  },
  {
    name: "苏念薇旧工作室",
    thumbIndex: 5,
    intro: "被查封前的设计工作室，保留她曾经投入心血的痕迹。",
    prompt: "现代设计工作室，落地窗，手稿，布料样本，清冷自然光"
  }
];

const propAssets = [
  {
    name: "红绣鸳鸯帕",
    thumbIndex: 6,
    intro: "苏念薇砸向萧景川的定情信物，也是撕破伪装的关键道具。",
    prompt: "红色绣帕，鸳鸯刺绣，古风纹样，轻微血迹，特写镜头"
  },
  {
    name: "鎏金花轿",
    thumbIndex: 7,
    intro: "和亲队伍的视觉中心，象征被交易的婚约与身份转折。",
    prompt: "古代金色花轿，红绸装饰，华丽压抑，宫廷长街背景"
  },
  {
    name: "白色铠甲",
    thumbIndex: 8,
    intro: "萧景川出场装备，强化少年将军的权力与虚伪深情。",
    prompt: "白色古风铠甲，银色护肩，冷光质感，精致纹路"
  },
  {
    name: "凤冠霞帔",
    thumbIndex: 9,
    intro: "苏念薇和亲造型核心道具，体现身份、仪式和反击气场。",
    prompt: "凤冠霞帔，金色凤纹，红色嫁衣配饰，华丽古风，正面特写"
  },
  {
    name: "染血尸体",
    thumbIndex: 10,
    intro: "长街开场的冲突提示，用于快速建立皇宫危险氛围。",
    prompt: "古风悬疑道具，血迹拖痕，低饱和冷色，远景虚化"
  },
  {
    name: "禁军长枪",
    thumbIndex: 11,
    intro: "宫门守卫的标志性道具，增强秩序、压迫和仪式感。",
    prompt: "古代长枪，黑甲禁军配件，金属冷光，宫门背景"
  }
];

const episodeScenes = [
  {
    id: "1-1",
    episode: 1,
    scene: 1,
    title: "皇宫长街",
    meta: "1-1 皇宫长街 日 外",
    people: ["苏念薇", "萧景川", "柳如烟"],
    lines: [
      { type: "action", text: "汉白玉石路上，红毯铺地。鎏金花轿停在路中央。两名侍卫拖着一具染血的尸体走过，鲜血在红毯上拖出刺目的暗痕。" },
      { type: "action", text: "萧景川一身白色铠甲，护在花轿旁，嘴角露出得意笑意。柳如烟一身粉裙，柔弱地靠在他身侧。" },
      { type: "dialog", name: "萧景川", mood: "故作深情", text: "念薇，宇文渊是个嗜血疯子。委屈你和亲换来一时安宁，我会找机会救你的。" },
      { type: "dialog", name: "柳如烟", mood: "假惺惺抹泪", text: "姐姐，你可千万…活下来啊。" },
      { type: "action", text: "花轿帘子猛地被掀开，苏念薇一身大红嫁衣，凤冠霞帔，眼神凌厉，她抬手，将半块红绣鸳鸯帕砸在萧景川脸上。" },
      { type: "dialog", name: "苏念薇", mood: "冷笑", text: "萧将军，拿未婚妻换前程，还在这装什么深情？带着你的绿茶滚远点，别熏脏了本宫和亲的路！" },
      { type: "action", text: "萧景川被红帕砸中脸颊，脸色瞬间铁青，咬牙切齿地盯着苏念薇。" },
      { type: "dialog", name: "萧景川", mood: "凶狠", text: "苏念薇，你别不知好歹！" }
    ]
  },
  {
    id: "1-2",
    episode: 1,
    scene: 2,
    title: "宫门外",
    meta: "1-2 宫门外 日 外",
    people: ["苏念薇", "萧景川", "禁军"],
    lines: [
      { type: "action", text: "宫门缓缓开启，禁军列队如墙。苏念薇扶着轿栏起身，红衣在风里猎猎作响。" },
      { type: "dialog", name: "苏念薇", mood: "平静", text: "今日之后，我与萧家，再无半分瓜葛。" },
      { type: "action", text: "萧景川想要上前，却被禁军长枪拦下，只能眼睁睁看着花轿驶向宫门深处。" }
    ]
  },
  {
    id: "1-3",
    episode: 1,
    scene: 3,
    title: "凤仪殿",
    meta: "1-3 凤仪殿 夜 内",
    people: ["苏念薇", "宇文渊"],
    lines: [
      { type: "action", text: "烛火摇曳，凤仪殿内冷香幽微。苏念薇摘下凤冠，抬眸看向屏风后的高大身影。" },
      { type: "dialog", name: "宇文渊", mood: "低声", text: "外面都说你怕我。" },
      { type: "dialog", name: "苏念薇", mood: "淡笑", text: "怕一个人，和利用一个人，从来不是一回事。" }
    ]
  },
  {
    id: "2-1",
    episode: 2,
    scene: 1,
    title: "冷宫偏院",
    meta: "2-1 冷宫偏院 夜 外",
    people: ["苏念薇", "柳如烟"],
    lines: [
      { type: "action", text: "雨水敲在青瓦上，冷宫偏院里灯影摇晃。柳如烟披着斗篷，悄悄推门而入。" },
      { type: "dialog", name: "柳如烟", mood: "压低声音", text: "姐姐，你以为进了宫，就能翻身吗？" },
      { type: "dialog", name: "苏念薇", mood: "抬眼", text: "我能不能翻身不重要，重要的是，你快藏不住了。" }
    ]
  }
];

const state = {
  route: "home",
  projectTab: "episodes",
  assetTab: "roles",
  assetDetail: { type: "roles", index: 0 },
  selectedEpisodeScene: "1-1",
  sidebarCollapsed: null,
  assistantCollapsed: true,
  importMode: "template",
  selectedModel: "seedance 2.0fast",
  selectedStyle: "二次元",
  selectedRatio: "16:9",
  modelOpen: false,
  styleOpen: false,
  ratioOpen: false,
  storyboardMode: "list",
  selectedStoryEpisode: 1,
  selectedStoryScene: 2,
  modal: null,
  toast: "",
  appliedShot: false,
  uploadedScript: null,
  chatInput: "",
  chats: {
    episodes: [
      { from: "ai", text: "你好！我是漫剧创作助手，可以帮你完成以下工作：<br>· 资产生成：角色原画、场景素材、道具设计<br>· 剧情设计：分集规划、角色设定、场景构建<br>· 制作指导：风格指导、流程优化<br>请告诉我你的需求，我会为你提供专业的支持。" }
    ],
    roles: [
      { from: "ai", text: "你好！我是漫剧创作助手，我可以帮你调整角色形象、属性或场景设置。" },
      { from: "user", text: "请把苏晚星的形象改成短发，更干练一些" },
      { from: "ai", text: "已为你更新苏晚星的形象，调整为短发，更显干练气质。", card: "role" }
    ],
    scenes: [
      { from: "user", text: "帮我把薰衣草花园的简介改得更简短一些，突出这是苏晚星小时候最喜欢的地方。" },
      { from: "ai", text: "已为你优化薰衣草花园的简介，突出这是苏晚星小小院最喜欢的地方。<br><br><b>苏晚星的薰衣草花园</b><br>顶尖法医，因阴谋失去四年前的记忆。在找回真相与记忆的过程中，重拾自我、爱情与家庭。" },
      { from: "user", text: "把“小时时候最喜欢的地方”换个说法" },
      { from: "ai", text: "已为你优化薰衣草花园的简介，突出这是苏晚星小小院最喜欢的地方。<br><br><b>苏晚星的薰衣草花园</b><br>顶尖法医，因阴谋失去四年前的记忆。在找回真相与记忆的过程中，重拾自我、爱情与家庭。" }
    ],
    storyboard: [
      { from: "user", text: "帮我把分镜的时长改为6秒，并增加手机屏幕特写镜头。" },
      { from: "ai", text: "已为您调整分镜的时长为6秒，并增加了手机屏幕特写镜头，脚本已更新：", card: "story" },
      { from: "user", text: "帮我把分镜的时长改为6秒，并增加手机屏幕特写镜头。" },
      { from: "ai", text: "已为您调整分镜的时长为6秒，并增加了手机屏幕特写镜头，脚本已更新：", card: "story" }
    ],
    props: [
      { from: "ai", text: "你好！我是漫剧创作助手，我可以帮你整理道具设定、生成道具图或优化提示词。" }
    ]
  }
};

const iconMap = {
  home: `<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9 20v-5h6v5"/></svg>`,
  brief: `<svg viewBox="0 0 24 24"><path d="M4 8.5h16V19H4z"/><path d="M8 8.5V6h8v2.5"/><path d="M4 13h16"/></svg>`,
  team: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.8-3.2 2.7-5 5.5-5s4.7 1.8 5.5 5"/><circle cx="17" cy="10" r="2.5"/><path d="M14.5 15c2.8.1 4.6 1.4 5.5 4"/></svg>`,
  gem: `<svg viewBox="0 0 24 24"><path d="M6.5 4.5h11L21 9l-9 10L3 9z"/><path d="M3 9h18"/><path d="M8 4.5 12 9l4-4.5"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.1-4 3.4-6 7-6s5.9 2 7 6"/><circle cx="12" cy="12" r="9"/></svg>`,
  folder: `<svg viewBox="0 0 24 24"><path d="M3.5 6.5h6l2 2H20.5V19H3.5z"/><path d="M3.5 10h17"/></svg>`,
  book: `<svg viewBox="0 0 24 24"><path d="M6 4h9.5A2.5 2.5 0 0 1 18 6.5V20H8.5A2.5 2.5 0 0 1 6 17.5z"/><path d="M8.5 16H18"/><path d="M9 8h5"/></svg>`,
  stack: `<svg viewBox="0 0 24 24"><path d="m12 3 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/></svg>`,
  board: `<svg viewBox="0 0 24 24"><path d="M5 5h14v14H5z"/><path d="M9 5v14"/><path d="M5 10h14"/></svg>`,
  edit: `<svg viewBox="0 0 24 24"><path d="M4 20h4l11-11-4-4L4 16z"/><path d="m13 7 4 4"/></svg>`,
  style: `<svg viewBox="0 0 24 24"><path d="M4 17 9.5 9l4 5 2.5-3 4 6z"/><path d="M5 5h14v14H5z"/><circle cx="9" cy="8" r="1.5"/></svg>`,
  upload: `<svg viewBox="0 0 24 24"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 18v2h14v-2"/></svg>`,
  magic: `<svg viewBox="0 0 24 24"><path d="M12 2v5"/><path d="M12 17v5"/><path d="M2 12h5"/><path d="M17 12h5"/><path d="m5 5 3.5 3.5"/><path d="m15.5 15.5L19 19"/><path d="m19 5-3.5 3.5"/><path d="m8.5 15.5L5 19"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M6 17h12l-1.4-2V10a4.6 4.6 0 0 0-9.2 0v5z"/><path d="M10 20h4"/></svg>`,
  crown: `<svg viewBox="0 0 24 24"><path d="m4 8 4 4 4-7 4 7 4-4-2 10H6z"/></svg>`,
  panelLeft: `<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z"/><path d="M10 5v14"/><path d="m15 9-3 3 3 3"/></svg>`,
  panelRight: `<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z"/><path d="M14 5v14"/><path d="m9 9 3 3-3 3"/></svg>`,
  back: `<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`
};

function icon(name) {
  return `<span class="ico">${iconMap[name] || name}</span>`;
}

function appShell(content, opts = {}) {
  const isProject = opts.project;
  const isHomeMini = opts.homeMini;
  const miniSidebar = sidebarIsMini(isProject, isHomeMini);
  return `
    <div class="app figma-app ${isProject ? "project-shell" : ""} ${isHomeMini ? "home-shell" : ""} ${miniSidebar ? "sidebar-mini" : "sidebar-wide"} ${state.assistantCollapsed ? "assistant-is-collapsed" : ""}" data-figma-file="AgNt6rwgAj92sB4cDWEMTL">
      ${sidebar(isProject, isHomeMini)}
      <main class="main">
        ${topbar()}
        ${content}
      </main>
    </div>
    ${state.modal ? modal() : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function sidebarIsMini(isProject, isHomeMini) {
  if (state.sidebarCollapsed !== null) return state.sidebarCollapsed;
  return Boolean(isProject || isHomeMini);
}

function sidebar(isProject, isHomeMini = false) {
  const mini = sidebarIsMini(isProject, isHomeMini);
  const items = isHomeMini
    ? [
        ["home", "首页", "home"],
        ["folder", "创作工作台", "workbench"],
        ["team", "我的团队", "team"],
        ["gem", "积分中心", "points"],
        ["user", "个人中心", "profile"]
      ]
    : isProject
    ? [
        ["home", "首页", "home"],
        ["brief", "创作工作台", "workbench"],
        ["folder", "项目", "project"],
        ["team", "我的团队", "team"],
        ["gem", "积分中心", "points"],
        ["user", "个人中心", "profile"]
      ]
    : [
        ["home", "首页", "home"],
        ["brief", "创作工作台", "workbench"],
        ["team", "我的团队", "team"],
        ["gem", "积分中心", "points"],
        ["user", "个人中心", "profile"]
      ];
  return `
    <aside class="sidebar ${mini ? "is-mini" : "is-wide"}">
      <div class="brand">
        <span class="brand-mark">✣</span>
        <span>欢漫</span>
        <button class="collapse-hint" data-action="toggle-sidebar" aria-label="${mini ? "展开侧边栏" : "收起侧边栏"}">${icon(mini ? "panelRight" : "panelLeft")}</button>
      </div>
      <nav class="nav-list">
        ${items.map(([ic, label, route]) => `
          <button class="nav-item ${route && navActive(route) ? "active" : ""}" ${route ? `data-route="${route}"` : ""} title="${label}">
            ${icon(ic)}<span class="nav-label">${label}</span>
          </button>
        `).join("")}
      </nav>
    </aside>
  `;
}

function navActive(route) {
  if (route === "project") return state.route === "project";
  return state.route === route;
}

function topbar() {
  return `
    <div class="topbar">
      <div class="notice"><span class="spark">✣</span> 模型已升级，视频效果更生动，快去试试吧</div>
      <div class="top-actions">
        <button class="pill">+ 66</button>
        <button class="pill vip">${icon("crown")} 开会员</button>
        <button class="round">${icon("bell")}</button>
        <img class="avatar" src="${A}top-avatar.png" alt="头像" />
      </div>
    </div>
  `;
}

function homePage() {
  return appShell(`
    <section class="page home-page" data-figma-node="363:14524">
      <div class="home-wrap">
        <div class="hero-grid">
          <div>
            <div class="hello"><span class="hello-mark">✣</span> Hi 小月月 ☀</div>
            <div class="subcopy">欢漫助你产出爆款视频。快来描述你的想法，AI 会自动生成分镜、台词与画面～</div>
            <div class="upload-panel">
              <div class="import-tabs">
                <button class="import-tab ${state.importMode === "template" ? "active" : ""}" data-action="switch-import" data-import-mode="template">${icon("upload")} 模板导入</button>
                <button class="import-tab ${state.importMode === "novel" ? "active" : ""}" data-action="switch-import" data-import-mode="novel">${icon("book")} AI自动拆解小说 <span class="free-badge">剧本限免</span></button>
              </div>
              ${homeUploadContent()}
              <input id="scriptUploadInput" class="file-input" type="file" accept=".doc,.docx,.pdf,.txt,.md,.xls,.xlsx" />
              <div class="tool-row">
                <button class="ghost-btn" data-action="upload">${icon("upload")} 上传文件</button>
                <button class="ghost-btn model-trigger" data-action="toggle-model">${state.selectedModel}</button>
                <button class="ghost-btn style-trigger" data-action="toggle-style">${icon("style")} 风格：${state.selectedStyle}</button>
                <button class="ghost-btn ratio-trigger" data-action="toggle-ratio">${state.selectedRatio}</button>
                ${state.uploadedScript ? `<button class="parse-btn" data-action="parse-script">${state.importMode === "novel" ? "小说拆解" : "剧本解析"} <span>✦</span> 3</button>` : `<button class="send" data-action="create-from-home">↑</button>`}
              </div>
              ${modelSelect("home", "home-model-pop")}
              ${styleSelect("home", "home-style-pop")}
              ${ratioSelect("home", "home-ratio-pop")}
            </div>
            ${state.uploadedScript ? `<div class="copyright-note">请确认上传的剧本有合法版权</div>` : ""}
          </div>
          <div class="banner">
            <img src="${A}hero-banner.png?v=original-1" alt="新特效上线，电影运镜一键同款" />
          </div>
        </div>
        <div class="section-title">爆款案例</div>
        <div class="case-grid">${cases.map(caseCard).join("")}</div>
      </div>
    </section>
  `, { project: true, homeMini: true });
}

function homeUploadContent() {
  if (!state.uploadedScript) {
    const prompt = state.importMode === "novel"
      ? "在此输入或上传小说内容，AI 会自动拆解剧情、角色关系、场景与分集结构。"
      : "在此输入你的想法，可以尝试输入这些要素：故事设定、主角特征等。";
    return `<div class="upload-hint home-prompt">${prompt}</div>`;
  }
  return `
    <div class="script-upload-card">
      <div class="script-file-icon">${state.importMode === "novel" ? "N" : "W"}</div>
      <div class="script-file-meta">
        <div class="script-file-name">${escapeHtml(state.uploadedScript.name)}</div>
        <div class="script-file-status">${state.importMode === "novel" ? "小说上传成功" : "上传成功"}</div>
      </div>
      <button class="script-remove" data-action="clear-upload" aria-label="移除上传文件">×</button>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function caseCard(item) {
  return `
    <article class="case-card" data-route="project">
      <img src="${A}${item[0]}" alt="${item[1]}" />
      <div class="case-title">${item[1]} <span class="author">${item[2]}</span></div>
    </article>
  `;
}

function modelSelect(scope, extraClass = "") {
  return `
    <div class="select-pop ${extraClass} ${state.modelOpen ? "" : "hidden"}" data-scope="${scope}">
      <div class="select-title">选择模型</div>
      ${models.map((model) => `
        <button class="model-option ${state.selectedModel === model ? "active" : ""}" data-model="${model}">
          <span>✣</span>${model}
        </button>
      `).join("")}
    </div>
  `;
}

function styleSelect(scope, extraClass = "") {
  return `
    <div class="style-pop ${extraClass} ${state.styleOpen ? "" : "hidden"}" data-scope="${scope}">
      <div class="style-pop-title">选择风格</div>
      <div class="style-grid">
        ${styles.map(([name, cls]) => `
          <button class="style-option ${state.selectedStyle === name ? "active" : ""}" data-style="${name}">
            <span class="style-avatar ${cls}" aria-hidden="true">
              <span class="avatar-head"></span>
              <span class="avatar-body"></span>
              <span class="avatar-accent"></span>
            </span>
            <span class="style-name">${name}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function ratioSelect(scope, extraClass = "") {
  return `
    <div class="ratio-pop ${extraClass} ${state.ratioOpen ? "" : "hidden"}" data-scope="${scope}">
      <div class="select-title">选择比例</div>
      ${ratios.map((ratio) => `
        <button class="ratio-option ${state.selectedRatio === ratio ? "active" : ""}" data-ratio="${ratio}">
          <span class="ratio-shape ratio-${ratio.replace(":", "-")}" aria-hidden="true"></span>
          <span>${ratio}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function workbenchPage() {
  return appShell(`
    <section class="page workbench-page" data-figma-node="181:566">
      <div class="workbench">
        <div class="page-title">我的项目</div>
        <div class="project-grid">
          <div>
            <button class="create-card" data-action="open-create">
              <span><span class="plus">+</span>创建新项目</span>
            </button>
            <div class="project-title">新建项目</div>
            <div class="date-line" style="margin-left:0;margin-top:8px">开启您的创作之旅</div>
          </div>
          ${projects.map(([img, title]) => `
            <article class="project-card" data-route="project">
              <img src="${A}${img}" alt="${title}" />
              <div class="project-title">${title}</div>
              <div class="date-line" style="margin-left:0;margin-top:8px">最后编辑于 2026年5月17日 20:25</div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `);
}

function projectPage() {
  const tabs = {
    episodes: episodesView,
    roles: assetRolesView,
    scenes: assetScenesView,
    props: assetPropsView,
    assetDetail: assetDetailView,
    storyboard: () => state.storyboardMode === "editor" ? storyboardView() : storyboardOverviewView()
  };
  return appShell(`
    <div class="project-shell-layout ${state.assistantCollapsed ? "assistant-collapsed" : ""}" data-figma-node="363:14524">
      <section class="project-main">
        ${projectHeader()}
        ${tabs[state.projectTab]()}
      </section>
      ${assistantPanel()}
    </div>
  `, { project: true });
}

function projectHeader() {
  return `
    <header class="project-header">
      <div class="project-meta">
        <div class="project-name">${icon("folder")} 都市异能录</div>
        <span class="status">制作中</span>
        <span class="meta-text">资产数： <b style="color:#211d36">24</b></span>
        <span class="meta-text">创建于 2026-05-12</span>
      </div>
      ${state.projectTab === "assetDetail" ? "" : `<div class="project-tabs">
        <button class="project-tab ${state.projectTab === "episodes" ? "active" : ""}" data-project-tab="episodes">${icon("book")} 剧集内容</button>
        <button class="project-tab ${["roles", "scenes", "props", "assetDetail"].includes(state.projectTab) ? "active" : ""}" data-project-tab="roles">${icon("stack")} 资产库</button>
        <button class="project-tab ${state.projectTab === "storyboard" ? "active" : ""}" data-project-tab="storyboard">${icon("board")} 分镜制作</button>
      </div>`}
    </header>
  `;
}

function episodesView() {
  const repeated = "一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创一夜未眠，竟变成了我陈手作创";
  const activeScene = episodeScenes.find((scene) => scene.id === state.selectedEpisodeScene) || episodeScenes[0];
  return `
    <div class="project-content has-fixed-cta">
      <div class="content-narrow">
        <section class="info-card">
          <div class="card-head">
            <div>
              <div class="card-title">项目信息</div>
              <div class="card-subtitle">填写剧集基础信息与创作风格</div>
            </div>
            <button class="ghost-btn" data-action="toast-edit">${icon("edit")} 编辑项目</button>
          </div>
          <div class="field-grid">
            <div class="field"><label>剧集标题</label><div class="input-box">一夜未眠，竟变成了我陈手作创</div></div>
            <div class="field"><label>创作风格</label><div class="input-box">二次元动漫 <span>⌄</span></div></div>
            <div class="field"><label>画面比例</label><div class="input-box">${state.selectedRatio} <span>⌄</span></div></div>
            <div class="field"><label>总集数</label><div class="input-box">20 <span class="muted">集</span></div></div>
          </div>
          <div class="field"><label>故事摘要</label><div class="textarea-box">${repeated}${repeated}</div></div>
        </section>
        <section class="episode-section">
          <div class="card-head">
            <div><div class="card-title">分集内容</div><div class="card-subtitle">规划每集的主要内容与剧情走向</div></div>
            <button class="ghost-btn" data-action="open-add-episode">${icon("plus")} 添加集</button>
          </div>
          <div class="episode-script-layout">
            ${episodeScenePreview()}
            ${episodeImportedContent(activeScene)}
          </div>
        </section>
      </div>
      ${episodeAssetCta()}
    </div>
  `;
}

function episodeAssetCta() {
  return `
    <div class="episode-fixed-cta" role="region" aria-label="剧本资产拆解">
      <div class="episode-cta-logo">HM</div>
      <div class="episode-cta-copy">剧本已就绪，智能梳理角色各阶段妆造及多视角场景，省去繁琐人工提取。支持手动点击生图或上传自有图片，创作更自由</div>
      <button class="episode-cta-button" data-action="decompose-assets">剧本资产拆解 <span>✦</span> 45</button>
    </div>
  `;
}

function episodeScenePreview() {
  const episodes = [...new Set(episodeScenes.map((scene) => scene.episode))];
  return `
    <aside class="episode-preview">
      ${episodes.map((episode) => `
        <div class="episode-preview-group">
          <div class="episode-preview-title">第${episode}集</div>
          ${episodeScenes.filter((scene) => scene.episode === episode).map((scene) => `
            <button class="scene-preview-card ${state.selectedEpisodeScene === scene.id ? "active" : ""}" data-episode-scene="${scene.id}">
              <span class="scene-index">第${scene.scene}场</span>
              <span class="scene-preview-meta">${scene.meta.replace(`${scene.id} `, "")}</span>
            </button>
          `).join("")}
        </div>
      `).join("")}
    </aside>
  `;
}

function episodeImportedContent(scene) {
  return `
    <article class="episode-imported">
      <div class="imported-head">
        <div>
          <div class="imported-eyebrow">导入内容</div>
          <div class="scene-meta-highlight">${scene.meta}</div>
        </div>
        <button class="ghost-btn">${icon("edit")} 编辑场次</button>
      </div>
      <div class="people-row">
        <span class="people-label">人物：</span>
        ${scene.people.map((person) => `<span class="person-chip">${person}</span>`).join("")}
      </div>
      <div class="script-lines">
        ${scene.lines.map(scriptLine).join("")}
      </div>
    </article>
  `;
}

function scriptLine(line) {
  if (line.type === "dialog") {
    return `
      <p class="script-line dialog-line">
        <span class="speaker">${line.name}</span><span class="mood">（${line.mood}）</span>：${line.text}
      </p>
    `;
  }
  return `<p class="script-line action-line"><span class="action-mark">△</span>${line.text}</p>`;
}

function nextEpisodeDraft() {
  const maxEpisode = Math.max(...episodeScenes.map((scene) => scene.episode));
  return {
    episode: maxEpisode + 1,
    scene: 1,
    title: "新场景",
    time: "日",
    space: "外",
    people: "苏念薇、萧景川",
    content: "△长街尽头雾色未散，车马声由远及近。苏念薇立在石阶前，袖口被风吹起。\n苏念薇（低声）：这一局，该换我来落子了。"
  };
}

function parseSceneLines(content) {
  return content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^人物[:：]/.test(line) && !/^\d+-\d+\s/.test(line))
    .map((line) => {
      const action = line.replace(/^△\s*/, "");
      const dialog = action.match(/^(.+?)（(.+?)）[:：](.+)$/);
      if (dialog) {
        return { type: "dialog", name: dialog[1].trim(), mood: dialog[2].trim(), text: dialog[3].trim() };
      }
      return { type: "action", text: action };
    });
}

function addEpisodeSceneFromModal() {
  const episode = Math.max(1, Number(document.getElementById("episodeNumber")?.value) || nextEpisodeDraft().episode);
  const scene = Math.max(1, Number(document.getElementById("sceneNumber")?.value) || 1);
  const title = (document.getElementById("sceneTitle")?.value || "新场景").trim();
  const time = (document.getElementById("sceneTime")?.value || "日").trim();
  const space = (document.getElementById("sceneSpace")?.value || "外").trim();
  const people = (document.getElementById("scenePeople")?.value || "苏念薇")
    .split(/[、,，]/)
    .map((person) => person.trim())
    .filter(Boolean);
  const content = (document.getElementById("sceneContent")?.value || "").trim();
  const lines = parseSceneLines(content);
  const id = `${episode}-${scene}`;

  const existingIndex = episodeScenes.findIndex((item) => item.id === id);
  const sceneData = {
    id,
    episode,
    scene,
    title,
    meta: `${id} ${title} ${time} ${space}`,
    people: people.length ? people : ["苏念薇"],
    lines: lines.length ? lines : [{ type: "action", text: "这场内容待补充。" }]
  };

  if (existingIndex >= 0) {
    episodeScenes.splice(existingIndex, 1, sceneData);
  } else {
    episodeScenes.push(sceneData);
    episodeScenes.sort((a, b) => a.episode - b.episode || a.scene - b.scene);
  }

  state.selectedEpisodeScene = id;
  state.modal = null;
  toast(existingIndex >= 0 ? "已更新场次内容" : `已添加第${episode}集第${scene}场`);
}

function assetTabs() {
  return `
    <div class="asset-tabs">
      <button class="asset-tab ${state.projectTab === "roles" ? "active" : ""}" data-project-tab="roles">全部角色 22</button>
      <button class="asset-tab ${state.projectTab === "scenes" ? "active" : ""}" data-project-tab="scenes">全部场景 67</button>
      <button class="asset-tab ${state.projectTab === "props" ? "active" : ""}" data-project-tab="props">全部道具 34</button>
    </div>
  `;
}

function assetListView({ title, subtitle, actionText, items }) {
  return `
    ${assetTabs()}
    <div class="project-content">
      <section class="asset-board">
        <div class="generation-strip">
          <div>
            <div class="card-title" style="margin:0 0 8px">${title}</div>
            <div class="card-subtitle">${subtitle}</div>
          </div>
          <button class="small-btn dark">${actionText}</button>
        </div>
        <div class="role-grid">
          ${items.map((item, index) => assetCard(item, index)).join("")}
        </div>
        <div class="bottom-flow">
          <span class="flow-logo">HM</span>
          <span class="flow-copy">角色和场景设定会应用到整部剧集中，建议调整完毕后再继续哦～</span>
          <span class="flow-actions">
            <button class="flow-btn prev" data-project-tab="episodes">上一步</button>
            <button class="flow-btn" data-project-tab="storyboard">下一步</button>
          </span>
        </div>
      </section>
    </div>
  `;
}

function assetRolesView() {
  return assetListView({
    title: "生成或导入角色形象图",
    subtitle: "已识别11个角色。可批量生成所有角色形象图，或上传自己的形象图。",
    actionText: "多选",
    items: roleAssets
  });
}

function roleCard(role, index = 0) {
  const sheetX = role.sheetIndex % 3;
  const sheetY = Math.floor(role.sheetIndex / 3);
  return `
    <article class="role-card" data-action="open-asset-detail" data-asset-type="roles" data-asset-index="${index}">
      <button class="role-image-btn" data-action="open-asset-detail" data-asset-type="roles" data-asset-index="${index}" aria-label="查看${role.name}形象图">
        <span class="role-portrait" style="--sheet-x:${sheetX};--sheet-y:${sheetY}" aria-hidden="true"></span>
      </button>
      <div class="role-info">
        <button class="role-name" data-action="open-asset-detail" data-asset-type="roles" data-asset-index="${index}">${role.name}</button>
        <button class="role-intro" data-action="open-asset-detail" data-asset-type="roles" data-asset-index="${index}">${role.intro}</button>
        <button class="role-prompt" data-action="open-asset-detail" data-asset-type="roles" data-asset-index="${index}">
          <span>提示词</span>${role.prompt}
        </button>
      </div>
    </article>
  `;
}

function assetScenesView() {
  return assetListView({
    title: "生成或导入场景图",
    subtitle: "已识别67个场景。可批量生成场景素材，或上传自己的场景图。",
    actionText: "批量生成",
    items: sceneAssets
  });
}

function assetPropsView() {
  return assetListView({
    title: "生成或导入道具图",
    subtitle: "已识别34个道具。可批量生成关键道具，或上传自己的道具图。",
    actionText: "批量生成",
    items: propAssets
  });
}

function getAssetItems(type = state.assetDetail.type) {
  if (type === "props") return propAssets;
  if (type === "scenes") return sceneAssets;
  return roleAssets;
}

function assetTypeLabel(type = state.assetDetail.type) {
  return type === "props" ? "道具" : type === "scenes" ? "场景" : "角色";
}

function assetImageNode(asset, className = "detail-image-fill") {
  if (typeof asset.sheetIndex === "number") {
    const sheetX = asset.sheetIndex % 3;
    const sheetY = Math.floor(asset.sheetIndex / 3);
    return `<span class="${className} role-portrait detail-sheet" style="--sheet-x:${sheetX};--sheet-y:${sheetY}" aria-hidden="true"></span>`;
  }
  const sheetX = asset.thumbIndex % 3;
  const sheetY = Math.floor(asset.thumbIndex / 3);
  return `<span class="${className} asset-sheet-thumb detail-sheet" style="--asset-x:${sheetX};--asset-y:${sheetY}" aria-hidden="true"></span>`;
}

function assetDetailView() {
  const type = state.assetDetail.type || "roles";
  const items = getAssetItems(type);
  const index = Math.min(Math.max(Number(state.assetDetail.index) || 0, 0), items.length - 1);
  const asset = items[index];
  const variants = Array.from({ length: 5 }, (_, offset) => items[(index + offset) % items.length]);
  const label = assetTypeLabel(type);
  const description = asset.intro || `当前${label}资产已用于项目设定，可继续生成不同形象与出场版本。`;
  return `
    <div class="asset-detail-page">
      <div class="asset-detail-tabs">
        <button class="icon-btn" data-project-tab="${type}">${icon("back")}</button>
        ${items.map((item, itemIndex) => `
          <button class="asset-detail-tab ${itemIndex === index ? "active" : ""}" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${itemIndex}">${item.name}</button>
        `).join("")}
      </div>
      <div class="asset-detail-canvas">
        <section class="asset-detail-summary">
          <b>${asset.name}</b>
          <span>${description}</span>
        </section>

        <section class="asset-hero-card">
          ${assetImageNode(asset)}
          <div class="asset-card-gradient">
            <b>${asset.name}：基础${label === "角色" ? "形象" : "素材"}</b>
            <span>出现集数：第 1，2，3，4，5集</span>
          </div>
        </section>

        <button class="asset-add-btn" data-action="fake-generate">+</button>
        <svg class="asset-branch-lines" viewBox="0 0 1088 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M544 0 C544 82 544 98 544 180" />
          <path d="M544 0 C470 88 332 70 160 180" />
          <path d="M544 0 C500 88 470 110 352 180" />
          <path d="M544 0 C588 88 618 110 736 180" />
          <path d="M544 0 C618 88 756 70 928 180" />
        </svg>

        <div class="asset-variant-row">
          ${variants.map((variant, variantIndex) => `
            <article class="asset-variant-card" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${items.indexOf(variant)}">
              ${assetImageNode(variant, "detail-image-fill")}
              <div class="asset-card-gradient small">
                <b>${variant.name}：基础${label === "角色" ? "形象" : "素材"}</b>
                <span>出现集数：第 1，2，3，4，5集</span>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function assetCard(asset, index = 0) {
  if (typeof asset.sheetIndex === "number") return roleCard(asset, index);
  const sheetX = asset.thumbIndex % 3;
  const sheetY = Math.floor(asset.thumbIndex / 3);
  const type = state.projectTab === "props" ? "props" : "scenes";
  return `
    <article class="role-card asset-card" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${index}">
      <button class="role-image-btn" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${index}" aria-label="查看${asset.name}图片">
        <span class="asset-sheet-thumb" style="--asset-x:${sheetX};--asset-y:${sheetY}" aria-hidden="true"></span>
      </button>
      <div class="role-info">
        <button class="role-name" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${index}">${asset.name}</button>
        <button class="role-prompt asset-only-prompt" data-action="open-asset-detail" data-asset-type="${type}" data-asset-index="${index}">
          <span>提示词</span>${asset.prompt}
        </button>
      </div>
    </article>
  `;
}

function storyboardOverviewView() {
  return `
    <div class="storyboard-overview">
      <div class="storyboard-overview-head">
        <div>
          <h2>分集视频</h2>
          <p><b>共 20 集</b><span></span>分镜脚本生成100字符消耗 2 积分，以实际生成为准</p>
        </div>
        <div class="storyboard-overview-actions">
          <button class="storyboard-top-btn" data-action="storyboard-add-episode">${icon("plus")} 新增一集</button>
          <button class="storyboard-top-btn" data-action="storyboard-batch">⌘ 批量</button>
        </div>
      </div>
      <div class="storyboard-episode-grid">
        ${storyboardEpisodes.map(storyboardEpisodeCard).join("")}
      </div>
    </div>
  `;
}

function storyboardEpisodeCard(item) {
  return `
    <article class="storyboard-episode-card" data-action="enter-storyboard" data-storyboard-episode="${item.episode}">
      <div class="storyboard-thumb ${item.cover ? "has-cover" : ""}">
        ${item.cover ? `<img src="${A}${item.cover}" alt="第${item.episode}集预览" />` : `<span class="play-placeholder">▶</span>`}
      </div>
      <div class="storyboard-card-body">
        <span class="storyboard-status">${item.status}</span>
        <h3>第${item.episode}集：${item.title}</h3>
        <p>角色 ${item.roles} · 场景 ${item.scenes}${item.shots ? ` · 分镜 ${item.shots}` : ""}</p>
        <button class="storyboard-card-action" data-action="enter-storyboard" data-storyboard-episode="${item.episode}">
          ${item.ready ? "♢" : "⌘"} ${item.action}
        </button>
      </div>
    </article>
  `;
}

function storyboardView() {
  return `
    <div class="story-layout">
      <div class="story-creator">
        ${storySwitcher()}
        ${storyAssetLibrary()}
        <aside class="prompt-panel">
          ${storyOriginalBlock()}
          <div class="prompt-head">
            <div class="story-current-wrap">
              <button class="story-back-btn" data-action="back-storyboard-list">← 分集视频</button>
              <div class="card-title" style="margin:0">提示词</div>
              <span class="story-current-inline">第${state.selectedStoryEpisode}集 · 第${state.selectedStoryScene}场</span>
            </div>
            <div class="story-prompt-actions">
              <button class="project-tab" style="color:#8a17ff">创作指南 ↗</button>
              <button class="story-export-btn">▣ 导出</button>
            </div>
          </div>
          <div class="prompt-empty">描述你的想法，@ 引用角色/资产/场景...</div>
          <div class="prompt-bottom">
            ${modelSelect("story-left")}
            <div style="display:flex;align-items:center;gap:10px">
              <button class="round">@</button>
              <button class="ghost-btn model-trigger" data-action="toggle-model">${state.selectedModel}</button>
              <button class="ghost-btn">◷ 15s</button>
              <button class="send" data-action="toggle-model" style="background:var(--deep)">↑</button>
            </div>
          </div>
        </aside>
      </div>
      <section class="story-workspace">
        <div class="video-box">
          <img class="video-scene-img" src="${A}story-main.png" alt="视频预览" />
          <div class="video-control"><b>Ⅱ</b><span>00:00 / 05:30</span><div class="progress"></div></div>
        </div>
      </section>
      <div class="story-shot-strip">
        <div class="shots">
          ${shotCard("1", "全景", "3s", "第1集：订婚惊变妹妹夺爱", "shot-rain.png", true)}
          ${shotCard("2", "中景", "3s", "第1集：订婚惊变妹妹夺爱", "shot-umbrella.png")}
          ${shotCard("2", "中景", "3s", "第1集：订婚惊变妹妹夺爱", "shot-girl.png")}
          ${shotCard("2", "特写", "3s", "第1集：订婚惊变妹妹夺爱", "shot-boy.png")}
          ${shotCard("2", "中景", "3s", "第1集：订婚惊变妹妹夺爱", "shot-selfie.png")}
          ${state.appliedShot ? shotCard("3", "特写", "6s", "手机屏幕显示来电号码", "shot-selfie.png") : ""}
        </div>
      </div>
    </div>
  `;
}

function storyAssetLibrary() {
  return `
    <aside class="story-asset-library" aria-label="资产库">
      <div class="story-asset-head">
        <h3>资产库</h3>
        <button class="asset-add-btn" data-action="story-asset-add" aria-label="添加资产">+</button>
      </div>
      ${storyAssetSection("角色", "user", roleAssets.slice(0, 4), "role")}
      ${storyAssetSection("场景", "style", sceneAssets.slice(0, 2), "scene")}
    </aside>
  `;
}

function storyAssetSection(title, iconName, items, type) {
  return `
    <section class="story-asset-section">
      <div class="story-asset-section-title">${icon(iconName)} <span>${title}</span><em>(${items.length})</em></div>
      <div class="story-asset-grid">
        ${items.map((item, index) => storyAssetMiniCard(item, index, type)).join("")}
      </div>
    </section>
  `;
}

function storyAssetMiniCard(item, index, type) {
  const title = `${item.name}-基础形象-${item.prompt}`;
  let image = "";
  if (type === "role") {
    const x = item.sheetIndex % 3;
    const y = Math.floor(item.sheetIndex / 3);
    image = `<span class="story-role-thumb" style="--sheet-x:${x};--sheet-y:${y}" aria-hidden="true"></span>`;
  } else {
    const x = item.thumbIndex % 3;
    const y = Math.floor(item.thumbIndex / 3);
    image = `<span class="story-scene-thumb" style="--asset-x:${x};--asset-y:${y}" aria-hidden="true"></span>`;
  }
  return `
    <button class="story-asset-card" data-action="story-asset-use" data-asset-name="${item.name}">
      <span class="story-asset-thumb">${image}</span>
      <span class="story-asset-name">${escapeHtml(title)}</span>
    </button>
  `;
}

function storyOriginalBlock() {
  const scene = episodeScenes.find((item) => item.episode === state.selectedStoryEpisode && item.scene === state.selectedStoryScene) || episodeScenes[0];
  const rawText = scene.lines.map((line) => {
    if (line.type === "dialog") {
      return `${line.name}（${line.mood}）：${line.text}`;
    }
    return `△${line.text}`;
  }).join("\n");
  return `
    <section class="original-block" aria-label="原文">
      <div class="original-head">
        <span>原文</span>
      </div>
      <p>${escapeHtml(rawText)}</p>
    </section>
  `;
}

function storySwitcher() {
  const episodes = [1, 2, 3, 4];
  const scenes = {
    1: [1, 2, 3, 4],
    2: [1, 2, 3],
    3: [1, 2],
    4: [1, 2]
  };
  const cn = ["", "一", "二", "三", "四"];
  return `
    <div class="story-switcher">
      ${episodes.map((episode) => {
        const expanded = state.selectedStoryEpisode === episode;
        return `
          <div class="story-tree-group ${expanded ? "expanded" : ""}">
            <button class="episode-chip ${expanded ? "active" : ""}" data-story-episode="${episode}">
              <span>第${cn[episode]}集</span>
              <span class="episode-caret">${expanded ? "⌃" : "⌄"}</span>
            </button>
            ${expanded ? `
              <div class="scene-row">
                ${scenes[episode].map((scene) => `
                  <button class="scene-chip ${state.selectedStoryScene === scene ? "active" : ""}" data-story-scene="${scene}">${episode}-${scene}</button>
                `).join("")}
              </div>
            ` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function shotCard(num, type, duration, title, img, active = false) {
  return `
    <article class="shot-card ${active ? "active" : ""}">
      <div class="shot-meta"><span class="shot-num">${num}</span><span class="muted">${duration}</span></div>
      <div class="shot-title">${title}</div>
      <img src="${A}${img}" alt="${title}" />
    </article>
  `;
}

function assistantPanel() {
  const activeAssetType = state.projectTab === "assetDetail" ? state.assetDetail.type : state.projectTab;
  const key = state.projectTab === "storyboard" ? "storyboard" : activeAssetType === "scenes" ? "scenes" : activeAssetType === "props" ? "props" : activeAssetType === "roles" ? "roles" : "episodes";
  const quick = key === "scenes"
    ? ["优化简介", "更换模型", "出现集数", "新形象"]
    : key === "roles"
      ? ["为傅景珩添加西装形象", "为苏晚星生成几个不同的视角", "调整苏晚星发型"]
      : [];
  if (state.assistantCollapsed) {
    return `
      <aside class="assistant assistant-rail">
        <button class="assistant-rail-btn" data-action="toggle-assistant" aria-label="展开 AI 创作助手">
          <span class="ai-orb">✣</span>
          ${icon("panelLeft")}
        </button>
      </aside>
    `;
  }
  return `
    <aside class="assistant">
      <div class="assistant-head">
        <div class="ai-orb">✣</div>
        <div class="assistant-title"><div class="card-title" style="margin:0">AI 创作助手</div><div class="online">● 在线</div></div>
        <button class="assistant-collapse" data-action="toggle-assistant" aria-label="收起 AI 创作助手">${icon("panelRight")}</button>
      </div>
      <div class="chat" id="chat">
        ${state.chats[key].map(messageView).join("")}
        ${quick.length ? `<div class="quick-list">${quick.map(q => `<button class="quick-chip" data-chat="${q}">✣ ${q}</button>`).join("")}</div>` : ""}
      </div>
      <div class="composer">
        <div class="composer-box">
          <textarea id="chatInput" placeholder="描述你的想法，例如：帮我生成第一集的主角原画...">${state.chatInput}</textarea>
          <div class="composer-actions">
            <button class="round">⌘</button>
            <button class="round">@</button>
            <button class="round">▧</button>
            ${key === "storyboard" ? `<button class="ghost-btn">Agent模式</button>` : ""}
            <button class="send" data-action="send-chat" style="background:var(--deep)">↑</button>
          </div>
        </div>
        <div class="helper-note">AI 生成的内容仅供参考，请结合实际情况判断</div>
      </div>
    </aside>
  `;
}

function messageView(msg) {
  if (msg.card === "role") {
    return `
      <div class="msg"><div class="bubble ai">${msg.text}
        <div class="ai-card" style="display:flex;gap:14px">
          <img src="${A}char-suwanxing.png" style="width:148px;height:115px;object-fit:cover;border-radius:10px" alt="苏晚星" />
          <div><b>苏晚星 <span class="free-badge">主角</span></b><br><span class="muted">形象 8/8</span><br><span class="muted">才华横溢的设计师，沈家养女。在与顾泽泠的订婚宴上，惨遭未婚夫和亲妹妹...</span></div>
        </div>
      </div><div class="time">17:02</div></div>
    `;
  }
  if (msg.card === "story") {
    return `
      <div class="msg"><div class="bubble ai">${msg.text}
        <div class="ai-card">
          <b>分镜1（6.0s） 新增镜头：</b><br>
          <span class="muted">镜头1（0-4.0s）：苏晚星被手机神秘铃声吵醒，伸手摸向手机。</span><br>
          <span class="muted">镜头2（4.0-6.0s）：手机屏幕特写，显示来电号码“未知”。</span>
          <button class="ghost-btn" data-action="apply-story" style="float:right;margin-top:8px">${state.appliedShot ? "已应用" : "应用修改"}</button>
        </div>
      </div><div class="time">17:02</div></div>
    `;
  }
  return `<div class="msg"><div class="bubble ${msg.from === "user" ? "user" : "ai"}">${msg.text}</div><div class="time">17:02</div></div>`;
}

function profilePage() {
  return appShell(`
    <section class="page">
      <div class="profile-wrap">
        <div class="profile-banner">
          <div><div class="card-title">个人中心</div><div class="card-subtitle">管理您的个人信息与团队发言</div></div>
          <div style="display:flex;gap:12px"><button class="ghost-btn">♙ 修改密码</button><button class="ghost-btn">${icon("edit")} 编辑资料</button></div>
        </div>
        <div class="profile-grid">
          <div class="profile-card">
            <img class="big-avatar" src="${A}user-avatar.png" alt="用户头像" />
            <div style="font-weight:850;margin-top:12px;font-size:17px">用户昵称用户昵称</div>
            <span class="role-badge">普通用户</span>
            <div class="stat-row">
              <div class="stat-box"><span class="muted">项目数量</span><b>2355</b></div>
              <div class="stat-box"><span class="muted">团队成员</span><b>231</b></div>
            </div>
          </div>
          <div class="basic-card">
            <div class="card-title">基础信息</div>
            <div class="basic-list">
              ${basicItem("☻", "moon哈哈哈哈哈", "用户昵称")}
              ${basicItem("✉", "2346334934@qq.com", "邮箱地址")}
              ${basicItem("☏", "12222222222", "联系电话")}
            </div>
          </div>
        </div>
        <div class="org-card">
          <div class="card-head"><div><div class="card-title">团队与组织</div><div class="card-subtitle">副标题文字副标题文字</div></div><button class="ghost-btn">${icon("plus")} 添加集</button></div>
          ${orgItem("▥", "未填写", "所属公司/部门")}
          ${orgItem("♙", "未填写", "职位/头衔")}
        </div>
      </div>
    </section>
  `);
}

function basicItem(ic, title, sub) {
  return `<div class="basic-item"><div class="basic-icon">${ic}</div><div><div style="font-weight:850;font-size:17px">${title}</div><div class="muted" style="margin-top:6px">${sub}</div></div></div>`;
}

function orgItem(ic, title, sub) {
  return `<div class="org-item"><div class="basic-icon">${ic}</div><div><div style="font-weight:850;font-size:17px">${title}</div><div class="muted" style="margin-top:6px">${sub}</div></div></div>`;
}

function teamPage() {
  return appShell(`
    <section class="page">
      <div class="team-wrap">
        <section class="team-card">
          <div>
            <div class="card-title">我的团队</div>
            <div class="team-actions">
              <button class="small-btn dark" data-action="invite">${icon("stack")} 生成邀请码</button>
              <button class="ghost-btn">${icon("edit")} 编辑团队</button>
              <button class="ghost-btn">⊗ 解散团队</button>
            </div>
          </div>
          <div class="pill" style="border-radius:8px;background:#f6f3fb;color:#5d5873">♡ 我的余额 <b style="color:#8a17ff">0.0</b> <span style="color:#8a17ff">查看明细</span></div>
        </section>
        <section class="team-card">
          <div><div class="card-title">入队申请</div><div class="card-subtitle">暂无入队申请</div></div>
          <button class="ghost-btn">↻ 刷新</button>
        </section>
        <section class="team-row">
          <div class="team-left"><div class="team-logo">✰</div><div><div style="font-weight:850;font-size:17px">绿豆的个人团队</div><div class="muted" style="margin-top:8px">双击成员卡片查看详情　　团队人数1</div></div></div>
          <div class="pill" style="border-radius:8px;background:#f6f3fb;color:#5d5873">1人 <b style="color:#8a17ff">1234算力</b></div>
        </section>
      </div>
    </section>
  `);
}

function pointsPage() {
  return appShell(`
    <section class="page">
      <div class="team-wrap">
        <section class="team-card">
          <div><div class="card-title">积分中心</div><div class="card-subtitle">当前为 Demo 模拟数据</div></div>
          <div class="pill">+ 66</div>
        </section>
        <section class="team-row">
          <div class="team-left"><div class="team-logo">◇</div><div><div style="font-weight:850;font-size:17px">可用积分</div><div class="muted" style="margin-top:8px">用于生成角色、场景、分镜与视频预览</div></div></div>
          <button class="small-btn dark">开通会员</button>
        </section>
      </div>
    </section>
  `);
}

function modal() {
  if (state.modal === "create") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal" data-stop>
          <div class="modal-head"><div class="modal-title">创建新项目</div><button class="round" data-action="close-modal">${icon("close")}</button></div>
          <div class="form-grid">
            <div class="form-control"><label>项目名称</label><input value="都市异能录" /></div>
            <div class="form-control"><label>创作风格</label><select><option>二次元动漫</option><option>写实电影</option><option>国风漫画</option></select></div>
            <div class="form-control"><label>画面比例</label><select>${ratios.map((ratio) => `<option ${state.selectedRatio === ratio ? "selected" : ""}>${ratio}</option>`).join("")}</select></div>
            <div class="form-control"><label>总集数</label><input value="20" /></div>
            <div class="form-control"><label>故事摘要</label><textarea>一夜未眠，竟变成了我陈手作创。</textarea></div>
          </div>
          <div class="modal-actions">
            <button class="ghost-btn" data-action="close-modal">取消</button>
            <button class="small-btn dark" data-action="create-project">创建项目</button>
          </div>
        </div>
      </div>
    `;
  }
  if (state.modal === "add-episode") {
    const draft = nextEpisodeDraft();
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal episode-modal" data-stop>
          <div class="modal-head">
            <div>
              <div class="modal-title">添加分集场次</div>
              <div class="card-subtitle" style="margin-top:6px">自动识别为第 ${draft.episode} 集，第 ${draft.scene} 场，可按需调整。</div>
            </div>
            <button class="round" data-action="close-modal">${icon("close")}</button>
          </div>
          <div class="form-grid episode-form-grid">
            <div class="form-control"><label>第几集</label><input id="episodeNumber" type="number" min="1" value="${draft.episode}" /></div>
            <div class="form-control"><label>第几场</label><input id="sceneNumber" type="number" min="1" value="${draft.scene}" /></div>
            <div class="form-control wide"><label>场景名称</label><input id="sceneTitle" value="${draft.title}" /></div>
            <div class="form-control"><label>时间</label><select id="sceneTime"><option selected>日</option><option>夜</option><option>晨</option><option>黄昏</option></select></div>
            <div class="form-control"><label>内外</label><select id="sceneSpace"><option>内</option><option selected>外</option></select></div>
            <div class="form-control wide"><label>人物</label><input id="scenePeople" value="${draft.people}" placeholder="用顿号或逗号分隔，如：苏念薇、萧景川" /></div>
            <div class="form-control full"><label>这场的内容文本</label><textarea id="sceneContent">${draft.content}</textarea></div>
          </div>
          <div class="modal-actions">
            <button class="ghost-btn" data-action="close-modal">取消</button>
            <button class="small-btn dark" data-action="create-episode-scene">添加场次</button>
          </div>
        </div>
      </div>
    `;
  }
  if (state.modal === "invite") {
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal" data-stop>
          <div class="modal-head"><div class="modal-title">团队邀请码</div><button class="round" data-action="close-modal">${icon("close")}</button></div>
          <div class="input-box" style="height:54px;font-size:22px;font-weight:900;justify-content:center;letter-spacing:4px">HM-2026-LVD</div>
          <div class="card-subtitle" style="margin-top:12px">有效期 24 小时，复制后发送给团队成员即可申请加入。</div>
          <div class="modal-actions"><button class="small-btn dark" data-action="copy-code">复制邀请码</button></div>
        </div>
      </div>
    `;
  }
  return "";
}

function render() {
  const routes = {
    home: homePage,
    workbench: workbenchPage,
    project: projectPage,
    profile: profilePage,
    team: teamPage,
    points: pointsPage
  };
  document.getElementById("app").innerHTML = (routes[state.route] || homePage)();
}

function toast(text) {
  state.toast = text;
  render();
  setTimeout(() => {
    state.toast = "";
    render();
  }, 1600);
}

function sendChat(text) {
  const activeAssetType = state.projectTab === "assetDetail" ? state.assetDetail.type : state.projectTab;
  const key = state.projectTab === "storyboard" ? "storyboard" : activeAssetType === "scenes" ? "scenes" : activeAssetType === "props" ? "props" : activeAssetType === "roles" ? "roles" : "episodes";
  const value = (text || document.getElementById("chatInput")?.value || "").trim();
  if (!value) return;
  state.chats[key].push({ from: "user", text: value });
  state.chatInput = "";
  render();
  setTimeout(() => {
    if (key === "storyboard") {
      state.chats[key].push({ from: "ai", text: "已根据你的要求生成新的分镜修改建议，可点击应用到当前镜头。", card: "story" });
    } else if (key === "roles") {
      state.chats[key].push({ from: "ai", text: "已根据你的要求更新角色设定，并生成新的形象参考。", card: "role" });
    } else {
      state.chats[key].push({ from: "ai", text: "已收到，我会按当前项目上下文进行优化。你也可以继续补充角色、场景或镜头要求。" });
    }
    render();
  }, 600);
}

document.addEventListener("click", (event) => {
  const actionEl = event.target.closest("[data-action]");
  const routeEl = event.target.closest("[data-route]");
  const projectTabEl = event.target.closest("[data-project-tab]");
  const chatEl = event.target.closest("[data-chat]");
  const modelEl = event.target.closest("[data-model]");
  const styleEl = event.target.closest("[data-style]");
  const ratioEl = event.target.closest("[data-ratio]");
  const importModeEl = event.target.closest("[data-import-mode]");
  const episodeSceneEl = event.target.closest("[data-episode-scene]");
  const storyEpisodeEl = event.target.closest("[data-story-episode]");
  const storySceneEl = event.target.closest("[data-story-scene]");
  const action = actionEl?.dataset.action;
  const route = routeEl?.dataset.route;
  const projectTab = projectTabEl?.dataset.projectTab;
  const chat = chatEl?.dataset.chat;
  const model = modelEl?.dataset.model;
  const style = styleEl?.dataset.style;
  const ratio = ratioEl?.dataset.ratio;
  const importMode = importModeEl?.dataset.importMode;
  const episodeScene = episodeSceneEl?.dataset.episodeScene;
  const storyEpisode = Number(storyEpisodeEl?.dataset.storyEpisode);
  const storyScene = Number(storySceneEl?.dataset.storyScene);
  const storyboardEpisode = Number(actionEl?.dataset.storyboardEpisode || event.target.closest("[data-storyboard-episode]")?.dataset.storyboardEpisode);

  if (state.modal && event.target.closest("[data-stop]") && action !== "close-modal" && action !== "create-project" && action !== "copy-code" && action !== "create-episode-scene") {
    return;
  }

  if (action === "open-asset-detail") {
    const type = actionEl.dataset.assetType || "roles";
    const index = Math.max(0, Number(actionEl.dataset.assetIndex) || 0);
    state.route = "project";
    state.projectTab = "assetDetail";
    state.assetDetail = { type, index };
    state.assistantCollapsed = true;
    state.modelOpen = false;
    state.styleOpen = false;
    state.ratioOpen = false;
    render();
    return;
  }

  const clickedModelControl = action === "toggle-model" || Boolean(event.target.closest(".select-pop"));
  const clickedStyleControl = action === "toggle-style" || Boolean(event.target.closest(".style-pop"));
  const clickedRatioControl = action === "toggle-ratio" || Boolean(event.target.closest(".ratio-pop"));
  if (!clickedModelControl && state.modelOpen) state.modelOpen = false;
  if (!clickedStyleControl && state.styleOpen) state.styleOpen = false;
  if (!clickedRatioControl && state.ratioOpen) state.ratioOpen = false;

  if (route) {
    state.route = route;
    if (route === "project" && !["episodes", "roles", "scenes", "props", "assetDetail", "storyboard"].includes(state.projectTab)) state.projectTab = "episodes";
    if (route === "project") state.assistantCollapsed = true;
    state.modelOpen = false;
    state.styleOpen = false;
    state.ratioOpen = false;
    render();
    return;
  }
  if (projectTab) {
    state.route = "project";
    state.projectTab = projectTab;
    if (projectTab === "storyboard") state.storyboardMode = "list";
    state.assistantCollapsed = true;
    state.modelOpen = false;
    state.styleOpen = false;
    state.ratioOpen = false;
    render();
    return;
  }
  if (chat) {
    sendChat(chat);
    return;
  }
  if (model) {
    state.selectedModel = model;
    state.modelOpen = false;
    render();
    return;
  }
  if (style) {
    state.selectedStyle = style;
    state.styleOpen = false;
    render();
    return;
  }
  if (action === "switch-import" && importMode) {
    state.importMode = importMode;
    state.modelOpen = false;
    state.styleOpen = false;
    state.ratioOpen = false;
    render();
    return;
  }
  if (episodeScene) {
    state.selectedEpisodeScene = episodeScene;
    render();
    return;
  }
  if (storyEpisode) {
    state.selectedStoryEpisode = storyEpisode;
    state.selectedStoryScene = 1;
    render();
    return;
  }
  if (storyScene) {
    state.selectedStoryScene = storyScene;
    render();
    return;
  }
  if (ratio) {
    state.selectedRatio = ratio;
    state.ratioOpen = false;
    render();
    return;
  }
  switch (action) {
    case "enter-storyboard":
      state.route = "project";
      state.projectTab = "storyboard";
      state.storyboardMode = "editor";
      state.assistantCollapsed = true;
      state.selectedStoryEpisode = storyboardEpisode || state.selectedStoryEpisode || 1;
      state.selectedStoryScene = 1;
      state.modelOpen = false;
      state.styleOpen = false;
      state.ratioOpen = false;
      render();
      break;
    case "back-storyboard-list":
      state.storyboardMode = "list";
      render();
      break;
    case "storyboard-add-episode":
      toast("已准备新增一集（Demo）");
      break;
    case "storyboard-batch":
      toast("已进入批量处理模式（Demo）");
      break;
    case "story-asset-add":
      toast("可以从资产库新增角色、场景或道具（Demo）");
      break;
    case "story-asset-use":
      toast(`已引用资产：${actionEl.dataset.assetName || "资产"}`);
      break;
    case "toggle-sidebar": {
      const currentlyMini = document.querySelector(".app")?.classList.contains("sidebar-mini");
      state.sidebarCollapsed = !currentlyMini;
      render();
      break;
    }
    case "toggle-assistant":
      state.assistantCollapsed = !state.assistantCollapsed;
      render();
      break;
    case "toggle-model":
      state.modelOpen = !state.modelOpen;
      state.styleOpen = false;
      state.ratioOpen = false;
      render();
      break;
    case "toggle-style":
      state.styleOpen = !state.styleOpen;
      state.modelOpen = false;
      state.ratioOpen = false;
      render();
      break;
    case "toggle-ratio":
      state.ratioOpen = !state.ratioOpen;
      state.modelOpen = false;
      state.styleOpen = false;
      render();
      break;
    case "open-create":
      state.modal = "create";
      render();
      break;
    case "open-add-episode":
      state.modal = "add-episode";
      render();
      break;
    case "close-modal":
      state.modal = null;
      render();
      break;
    case "create-episode-scene":
      addEpisodeSceneFromModal();
      break;
    case "create-project":
    case "create-from-home":
      state.modal = null;
      state.route = "project";
      state.projectTab = "episodes";
      state.assistantCollapsed = true;
      toast("项目已创建，进入剧集内容");
      break;
    case "upload":
      document.getElementById("scriptUploadInput")?.click();
      break;
    case "clear-upload":
      state.uploadedScript = null;
      state.styleOpen = false;
      state.ratioOpen = false;
      render();
      break;
    case "parse-script":
      state.route = "project";
      state.projectTab = "episodes";
      toast("剧本解析完成，已生成剧集内容");
      break;
    case "decompose-assets":
      state.route = "project";
      state.projectTab = "roles";
      state.assistantCollapsed = true;
      toast("剧本资产已拆解，进入资产库");
      break;
    case "toast-edit":
      toast("项目信息已进入可编辑状态（Demo）");
      break;
    case "fake-generate":
      toast("已创建场景图生成任务");
      break;
    case "edit-role-field":
      toast(`点击修改：${actionEl.dataset.field || "角色信息"}`);
      break;
    case "edit-asset-field":
      toast(`点击修改：${actionEl.dataset.field || "资产信息"}`);
      break;
    case "next-story":
      state.selectedStoryEpisode = Math.min(4, state.selectedStoryEpisode + 1);
      state.selectedStoryScene = 1;
      state.appliedShot = true;
      toast("已切换到下一集分镜（Demo）");
      break;
    case "send-chat":
      sendChat();
      break;
    case "apply-story":
      state.appliedShot = true;
      toast("已应用 AI 分镜修改");
      break;
    case "invite":
      state.modal = "invite";
      render();
      break;
    case "copy-code":
      toast("邀请码已复制");
      state.modal = null;
      break;
    default:
      if (clickedModelControl || clickedStyleControl || clickedRatioControl) return;
      if (state.modelOpen || state.styleOpen || state.ratioOpen) render();
      break;
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "chatInput") {
    state.chatInput = event.target.value;
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "scriptUploadInput") {
    const file = event.target.files?.[0];
    if (!file) return;
    state.uploadedScript = {
      name: file.name.replace(/\.[^.]+$/, "") || file.name,
      size: file.size
    };
    state.modelOpen = false;
    state.ratioOpen = false;
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && event.target.id === "chatInput") {
    event.preventDefault();
    sendChat();
  }
  if (event.key === "Escape" && state.modal) {
    state.modal = null;
    render();
    return;
  }
  if (event.key === "Escape" && (state.modelOpen || state.styleOpen || state.ratioOpen)) {
    state.modelOpen = false;
    state.styleOpen = false;
    state.ratioOpen = false;
    render();
  }
});

render();
