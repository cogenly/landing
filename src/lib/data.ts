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
  { label: "FAQ", href: "#faq" },
];

export const services = [
  {
    icon: Phone,
    title: "Voice Agents",
    outcome: "Leads pick up. Clients show up.",
    description:
      "Missed calls and no-shows cost you thousands. Our voice AI handles follow-ups, confirmations, and outbound calls so your pipeline stops leaking.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    outcome: "15+ hours a week, off your team's plate.",
    description:
      "Invoices, contracts, intake forms, medical records. Pulled, sorted, and routed without anyone touching them. Your team does real work instead.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    outcome: "The busywork disappears.",
    description:
      "Data moves between your tools without anyone copying, pasting, or chasing it down. The handoffs that slow your team down just stop happening.",
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    outcome: "One screen. The whole picture.",
    description:
      "Stop toggling between five tabs to figure out what's going on. We build the dashboard your team actually needs, with the data they actually use.",
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    outcome: "Know before it's a problem.",
    description:
      "Automated reports that surface what matters. Spot issues before they cost you, and know exactly where to focus next.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    outcome: "We built it. We keep it running.",
    description:
      "2am outage? Our problem, not yours. Monitoring, optimization, and incident response are included. You never babysit the system.",
  },
];

export const stats = [
  { value: 20, suffix: "+ hrs", label: "Given back to teams every week" },
  { value: 2, suffix: "-4 wks", label: "From kickoff to live in production" },
  { value: 75, suffix: "%", label: "Less time on manual work" },
  { value: 100, suffix: "%", label: "Of systems we build, we maintain" },
];

export const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "If your team spends hours on work that doesn't require human judgment, we can help. Law firms, medical practices, agencies, e-commerce, professional services. The industry matters less than the problem.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Every project is scoped and priced after a discovery call. Most clients see ROI within the first month. No surprises, no hidden fees. Apply and we'll walk you through it.",
  },
  {
    question: "How long does it take to build?",
    answer:
      "Most systems are live within 2-4 weeks. Some ship in days. That means you're saving time and money inside of a month, not six months from now.",
  },
  {
    question: "Do we need to be technical?",
    answer:
      "No. You tell us the problem, we handle everything else. You'll get a dashboard to see what's happening, but you never need to touch the underlying system.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "That's what the retainer is for. We monitor everything and fix issues before you even notice them. If something does go wrong, we handle it. You never get a 2am phone call.",
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
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  portal: [
    { label: "Dashboard", href: "/dashboard" },
  ],
};
