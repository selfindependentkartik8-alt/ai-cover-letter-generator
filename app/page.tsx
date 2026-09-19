"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!resume.trim()) {
      alert("Please add your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please add the job description.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate cover letter."
        );
      }

      const generatedLetter =
        data.result || data.coverLetter || data.text;

      if (!generatedLetter) {
        throw new Error("AI returned an empty response.");
      }

      setResult(generatedLetter);

      setTimeout(() => {
        document
          .getElementById("cover-letter-result")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error("Cover Letter Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to generate cover letter."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      alert("Cover letter copied!");
    } catch {
      alert("Unable to copy the cover letter.");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-violet-950 via-violet-950/55 to-black text-white">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-violet-400/15 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[55%] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[140px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-violet-400/10 bg-zinc-950/70 px-4 py-4 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-400/20 bg-white/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>

          </div>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-violet-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-violet-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-violet-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-violet-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-violet-400 px-5 py-2 font-medium text-black shadow-lg shadow-violet-400/20 transition hover:bg-violet-300"
            >
              Follow
            </a>

          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-300 transition hover:bg-violet-400/20 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="relative z-30 mx-4 mt-2 rounded-3xl border border-violet-400/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-1">

            {[
              ["#home", "Home"],
              ["#features", "Features"],
              ["#how", "How To Use"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-violet-400/10 hover:text-violet-300"
              >
                {label}
              </a>
            ))}

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-violet-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-violet-300"
            >
              Follow
            </a>

          </div>

        </div>
      )}

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs text-violet-200">
          ✨ AI-Powered Cover Letter Generator
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-violet-400">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Write A Better

          <br />

          <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Cover Letter With AI.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Create a personalized, job-specific cover letter in seconds.
          Let AI turn your experience and the job requirements into a
          professional application.
        </p>

        {/* PILLS */}

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            🎯 Job-Specific
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            ✍️ Personalized
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            ⚡ Instant Generation
          </span>

        </div>

        {/* GENERATOR */}

        <div
          id="generator"
          className="mt-12 w-full max-w-4xl"
        >

          <div className="w-full rounded-[2rem] border border-violet-400/10 bg-zinc-950/60 p-4 text-left shadow-2xl shadow-violet-950/30 backdrop-blur-2xl sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              AI Cover Letter Generator
            </p>

            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Let's create your cover letter.
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Add your resume and the job description you're applying for.
            </p>

            <div className="mt-7 space-y-5">

              {/* RESUME */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Your Resume
                </label>

                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume content here..."
                  rows={10}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10 sm:px-5"
                />

              </div>

              {/* JOB DESCRIPTION */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Target Job Description
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description you're applying for..."
                  rows={8}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10 sm:px-5"
                />

              </div>

              {/* TONE */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Cover Letter Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="box-border block h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10"
                >
                  <option>Professional</option>
                  <option>Confident</option>
                  <option>Friendly</option>
                  <option>Concise</option>
                </select>

              </div>

              {/* BUTTON */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-violet-400 px-5 text-sm font-semibold text-black shadow-xl shadow-violet-400/20 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "🧠 Creating Your Cover Letter..."
                  : "✨ Generate Cover Letter"}
              </button>

            </div>

            {/* RESULT */}

            {result && (
              <div
                id="cover-letter-result"
                className="mt-8 rounded-3xl border border-violet-400/10 bg-black/40 p-5 sm:p-7"
              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                      AI Generated Result
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      Your Cover Letter
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={copyResult}
                    className="rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-300 transition hover:bg-violet-400/20"
                  >
                    📋 Copy
                  </button>

                </div>

                <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-white/5 bg-zinc-950/60 p-5 text-sm leading-8 text-zinc-300">
                  {result}
                </div>

              </div>
            )}

            <p className="mt-4 text-xs text-zinc-600">
              AI-generated content should be reviewed and personalized before
              submitting your application.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            What You Get
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            A cover letter made for the job.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Turn your experience into a polished application that feels
            relevant, professional and personalized.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="🎯"
            title="Job-Specific"
            description="Generate a cover letter tailored to the exact role and requirements you're applying for."
          />

          <FeatureCard
            icon="✍️"
            title="Personalized"
            description="Use your real experience, projects and skills to create a more authentic application."
          />

          <FeatureCard
            icon="⚡"
            title="Instant Generation"
            description="Save time by generating a complete first draft in seconds."
          />

          <FeatureCard
            icon="🎨"
            title="Multiple Tones"
            description="Choose a tone that fits your application, from professional to confident and friendly."
          />

          <FeatureCard
            icon="🧠"
            title="AI-Powered"
            description="AI connects your background with the requirements of the target position."
          />

          <FeatureCard
            icon="📋"
            title="Easy To Copy"
            description="Copy the generated cover letter instantly and personalize it before applying."
          />

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Create a personalized cover letter without starting from scratch.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Add Your Resume"
            description="Paste your resume so AI can understand your experience, projects and skills."
          />

          <StepCard
            number="02"
            title="Add Job Description"
            description="Paste the job description for the position you're applying for."
          />

          <StepCard
            number="03"
            title="Generate With AI"
            description="Choose your tone and generate a personalized cover letter ready for editing."
          />

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="What does the AI use to write my cover letter?"
            answer="It uses the information you provide in your resume and the target job description to create a personalized first draft."
          />

          <Faq
            question="Can I customize the tone?"
            answer="Yes. You can choose from different tones such as Professional, Confident, Friendly and Concise."
          />

          <Faq
            question="Will the AI invent experience?"
            answer="The generator should use only the information you provide. Always review the generated letter and remove or correct anything inaccurate."
          />

          <Faq
            question="Can I edit the generated cover letter?"
            answer="Yes. The generated letter is a starting point that you can copy, edit and personalize before submitting your application."
          />

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-8">

        <div className="rounded-[2rem] border border-violet-400/10 bg-violet-950/20 px-5 py-14 text-center shadow-2xl shadow-violet-950/30 backdrop-blur-xl sm:px-12">

          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-violet-400/20 bg-white/5">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Make your next application stronger.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Turn your resume and target job description into a personalized
            cover letter with AI.
          </p>

          <a
            href="#generator"
            className="mt-8 inline-flex rounded-xl bg-violet-400 px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-violet-400/20 transition hover:bg-violet-300"
          >
            ✨ Create Cover Letter
          </a>

        </div>

      </section>
{/* FOOTER MAIN */}

<div className="border-t border-white/5 pt-8">

  <div className="flex flex-col items-center justify-between gap-7 sm:flex-row">

    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-violet-400/20 bg-white/5">

        <img
          src="/logo.png"
          alt="KrishAIWorks"
          className="h-full w-full rounded-full object-cover"
        />

      </div>

      <div>

        <p className="font-semibold text-white">
          KrishAIWorks
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          AI Solutions That Work
        </p>

      </div>

    </div>

    {/* LEGAL LINKS + COPYRIGHT */}

    <div className="flex flex-col items-center gap-3 sm:items-end">

      <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-600">

        <a
          href="https://krishaiworks.com/privacy-policy"
          className="transition hover:text-violet-300"
        >
          Privacy Policy
        </a>

        <a
          href="https://krishaiworks.com/terms-and-conditions"
          className="transition hover:text-violet-300"
        >
          Terms & Conditions
        </a>

      </div>

      <p className="text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} KrishAIWorks. Built with AI.
      </p>

    </div>

  </div>

</div>

    </main>
  );
}

/* FEATURE CARD */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">

      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/10 bg-violet-400/10 text-xl transition group-hover:bg-violet-400/15">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* STEP CARD */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-zinc-950/40 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/20">

      <span className="text-sm font-bold text-violet-400">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* FAQ */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/5 bg-zinc-950/40 p-5 backdrop-blur-xl transition hover:border-violet-400/15">

      <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200 sm:text-base">

        <div className="flex items-center justify-between gap-4">

          <span>{question}</span>

          <span className="text-xl text-violet-400 transition group-open:rotate-45">
            +
          </span>

        </div>

      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}