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
    step: "01",
    icon: Phone,
    title: "Voice Agents",
    description:
      "AI that makes and takes phone calls. Lead qualification, follow-ups, outbound campaigns. Sounds human. Works 24/7.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Document Processing",
    description:
      "Invoices, contracts, intake forms, medical records. Extracted, classified, and routed automatically.",
  },
  {
    step: "03",
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Connect your tools. Automate the handoffs. Data flows where it needs to without anyone touching it.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Internal Tools",
    description:
      "Custom dashboards, admin panels, reporting tools. Built for your team, not off-the-shelf.",
  },
  {
    step: "05",
    icon: BarChart3,
    title: "AI Analytics",
    description:
      "Automated reporting, anomaly detection, and insights that tell you what to do next.",
  },
  {
    step: "06",
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "We don't build and disappear. Monitoring, optimization, and incident response included.",
  },
];

export const stats = [
  { value: 3, suffix: "", label: "AI systems built and deployed" },
  { value: 2, suffix: "-4 wks", label: "Average build time, idea to production" },
  { value: 75, suffix: "%", label: "Reduction in manual task time" },
  { value: 24, suffix: "/7", label: "System uptime, monitored and maintained" },
];

export const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "Any business with manual processes that need to die. Law firms, medical practices, agencies, e-commerce, professional services. If your team does repetitive work, we can probably automate it.",
  },
  {
    question: "How much does this cost?",
    answer:
      "Every project is different, so we scope and price everything after a discovery call. No surprises, no hidden fees. Apply to work with us and we'll walk you through it.",
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
