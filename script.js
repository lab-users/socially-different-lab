const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentLanguage = localStorage.getItem("socially-different-language") || "en";
const profileDialog = document.getElementById("profile-dialog");
const profileCloseButton = profileDialog.querySelector(".profile-close");
const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
let activeProfileTrigger = null;

const memberProfiles = {
  "mei-yang": {
    name: "Mei Yang",
    role: "Master's student · 2024 cohort",
    image: "assets/team/mei-yang.jpg",
    position: "center 40%",
    research: "Mental health in children and adolescents; attachment and family therapy; anxiety and depression in adults.",
    hobbies: "Reading and working."
  },
  "haichen-zhang": {
    name: "Haichen Zhang",
    role: "Undergraduate student · 2024 cohort",
    image: "assets/team/haichen-zhang.jpg",
    position: "center 34%",
    research: "Social anxiety and related social difficulties and disorders.",
    hobbies: "Reading novels, listening to music, and playing murder-mystery role-playing games."
  },
  "kairan-wang": {
    name: "Kairan Wang",
    role: "Undergraduate student · 2023 cohort · Research assistant",
    image: "assets/team/kairan-wang.jpg",
    position: "center 30%",
    quote: "Strive ceaselessly for self-improvement; carry the world with profound virtue."
  },
  "jingyi-yu": {
    name: "Jingyi Yu",
    role: "Research assistant",
    image: "assets/team/jingyi-yu.jpg",
    position: "center 30%",
    research: "Artificial intelligence and mental health.",
    quote: "A good person."
  },
  "xinyi-bao": {
    name: "Xinyi Bao",
    role: "Undergraduate student · 2025 cohort",
    image: "assets/team/xinyi-bao.jpg",
    position: "center 36%",
    about: "One of my favorite books is All the Bright Places, a story that speaks to adolescent mental health. I look forward to learning from our professor and senior lab members.",
    hobbies: "Drawing, music, and good food."
  },
  "anting-xie": {
    name: "Anting Xie",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/anting-xie.jpg",
    position: "center 31%",
    about: "A psychology + AI researcher who likes to explore a little bit of everything.",
    hobbies: "Singing."
  },
  "chuangyi-du": {
    name: "Chuangyi Du",
    role: "Doctoral student · 2026 cohort",
    image: "assets/team/chuangyi-du.jpg",
    position: "center 44%",
    quote: "In a scholar's robe, with paper and pen, one may bring order to the world—who says a person of deep feeling is any less courageous?"
  },
  "junwen-mo": {
    name: "Junwen Mo",
    role: "Doctoral student · 2026 cohort",
    image: "assets/team/junwen-mo.jpg",
    position: "center 30%",
    research: "Autistic adults and other important, open questions in social psychology.",
    hobbies: "Music across Chinese, American, European, and Korean pop; strength training; and ball sports.",
    quote: "The moments that unsettle you will ultimately become the depth at which your convictions take root—for uncertainty is the most earnest trace of a thinking mind."
  },
  "siyu-ma": {
    name: "Siyu Ma",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/siyu-ma.jpg",
    position: "center 30%",
    research: "Autism, social difficulties, and patterns of communication.",
    hobbies: "Skiing, photography, and good food."
  },
  "qianli-ma": {
    name: "Qianli Ma",
    role: "Undergraduate student · 2025 cohort",
    image: "assets/team/qianli-ma.jpg",
    position: "center 28%",
    research: "Social anxiety and emotion.",
    hobbies: "Reading, writing, and travel."
  },
  "qianqian-wang": {
    name: "Qianqian Wang",
    role: "Undergraduate researcher",
    image: "assets/team/qianqian-wang.jpg",
    position: "center 28%",
    research: "Autism and social disorders.",
    hobbies: "Eating and listening to music."
  },
  "zhezhen-song": {
    name: "Zhezhen Song",
    role: "Master's student · 2025 cohort",
    image: "assets/team/zhezhen-song.jpg",
    position: "center 32%",
    about: "Chinese–Chinese mixed heritage · Chinese by nationality and heritage · seasoned Taobao buyer · e-commerce VIP · milk-tea connoisseur · nationally certified ID-card holder · licensed C1D driver · aspiring Nobel Prize contender · internet-surfing enthusiast."
  },
  "xiaoya-wen": {
    name: "Xiaoya Wen",
    role: "Undergraduate student · 2024 cohort",
    image: "assets/team/xiaoya-wen.jpg",
    position: "center 32%",
    about: "I am both introverted and outgoing, a little quirky, and always trying to live my adorably earnest life. I hope that understanding others will also help me understand myself.",
    research: "Social difficulties, emotion, and self-perception.",
    hobbies: "Ball games, long-distance running, drawing tiny cute characters, fluffy animals, and making handmade gifts for friends.",
    quote: "Let’s keep working hard together!"
  },
  "jiawen-li": {
    name: "Jiawen Li",
    role: "Master's student · 2025 cohort",
    image: "assets/team/jiawen-li.jpg",
    position: "center 32%",
    quote: "Forward! Forward!"
  },
  "xintong-wu": {
    name: "Xintong Wu",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/xintong-wu.jpg",
    position: "center 30%",
    quote: "Keep going!"
  }
};

