"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle, Plus, X } from "lucide-react";

const flowers = ["Gerbera", "Rose", "Tulip", "Wildflower"];

export function GreetingForm() {
  const [compliments, setCompliments] = useState(["You make ordinary days feel golden."]);
  const [submitted, setSubmitted] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function addCompliment() {
    if (compliments.length < 6) setCompliments([...compliments, ""]);
  }

  function updateCompliment(index: number, value: string) {
    setCompliments(compliments.map((item, itemIndex) => itemIndex === index ? value : item));
  }

  function removeCompliment(index: number) {
    setCompliments(compliments.filter((_, itemIndex) => itemIndex !== index));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      recipientName: String(form.get("recipientName") ?? ""),
      dateText: String(form.get("dateText") ?? ""),
      introMessage: String(form.get("introMessage") ?? ""),
      letterPage1: String(form.get("letterPage1") ?? ""),
      letterPage2: String(form.get("letterPage2") ?? ""),
      flowerType: String(form.get("flowerType") ?? "Gerbera"),
      compliments: compliments.filter(Boolean),
    };

    try {
      const response = await fetch("/api/greetings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Something went wrong.");
      setCreatedSlug(result.slug);
      setSubmitted(true);
      window.history.replaceState(null, "", `/create?created=${result.slug}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="success-card content-width">
        <div className="success-icon"><Check size={23} /></div>
        <p className="eyebrow">it&apos;s ready</p>
        <h2>Your little corner is waiting.</h2>
        <p>Share the link below when you&apos;re ready to make someone&apos;s day.</p>
        <div className="created-link">{window.location.origin}/<strong>{createdSlug}</strong></div>
        <div className="success-actions"><Link href={`/${createdSlug}`} className="button button-dark">Preview the scrapbook <ArrowUpRight size={17} /></Link><button onClick={() => setSubmitted(false)} className="text-link">make another one →</button></div>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit} className="builder-form content-width">
      <div className="form-grid">
        <div className="form-section form-section-wide">
          <div className="form-section-heading"><span>01</span><div><h2>Start with their name</h2><p>The first thing they&apos;ll see.</p></div></div>
          <label>Recipient&apos;s name<input name="recipientName" placeholder="e.g. Sarah" required /></label>
          <label>Birthday note<input name="dateText" placeholder="e.g. September 23, 2026" required /></label>
          <label>One-line introduction<input name="introMessage" placeholder="A little corner of the internet, made just for you." /></label>
        </div>
        <div className="form-section">
          <div className="form-section-heading"><span>02</span><div><h2>Pick a flower</h2><p>A small symbol of your love.</p></div></div>
          <div className="flower-picker">{flowers.map((flower) => <label key={flower} className="flower-option"><input type="radio" name="flowerType" value={flower} defaultChecked={flower === "Gerbera"} /><span className={`flower-mini flower-${flower.toLowerCase()}`}>{flower === "Gerbera" ? "✿" : flower === "Rose" ? "✿" : flower === "Tulip" ? "❀" : "✽"}</span><small>{flower}</small></label>)}</div>
        </div>
        <div className="form-section form-section-wide letter-builder">
          <div className="form-section-heading"><span>03</span><div><h2>Write from the heart</h2><p>Two pages are waiting for your words.</p></div></div>
          <div className="letter-inputs"><label>page one<textarea name="letterPage1" placeholder="Tell them what makes them wonderful..." required /></label><label>page two<textarea name="letterPage2" placeholder="A wish for their year ahead..." /></label></div>
        </div>
        <div className="form-section form-section-wide">
          <div className="form-section-heading"><span>04</span><div><h2>Little reminders</h2><p>Add up to six things you love about them.</p></div></div>
          <div className="compliments-list">{compliments.map((compliment, index) => <div className="compliment-input" key={index}><span>✦</span><input value={compliment} onChange={(event) => updateCompliment(index, event.target.value)} placeholder="They are..." aria-label={`Compliment ${index + 1}`} />{compliments.length > 1 && <button type="button" onClick={() => removeCompliment(index)} aria-label="Remove compliment"><X size={15} /></button>}</div>)}</div>
          {compliments.length < 6 && <button type="button" onClick={addCompliment} className="add-compliment"><Plus size={15} /> add another little thing</button>}
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-submit"><p>Photos can be added later in <code>public/assets</code>.</p><button className="button button-dark" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={17} /> saving...</> : <>Create their scrapbook <ArrowUpRight size={17} /></>}</button></div>
    </form>
  );
}
