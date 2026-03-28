import {
  Phone,
  FileText,
  Workflow,
  Wrench,
  BarChart3,
  Headphones,
} from "lucide-react";

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "FAQ", href: "#faq" },
];

export const services = [
  {
    step: "01",
    icon: Phone,
    title: "Voice Agents",
    description:
      "AI that makes and takes phone calls. Appointment booking, lead qualification, follow-ups, outbound campaigns. Sounds human. Works 24/7.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Document Processing",
    description:
      "Invoices, contracts, intake forms, medical records. We extract, classify, and route document data automatically.",
  },
  {
    step: "03",
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Connect your tools. Automate the handoffs between systems. Data flows where it needs to without anyone touching it.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Internal Tools",
    description:
      "Custom dashboards, admin panels, reporting tools. Built for your team, not off-the-shelf software you'll never fully use.",
  },
  {
    step: "05",
    icon: BarChart3,
    title: "AI Analytics",
    description:
      "Turn your data into clear answers. Automated reporting, anomaly detection, insights that tell you what to do next.",
  },
  {
    step: "06",
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "We don't build and disappear. Monthly retainer covers monitoring, optimization, and incident response. We keep your systems running so you don't have to think about it.",
  },
];

export const stats = [
  { value: 56, suffix: "", label: "Projects shipped (MediaMaxxing)" },
  { value: 30, suffix: "+/wk", label: "Content pieces published automatically" },
  { value: 75, suffix: "%", label: "Reduction in daily content work" },
  { value: 8, suffix: "", label: "AI agents built and deployed" },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  duration: string;
  headline: string;
  description: string;
  techStack: string[];
  results: {
    value: number;
    suffix: string;
    label: string;
  }[];
  bannerGradient: string;
  fullContent: {
    challenge: string;
    approach: string;
    whatWeBuilt: string[];
    outcome: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mediamaxxing",
    client: "MediaMaxxing",
    industry: "Content Agency",
    duration: "8 months",
    headline:
      "Full-stack platform for a content agency processing $1M+/month in creator payouts",
    description:
      "Built the entire technical infrastructure for a content agency from scratch. Creator onboarding, payment processing, campaign management, analytics dashboards, CRM sync, and an 8-agent AI automation stack.",
    techStack: ["Next.js", "Supabase", "Railway", "Stripe", "Close CRM", "Claude"],
    results: [
      { value: 56, suffix: "", label: "Projects shipped" },
      { value: 19, suffix: "", label: "Active clients" },
      { value: 8, suffix: "", label: "AI agents deployed" },
      { value: 321, suffix: "+", label: "Tasks completed" },
    ],
    bannerGradient: "from-blue-600 to-indigo-700",
    fullContent: {
      challenge:
        "MediaMaxxing was scaling fast but running on spreadsheets and manual processes. Creator onboarding took days. Payouts were tracked in Google Sheets. Campaign performance was scattered across platform dashboards. The team was spending more time on operations than on growing the business.",
      approach:
        "We built a unified platform from scratch that handled every operational workflow: creator onboarding, campaign management, payment processing, and performance analytics. Then we layered an 8-agent AI automation stack on top to handle the repetitive parts without human intervention.",
      whatWeBuilt: [
        "Creator onboarding portal with automated intake and approval workflows",
        "Payment processing system handling $1M+/month in micro-transactions via Stripe, Mercury, and PayPal",
        "Real-time KPI dashboard tracking campaign performance across TikTok, Instagram, and YouTube Shorts",
        "Anti-botting fraud detection system to catch fake engagement before payouts",
        "Close CRM sync for automated sales pipeline tracking",
        "8 AI agents handling task routing, content processing, notifications, and reporting",
        "Whitelabel system for client-facing campaign portals",
        "Bulk video generation and content splitting tools",
      ],
      outcome:
        "The platform shipped 56 projects across 19 active clients with 40+ on the waitlist. Non-technical team members, including the COO, could investigate bugs, ship features, and deploy to production independently. The founder was no longer the bottleneck. The team posted 9 open roles, scaling from a technical dependency to a self-sufficient operation.",
    },
  },
  {
    slug: "content-pipeline",
    client: "Personal Brand",
    industry: "Content Creation",
    duration: "2 weeks to build",
    headline:
      "AI content pipeline that cut daily content work from 4+ hours to under 1 hour",
    description:
      "Custom multi-agent system with 4 parallel subagents handling competitor research, content ideation, scheduling, and publishing across platforms.",
    techStack: ["Claude Code", "ManyChat", "Google Calendar", "Custom Skills"],
    results: [
      { value: 30, suffix: "+", label: "Pieces per week" },
      { value: 75, suffix: "%", label: "Time saved" },
      { value: 4, suffix: "", label: "Parallel AI agents" },
      { value: 67, suffix: "/33", label: "Value-to-promo ratio" },
    ],
    bannerGradient: "from-emerald-600 to-teal-700",
    fullContent: {
      challenge:
        "Publishing 30+ pieces of content per week across multiple platforms was consuming 4+ hours every day. Deciding what to post, when to post, tracking competitors, and maintaining a consistent value-to-promo ratio required constant manual effort. The process didn't scale.",
      approach:
        "We built a custom Claude Code skill with 4 parallel AI subagents, each handling a different part of the content workflow. The system was designed to run autonomously with minimal daily input, reducing the human role to recording and reviewing.",
      whatWeBuilt: [
        "Account performance scraper that analyzes what content is working and why",
        "Competitor data puller that monitors other creators and identifies trending formats",
        "YouTube transcript brief generator that turns long-form videos into short-form content briefs via Apify",
        "Automated scheduler with Google Calendar conflict-checking and time-slot optimization",
        "Two-database content architecture: Guides DB for long-form ideas, Reel Queue for short-form",
        "ManyChat keyword automation for audience engagement",
        "Audit script with --fix flag for quality control and content ratio enforcement",
        "Rules engine enforcing a 67/33 value-to-promo split automatically",
      ],
      outcome:
        "Daily content work dropped from 4+ hours to under 1 hour. The system publishes 30+ pieces per week across platforms while maintaining consistent quality. Competitor research, ideation, and scheduling are fully automated. The creator's only remaining tasks are recording and final review.",
    },
  },
];

export const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "Any business with manual processes that slow them down. Law firms, medical practices, agencies, e-commerce, professional services. If your team does repetitive work, we can probably automate it.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Setup starts at $5,000. Monthly maintenance starts at $1,500. We scope everything upfront so there are no surprises.",
  },
  {
    question: "How long does it take to build?",
    answer:
      "Most systems are live within 2-4 weeks. Some simpler automations ship in days. We move fast because we use the same AI tools we're building for you.",
  },
  {
    question: "Do we need to be technical?",
    answer:
      "No. You tell us the problem, we handle everything else. You'll get a dashboard to see what's happening, but you never need to touch the underlying system.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "That's what the retainer is for. We monitor everything, fix issues proactively, and handle incidents as part of the retainer.",
  },
  {
    question: "Can't we just use ChatGPT or some tool ourselves?",
    answer:
      "You could build a voice agent with an off-the-shelf tool. But the agent is 10% of the value. The other 90% is understanding your workflow, handling edge cases, integrating with your systems, and making sure it actually works on Monday morning. That's what we do.",
  },
];

export const footerLinks = {
  product: [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:alex@cogenly.com" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};