const memberProfileTranslations = {
  "mei-yang": { name: "杨梅", role: "硕士研究生 · 2024级", research: "儿童与青少年心理健康；依恋与家庭治疗；成年人焦虑与抑郁。", hobbies: "阅读、工作。" },
  "haichen-zhang": { name: "张海辰", role: "本科生 · 2024级", research: "社交焦虑与相关社交困难和障碍。", hobbies: "看小说、听歌、玩剧本杀。" },
  "kairan-wang": { name: "王慨然", role: "本科生 · 2023级 · 科研助理", quote: "自强不息，厚德载物。" },
  "jingyi-yu": { name: "余婧一", role: "科研助理", research: "人工智能与心理健康。", quote: "好人。" },
  "xinyi-bao": { name: "鲍馨仪", role: "本科生 · 2025级", about: "我喜欢的作品之一是关于青少年心理健康的《All the Bright Places》。希望多多向老师和学长学姐们学习。", hobbies: "画画、音乐、美食。" },
  "anting-xie": { name: "谢安婷", role: "本科生 · 2022级", about: "什么方向都做一点的心理＋AI科研人。", hobbies: "唱歌。" },
  "chuangyi-du": { name: "杜创一", role: "博士生 · 2026级", quote: "长袍纸笔安天下，谁言情长不丈夫。" },
  "junwen-mo": { name: "莫珺雯", role: "博士研究生 · 2026级", research: "主要关注孤独症成人群体，以及其他有待解决的重要问题。人在哪里，心理就在哪里。", hobbies: "音乐（横跨华语、欧美与韩流）、健身、打球。", quote: "那些让你动摇的瞬间，终将成为信仰扎根的深度，因为困惑恰是思考者最虔诚的印迹。" },
  "siyu-ma": { name: "马斯羽", role: "本科生 · 2022级", research: "孤独症、社交困难与交流模式。", hobbies: "滑雪、拍照、美食。" },
  "qianli-ma": { name: "马千里", role: "本科生 · 2025级", research: "社交焦虑、情绪。", hobbies: "阅读、写作、旅行。" },
  "qianqian-wang": { name: "王芊芊", role: "本科生", research: "孤独症、社交障碍。", hobbies: "喜欢吃，也喜欢听歌。" },
  "zhezhen-song": { name: "宋哲镇", role: "硕士研究生 · 2025级", about: "中中混血、华籍华人、TB资深买手、东VIP会员、奶茶品鉴师、国家级身份证持有者、C1D驾驶证准驾、诺贝尔奖觊觎者、Internet冲浪达人。" },
  "xiaoya-wen": { name: "文小丫", role: "本科生 · 2024级", about: "内向与外向并存，比较抽象，努力经营自己的呆萌人生。希望在了解他人的同时更好地了解自己。", research: "社交困难、情绪与自我认知。", hobbies: "各种球类、长跑、画小萌物、毛茸茸的小动物，以及给朋友做手工礼物。", quote: "让我们一起努力努力！" },
  "jiawen-li": { name: "李嘉文", role: "硕士研究生 · 2025级", quote: "前进！前进！" },
  "xintong-wu": { name: "吴欣彤", role: "本科生 · 2022级", quote: "加油！" }
};

