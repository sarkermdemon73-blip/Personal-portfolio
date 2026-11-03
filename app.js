function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useEffect,
  useMemo,
  useRef,
  useState
} = React;

// ছবির ফাইলের নাম (ছবিগুলো index.html-এর পাশেই আপলোড করতে হবে)
const emon = 'emon.webp';
const imgNetworking = 'networking-basics.webp';
const imgItSupport = 'it-support.webp';
const imgCyber = 'intro-cybersecurity.webp';
const imgBrac = 'brac-ai-skills.webp';
const imgCs50Cyber = 'cs50-cybersecurity.webp';
const imgCs50p = 'cs50p-python.webp';

// ছোট router: লিংকে চাপলে পেজ বদলায়। ব্রাউজারের লিংক-নেভিগেশনের ওপর নির্ভর করে না,
// তাই ফাইল-ভিউয়ার বা প্রিভিউয়েও কাজ করে। GitHub Pages-এ URL হবে #/about ইত্যাদি।
const readPath = () => {
  try {
    return window.location.hash.replace(/^#/, '') || '/';
  } catch {
    return '/';
  }
};
let currentPath = readPath();
const listeners = new Set();
const emit = () => listeners.forEach(fn => fn(currentPath));
function navigate(to) {
  currentPath = to;
  try {
    window.history.pushState(null, '', '#' + to);
  } catch {
    /* কিছু প্রিভিউতে URL বদলানো যায় না, তাতে সমস্যা নেই */
  }
  emit();
}
function useHash() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => {
      currentPath = readPath();
      emit();
    };
    listeners.add(setPath);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      listeners.delete(setPath);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  return path;
}
function Link({
  to,
  className,
  children,
  ...rest
}) {
  const go = e => {
    e.preventDefault();
    navigate(to);
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: '#' + to,
    onClick: go,
    className: className
  }, rest), children);
}
function NavLink({
  to,
  end,
  className,
  children,
  ...rest
}) {
  const path = useHash();
  const isActive = end ? path === to : path.startsWith(to);
  const cls = typeof className === 'function' ? className({
    isActive
  }) : className;
  const go = e => {
    e.preventDefault();
    navigate(to);
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: '#' + to,
    onClick: go,
    className: cls
  }, rest), children);
}

/* =====================================================================
   DATA — নিজের তথ্য বদলাতে শুধু এই অংশ এডিট করুন
   ===================================================================== */

const profile = {
  name: 'Md. Shahriar Hossain Emon',
  brand: 'Emon',
  roles: ['Aspiring AI Automation Developer', 'Tech Enthusiast', 'Lifelong Learner'],
  intro: 'A technology enthusiast from Bangladesh building AI automation workflows, and learning networking, cybersecurity and React along the way.',
  exploring: ['AI Automation', 'Networking', 'Cybersecurity', 'React'],
  socials: [{
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/share/1FoBALuqVE/'
  }, {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/md-emon-sarker-a196333a5'
  }, {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/memonsarker38'
  }]
};

