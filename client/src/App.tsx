import { Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Groups from "@/pages/Groups";
import GroupDetails from "@/pages/GroupDetails";
import Analytics from "@/pages/Analytics";
import AppLayout from "@/components/layout/AppLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useExpenseStore } from "@/store/useExpenseStore";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return isAuthenticated ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
}

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { fetchGroups, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGroups();
      fetchExpenses();
    }
  }, [isAuthenticated, fetchGroups, fetchExpenses]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/groups" element={
            <PrivateRoute>
              <Groups />
            </PrivateRoute>
          } />

          <Route path="/groups/:id" element={
            <PrivateRoute>
              <GroupDetails />
            </PrivateRoute>
          } />

          <Route path="/expenses" element={
            <PrivateRoute>
              <Dashboard /> {/* Placeholder - reusing dashboard for now or create specific list if needed */}
            </PrivateRoute>
          } />

          <Route path="/analytics" element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;