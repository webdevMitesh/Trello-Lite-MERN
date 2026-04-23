import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;