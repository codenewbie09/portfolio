import type { Project, TimelineEntry, Achievement, SocialLink, Skills, Meta } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'courseflow',
    name: 'CourseFlow',
    tagline: 'Concurrency-Safe Allocation Engine',
    description:
      'A distributed allocation engine that guarantees seats_taken ≤ capacity under brutal concurrent spikes. Redis Sorted Sets for atomic arbitration, SELECT FOR UPDATE for row-level locking, idempotency keys for exactly-once enrollment. Zero oversubscription verified under integration spike tests. Built to solve real seat-conflict problems in course registration systems.',
    tags: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'Prometheus'],
    github: 'https://github.com/codenewbie09/courseflow',
    size: 'large',
  },
  {
    id: 'ghostnote',
    name: 'GhostNote',
    tagline: 'Encrypted Ephemeral Messaging',
    description:
      'A self-destructing messaging service with AES-128 encryption and atomic single-read semantics using Redis GETDEL. Every payload is encrypted at rest, access is capability-based via single-use tokens, and messages auto-expire with configurable TTLs. Migrated to async I/O to handle concurrent reads without race conditions.',
    tags: ['FastAPI', 'Redis', 'Async I/O', 'AES-128'],
    github: 'https://github.com/codenewbie09/GhostNote',
    size: 'small',
  },
  {
    id: 'pitchperfect',
    name: 'PitchPerfect',
    tagline: 'AI Sales Roleplay Training',
    description:
      'A full-stack SaaS platform for practicing sales conversations against AI prospects that respond in-character based on their persona, pain points, and personality. Auto-scored across opener quality, qualification, objection handling, and closing technique. Built with Next.js 16, Drizzle ORM, Neon PostgreSQL, and Groq LLM.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Groq API'],
    github: 'https://github.com/codenewbie09/pitchperfect',
    live: 'https://pp-sales.vercel.app',
    size: 'large',
  },
];

export const SKILLS: Skills = {
  languages: ['Python', 'TypeScript', 'C++', 'SQL', 'Go'],
  frameworks: ['FastAPI', 'Next.js', 'Django', 'React', 'gRPC', 'Kafka'],
  infrastructure: ['PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'Linux'],
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    id: 'hpe',
    date: 'May 2025 — Present',
    role: 'Software Engineering Intern',
    company: 'Hewlett Packard Enterprise · CPP Program',
    location: 'Remote',
    bullets: [
      'Building backend services for an internal interview management platform using Python APIs — improved scheduling workflow efficiency by 20%.',
      'Implemented authentication, authorization, and validation logic for production-ready feature delivery in an Agile team of 6.',
      'Shipping code reviews, deployment cycles, and production monitoring end-to-end.',
    ],
  },
  {
    id: 'ta',
    date: 'Aug 2024 — Present',
    role: 'Teaching Assistant',
    company: 'Shiv Nadar University',
    location: 'Noida, India',
    bullets: [
      'Mentoring 50+ students in Discrete Mathematics and Probability & Statistics.',
      'Conducting tutorial sessions, grading assignments, and holding office hours.',
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'dean',
    title: "Dean's List Awardee",
    description: 'academic excellence, Shiv Nadar University',
  },
  {
    id: 'cgpa',
    title: 'CGPA 9.20 / 10.0',
    description: 'computer science program',
  },
];

export const SOCIALS: SocialLink[] = [
  { label: 'agraprats@gmail.com', href: 'mailto:agraprats@gmail.com', icon: 'mail' },
  { label: 'GitHub', href: 'https://github.com/codenewbie09', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prateek-agrawal-177671191/', icon: 'linkedin' },
];

export const RESUME_URL =
  'https://drive.google.com/file/d/1DZOvhk_X5j9PENxTl1npIn_rUTu97xwm/view?usp=sharing';

export const META: Meta = {
  title: 'Prateek Agrawal | Backend Engineer',
  description:
    'CS undergrad at Shiv Nadar University. I build distributed systems that don\'t fall over.',
  url: 'https://prateek-agrawal.vercel.app',
  ogImage: '/og-image.png',
};

export const QUOTE = 'I care about correctness, scale, and systems that behave under pressure.';

export const BIO = [
  "CS undergrad at Shiv Nadar University (class of 2027), currently at HPE building backend services for production systems.",
  "My work lives in the overlap of distributed systems, backend engineering, and systems programming — I like problems where concurrency, consistency, and performance actually matter.",
  "When I'm not writing Python or reading DDIA, I'm a Teaching Assistant for Discrete Math and Probability, mentoring 50+ students, or grinding LeetCode when I absolutely have to.",
];

export const HERO_LABEL = 'backend_engineer';

export const HERO_NAME = 'Prateek Agrawal';

export const TYPEWRITER_PHRASES = [
  'I build systems that don\'t fall over.',
  'Distributed computing is my thing.',
  'CS @ Shiv Nadar University · CGPA 9.20',
  'I make concurrent problems boring.',
];

export const CONTACT_HEADING = "Let's build something.";

export const CONTACT_SUBTEXT =
  "I'm open to interesting problems, backend roles, and conversations about distributed systems.";

export const CURRENT_YEAR = 2026;
