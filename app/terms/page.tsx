"use client";

import Link from "next/link";
import { FaTools } from "react-icons/fa";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion } from "@/components/ui/Accordion";

const TERMS = [
  {
    title: "Payment Terms",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        50% payment required upfront before work begins. Remaining 50% due upon
        project completion. Payment methods: Bank transfer, PayPal, or agreed alternative.
      </p>
    ),
  },
  {
    title: "Revision Policy",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Up to 2 rounds of revisions included at no extra cost. Additional revisions
        will be charged at hourly rate. Revisions must be requested within 7 days of delivery.
      </p>
    ),
  },
  {
    title: "Cancellation Policy",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Work may be cancelled with 48 hours notice. Full refund of unused balance if
        cancelled before work completion. Any completed work will be charged at pro-rated rate.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Full rights to deliverables transfer to client upon final payment. Creator
        retains right to use work for portfolio/reel purposes unless otherwise agreed in writing.
      </p>
    ),
  },
  {
    title: "Communication",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Response time: Within 24-48 hours during business days. Clear and timely
        communication is essential for project success. Regular check-ins via Discord or email.
      </p>
    ),
  },
  {
    title: "Delivery Timeframe",
    content: (
      <p className="text-[13px] text-slate-400 leading-relaxed">
        Standard turnaround: 3-5 business days per revision round. Rush delivery
        available upon request (additional fees apply). Timelines begin after receipt of all materials.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 md:px-6 py-24 md:py-10">
      <div className="flex-1 w-full max-w-2xl">
        <Header title="Terms" backHref="/" subtitle={`${TERMS.length} policies`} />

        <Accordion items={TERMS} />

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[14px] border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[14px] md:text-[13px] no-underline transition-all duration-220 hover:bg-purple-500/20"
          >
            <FaTools className="text-[11px]" />
            <span>Services</span>
          </Link>
        </div>
      </div>

      <Footer className="max-w-2xl" />
    </div>
  );
}
