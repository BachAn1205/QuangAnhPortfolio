export const site = {
  fullName: "Quang Anh",
  email: "quanganh.portfolio@gmail.com",
  location: "Northampton, UK | Hanoi, Vietnam",
  cvUrl: "/QuangAnh-CV.pdf",
  linkedIn: "https://www.linkedin.com/",
  github: "https://github.com/",
  nav: [
    { label: "About", href: "/about" },
    { label: "Engineering Projects", href: "/projects" },
    { label: "Venture & Leadership", href: "/leadership" },
    { label: "Broadcasting", href: "/broadcasting" },
    { label: "Credentials", href: "/credentials" },
  ],
  ctaDownload: "Download CV (PDF)",
} as const;

export const hero = {
  headline: "Hi, I'm Quang Anh.",
  tagline:
    "An Electronics Developer, Engineering Researcher, and Community Leader driven by a passion for solving real-world challenges through technology.",
  support:
    "My projects share a common goal: using electrical and electronic engineering to solve practical problems, particularly in energy efficiency and power consumption.",
  ctaPrimary: "Explore Engineering Projects",
  ctaPrimaryHref: "/projects",
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
  heading: "Bridging the Lab Bench and the Real World",
  paragraphs: [
    "Maths and Physics have always been my favourite subjects since I studied in Vietnam. That was also when I started loving engineering. In Vietnam, I was infused with the world of theoretical physics; whereas, in the UK, I had an opportunity to apply the knowledge into real-life products and research papers. The spark on Electrical and Electronic Engineering was on when I was watching about the history of a blue LED and how it changed the whole world. I was amazed at such a big impact of an object whose size is less than a human hand.",
    "For me, engineering is a bridge between theory and practices. Theory will be useless if it cannot apply to human life under any form. The main purpose of researching is still human life. Therefore, user experience must be one of the top priorities when designing a new product.",
    "Leaving the circuits and wires, I still connect, but instead of electricity, I connect humans. In the sport field, I am a midfielder connecting between the defensive players and attackers. In the boarding house, I am a catalyst, who came up with new ideas to get boarders involved. In front of the camera, I was a streamer connecting emotions with viewers.",
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

export const projectsSection = {
  heading: "Engineering Projects & Scientific Investigation",
  lead: "Using electrical and electronic engineering to solve practical problems, particularly in energy efficiency and power consumption.",
  capabilities: [
    { label: "Embedded Systems", detail: "ESP32 / Arduino / sensors" },
    { label: "Campus IoT", detail: "LoRa + web control stack" },
    { label: "AI on Hardware", detail: "Load allocation & forecasting" },
    { label: "Technical Research", detail: "EPQ Grade A (49/54)" },
    { label: "Full-stack Apps", detail: "Python / SQL / JS" },
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  highlight: string;
  domain: string;
  featured?: boolean;
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
  /** Hướng dẫn từng ô upload (không dùng ảnh mẫu) */
  mediaGuides: string[];
};

export const projects: Project[] = [
  {
    id: "evcharge-ai",
    title:
      "EVCharge AI: Solar-Powered Smart EV Charging Station",
    highlight:
      "The project aims to create a sustainable and safe charging station powered by solar energy.",
    domain: "Embedded + AI",
    featured: true,
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
      "Vietnam had 374,816 EVs up to May 2026 (369,849 electric passenger cars, 3,396 electric trucks, and 1,571 electric buses), projected to reach 1 million electric vehicles (not motorbikes) by 2030.",
      "If 100,000 vehicles used 60-120 kW fast chargers at the same time, that could create an instantaneous load of 6-12 GW, a significant fraction of the national peak. Concentrated demand, rather than total energy consumed, pressures local grid infrastructure.",
      "A smart charging system should decide which car is prioritized, how much energy each vehicle receives, and within what time frame, given the current grid load, local distribution limits, and each vehicle's requirements.",
      "Process: research and raise ideas; discuss and choose a main idea; sketch a block diagram and assign hardware, software, and AI. Software builds an app linked to a database and server. Hardware uses C/C++ in the Arduino IDE for sensors and the microcontroller. AI and machine learning divide power for each car. Then testing and evaluation.",
    ],
    behindTheScenes:
      "The most challenging part of integrating the sensors was ensuring that all the components worked together as a cohesive system rather than as independent units. I had to consider different scenarios. What will happen if the fire sensors detect fire? How should the system react when the temperature is too high? Answering these questions forced me to connect the components carefully, ensuring that each component not only functioned independently but also contributed effectively to the overall system.",
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
    highlight:
      "The system aims to decrease the power consumption of heaters in the boarding houses.",
    domain: "IoT Systems",
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
      "The system aims to decrease the power consumption of heaters in the boarding houses.",
      "Steps: define the scope and the problem area; sketch the system flowchart and block diagrams; vibe-coded the app; programmed sensors and microcontrollers (LoRa modules); testing and evaluation.",
    ],
    behindTheScenes:
      "The project was motivated by my personal experience with the heaters in my room. During fall, there were days I felt cold and wanted to turn on my heater, but I cannot turn on the heater by myself without permission in the main building. This inconvenience inspired me to develop a more efficient control system that could simplify the process and automate the heater's operation based on environmental conditions, reducing reliance on humans.",
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
    highlight:
      "The project aims to compare efficiency, colour rendering, and reliability of LEDs and incandescent bulbs as a basis for further work on both efficiency and colour quality.",
    domain: "Research",
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
      "The project aims to make an overall comparison between efficiency, colour rendering and reliability of LEDs and incandescent light bulbs, making the fundamentals for further research focused on improving both the efficiency and colour quality of LEDs.",
      "Steps: choose the format and project scope; plan and manage the project; conduct research (literature review, analysis, evaluation); write and evaluate.",
    ],
    behindTheScenes:
      "One of the most fascinating and surprising insights is actually not in the report: Psychology of Light. Human eyes take yellowish light as relaxing and resting, whereas white light is considered as productive and working. That fact led me to propose an idea of changing all the light bulbs in tables in boarding rooms as LEDs for students to study, and in the ceiling as yellow for relaxation.",
    mediaNote:
      "Science Fair presentation photo at Bosworth, and a comparison diagram of LED and incandescent lighting.",
    mediaGuides: [
      "Ảnh trình bày Science Fair tại Bosworth.",
      "Sơ đồ / biểu đồ so sánh LED vs đèn sợi đốt.",
    ],
  },
  {
    id: "digital-library",
    title: "Digital Library Management System",
    highlight:
      "The project aims to digitalize borrowing, returning, and searching so more students use the library as a quiet place to study and read.",
    domain: "Software",
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
      "It started with a request from a member in my school house, Bobby, who wanted a quiet place to sleep and do work during lunch time. The library was messy, and borrowing and returning were outdated.",
      "Steps: define goals; sketch plans and assign software, cleaning, and talking to teachers; clean the library, collect book information, and create the database; build the website and integrate the database; testing and evaluation.",
    ],
    behindTheScenes:
      "Digitalizing the process and refurbishing the library connects students with the library, creating a quiet and relaxed space. More students went to the library during break and lunch time for a nap or popped in to borrow a book. For myself, after doing the project, I knew how to take data from real life, build a database from there, and integrate into a website.",
    mediaNote:
      "Search/borrow web UI screenshot and database table schema diagram.",
    mediaGuides: [
      "Screenshot giao diện tìm / mượn sách.",
      "Sơ đồ schema database thư viện.",
    ],
  },
];

export const leadership = {
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
    "If you would like to talk about an electrical or electronic engineering project, please email me.",
  emailLabel: "Email",
  locationLabel: "Location",
  linksLabel: "Links",
  linkedIn: "LinkedIn",
  github: "GitHub",
  resume: "Download CV (PDF)",
  copyEmail: "Copy email",
  copied: "Copied",
} as const;
