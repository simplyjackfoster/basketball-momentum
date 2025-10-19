import { motion } from "framer-motion";
import { Flame, Github, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
      <div className="space-y-3">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold">
          <Flame className="h-8 w-8 text-primary" />
          About HoopFlow
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          HoopFlow is a momentum-first lens on college basketball. Powered entirely by public NCAA data, the experience layers win streak insights, scoring trends, and play-by-play storytelling into a single immersive dashboard.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-6">
          <h2 className="text-lg font-semibold">How it works</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• React + Vite + TypeScript frontend styled with Tailwind and motion sprinkled in.</li>
            <li>• Data cached client-side via React Query with resilient retry states.</li>
            <li>• Momentum score blends win streaks and scoring differential from the last five outings.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-6">
          <h2 className="text-lg font-semibold">Open data</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            HoopFlow taps into the community-driven <a href="https://ncaa-api.henrygd.me/openapi" className="text-primary underline">ncaa-api.henrygd.me</a> project. No proprietary feeds, no paywalls—just clean, transparent hoops information.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <a href="https://ncaa-api.henrygd.me" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 hocus:border-primary">
          <Globe className="h-4 w-4" /> API Reference
        </a>
        <a href="https://github.com/henrygd/ncaa-api" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 hocus:border-primary">
          <Github className="h-4 w-4" /> Source Repo
        </a>
      </div>
    </motion.section>
  );
}