// এই ইমেইলে সবার পাঠানো মেসেজ আসবে (ফিক্সড)
const CONTACT_EMAIL = 'sarkermdemon73@gmail.com';
const categories = ['All', 'Cisco', 'HarvardX', 'BRAC'];
const certificates = [{
  id: 'networking-basics',
  title: 'Networking Basics',
  issuer: 'Cisco Networking Academy',
  category: 'Cisco',
  date: 'Jul 25, 2026',
  summary: 'Network communication, Ethernet, IPv4 and IPv6 addressing, routers and connectivity troubleshooting.',
  image: imgNetworking
}, {
  id: 'it-support',
  title: 'IT Support Specialist Career Path',
  issuer: 'Cisco Networking Academy',
  category: 'Cisco',
  date: 'Jul 24, 2026',
  summary: 'IT support fundamentals, OS and hardware troubleshooting, and security basics.',
  image: imgItSupport
}, {
  id: 'intro-cybersecurity',
  title: 'Introduction to Cybersecurity',
  issuer: 'Cisco Networking Academy',
  category: 'Cisco',
  date: 'May 31, 2026',
  summary: 'Staying safe online, common cyber threats and how people and organizations defend against them.',
  image: imgCyber
}, {
  id: 'brac-ai-skills',
  title: 'AI Skills Training Programme',
  issuer: 'BRAC Education Programme & Social Innovation Lab',
  category: 'BRAC',
  date: null,
  summary: 'Part of the AI Opportunity Fund: Asia-Pacific, with AVPN, supported by Google.org and the Asian Development Bank.',
  image: imgBrac
}, {
  id: 'cs50-cybersecurity',
  title: 'CS50 Cybersecurity: Introduction to Cybersecurity',
  issuer: 'HarvardX',
  category: 'HarvardX',
  date: null,
  summary: "HarvardX's introduction to cybersecurity, offered on edX.",
  image: imgCs50Cyber
}, {
  id: 'cs50p',
  title: 'CS50P: Introduction to Programming with Python',
  issuer: 'HarvardX',
  category: 'HarvardX',
  date: null,
  summary: "HarvardX's introduction to programming with Python, offered on edX.",
  image: imgCs50p
}];
const journey = [{
  tag: 'Building',
  title: 'AI Automation',
  text: 'Building workflows, AI agents, and automation solutions.'
}, {
  tag: 'Learning',
  title: 'Networking',
  text: 'Learning fundamental networking concepts and technologies.'
}, {
  tag: 'Exploring',
  title: 'Cybersecurity',
  text: 'Exploring the basics of digital security and system protection.'
}, {
  tag: 'Learning',
  title: 'Web Development',
  text: 'Learning React and building modern web applications.'
}, {
  tag: 'Next goal',
  title: 'Data Science',
  text: 'My future goal is to focus on data science and develop strong analytical skills.'
}];

/* =====================================================================
   ICONS
   ===================================================================== */

const iconPaths = {
  facebook: /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }),
  linkedin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "9",
    width: "4",
    height: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "4",
    cy: "4",
    r: "2"
  })),
  instagram: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    y1: "6.5",
    x2: "17.51",
    y2: "6.5"
  })),
  arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  })),
  close: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 6 12 13 2 6"
  })),
  send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })),
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  left: /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  }),
  right: /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }),
  external: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "15 3 21 3 21 9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }))
};
function Icon({
  name,
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, iconPaths[name]);
}

/* =====================================================================
   COMPONENTS
   ===================================================================== */

// Twinkling stars + an occasional shooting star on one canvas.
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let stars = [];
    let shooting = null;
    let nextShot = 3000;
    let raf;
    let last = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(w * h / 9000);
      stars = Array.from({
        length: count
      }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.4 + 0.4,
        warm: Math.random() < 0.18
      }));
    };
    const draw = now => {
      const dt = now - last;
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = reduce ? 0.6 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now / 1000 * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.warm ? '#fde68a' : '#dbe4ff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) {
        nextShot -= dt;
        if (!shooting && nextShot <= 0) {
          shooting = {
            x: Math.random() * w * 0.7,
            y: Math.random() * h * 0.4,
            vx: 7 + Math.random() * 4,
            vy: 3 + Math.random() * 2,
            life: 1
          };
          nextShot = 5000 + Math.random() * 7000;
        }
        if (shooting) {
          const s = shooting;
          const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
          g.addColorStop(0, `rgba(167,139,250,${s.life})`);
          g.addColorStop(1, 'rgba(167,139,250,0)');
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9);
          ctx.stroke();
          s.x += s.vx;
          s.y += s.vy;
          s.life -= 0.014;
          if (s.life <= 0 || s.x > w || s.y > h) shooting = null;
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize();
    draw(performance.now());
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: "stars",
    "aria-hidden": "true"
  });
}

