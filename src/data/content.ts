export const site = {
  fullName: "Quang Anh",
  email: "quanganh.portfolio@gmail.com",
  location: "Northampton, UK | Hanoi, Vietnam",
  cvUrl: "/QuangAnh-CV.pdf",
  linkedIn: "https://www.linkedin.com/",
  github: "https://github.com/",
  nav: [
    { label: "About", href: "#about" },
    { label: "Engineering Projects", href: "#projects" },
    { label: "Venture & Leadership", href: "#leadership" },
    { label: "Broadcasting", href: "#broadcasting" },
    { label: "Credentials", href: "#credentials" },
  ],
  ctaDownload: "Download CV (PDF)",
} as const;

export const hero = {
  headline: "Hi, I'm Quang Anh.",
  tagline:
    "An Embedded Systems Maker, Tech Entrepreneur, and Community Leader based between Northampton, UK and Hanoi, Vietnam. The thread between the circuits I solder and the ventures I launch is the same: electrical and electronic engineering that solves tangible problems for real people.",
  ctaPrimary: "Explore Engineering Projects",
  ctaPrimaryHref: "#projects",
  ctaSecondary: "Get in Touch",
  ctaSecondaryHref: "#contact",
  portraitAlt:
    "Quang Anh working with electronic circuits and presenting engineering work",
  portraitGuideline:
    "Ảnh chân dung làm việc với mạch điện / trình bày dự án kỹ thuật (tỷ lệ dọc ưu tiên).",
  metrics: [
    {
      label: "A*A*A*A*",
      detail: "Predicted A-Levels (Maths, Further Maths, CS, Physics)",
    },
    {
      label: "1540 SAT",
      detail: "790 Math, 750 RW | 8.0 IELTS",
    },
    {
      label: "Gold Medal",
      detail: "50th INOVA Int'l Invention Show (2026)",
    },
    {
      label: "1st Prize",
      detail: "CATS UK Business Incubator (2026)",
    },
    {
      label: "Full-Tuition",
      detail: "Frank Dickens Scholar @ Bosworth UK",
    },
  ],
} as const;

