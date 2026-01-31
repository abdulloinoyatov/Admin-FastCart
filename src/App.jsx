import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  let token = localStorage.getItem("token")
  const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth/sign-in" replace />;
};

  return (
    <Routes>
      <Route
  path="/dashboard/*"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to={token ? "/dashboard/home" : "/auth/sign-up"} replace />} />
    </Routes>
  );
}

export default App;