function setProfileField(field, value) {
  const section = profileDialog.querySelector(`[data-profile-field="${field}"]`);
  const content = document.getElementById(`profile-${field}`);
  section.hidden = !value;
  content.textContent = value || "";
}

function renderProfile(trigger) {
  const profile = memberProfiles[trigger.dataset.profile];
  if (!profile) return;

  const localized = currentLanguage === "zh" ? { ...profile, ...(memberProfileTranslations[trigger.dataset.profile] || {}) } : profile;

  profileName.textContent = localized.name;
  profileRole.textContent = localized.role;
  profileImage.src = profile.image;
  profileImage.alt = currentLanguage === "zh" ? `${localized.name}的照片` : `Portrait of ${localized.name}`;
  profileImage.style.objectPosition = profile.position || "center 28%";
  setProfileField("about", localized.about);
  setProfileField("research", localized.research);
  setProfileField("hobbies", localized.hobbies);
  setProfileField("quote", localized.quote);
}

function openProfile(trigger) {
  activeProfileTrigger = trigger;
  renderProfile(trigger);
  document.body.classList.add("dialog-open");
  profileDialog.showModal();
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.body.classList.remove("nav-open");
  menuButton.querySelector(".sr-only").textContent = "Open navigation";
}

menuButton.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  navigation.classList.toggle("open", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
  menuButton.querySelector(".sr-only").textContent = willOpen ? "Close navigation" : "Open navigation";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll(".member-profile").forEach((member) => {
  member.addEventListener("click", () => openProfile(member));
});

profileCloseButton.addEventListener("click", () => profileDialog.close());

profileDialog.addEventListener("click", (event) => {
  const rect = profileDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) profileDialog.close();
});

profileDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  activeProfileTrigger?.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: reduceMotion ? 0 : 0.12, rootMargin: "0px 0px -30px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.15, 0.4] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in-view"));
}

document.getElementById("year").textContent = new Date().getFullYear();

/* English / Chinese presentation layer for the public homepage. */
const languageToggle = document.querySelector(".language-toggle");
const languageTargets = [];
const registerLanguage = (selector, en, zh) => languageTargets.push({ selector, values: [en, zh] });
const registerLanguageList = (selector, en, zh) => languageTargets.push({ selector, values: [en, zh] });

registerLanguage(".brand-copy strong", "Socially Different", "社交不一样研究室");
registerLanguage(".brand-copy small", "Lab · Peking University", "实验室 · 北京大学");
registerLanguageList(".site-nav > a", ["Research", "Approach", "Team", "Publications", "Culture", "Resources", "Join us"], ["研究", "研究方法", "团队", "发表成果", "实验室文化", "资源", "加入我们"]);
registerLanguage(".hero .eyebrow", '<span></span> Socially Different Lab · Peking University', '<span></span> 社交不一样研究室 · 北京大学');
registerLanguageList(".hero h1 .title-line", ["Social interaction<br>and mental health.", "Research across levels of analysis."], ["社会互动<br>与心理健康。", "跨层次的研究。"]);
registerLanguage(".hero-intro", "We investigate social interaction and related difficulties across development, context, and culture, combining experimental, clinical, and computational approaches.", "我们从发展、情境与文化等层面研究社会互动及相关困难，结合实验、临床与计算方法。");
registerLanguage(".hero-actions .button-primary", 'Research topics <span aria-hidden="true">↘</span>', '研究主题 <span aria-hidden="true">↘</span>');
registerLanguage(".hero-actions .button-quiet", 'Contact the lab <span aria-hidden="true">→</span>', '联系实验室 <span aria-hidden="true">→</span>');
registerLanguageList(".map-node span", ["feel", "notice", "connect", "belong"], ["感受", "觉察", "连接", "归属"]);
registerLanguage(".center-kicker", "Our focus", "我们的关注");
registerLanguage(".map-center strong", "Social<br>interaction", "社会<br>互动");
registerLanguage(".visual-note", "Social interaction as a research domain.", "社会互动作为研究对象。");
registerLanguageList(".hero-foot span", ["Clinical Psychology", "Social Cognition", "Intervention Science", "Multimodal Research"], ["临床心理学", "社会认知", "干预科学", "多模态研究"]);

