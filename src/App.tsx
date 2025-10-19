import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PageLoader } from "./components/ui/PageLoader";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const GameFlowPage = lazy(() => import("./pages/GameFlowPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader message="Loading HoopFlow experience..." />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/games" element={<GameFlowPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