// Typewriter that cycles through `words`.
function Typed({
  words
}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const word = words[i];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && text === '') {
      setDeleting(false);
      setI((i + 1) % words.length);
    } else {
      t = setTimeout(() => setText(word.slice(0, text.length + (deleting ? -1 : 1))), deleting ? 32 : 68);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduce]);
  if (reduce) return /*#__PURE__*/React.createElement("span", null, words[0]);
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": words.join(', ')
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, text), /*#__PURE__*/React.createElement("span", {
    className: "caret",
    "aria-hidden": "true"
  }));
}
function Navbar() {
  const links = [{
    to: '/',
    label: 'Home'
  }, {
    to: '/about',
    label: 'About'
  }, {
    to: '/certificates',
    label: 'Certificates'
  }, {
    to: '/contact',
    label: 'Contact'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "nav"
  }, /*#__PURE__*/React.createElement(NavLink, {
    to: "/",
    className: "brand",
    "aria-label": `${profile.name} — home`
  }, /*#__PURE__*/React.createElement("img", {
    src: emon,
    alt: "",
    width: "34",
    height: "34"
  }), /*#__PURE__*/React.createElement("span", null, profile.brand)), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Main"
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l.to,
    to: l.to,
    end: l.to === '/',
    className: ({
      isActive
    }) => isActive ? 'link active' : 'link'
  }, l.label))));
}

/* =====================================================================
   PAGES
   ===================================================================== */