registerLanguage(".manifesto .section-index", "01 / Why we study", "01 / 我们为何研究");
registerLanguage(".display-quote", "Social interaction is a multilevel psychological process.", "社会互动是一个多层次的心理过程。");
registerLanguage(".manifesto-copy > p:last-child", "We study the cognitive, emotional, interpersonal, and contextual factors associated with social difficulties and their consequences for mental health.", "我们关注与社交困难及其心理健康后果相关的认知、情绪、人际与情境因素。");
registerLanguage(".principle-card p", "Empirical questions, transparent methods.", "以经验问题为起点，以透明方法作答。");
registerLanguage(".principle-card small", "Evidence guides both explanation and intervention.", "证据同时服务于解释与干预。");

registerLanguage(".research .section-heading .eyebrow", '<span></span> Research themes', '<span></span> 研究主题');
registerLanguage(".research .section-heading h2", "Research topics<br>and questions.", "研究主题<br>与问题。");
registerLanguage(".research .section-heading > p", "Our projects examine social interaction, mental health, and intervention across psychological, interpersonal, developmental, and cultural levels.", "我们的研究从心理、人际、发展与文化等层面考察社会互动、心理健康与干预。");
registerLanguageList(".theme-card h3", ["Social Anxiety<br>&amp; Emotion", "Autism &amp;<br>Social Cognition", "Interpersonal<br>Trauma", "Culture, Well-being<br>&amp; Intervention"], ["社交焦虑<br>与情绪", "孤独症与<br>社会认知", "人际<br>创伤", "文化、身心健康<br>与干预"]);
registerLanguageList(".theme-card > p:not(.card-number)", [
  "Attention, avoidance, self-focus, and the emotional processes that make social situations feel threatening.",
  "How people perceive, interpret, and respond to social information across diverse neurocognitive profiles.",
  "The lasting social and mental-health effects of bullying, exclusion, and other adverse interpersonal experiences.",
  "Cross-cultural pathways to positive mental health, and evidence-based practices that work in real settings."
], [
  "注意、回避、自我关注，以及让社交情境变得有威胁感的情绪过程。",
  "不同神经认知特征的人如何感知、理解并回应社会信息。",
  "欺凌、排斥及其他不良人际经历对社会功能与心理健康产生的长期影响。",
  "通往积极心理健康的跨文化路径，以及能够在真实情境中发挥作用的循证实践。"
]);
registerLanguageList(".theme-card .tag-list li", ["Attention", "Affect", "Avoidance", "Autism", "Alexithymia", "Interaction", "Bullying", "Trauma", "Resilience", "Culture", "Well-being", "Practice"], ["注意", "情绪", "回避", "孤独症", "述情障碍", "互动", "欺凌", "创伤", "韧性", "文化", "福祉", "实践"]);

registerLanguage(".approach .eyebrow", '<span></span> How we work', '<span></span> 工作方式');
registerLanguage(".approach h2", "Methods for studying<br>social interaction.", "社会互动<br>研究方法。");
registerLanguage(".approach-sticky > p:last-child", "We combine complementary methods to test mechanisms and evaluate interventions across experience, behavior, physiology, and context.", "我们结合互补的方法，在经验、行为、生理与情境层面检验机制并评估干预。");
registerLanguageList(".method-list h3", ["Qualitative inquiry", "Measurement", "Behavioral observation", "Physiology and imaging", "Computational modeling", "Intervention",], ["质性研究", "测量", "行为观察", "生理与影像", "计算建模", "干预"]);
registerLanguageList(".method-list p", ["Qualitative inquiry and lived experience", "Surveys, psychometrics, and longitudinal designs", "Behavioral experiments and eye tracking", "Psychophysiology and neuroimaging", "AI-assisted, interpretable analysis of social interaction", "Precise, practical, evidence-based interventions"], ["质性研究与生活经验", "问卷、心理测量与纵向设计", "行为实验与眼动追踪", "心理生理学与神经影像", "AI辅助、可解释的社会互动分析", "精准、实用、循证的干预"]);

