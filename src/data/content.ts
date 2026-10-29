export const site = {
  fullName: "Nguyen Quang Anh",
  email: "nquanganh08@gmail.com",
  phone: "+44 7428925081",
  phoneHref: "tel:+447428925081",
  location: "Northampton, UK | Hanoi, Vietnam",
  cvUrl: "/QuangAnh-CV.pdf",
  linkedIn: "https://www.linkedin.com/",
  github: "https://github.com/nquanganh08-svg",
  nav: [
    { label: "About", href: "/" },
    { label: "Engineering Projects", href: "/projects" },
    { label: "Venture & Leadership", href: "/leadership" },
    { label: "Broadcasting", href: "/broadcasting" },
    { label: "Contact", href: "/contact" },
  ],
  ctaDownload: "Download CV (PDF)",
} as const;

export const hero = {
  headline: "Hi, I'm Nguyen Quang Anh.",
  tagline:
    "An Electronics Developer, Engineering Researcher, and Community Leader driven by a passion for solving real-world challenges through technology.",
  support:
    "My projects share a common goal: using electrical and electronic engineering to solve practical problems, particularly in energy efficiency and power consumption.",
  ctaPrimary: "Explore Engineering Projects",
  ctaPrimaryHref: "/projects",
  ctaSecondary: "Get in Touch",
  ctaSecondaryHref: "/contact",
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
    "Maths and Physics have always been my favourite subjects since I studied in Vietnam. That was also when I started loving engineering. In Vietnam, I was infused with the world of theoretical physics; whereas, in the UK, I had an opportunity to apply the knowledge into real-life products and research papers. The spark for Electrical and Electronic Engineering was lit when I was watching a video about the blue LED and how it changed the whole world. I was amazed at such a big impact from an object whose size is less than a human hand.",
    "For me, engineering is a bridge between theory and practice. Theory will be useless if it cannot be applied to human life in any form. The main purpose of research is still human life. Therefore, user experience must be one of the top priorities when designing a new product.",
    "Leaving the circuits and wires, I still connect, but instead of electricity, I connect humans. On the sports field, I am a midfielder connecting the defensive players and attackers. In the boarding house, I am a catalyst who came up with new ideas to get boarders involved. In front of the camera, I was a streamer connecting emotions with viewers.",
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
} as const;

