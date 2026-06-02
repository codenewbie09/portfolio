export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  size: 'large' | 'medium' | 'small';
}

export interface TimelineEntry {
  id: string;
  date: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'mail' | 'github' | 'linkedin';
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  infrastructure: string[];
}

export interface Meta {
  title: string;
  description: string;
  url: string;
  ogImage: string;
}