registerLanguage(".team .section-heading .eyebrow", '<span></span> Team', '<span></span> 团队');
registerLanguage(".team .section-heading h2", "People and<br>collaborations.", "成员与<br>合作。");
registerLanguage(".team .section-heading > p", "The lab includes researchers with backgrounds in clinical psychology, social cognition, computational methods, and related disciplines. Select a portrait for available profile information.", "实验室成员来自临床心理学、社会认知、计算方法及相关领域。点击头像查看已有的个人信息。");
registerLanguage(".pi-copy .eyebrow", '<span></span> Principal investigator', '<span></span> 首席研究员');
registerLanguage(".pi-role", "Research Professor · Doctoral Supervisor · Clinical Psychologist", "研究员 · 博士生导师 · 临床心理学家");
registerLanguage(".pi-copy > p:nth-of-type(2)", "Dr. Lin studies the mechanisms and intervention pathways of social difficulties using multimodal methods. Her work spans social anxiety, autism, interpersonal trauma, positive psychology, cross-cultural psychology, and implementation science.", "林老师运用多模态方法研究社交困难的机制与干预路径，研究涉及社交焦虑、孤独症、人际创伤、积极心理学、跨文化心理学与实施科学。");
registerLanguageList(".pi-facts span", ["Peking University, PhD", "Humboldt Research Fellow", "INSAR Member"], ["北京大学博士", "洪堡研究学者", "INSAR会员"]);
registerLanguageList(".pi-links a", ["University profile <span aria-hidden=\"true\">↗</span>", "Email Dr. Lin <span aria-hidden=\"true\">↗</span>"], ["学校主页 <span aria-hidden=\"true\">↗</span>", "联系林老师 <span aria-hidden=\"true\">↗</span>"]);
registerLanguageList(".group-head p", ["Current members", "Former members"], ["现成员", "曾经成员"]);
registerLanguageList(".member-copy strong", ["Chuangyi Du", "Haichen Zhang", "Jiawen Li", "Jingyi Yu", "Junwen Mo", "Kairan Wang", "Mei Yang", "Qianli Ma", "Qianqian Wang", "Rong Wang", "Xiaoya Wen", "Xinyi Bao", "Xinzhao Feng", "Zhezhen Song", "Anting Xie", "Siyu Ma", "Xintong Wu"], ["杜创一", "张海辰", "李嘉文", "余婧一", "莫珺雯", "王慨然", "杨梅", "马千里", "王芊芊", "王荣", "文小丫", "鲍馨仪", "冯新照", "宋哲镇", "谢安婷", "马斯羽", "吴欣彤"]);
registerLanguageList(".member-copy small", ["Doctoral · 2026", "Undergraduate · 2024", "Master's · 2025", "Research assistant", "Doctoral researcher · 2026", "Undergraduate · 2023 · Research assistant", "Master's · 2024", "Undergraduate · 2025", "Undergraduate researcher", "Doctoral researcher", "Undergraduate · 2024", "Undergraduate · 2025", "Research assistant", "Master's · 2025", "Former member · Undergraduate · 2022", "Former member · Undergraduate · 2022", "Former member · Undergraduate · 2022"], ["博士生 · 2026级", "本科生 · 2024级", "硕士生 · 2025级", "科研助理", "博士研究生 · 2026级", "本科生 · 2023级 · 科研助理", "硕士生 · 2024级", "本科生 · 2025级", "本科生", "博士研究生", "本科生 · 2024级", "本科生 · 2025级", "科研助理", "硕士生 · 2025级", "曾经成员 · 本科生 · 2022级", "曾经成员 · 本科生 · 2022级", "曾经成员 · 本科生 · 2022级"]);