export const projectsSection = {
  heading: "Engineering Projects & Scientific Investigation",
  lead: "Using electrical and electronic engineering to solve practical problems, particularly in energy efficiency and power consumption.",
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
  /** Các bước thực hiện, vẽ thành sơ đồ quy trình */
  process: {
    title: string;
    detail?: string;
    media?: { slotId: string; guideline: string };
  }[];
  dissertationTitle?: string;
  behindTheScenes: string;
  mediaNote: string;
  /** Hướng dẫn từng ô upload (không dùng ảnh mẫu) */
  mediaGuides: string[];
  /** Giữ id ảnh đã upload khi thứ tự khung đổi */
  mediaSlotIds?: string[];
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
    ],
    process: [
      {
        title: "Research",
        detail: "Raise ideas.",
        media: {
          slotId: "project-evcharge-ai-step-0",
          guideline: "Ảnh ghi chú hoặc tài liệu khi nghiên cứu và nêu ý tưởng.",
        },
      },
      {
        title: "Choose",
        detail: "Pick one main idea.",
        media: {
          slotId: "project-evcharge-ai-step-1",
          guideline: "Ảnh buổi thảo luận hoặc ghi chú khi chọn ý tưởng chính.",
        },
      },
      {
        title: "Diagram",
        detail: "Assign hardware, software, and AI.",
        media: {
          slotId: "project-evcharge-ai-2",
          guideline: "Sơ đồ khối hệ thống EVCharge AI.",
        },
      },
      {
        title: "Build",
        detail:
          "App and server, C/C++ in the Arduino IDE, machine learning splits power for each car.",
        media: {
          slotId: "project-evcharge-ai-0",
          guideline: "Video/ảnh demo mạch và phản ứng cảm biến nhiệt/lửa.",
        },
      },
      {
        title: "Test",
        media: {
          slotId: "project-evcharge-ai-1",
          guideline: "Ảnh nhận huy chương vàng INOVA 2026.",
        },
      },
    ],
    behindTheScenes:
      "The most challenging part of integrating the sensors was ensuring that all the components worked together as a cohesive system rather than as independent units. I had to consider different scenarios. What will happen if the fire sensors detect fire? How should the system react when the temperature is too high? Answering these questions forced me to connect the components carefully, ensuring that each component not only functioned independently but also contributed effectively to the overall system.",
    mediaNote: "",
    mediaGuides: [],
  },
  {
    id: "smart-heater",
    title: "Smart Heater Control System (Campus IoT)",
    highlight:
      "A control system that lets students request heat and lets house parents switch heaters remotely, including automatic operation from sensor readings.",
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
    ],
    process: [
      {
        title: "Scope",
        detail: "A friend could not turn his heater on.",
        media: {
          slotId: "project-smart-heater-scope",
          guideline: "Ảnh khu vực heater hoặc ghi chú phạm vi bài toán.",
        },
      },
      {
        title: "Plan",
        detail: "Flowchart, then the modules and the site.",
        media: {
          slotId: "project-smart-heater-plan",
          guideline: "Ảnh flowchart hoặc sơ đồ khối của hệ thống heater.",
        },
      },
      {
        title: "Site",
        detail: "Students request heat. Staff accept or reject.",
        media: {
          slotId: "project-smart-heater-1",
          guideline: "Screenshot giao diện web House Parents / Student Request.",
        },
      },
      {
        title: "Sense",
        detail: "DHT11, LCD 16x2, two ESP32, Uno, LoRa.",
        media: {
          slotId: "project-smart-heater-sensors",
          guideline: "Ảnh làm việc với cảm biến DHT11, LCD, ESP32, Arduino và LoRa.",
        },
      },
      {
        title: "Test",
        detail: "Manual and automatic, 0.8 km away.",
        media: {
          slotId: "project-smart-heater-test",
          guideline: "Clip thử manual hoặc automatic, và ảnh heater, receiver, transmitter.",
        },
      },
    ],
    behindTheScenes:
      "The main reason I chose LoRa modules was the school Wi-Fi. My school's Wi-Fi required signing in to connect, which was a barrier for the project. Therefore, I needed to connect the microcontrollers using a different wave, and LoRa was the choice. I still needed Wi-Fi, but only for one main microcontroller that received signals from the sensors.",
    mediaNote: "",
    mediaGuides: [],
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
    ],
    process: [
      {
        title: "Scope",
        detail: "Choose the format and the project scope.",
        media: {
          slotId: "project-epq-lighting-scope",
          guideline: "Ảnh ghi chú khi chọn format và phạm vi EPQ.",
        },
      },
      {
        title: "Plan",
        detail: "Plan and manage the project.",
        media: {
          slotId: "project-epq-lighting-plan",
          guideline: "Ảnh kế hoạch hoặc timeline của dự án EPQ.",
        },
      },
      {
        title: "Research",
        detail: "Literature review, analysis, evaluation.",
        media: {
          slotId: "project-epq-lighting-1",
          guideline: "Sơ đồ hoặc biểu đồ so sánh LED và đèn sợi đốt.",
        },
      },
      {
        title: "Write",
        detail: "Write and evaluate.",
        media: {
          slotId: "project-epq-lighting-0",
          guideline: "Ảnh trình bày Science Fair tại Bosworth.",
        },
      },
    ],
    behindTheScenes:
      "One of the most fascinating and surprising insights is actually not in the report: Psychology of Light. Human eyes take yellowish light as relaxing and restful, whereas white light is considered productive and work-oriented. That fact led me to propose changing the bulbs in the tables in boarding rooms to LEDs for students to study, and the ceiling lights to yellow for relaxation.",
    mediaNote: "",
    mediaGuides: [],
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
    ],
    process: [
      {
        title: "Goals",
        detail: "Define the goals for the library.",
        media: {
          slotId: "project-digital-library-goals",
          guideline: "Ảnh thư viện lúc bắt đầu hoặc ghi chú mục tiêu.",
        },
      },
      {
        title: "Plan",
        detail: "Software, cleaning, and talking to teachers.",
        media: {
          slotId: "project-digital-library-plan",
          guideline: "Ảnh phân công: phần mềm, dọn thư viện, trao đổi với giáo viên.",
        },
      },
      {
        title: "Database",
        detail: "Collect book information and create the database.",
        media: {
          slotId: "project-digital-library-1",
          guideline: "Sơ đồ schema database thư viện.",
        },
      },
      {
        title: "Site",
        detail: "Build the website and integrate the database.",
        media: {
          slotId: "project-digital-library-0",
          guideline: "Screenshot giao diện tìm và mượn sách.",
        },
      },
      {
        title: "Test",
        media: {
          slotId: "project-digital-library-test",
          guideline: "Ảnh hoặc clip kiểm thử mượn và trả sách.",
        },
      },
    ],
    behindTheScenes:
      "Digitalizing the process and refurbishing the library connects students with the library, creating a quiet and relaxed space. More students went to the library during break and lunch time for a nap or popped in to borrow a book. For myself, after doing the project, I knew how to take data from real life, build a database from there, and integrate into a website.",
    mediaNote: "",
    mediaGuides: [],
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
    photoAlt: "Activities at Bosworth Independent School",
    photoGuideline:
      "Ảnh hoạt động tại Bosworth Independent School, Northampton.",
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
    photoAlt: "Activities with CSP Sporting Federation",
    photoGuideline: "Ảnh hoạt động tại CSP Sporting Federation, Hà Nội.",
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
  heading: "Sports Tactical Analysis",
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

export const contact = {
  heading: "Contact",
  name: "Nguyen Quang Anh",
  photoAlt: "Portrait for the contact page",
  photoGuideline: "Ảnh chân dung hoặc ảnh liên hệ của học viên.",
  places: ["Northampton, UK", "Hanoi, Vietnam"],
  githubLabel: "nquanganh08-svg",
  websiteLabel: "Website",
  websiteHref: "/",
} as const;

export const footer = {
  closing:
    "If anyone passing by has an interest in connecting with me for future electrical or electronic projects, I would love to receive your email.",
  emailLabel: "Email",
  locationLabel: "Location",
  linksLabel: "Links",
  linkedIn: "LinkedIn",
  github: "GitHub",
  resume: "Download CV (PDF)",
  copyEmail: "Copy email",
  copied: "Copied",
} as const;
