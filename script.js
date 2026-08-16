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
  "siyu-ma": {
    name: "Siyu Ma",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/siyu-ma.jpg",
    position: "center 30%",
    research: "Autism, social difficulties, and patterns of communication.",
    hobbies: "Skiing, photography, and good food."
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
  "xinyi-bao": { name: "鲍馨仪", role: "本科生 · 2025级", about: "我喜欢的作品之一是关于青少年心理健康的《All the Bright Places》。希望多多向老师和学长学姐们学习。", hobbies: "画画、音乐、美食。" },
  "anting-xie": { name: "谢安婷", role: "本科生 · 2022级", about: "什么方向都做一点的心理＋AI科研人。", hobbies: "唱歌。" },
  "chuangyi-du": { name: "杜创一", role: "博士生 · 2026级", quote: "长袍纸笔安天下，谁言情长不丈夫。" },
  "siyu-ma": { name: "马斯羽", role: "本科生 · 2022级", research: "孤独症、社交困难与交流模式。", hobbies: "滑雪、拍照、美食。" },
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
registerLanguageList(".hero h1 .title-line", ["Understanding social differences.", "Building room to breathe."], ["理解社交差异。", "让心灵拥有呼吸的空间。"]);
registerLanguage(".hero-intro", "We study the many ways people connect, withdraw, adapt, and heal—bringing rigorous psychological science to real lives shaped by social anxiety, autism, interpersonal trauma, and more.", "我们研究人们建立连接、退缩、适应与疗愈的多种方式，将严谨的心理科学带入被社交焦虑、孤独症、人际创伤等经历塑造的真实生活。");
registerLanguage(".hero-actions .button-primary", 'Explore our research <span aria-hidden="true">↘</span>', '探索我们的研究 <span aria-hidden="true">↘</span>');
registerLanguage(".hero-actions .button-quiet", 'Work with us <span aria-hidden="true">→</span>', '与我们一起工作 <span aria-hidden="true">→</span>');
registerLanguageList(".map-node span", ["feel", "notice", "connect", "belong"], ["感受", "觉察", "连接", "归属"]);
registerLanguage(".center-kicker", "Our focus", "我们的关注");
registerLanguage(".map-center strong", "Human<br>connection", "人与人<br>的连接");
registerLanguage(".visual-note", "Every mind meets the social world differently.", "每个心灵与社会世界相遇的方式都不一样。");
registerLanguageList(".hero-foot span", ["Clinical Psychology", "Social Cognition", "Intervention Science", "Multimodal Research"], ["临床心理学", "社会认知", "干预科学", "多模态研究"]);

registerLanguage(".manifesto .section-index", "01 / Why we study", "01 / 我们为何研究");
registerLanguage(".display-quote", "Social difficulty is not a defect. It is one part of the broad spectrum of human diversity.", "社交困难不是缺陷，而是人类多样性广阔光谱中的一部分。");
registerLanguage(".manifesto-copy > p:last-child", "Our mission is to use careful, compassionate science to understand where connection becomes difficult—and to help create conditions in which more people can participate, relate, and live freely as themselves.", "我们的使命，是用严谨而温柔的科学理解连接为何变得困难，并帮助创造更友善的条件，让更多人能够参与、建立关系，并自在地成为自己。");
registerLanguage(".principle-card p", "We study people, not just data points.", "我们研究真实的人，而不只是数据点。");
registerLanguage(".principle-card small", "Rigor and humanity belong in the same room.", "严谨与人文关怀可以共处一室。");

registerLanguage(".research .section-heading .eyebrow", '<span></span> Research themes', '<span></span> 研究主题');
registerLanguage(".research .section-heading h2", "Where connection<br>becomes complex.", "连接<br>变得复杂的地方。");
registerLanguage(".research .section-heading > p", "Social difficulties emerge through intertwined emotional, cognitive, interpersonal, family, and cultural processes. We examine these layers together rather than in isolation.", "社交困难产生于情绪、认知、人际、家庭与文化过程的交织。我们将这些层面放在一起理解，而不是孤立地看待它们。");
registerLanguageList(".theme-card h3", ["Social Anxiety<br>&amp; Emotion", "Autism &amp;<br>Social Cognition", "Interpersonal<br>Trauma", "Culture, Well-being<br>&amp; Intervention"], ["社交焦虑<br>与情绪", "孤独症与<br>社会认知", "人际<br>创伤", "文化、福祉<br>与干预"]);
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
registerLanguage(".approach h2", "Many signals.<br>One human story.", "多种信号。<br>一个人的故事。");
registerLanguage(".approach-sticky > p:last-child", "No single measure can explain a social life. We combine perspectives and methods to trace mechanisms across experience, behavior, body, brain, and context.", "没有任何单一测量能够解释一个人的社会生活。我们结合多种视角与方法，追踪经验、行为、身体、大脑与情境之间的机制。");
registerLanguageList(".method-list h3", ["Listen", "Measure", "Observe", "Map", "Model", "Translate"], ["倾听", "测量", "观察", "绘制", "建模", "转化"]);
registerLanguageList(".method-list p", ["Qualitative inquiry and lived experience", "Surveys, psychometrics, and longitudinal designs", "Behavioral experiments and eye tracking", "Psychophysiology and neuroimaging", "AI-assisted, interpretable analysis of social interaction", "Precise, practical, evidence-based interventions"], ["质性研究与生活经验", "问卷、心理测量与纵向设计", "行为实验与眼动追踪", "心理生理学与神经影像", "AI辅助、可解释的社会互动分析", "精准、实用、循证的干预"]);

registerLanguage(".team .section-heading .eyebrow", '<span></span> Team', '<span></span> 团队');
registerLanguage(".team .section-heading h2", "A growing community<br>of curious minds.", "一群不断成长的<br>好奇心灵。");
registerLanguage(".team .section-heading > p", "We bring together clinical psychology, social cognition, computational methods, and a shared commitment to careful, collaborative science. Select a portrait to meet the person behind the research.", "我们汇聚临床心理学、社会认知与计算方法，并共同坚持严谨、合作的科学实践。点击头像，认识研究背后的那个人。");
registerLanguage(".pi-copy .eyebrow", '<span></span> Principal investigator', '<span></span> 首席研究员');
registerLanguage(".pi-role", "Research Professor · Doctoral Supervisor · Clinical Psychologist", "研究员 · 博士生导师 · 临床心理学家");
registerLanguage(".pi-copy > p:nth-of-type(2)", "Dr. Lin studies the mechanisms and intervention pathways of social difficulties using multimodal methods. Her work spans social anxiety, autism, interpersonal trauma, positive psychology, cross-cultural psychology, and implementation science.", "林老师运用多模态方法研究社交困难的机制与干预路径，研究涉及社交焦虑、孤独症、人际创伤、积极心理学、跨文化心理学与实施科学。");
registerLanguageList(".pi-facts span", ["Peking University, PhD", "Humboldt Research Fellow", "INSAR Member"], ["北京大学博士", "洪堡研究学者", "INSAR会员"]);
registerLanguageList(".pi-links a", ["University profile <span aria-hidden=\"true\">↗</span>", "Email Dr. Lin <span aria-hidden=\"true\">↗</span>"], ["学校主页 <span aria-hidden=\"true\">↗</span>", "联系林老师 <span aria-hidden=\"true\">↗</span>"]);
registerLanguageList(".group-head p", ["Doctoral researchers", "Master's researchers", "Undergraduate researchers", "Research assistants"], ["博士研究生", "硕士研究生", "本科生", "科研助理"]);
registerLanguageList(".member-copy small", ["Doctoral researcher", "Doctoral · 2026", "Doctoral researcher", "Master's · 2025", "Master's · 2024", "Master's · 2025", "Undergraduate · 2022", "Undergraduate · 2023", "Undergraduate · 2025", "Undergraduate · 2024", "Undergraduate · 2024", "Undergraduate researcher", "Undergraduate researcher", "Undergraduate researcher", "Undergraduate · 2022", "Undergraduate · 2022", "Research assistant", "Research assistant"], ["博士研究生", "博士生 · 2026级", "博士研究生", "硕士生 · 2025级", "硕士生 · 2024级", "硕士生 · 2025级", "本科生 · 2022级", "本科生 · 2023级", "本科生 · 2025级", "本科生 · 2024级", "本科生 · 2024级", "本科生", "本科生", "本科生", "本科生 · 2022级", "本科生 · 2022级", "科研助理", "科研助理"]);

registerLanguage(".publications .section-heading .eyebrow", '<span></span> Selected work', '<span></span> 代表性成果');
registerLanguage(".publications .section-heading h2", "Research that travels<br>across boundaries.", "跨越边界<br>持续发生的研究。");
registerLanguage(".text-link-light", "View full publication list <span aria-hidden=\"true\">↗</span>", "查看完整成果列表 <span aria-hidden=\"true\">↗</span>");
registerLanguageList(".publication h3", ["The Alexithymia Hypothesis of Autism Revisited", "Scalable and Interpretable Autism Detection", "Self-focused Attention vs. Negative Attentional Bias", "Bullies Get Away With It—but Not Everywhere"], ["重新审视孤独症的述情障碍假说", "可扩展且可解释的孤独症识别", "自我关注与消极注意偏向", "欺凌者能够逃脱惩罚——但并非处处如此"]);
registerLanguageList(".publication > p:not(.authors)", ["Alexithymia modulates social brain activity during facial affect recognition in autistic adults.", "Exploring autism detection from social interaction behavior using interpretable computational approaches.", "Examining attention during a public-speaking task in socially anxious individuals.", "A cross-cultural study of the mental-health sequelae of bullying in Chinese and German students."], ["述情障碍会调节孤独症成人在面部情绪识别过程中的社会脑活动。", "使用可解释的计算方法，从社会互动行为探索孤独症识别。", "考察社交焦虑个体在公开演讲任务中的注意过程。", "关于欺凌对中国与德国学生心理健康影响的跨文化研究。"]);

registerLanguage(".culture-heading .eyebrow", '<span></span> Lab culture', '<span></span> 实验室文化');
registerLanguage(".culture-heading h2", "How we want<br>to work together.", "我们希望如何<br>一起工作。");
registerLanguage(".culture-heading > p:last-child", "Good science depends on a culture where people can ask, challenge, collaborate, and take care of themselves.", "好的科学依赖一种文化：人们可以提问、质疑、合作，也可以照顾好自己。");
registerLanguageList(".value-card h3", ["Speak early", "Think critically", "Grow together", "Stay human"], ["尽早沟通", "批判性思考", "共同成长", "保持人性"]);
registerLanguageList(".value-card p", ["Ask questions, share uncertainty, and reach out before a problem becomes isolating.", "Care about evidence, challenge assumptions, and put research integrity first.", "Help generously, seek collaboration, and choose shared progress over competition.", "Protect well-being, respect life beyond work, and make room for different ways of thriving."], ["主动提问、分享不确定性，在问题让人孤立之前寻求帮助。", "重视证据、挑战假设，并把科研诚信放在首位。", "慷慨地互相帮助、寻求合作，让共同进步超越竞争。", "保护身心健康，尊重工作之外的生活，为不同的成长方式留出空间。"]);

registerLanguage(".resource-label", "Shared lab resources", "实验室共享资源");
registerLanguage(".resource-copy strong", "Ideas travel farther<br>when we share them.", "分享让想法<br>走得更远。");
registerLanguage(".resource-copy > span", "Open our “shared” folder for laboratory resources, reference materials, and collaborative documents.", "打开我们的“shared”文件夹，获取实验室资源、参考材料与协作文档。");
registerLanguage(".resource-action", 'Open PKU Disk <span aria-hidden="true">↗</span>', '打开北大网盘 <span aria-hidden="true">↗</span>');
registerLanguage(".resource-meta", "Permanent link · PKU Disk", "永久链接 · 北大网盘");
registerLanguage(".join-card .eyebrow", '<span></span> Join Socially Different Lab', '<span></span> 加入社交不一样研究室');
registerLanguage(".join h2", "Bring your questions.<br><em>Bring your whole self.</em>", "带上你的问题。<br><em>也带上完整的自己。</em>");
registerLanguage(".join-card > p:not(.eyebrow):not(.join-note)", "We welcome doctoral and master's students, undergraduates, research assistants, interns, visiting students, and postdoctoral researchers who care about people and high-quality science.", "我们欢迎关心真实的人与高质量科学的博士生、硕士生、本科生、科研助理、实习生、访问学生与博士后研究者。");
registerLanguage(".join-note", "Interdisciplinary backgrounds—including computer science, life sciences, medicine, and sociology—are especially welcome.", "我们尤其欢迎来自计算机科学、生命科学、医学与社会学等不同学科背景的申请者。");
registerLanguage(".join-actions .button-white", 'Start a conversation <span aria-hidden="true">↗</span>', '开始交流 <span aria-hidden="true">↗</span>');
registerLanguage(".join-actions .button-outline-light", "Current opportunities", "当前机会");

registerLanguage(".footer-brand > p", "Laboratory of Social Difficulties<br>&amp; Associated Disorders", "社交困难与相关障碍实验室");
registerLanguage(".footer-grid > .footer-col:nth-child(2) .footer-label", "Find us", "联系地址");
registerLanguage(".footer-grid > .footer-col:nth-child(3) .footer-label", "Contact", "联系方式");
registerLanguage(".footer-grid > .footer-col:nth-child(4) .footer-label", "Explore", "探索");
registerLanguage(".footer-grid > .footer-col:nth-child(2) address", "Room 212, Philosophy Building<br>Peking University<br>Beijing, China", "北京大学哲学楼212室<br>中国，北京");
registerLanguageList(".footer-grid > .footer-col:nth-child(4) a", ["Research", "Team", "Publications", "Resources", "Join us"], ["研究", "团队", "发表成果", "资源", "加入我们"]);
registerLanguage(".footer-bottom p:nth-child(2)", "Science with rigor, warmth, and room to breathe.", "以严谨、温度与呼吸空间开展科学研究。");
registerLanguage(".footer-bottom a", "Back to top ↑", "返回顶部 ↑");

registerLanguage(".profile-content > .eyebrow", '<span></span> Meet the team', '<span></span> 认识团队');
registerLanguageList(".profile-detail h3", ["About", "Current interests", "Beyond research", "A note from me"], ["关于我", "当前兴趣", "研究之外", "我想分享"]);

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
