"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { Accordion } from "@/components/ui/Accordion";

const TERMS = [
  {
    title: "Payment Terms",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        50% payment required upfront before work begins. Remaining 50% due upon
        project completion. Payment methods: Bank transfer, PayPal, or agreed
        alternative.
      </p>
    ),
  },
  {
    title: "Revision Policy",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Up to 2 rounds of revisions included at no extra cost. Additional
        revisions will be charged at hourly rate. Revisions must be requested
        within 7 days of delivery.
      </p>
    ),
  },
  {
    title: "Cancellation Policy",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Work may be cancelled with 48 hours notice. Full refund of unused
        balance if cancelled before work completion. Any completed work will be
        charged at pro-rated rate.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Full rights to deliverables transfer to client upon final payment.
        Creator retains right to use work for portfolio/reel purposes unless
        otherwise agreed in writing.
      </p>
    ),
  },
  {
    title: "Communication",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Response time: Within 24-48 hours during business days. Clear and timely
        communication is essential for project success. Regular check-ins via
        Discord or email.
      </p>
    ),
  },
  {
    title: "Delivery Timeframe",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Standard turnaround: 3-5 business days per revision round. Rush delivery
        available upon request (additional fees apply). Timelines begin after
        receipt of all materials.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-10">
        <div className="flex-1 w-full max-w-2xl">
          <div className="flex items-center mb-6 sm:mb-9">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-white/[0.07] bg-white/4 text-[#64748B] text-sm no-underline transition-all duration-220 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
            >
              <FaArrowLeft className="text-sm" />
              <span>Back</span>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-[36px] font-bold text-slate-100 tracking-tight font-serif mb-2">
              Terms & Conditions
            </h1>
            <p className="text-base text-slate-500">
              {TERMS.length} policies
            </p>
          </div>

          <Accordion items={TERMS} />

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm no-underline transition-all duration-220 hover:bg-purple-500/20"
            >
              <FaTools className="text-sm" />
              <span>Services</span>
            </Link>
          </div>
        </div>

        <footer className="w-full max-w-2xl py-6 text-center">
          <p className="text-[11.5px] text-slate-600">
            Made with <span style={{ color: "#F472B6" }}>♥</span> ·{" "}
            <span style={{ color: "#F472B6" }}>Obume.hq</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
