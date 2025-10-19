import { motion } from "framer-motion";

export function PageLoader({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-primary/40 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
      />
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
