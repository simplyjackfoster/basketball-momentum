import { MomentumLeaderboard } from "../features/hot-teams/components/MomentumLeaderboard";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <MomentumLeaderboard />
    </motion.div>
  );
}
