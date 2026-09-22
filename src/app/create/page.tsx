import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GreetingForm } from "@/components/GreetingForm";

export default function CreatePage() {
  return (
    <main className="create-shell">
      <div className="create-orb orb-one" />
      <div className="create-orb orb-two" />
      <header className="create-header content-width">
        <Link href="/" className="back-link"><ArrowLeft size={15} /> back home</Link>
        <span className="brand-mark"><span className="brand-dot" /> little things</span>
        <span className="step-label">your keepsake · 01</span>
      </header>
      <section className="create-intro content-width">
        <p className="eyebrow">a gift made of little things</p>
        <h1>Let&apos;s make something<br /><em>they&apos;ll remember.</em></h1>
        <p>Start with the essentials. You can always add more memories and photos when your scrapbook has its own little home.</p>
      </section>
      <GreetingForm />
    </main>
  );
}