function Home() {
  return /*#__PURE__*/React.createElement("main", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, /*#__PURE__*/React.createElement("img", {
    src: emon,
    alt: profile.name,
    width: "176",
    height: "176"
  })), /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Hello, world"), /*#__PURE__*/React.createElement("h1", null, "Hi, I'm ", /*#__PURE__*/React.createElement("span", {
    className: "grad"
  }, profile.name)), /*#__PURE__*/React.createElement("p", {
    className: "role"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, ">"), " ", /*#__PURE__*/React.createElement(Typed, {
    words: profile.roles
  })), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, profile.intro), /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/about",
    className: "btn primary"
  }, "About Me ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 16
  })), /*#__PURE__*/React.createElement(Link, {
    to: "/certificates",
    className: "btn ghost"
  }, "Certificates"), /*#__PURE__*/React.createElement(Link, {
    to: "/contact",
    className: "btn ghost"
  }, "Contact")), /*#__PURE__*/React.createElement("ul", {
    className: "chips",
    "aria-label": "Currently exploring"
  }, profile.exploring.map(c => /*#__PURE__*/React.createElement("li", {
    key: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "socials"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Find me on"), /*#__PURE__*/React.createElement("div", {
    className: "icons"
  }, profile.socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.name,
    href: s.url,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s.name,
    title: s.name,
    className: "social"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20
  }))), /*#__PURE__*/React.createElement(Link, {
    to: "/contact",
    "aria-label": "Gmail",
    title: "Gmail",
    className: "social"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 20
  })))));
}
function About() {
  return /*#__PURE__*/React.createElement("main", {
    className: "container about"
  }, /*#__PURE__*/React.createElement("header", {
    className: "about-head"
  }, /*#__PURE__*/React.createElement("img", {
    src: emon,
    alt: "",
    width: "84",
    height: "84",
    className: "mini-avatar"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "About me"), /*#__PURE__*/React.createElement("h1", null, profile.name), /*#__PURE__*/React.createElement("p", {
    className: "subtitle"
  }, "Aspiring AI Automation Developer ", /*#__PURE__*/React.createElement("i", null, "|"), " Tech Enthusiast ", /*#__PURE__*/React.createElement("i", null, "|"), " Lifelong Learner"))), /*#__PURE__*/React.createElement("section", {
    className: "card prose"
  }, /*#__PURE__*/React.createElement("p", null, "Hello! I'm ", /*#__PURE__*/React.createElement("strong", null, "Md. Shahriar Hossain Emon"), ", a technology enthusiast from Bangladesh who loves exploring different areas of computer science and technology."), /*#__PURE__*/React.createElement("p", null, "Currently, I'm working on ", /*#__PURE__*/React.createElement("strong", null, "AI Automation"), ", building automation workflows, AI agents, and business solutions. I'm also working toward establishing my own automation agency, ", /*#__PURE__*/React.createElement("strong", {
    className: "grad"
  }, "AutoJukti"), ", to help businesses improve their operations through automation."), /*#__PURE__*/React.createElement("p", null, "Alongside AI automation, I'm learning Networking at a beginner level and exploring the fundamentals of Cybersecurity. I'm also learning React to build modern, interactive websites and improve my frontend development skills.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, "My Learning Journey"), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, "I'm passionate about computer science, so I want to explore different fields of technology, understand how they work, and build practical projects along the way."), /*#__PURE__*/React.createElement("div", {
    className: "journey"
  }, journey.map((j, n) => /*#__PURE__*/React.createElement("article", {
    className: "card step",
    key: j.title
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, String(n + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, j.tag), /*#__PURE__*/React.createElement("h3", null, j.title), /*#__PURE__*/React.createElement("p", null, j.text))))), /*#__PURE__*/React.createElement("section", {
    className: "card goal"
  }, /*#__PURE__*/React.createElement("h2", null, "My Goal"), /*#__PURE__*/React.createElement("p", null, "My long-term goal is to become a skilled technology professional with a strong foundation in computer science. I believe that exploring different fields will help me understand technology more deeply and discover where I can make the greatest impact."), /*#__PURE__*/React.createElement("p", null, "I'm continuously learning, experimenting, and building projects to turn my knowledge into real-world skills."), /*#__PURE__*/React.createElement("blockquote", null, "One step at a time, one project at a time \u2014 InshaAllah, I'll keep growing.")), /*#__PURE__*/React.createElement("div", {
    className: "about-cta"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/certificates",
    className: "btn primary"
  }, "See my certificates")));
}
function Certificates() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const list = useMemo(() => filter === 'All' ? certificates : certificates.filter(c => c.category === filter), [filter]);
  useEffect(() => setOpen(null), [filter]);
  useEffect(() => {
    if (open === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen(o => (o + 1) % list.length);
      if (e.key === 'ArrowLeft') setOpen(o => (o - 1 + list.length) % list.length);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, list.length]);
  const current = open !== null ? list[open] : null;
  return /*#__PURE__*/React.createElement("main", {
    className: "container"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Credentials"), /*#__PURE__*/React.createElement("h1", null, "Certificates"), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, "Courses and programmes I've completed so far \u2014 ", certificates.length, " and counting.")), /*#__PURE__*/React.createElement("div", {
    className: "filters",
    role: "group",
    "aria-label": "Filter certificates"
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: c === filter ? 'chip on' : 'chip',
    onClick: () => setFilter(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "cert-grid"
  }, list.map((c, i) => /*#__PURE__*/React.createElement("button", {
    className: "cert",
    key: c.id,
    onClick: () => setOpen(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "thumb"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.image,
    alt: `${c.title} certificate`,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "issuer"
  }, c.issuer), /*#__PURE__*/React.createElement("span", {
    className: "ctitle"
  }, c.title), /*#__PURE__*/React.createElement("span", {
    className: "csum"
  }, c.summary), c.date && /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, c.date))))), current && /*#__PURE__*/React.createElement("div", {
    className: "lightbox",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": current.title,
    onClick: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("button", {
    className: "lb-btn close",
    "aria-label": "Close",
    onClick: () => setOpen(null)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close"
  })), list.length > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "lb-btn prev",
    "aria-label": "Previous certificate",
    onClick: e => {
      e.stopPropagation();
      setOpen((open - 1 + list.length) % list.length);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "left"
  })), /*#__PURE__*/React.createElement("button", {
    className: "lb-btn next",
    "aria-label": "Next certificate",
    onClick: e => {
      e.stopPropagation();
      setOpen((open + 1) % list.length);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "right"
  }))), /*#__PURE__*/React.createElement("figure", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("img", {
    src: current.image,
    alt: `${current.title} certificate`
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("strong", null, current.title), /*#__PURE__*/React.createElement("span", null, current.issuer, current.date ? ` · ${current.date}` : ''), /*#__PURE__*/React.createElement("a", {
    href: current.image,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Open full image ", /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 14
  }))))));
}
function Contact() {
  const empty = {
    name: '',
    email: '',
    subject: '',
    message: '',
    _honey: ''
  };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  const submit = async e => {
    e.preventDefault();
    if (form._honey) return; // spam bot filled the hidden field
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          // reply করলে এই ঠিকানায় যাবে
          _subject: form.subject,
          message: form.message,
          _captcha: 'false',
          _template: 'table'
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false || data.success === 'false') {
        throw new Error(data.message || 'Request failed');
      }
      setStatus('sent');
      setForm(empty);
    } catch (err) {
      setStatus('error');
      setError('Message could not be sent right now. Please check your connection and try again, or email me directly.');
    }
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is shown as selectable text anyway */
    }
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "container"
  }, /*#__PURE__*/React.createElement("header", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Get in touch"), /*#__PURE__*/React.createElement("h1", null, "Contact"), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, "Have a question, an idea or a project in mind? Send me a message and it lands straight in my inbox.")), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("form", {
    className: "card form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "row2"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "c-name"
  }, "Your name", /*#__PURE__*/React.createElement("input", {
    id: "c-name",
    required: true,
    autoComplete: "name",
    value: form.name,
    onChange: set('name')
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "c-email"
  }, "Your email", /*#__PURE__*/React.createElement("input", {
    id: "c-email",
    type: "email",
    required: true,
    autoComplete: "email",
    value: form.email,
    onChange: set('email'),
    placeholder: "you@example.com"
  }))), /*#__PURE__*/React.createElement("label", {
    htmlFor: "c-subject"
  }, "Subject", /*#__PURE__*/React.createElement("input", {
    id: "c-subject",
    required: true,
    value: form.subject,
    onChange: set('subject')
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "c-message"
  }, "Message", /*#__PURE__*/React.createElement("textarea", {
    id: "c-message",
    required: true,
    rows: "6",
    value: form.message,
    onChange: set('message')
  })), /*#__PURE__*/React.createElement("input", {
    className: "honey",
    tabIndex: "-1",
    autoComplete: "off",
    "aria-hidden": "true",
    name: "_honey",
    value: form._honey,
    onChange: set('_honey')
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn primary send",
    type: "submit",
    disabled: status === 'sending'
  }, status === 'sending' ? 'Sending…' : 'Send message', " ", /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    className: `notice ${status}`,
    role: "status",
    "aria-live": "polite"
  }, status === 'sent' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Message sent. Thank you, I will reply soon."), status === 'error' && error)), /*#__PURE__*/React.createElement("aside", {
    className: "reach"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card mailcard"
  }, /*#__PURE__*/React.createElement("span", {
    className: "issuer"
  }, "Email"), /*#__PURE__*/React.createElement("a", {
    className: "addr",
    href: `mailto:${CONTACT_EMAIL}`
  }, CONTACT_EMAIL), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn ghost small",
    onClick: copyEmail
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? 'check' : 'copy',
    size: 15
  }), " ", copied ? 'Copied' : 'Copy address')), /*#__PURE__*/React.createElement("ul", {
    className: "linklist"
  }, profile.socials.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.name
  }, /*#__PURE__*/React.createElement("a", {
    className: "card sociallink",
    href: s.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "social"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, s.name), /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }))))))));
}

/* =====================================================================
   APP
   ===================================================================== */

function ScrollToTop({
  path
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return null;
}
const pages = {
  '/': Home,
  '/about': About,
  '/certificates': Certificates,
  '/contact': Contact
};
function App() {
  const path = useHash();
  const Page = pages[path] || Home;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "aurora",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "blob b1"
  }), /*#__PURE__*/React.createElement("span", {
    className: "blob b2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "blob b3"
  })), /*#__PURE__*/React.createElement(Starfield, null), /*#__PURE__*/React.createElement(ScrollToTop, {
    path: path
  }), /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("div", {
    className: "route",
    key: path
  }, /*#__PURE__*/React.createElement(Page, null), /*#__PURE__*/React.createElement("footer", {
    className: "foot"
  }, "\xA9 ", new Date().getFullYear(), " ", profile.name, " \xB7 Built with React")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
