import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useExpenseStore } from "@/store/useExpenseStore";

// Pages
import Dashboard from "@/pages/Dashboard";
import Groups from "@/pages/Groups";
import GroupDetails from "@/pages/GroupDetails";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
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
        <Toaster position="top-right" />
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
              <Dashboard />
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