registerLanguage(".publications .section-heading .eyebrow", '<span></span> Selected work', '<span></span> 代表性成果');
registerLanguage(".publications .section-heading h2", "Selected<br>publications.", "代表性<br>成果。");
registerLanguage(".text-link-light", "View full publication list <span aria-hidden=\"true\">↗</span>", "查看完整成果列表 <span aria-hidden=\"true\">↗</span>");
registerLanguageList(".publication h3", ["The Alexithymia Hypothesis of Autism Revisited", "Scalable and Interpretable Autism Detection", "Self-focused Attention vs. Negative Attentional Bias", "Bullies Get Away With It—but Not Everywhere"], ["重新审视孤独症的述情障碍假说", "可扩展且可解释的孤独症识别", "自我关注与消极注意偏向", "欺凌者并非在所有地方都能逃脱惩罚"]);
registerLanguageList(".publication > p:not(.authors)", ["Alexithymia modulates social brain activity during facial affect recognition in autistic adults.", "Exploring autism detection from social interaction behavior using interpretable computational approaches.", "Examining attention during a public-speaking task in socially anxious individuals.", "A cross-cultural study of the mental-health sequelae of bullying in Chinese and German students."], ["述情障碍会调节孤独症成人在面部情绪识别过程中的社会脑活动。", "使用可解释的计算方法，从社会互动行为探索孤独症识别。", "考察社交焦虑个体在公开演讲任务中的注意过程。", "关于欺凌对中国与德国学生心理健康影响的跨文化研究。"]);

registerLanguage(".culture-heading .eyebrow", '<span></span> Lab culture', '<span></span> 实验室文化');
registerLanguage(".culture-heading h2", "Research<br>environment.", "研究<br>环境。");
registerLanguage(".culture-heading > p:last-child", "We value clear communication, critical discussion, collaboration, research integrity, and sustainable working practices.", "我们重视清晰沟通、批判性讨论、合作、科研诚信与可持续的工作方式。");
registerLanguageList(".value-card h3", ["Communication", "Critical inquiry", "Collaboration", "Sustainable work"], ["沟通", "批判性探究", "合作", "可持续工作"]);
registerLanguageList(".value-card p", ["Raise questions and uncertainties early so that they can be discussed constructively.", "Evaluate evidence, state assumptions, and maintain research integrity.", "Share expertise, acknowledge contributions, and develop projects together.", "Respect time outside the lab and support working practices compatible with well-being."], ["尽早提出问题与不确定性，以便开展建设性讨论。", "评估证据，说明假设，维护科研诚信。", "共享专业知识，明确贡献，共同推进项目。", "尊重实验室之外的时间，支持有利于身心健康的工作方式。"]);

registerLanguage(".resource-label", "Shared lab resources", "实验室共享资源");
registerLanguage(".resource-copy strong", "Shared laboratory<br>resources.", "实验室共享<br>资源。");
registerLanguage(".resource-copy > span", "Reference materials, protocols, and collaborative documents are available in the shared folder.", "共享文件夹提供参考材料、实验方案与协作文档。");
registerLanguage(".resource-action", 'Open PKU Disk <span aria-hidden="true">↗</span>', '打开北大网盘 <span aria-hidden="true">↗</span>');
registerLanguage(".resource-meta", "Permanent link · PKU Disk", "永久链接 · 北大网盘");
registerLanguage(".join-card .eyebrow", '<span></span> Join Socially Different Lab', '<span></span> 加入社交不一样研究室');
registerLanguage(".join h2", "Prospective<br><em>lab members.</em>", "欢迎了解<br><em>实验室机会。</em>");
registerLanguage(".join-card > p:not(.eyebrow):not(.join-note)", "We welcome inquiries from prospective students, research assistants, interns, visiting students, and postdoctoral researchers. Please include your background, research interests, and relevant materials.", "我们欢迎有意申请的学生、科研助理、实习生、访问学生与博士后研究者来信。来信请附上个人背景、研究兴趣与相关材料。");
registerLanguage(".join-note", "Applications are evaluated in relation to current projects and available supervision capacity.", "申请将结合当前研究项目与可提供的指导名额进行评估。");
registerLanguage(".join-actions .button-white", 'Start a conversation <span aria-hidden="true">↗</span>', '开始交流 <span aria-hidden="true">↗</span>');
registerLanguage(".join-actions .button-outline-light", "Current opportunities", "当前机会");

