"use client";

import React from "react";

import {
  Cloud,
  Code2,
  Compass,
  DatabaseBackup,
  Headset,
  LayoutGrid,
  Network,
  Phone,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import ServiceGridCard from "./ServiceGridCard";

const iconProps = { color: "url(#brand-gradient)", size: 44, strokeWidth: 1.5 };

const serviceGridData = [
  {
    icon: <Server {...iconProps} />,
    title: "Managed IT Services",
    tags: ["24/7 Monitoring", "Proactive Maintenance", "Help Desk"],
    description:
      "End-to-end management of your entire IT infrastructure — proactive monitoring, maintenance, and rapid issue resolution.",
    css: "animate-delay-300",
  },
  {
    icon: <ShieldCheck {...iconProps} />,
    title: "Cybersecurity & Compliance",
    tags: ["SOC 2 Ready", "PIPEDA Compliant", "Threat Detection"],
    description:
      "SOC 2 audits, PIPEDA compliance, HIPAA readiness, threat detection, and email security tailored for regulated industries and data-sensitive organizations.",
    css: "animate-delay-500",
  },
  {
    icon: <Cloud {...iconProps} />,
    title: "Cloud & SaaS Integration",
    tags: ["Microsoft 365", "Multi-cloud", "Migration"],
    description:
      "Seamless cloud migrations, Microsoft 365 deployments, and multi-cloud strategy for growth-stage companies.",
    css: "animate-delay-700",
  },
  {
    icon: <DatabaseBackup {...iconProps} />,
    title: "Backup & Business Continuity",
    tags: ["Automated Backup", "99.9% Uptime", "DR Testing"],
    description:
      "Automated backups with 99.9% recovery guarantee. Never lose client data or accounting records again.",
    css: "animate-delay-1000",
  },
  {
    icon: <Network {...iconProps} />,
    title: "Network & Infrastructure",
    tags: ["Secure Networks", "Remote Ready", "Scalable"],
    description:
      "Secure, scalable networks built for remote teams, high bandwidth demands, and growth without downtime.",
    css: "animate-delay-300",
  },
  {
    icon: <LayoutGrid {...iconProps} />,
    title: "Business Apps & Integration",
    tags: ["Accounting Software", "ERP Systems", "API Integration"],
    description:
      "QuickBooks, Sage, Xero, CRM, ERP, and custom automation for businesses across finance, healthcare, retail, and operations.",
    css: "animate-delay-500",
  },
  {
    icon: <Phone {...iconProps} />,
    title: "Unified Communications & VoIP",
    tags: ["25% Savings", "Unlimited Minutes", "Video Conference"],
    description:
      "Professional phone systems with 25% cost savings. Unlimited US & Canada minutes, video conferencing, and collaboration tools for distributed teams.",
    css: "animate-delay-700",
  },
  {
    icon: <Compass {...iconProps} />,
    title: "IT Strategy & vCIO",
    tags: ["vCIO Services", "Tech Roadmap", "Vendor Mgmt"],
    description:
      "Strategic planning aligned with your growth. Vendor management, roadmapping, and technology decisions that scale.",
    css: "animate-delay-1000",
  },
  {
    icon: <Headset {...iconProps} />,
    title: "Expert Help Desk",
    tags: ["24/7 Support", "Remote Help", "Fast Response"],
    description:
      "Fast, knowledgeable support for your team—via phone, email, or chat. Avg response time: under 30 minutes.",
    css: "animate-delay-300",
  },
  {
    icon: <Code2 {...iconProps} />,
    title: "Custom Development",
    tags: ["Custom Code", "API Development", "Workflow Automation"],
    description:
      "Bespoke software solutions, API development, and integration workflows tailored to your specific business needs.",
    css: "animate-delay-500",
  },
  {
    icon: <Sparkles {...iconProps} />,
    title: "AI Solutions as a Service",
    tags: ["Intelligent Automation", "Secure & Compliant", "Custom Integration"],
    description:
      "Put artificial intelligence to work without the guesswork. We design, deploy, and manage practical AI — from intelligent automation and document processing to AI-powered support, analytics, and workflow copilots — tailored to how your firm actually operates. You get measurable efficiency gains and a partner who handles security, compliance, and integration end to end, so you capture the upside of AI without the risk, the hiring, or the hype.",
    css: "animate-delay-700",
  },
];

const ServiceGrid = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          What We Do
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Full-Spectrum IT Management. One partner. Every layer of your
          technology stack — from hardware to cloud to security.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {serviceGridData.map((data, index) => (
          <ServiceGridCard
            key={index}
            icon={data.icon}
            title={data.title}
            tags={data.tags}
            description={data.description}
            hoverFill
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
