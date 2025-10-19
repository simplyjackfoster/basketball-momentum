import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Flame, Home, Info, LineChart, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/games", label: "Games", icon: LineChart },
  { to: "/about", label: "About", icon: Info }
];

export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        className="border-b border-border/60"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 font-display text-xl font-semibold">
            <Flame className="h-6 w-6 text-primary" />
            HoopFlow
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium transition-colors duration-150 hocus:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hocus:border-primary hocus:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden md:inline">{theme === "dark" ? "Light" : "Dark"} mode</span>
          </button>
        </div>
      </motion.header>
      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-6xl px-4 py-6 md:px-6">{children}</main>
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Built with ❤️ for college hoops fans. Data from the NCAA open API.
      </footer>
    </div>
  );
}