registerLanguage(".footer-brand > p", "Laboratory of Social Difficulties<br>&amp; Associated Disorders", "社交困难与相关障碍实验室");
registerLanguage(".footer-grid > .footer-col:nth-child(2) .footer-label", "Find us", "联系地址");
registerLanguage(".footer-grid > .footer-col:nth-child(4) .footer-label", "Contact", "联系方式");
registerLanguage(".footer-grid > .footer-col:nth-child(5) .footer-label", "Explore", "探索");
registerLanguage(".footer-grid > .footer-col:nth-child(2) address", "Room 212, Philosophy Building<br>Peking University<br>Beijing, China", "北京大学哲学楼212室<br>中国，北京");
registerLanguageList(".footer-grid > .footer-col:nth-child(5) a", ["Research", "Team", "Publications", "Resources", "Join us"], ["研究", "团队", "发表成果", "资源", "加入我们"]);
registerLanguage(".footer-bottom p:nth-child(2)", "Evidence-based research on social interaction and mental health.", "以证据为基础，研究社会互动与心理健康。");
registerLanguage(".footer-wechat .footer-label", "WeChat", "微信公众号");
registerLanguage(".footer-wechat span", "Follow the lab account", "关注实验室公众号");
registerLanguage(".footer-bottom a", "Back to top ↑", "返回顶部 ↑");

registerLanguage(".profile-content > .eyebrow", '<span></span> Meet the team', '<span></span> 认识团队');
registerLanguageList(".profile-detail h3", ["About", "Current interests", "Beyond research", "A note from me"], ["关于我", "当前兴趣", "研究之外", "想对你说"]);

const exactTextTranslations = {
  "Clinical Psychologist": "临床心理学家",
  "Doctoral researcher": "博士研究生",
  "Research assistant": "科研助理",
  "Undergraduate researcher": "本科生",
  "Peking University": "北京大学",
  "Master's student": "硕士研究生",
  "Undergraduate student": "本科生",
  "Doctoral student": "博士生",
  "Research Professor": "研究员",
  "Doctoral Supervisor": "博士生导师"
};

function applyLanguage(lang) {
  currentLanguage = lang === "zh" ? "zh" : "en";
  localStorage.setItem("socially-different-language", currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.body.dataset.language = currentLanguage;
  languageTargets.forEach(({ selector, values }) => {
    const nodes = [...document.querySelectorAll(selector)];
    const content = values[currentLanguage === "zh" ? 1 : 0];
    if (Array.isArray(content)) {
      nodes.forEach((node, index) => { if (content[index] !== undefined) node.innerHTML = content[index]; });
    } else {
      nodes.forEach(node => { node.innerHTML = content; });
    }
  });
  if (currentLanguage === "zh") {
    document.querySelectorAll(".member-copy small").forEach(node => {
      const translation = exactTextTranslations[node.textContent.trim()];
      if (translation) node.textContent = translation;
    });
  }
  document.title = currentLanguage === "zh" ? "社交不一样研究室 · 北京大学" : "Socially Different Lab · Peking University";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = currentLanguage === "zh" ? "北京大学社交不一样研究室，使用严谨、温柔与多模态的心理科学研究社交困难及相关障碍。" : "Socially Different Lab at Peking University studies social difficulties and associated disorders through rigorous, humane, and multimodal psychological science.";
  languageToggle?.setAttribute("aria-pressed", String(currentLanguage === "zh"));
  languageToggle?.setAttribute("aria-label", currentLanguage === "zh" ? "Switch to English" : "切换到中文");
  languageToggle?.querySelector(".language-option-zh")?.classList.toggle("is-active", currentLanguage === "zh");
  languageToggle?.querySelector(".language-option-en")?.classList.toggle("is-active", currentLanguage === "en");
  if (activeProfileTrigger && profileDialog.open) renderProfile(activeProfileTrigger);
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: currentLanguage } }));
}

languageToggle?.addEventListener("click", () => applyLanguage(currentLanguage === "en" ? "zh" : "en"));
applyLanguage(currentLanguage);