export const about = {
  eyebrow: "01 / MY STORY",
  heading: "Bridging the Lab Bench and the Real World",
  paragraphs: [
    "Moving from the High School for Gifted Students at Hanoi National University of Education to Bosworth Independent School in the UK sharpened my love of mathematics and physics into something more concrete. Self-studying circuit fundamentals with Giorgio Rizzoni, and building electronics projects that either worked or failed in my hands, made Electrical and Electronic Engineering feel less like a subject and more like a language I wanted to speak fluently.",
    "I keep pushing engineering toward applied products: a campus heater control system for Bosworth residences, hardware that leaves the bench for invention shows and incubator pitches. Commercial constraints and user experience are not extras for me; they decide whether a circuit stays a prototype or becomes something people actually rely on.",
    "Away from the breadboard I am a football thinker, a residential peer at Delapré House, and a livestream host who breaks down match tactics on camera. Reading the field, coordinating people, and running tournaments train the same systems instinct I use when designing hardware: define the goal, model the constraints, then keep the whole network stable under pressure.",
  ],
  images: [
    {
      caption: "At Bosworth Independent School.",
      alt: "Campus life at Bosworth Independent School",
      guideline: "Ảnh cuộc sống / khuôn viên tại Bosworth Independent School.",
    },
    {
      caption:
        "Close-up of the workbench with projects and engineering books.",
      alt: "Electronics workbench with projects and textbooks",
      guideline: "Ảnh bàn làm việc điện tử, dự án và sách kỹ thuật.",
    },
    {
      caption: "Sports activity or hosting a programme.",
      alt: "Sports activity and media hosting",
      guideline: "Ảnh hoạt động thể thao hoặc đang host chương trình / livestream.",
    },
  ],
  quickFacts: [
    "A-Level candidate (Year 13), Bosworth Independent School",
    "Predicted A*A*A*A* in Maths, Further Maths, CS, Physics",
    "SAT 1540 | IELTS Academic 8.0",
    "Frank Dickens Full-Tuition Scholar (2025-2027)",
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  awardBadge?: string;
  gradeBadge?: string;
  role: string;
  organization?: string;
  timeline: string;
  techStack: string[];
  overview: string[];
  dissertationTitle?: string;
  behindTheScenes: string;
  mediaNote: string;
  dissertationCta?: string;
  /** Hướng dẫn từng ô upload (không dùng ảnh mẫu) */
  mediaGuides: string[];
};

export const projectsSection = {
  eyebrow: "02 / HARDWARE, SOFTWARE & RESEARCH",
  heading: "Engineering Projects & Scientific Investigation",
} as const;

export const projects: Project[] = [
  {
    id: "evcharge-ai",
    title:
      "EVCharge AI: Solar-Powered Smart EV Charging Station",
    awardBadge:
      "Gold Medal: 50th International Invention Show (INOVA 2026)",
    role: "Embedded Systems Developer",
    timeline: "Jul 2026 - Sept 2026",
    techStack: [
      "ESP32",
      "Arduino",
      "Thermal/Humidity/Flame Sensors",
      "Solar Integration",
      "AI Load Allocation",
    ],
    overview: [
      "Built a smart electric vehicle charging prototype powered by solar energy to shave peak grid loads and optimize charging completion.",
      "Programmed and assembled hardware protection circuits using ESP32 and Arduino microcontrollers integrated with thermal, humidity, and flame sensors to prevent charger overheating and fire hazards.",
      "Implemented AI algorithms to forecast grid demand and dynamically allocate shared power caps.",
    ],
    behindTheScenes:
      "The hardest part was keeping thermal, humidity, and flame sensors in sync on a shared ESP32/Arduino protection bus without false trips. When load risk rises, the cut-off circuit and the power-allocation algorithm hand off: sensors trigger a hard safety interrupt while the allocator immediately redistributes remaining capacity so other chargers stay within a safe shared cap.",
    mediaNote:
      "Video demo of circuit and sensor response to heat/flame, INOVA 2026 Gold Medal photo, and system block diagram.",
    mediaGuides: [
      "Video/ảnh demo mạch & phản ứng cảm biến nhiệt/lửa.",
      "Ảnh nhận huy chương vàng INOVA 2026.",
      "Sơ đồ khối hệ thống EVCharge AI.",
    ],
  },
  {
    id: "smart-heater",
    title: "Smart Heater Control System (Campus IoT)",
    role: "Independent Project Lead & Systems Developer",
    organization: "Bosworth Independent School",
    timeline: "Oct 2026 - Present",
    techStack: [
      "Arduino",
      "ESP32",
      "LoRa Modules",
      "Python",
      "JavaScript",
      "HTML/CSS",
    ],
    overview: [
      "Designed and assembled a hardware control system using Arduino, ESP32, and LoRa Modules.",
      "Developed a functional web application using Python, JavaScript, CSS, and HTML enabling house parents to turn heaters on and off remotely and allowing students to submit heating requests.",
    ],
    behindTheScenes:
      "Uneven heating and slow manual coordination across Bosworth residences pushed this project. LoRa with ESP32/Arduino was chosen for low-power coverage across boarding buildings where Wi-Fi is uneven. Hardware nodes publish control events over LoRa; a gateway bridges them into the web app so house parents can toggle circuits and students can submit heating requests in one workflow.",
    mediaNote:
      "Carousel: Arduino/ESP32 with LoRa module, House Parents and Student Request web UI, short clip of a web button switching a real circuit.",
    mediaGuides: [
      "Ảnh Arduino/ESP32 gắn module LoRa.",
      "Screenshot giao diện web House Parents / Student Request.",
      "Clip ngắn: bấm nút web điều khiển mạch thật.",
    ],
  },
  {
    id: "epq-lighting",
    title:
      "Extended Project Qualification (EPQ): Solid-State vs. Incandescent Lighting",
    gradeBadge: "Grade Achieved: A (49/54)",
    role: "Independent Researcher",
    organization: "Bosworth Independent School",
    timeline: "Sep 2025 - Mar 2026",
    techStack: ["Technical Research", "Optical Analysis", "Science Fair"],
    dissertationTitle:
      "To what extent does LED lighting offer superior technical performance compared to incandescent lighting in terms of efficiency, colour rendering, and reliability?",
    overview: [
      "Authored and defended a 6,000-word independent technical dissertation evaluating luminous efficacy, spectral colour rendering, and component reliability.",
      "Presented findings at the school science fair, proposing an optimized classroom lighting solution to enhance student concentration.",
    ],
    behindTheScenes:
      "The sharpest finding after 6,000 words was that luminous efficacy alone does not decide classroom quality; spectral colour rendering shapes comfort and focus just as much. The science-fair proposal used higher-CRI LED spectra tuned for daytime classrooms so students get brighter usable light with less glare and heat, supporting sustained concentration.",
    mediaNote:
      "Science Fair presentation photo at Bosworth plus a View 6,000-Word Dissertation (PDF) button.",
    dissertationCta: "View 6,000-Word Dissertation (PDF)",
    mediaGuides: [
      "Ảnh trình bày Science Fair tại Bosworth.",
      "Sơ đồ / biểu đồ so sánh LED vs đèn sợi đốt.",
    ],
  },
  {
    id: "digital-library",
    title: "Digital Library Management System",
    role: "Project Initiator & Developer",
    organization: "Bosworth Independent School",
    timeline: "May 2026 - Present",
    techStack: [
      "Python",
      "SQL",
      "JavaScript",
      "HTML",
      "Relational Database",
    ],
    overview: [
      "Designed and implemented a relational database architecture for book inventory and user authentication.",
      "Co-programmed a functional web application using Python, JavaScript, and HTML enabling students to search catalogs, borrow, and return books.",
      "Collaborated with the Student Council Environment Committee to digitize records and manually migrate library data.",
    ],
    behindTheScenes:
      "Digitising the library lets students search, borrow, and return books without paper friction, and designing the relational schema with a web front end taught me how authentication, inventory integrity, and simple UX have to ship together.",
    mediaNote:
      "Search/borrow web UI screenshot and database table schema diagram.",
    mediaGuides: [
      "Screenshot giao diện tìm / mượn sách.",
      "Sơ đồ schema database thư viện.",
    ],
  },
];

export const leadership = {
  eyebrow: "03 / ENTREPRENEURSHIP & COMMUNITY IMPACT",
  heading: "Venture Creation & Leadership",
  featured: {
    title: "FlexAid",
    subtitle: "CATS Global Schools Business Incubator, UK",
    awardBadge:
      "1st Place Winner: CATS UK Business Incubator Competition (2026)",
    role: '"FlexAid" Team Leader',
    location: "Northampton, UK",
    timeline: "Oct 2025 - Apr 2026",
    overview: [
      "Architected a soft-wrap knee brace integrated with sensors and an adaptive air-bag system to protect joints during activity.",
      "Led a cross-functional team in market research, financial modeling, and go-to-market strategy.",
    ],
    reflection:
      "The knee-brace idea grew from watching football and training injuries where joint protection still needs freedom of movement. Winning 1st place at CATS UK hinged on the moment our financial model and pitch finally told one clear story: hardware that athletes would wear, priced and positioned for a real campus market.",
    mediaNote:
      "Slide deck or product design drawings, financial model visuals, and 1st-place award photo.",
    mediaGuides: [
      "Slide / bản vẽ thiết kế sản phẩm FlexAid.",
      "Ảnh mô hình tài chính / go-to-market.",
      "Ảnh nhận giải nhất CATS UK Business Incubator 2026.",
    ],
  },
  uk: {
    title: "Bosworth Independent School (Northampton, UK)",
    roles: [
      {
        title: "Vice House Captain (Delapré House)",
        timeline: "Jan 2026 - Present",
        bullets: [
          "Execute inter-house STEM and sports competitions proposed by the student body, driving participation across the house with 44 players and 100+ spectators.",
          "Collaborate directly with the Director of Student Development, senior faculty, and Head Students to enhance academic and residential life.",
          "Serve as the primary liaison between the student community and school leadership.",
        ],
      },
      {
        title: "Member, Charity & Environment Committee (Student Council)",
        timeline: "Sept 2025 - Present",
        bullets: [
          "Conducted empirical audits on school dining food waste through staff and chef interviews, launching a school-wide waste-reduction awareness campaign.",
          "Delivered a climate-action presentation to the entire school community on Earth Day 2026 and organized a tree-planting event with more than 40 participants.",
          "Organized a student-led food-sale fundraiser, raising £200+ for the charity FoodKind.",
        ],
      },
      {
        title:
          "Community Bike Workshop & Events Volunteer: Delapré Abbey Preservation Trust",
        timeline: "Mar 2026 - June 2026",
        bullets: [
          "Provided hands-on technical assistance and customer support at a weekend community bicycle repair workshop for a registered local charity.",
          "Collected and structured large-scale customer datasets, building an organized inventory and tracking database table for store operations.",
          "Supported core operational teams during major public charity events.",
        ],
      },
    ],
  },
  vietnam: {
    title: "CSP Sporting Federation (Hanoi, Vietnam)",
    roles: [
      {
        title:
          "General Leader | CSP Challenger 2024 (CC24 Badminton and Table Tennis Tournament)",
        timeline: "Sept 2023 - June 2025",
        bullets: [
          "One of the largest badminton and table tennis tournaments in Cau Giay district.",
          "Supervised an organizing committee of 30+ members to deliver a city-wide tournament for 120+ high school athletes.",
          "Directed marketing operations, produced promotional video trailers, and supported public relations outreach, increasing reach and impressions by nearly 300%.",
        ],
      },
      {
        title:
          "Head of Communications | Gifted Students Cup 2024 (GSC24 Football Tournament)",
        timeline: "Sept 2023 - June 2025",
        bullets: [
          "Strategized and executed the multi-channel promotional campaign, coordinating across departments to increase social media reach by 245% and impressions by 279%.",
          "Trained and mentored volunteer content creators; negotiated co-marketing partnerships and media sponsorships with partner schools and local press.",
        ],
      },
    ],
  },
} as const;

export const broadcasting = {
  eyebrow: "04 / DIGITAL MEDIA & PUBLIC SPEAKING",
  heading: "Sports Tactical Analysis & Live Broadcasting",
  online: {
    name: "Huấn Luyện Viên Online",
    role: "Media Content Creator",
    location: "Hanoi, Vietnam",
    timeline: "Sept 2023 - Nov 2024",
    achievements: [
      "Managed a football analysis Facebook page with 50,000+ followers, authoring weekly tactical and post-match analyses, averaging 300 engagements/post with 5 posts reaching more than 1,000 engagements.",
      "Scripted and edited short-form videos for a TikTok channel reaching 40,000+ followers and 1,000,000+ total likes, averaging 20,000 views/video.",
      "Coordinated social media product promotions, handled customer inquiries, and organized both online and offline community viewing events.",
    ],
  },
  onlive: {
    name: "Huấn Luyện Viên Onlive",
    role: "Streamer & Technical Support",
    location: "Hanoi, Vietnam",
    timeline: "June 2024 - Nov 2024",
    achievements: [
      "Hosted live streams on YouTube during match-days, delivering pre- and post-match tactical analysis.",
      "Interacted with live chat in real-time, answered audience questions, and collaborated with the media content team.",
    ],
  },
  videos: [
    {
      title: "Euro 2024 Discussion Stream",
      badge: "4.9K viewers",
      youtubeId: "HCPhCWWSRH8",
      start: 922,
    },
    {
      title: "Pre-Semifinal Analysis Stream",
      badge: "2K viewers",
      youtubeId: "myTIuRhE6DA",
      start: 2722,
    },
  ],
  reflection:
    "Calling tactics live for thousands of viewers on Huấn Luyện Viên Onlive, while answering chat in real time, trained me to stay calm, structure complex ideas quickly, and communicate under pressure.",
} as const;

export const credentials = {
  eyebrow: "05 / ACADEMIC CREDENTIALS & TOOLKIT",
  heading: "Education, Honors & Technical Skills",
  education: [
    {
      school: "Bosworth Independent School, Northampton, UK",
      timeline: "Sept 2025 - Present",
      details: [
        "A-Level Candidate (Year 13) | Predicted Grades: A*A*A*A* (Maths, Further Maths, Computer Science, Physics)",
        "Standardized Testing: SAT: 1540 (Math: 790, RW: 750) | IELTS Academic: 8.0",
      ],
    },
    {
      school:
        "High School for Gifted Students, Hanoi National University of Education, Vietnam",
      timeline: "Sept 2023 - May 2025",
      details: ["GPA: Grade 10: 9.7/10 | Grade 11: 9.6/10"],
    },
    {
      school:
        "Nguyen Tat Thanh Lower and Upper Secondary School, Hanoi, Vietnam",
      timeline: "Sept 2019 - May 2023",
      details: ["GPA: Grade 9: 9.6/10"],
    },
  ],
  externalCourses: [
    "Siemens Certification: Siemens Engineering Work Experience",
    "University of Liverpool Certification: Virtual Summer School (Designing for Impossibilities)",
    "Technical Self-Study: Currently reading Fundamentals of Electrical Engineering by Giorgio Rizzoni (Fundamentals of Electric Circuits)",
  ],
  honors: [
    "Gold Medal: 50th International Invention Show: INOVA (2026)",
    "Frank Dickens Scholarship (Full-Tuition Award): Bosworth Independent School (2025-2027)",
    "1st Prize Winner: CATS UK Business Incubator Competition (2026)",
    "Gold Certificate: UKMT Senior Mathematical Challenge (SMC) (2025)",
    "Bronze Medal: UKMT Andrew Jobbings Senior Kangaroo (Invite-only national round) (2025)",
    "Nguyen Tat Thanh Merit Scholarship: Awarded for 4 consecutive terms (2021-2023)",
    "2x Silver & 1x Bronze Medalist: School Football Tournaments (GC23, SC24, SC25: Greeting Cup & Spring Cup)",
  ],
  hardSkills:
    "Python, SQL, C/C++; Electronic Component Assembly; Circuit Design & Prototyping.",
  softSkills:
    "Leadership; Systems Thinking; Public Speaking; Cross-functional Collaboration.",
  interests:
    "Sports (Football, Basketball, Billiards, Chess - Member of the Ams Chess Academy and the Wisdom Hub of Youth); Fashion; Movies; Playing Guitar and Singing.",
} as const;

export const footer = {
  closing:
    "I am preparing university applications in Electrical and Electronic Engineering and welcome conversations with professors, admissions committees, and fellow hardware builders.",
  emailLabel: "Email",
  locationLabel: "Location",
  linksLabel: "Links",
  linkedIn: "LinkedIn",
  github: "GitHub",
  resume: "Download Resume (PDF)",
  copyEmail: "Copy email",
  copied: "Copied",
} as const;

export const styleTabs = [
  { id: "gridly", label: "Gridly Style" },
  { id: "velixo", label: "Velixo Style" },
  { id: "benbox", label: "BenBox Style" },
] as const;

export type StyleTabId = (typeof styleTabs)[number]["id"];
