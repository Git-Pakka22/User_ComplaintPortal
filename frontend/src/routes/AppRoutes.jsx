import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Complaints from "../pages/Complaints";
import NewComplaint from "../pages/NewComplaint";
import ComplaintTask from "../pages/ComplaintTask";
import ImportComplaints from "../pages/ImportComplaints";
import ComplaintDetail from "../pages/ComplaintDetail";
import AccountDetail from "../pages/AccountDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import Workflows from "../pages/Workflows";
import WorkflowEditor from "../pages/WorkflowEditor";
import ComplaintTaskDetail from "../pages/ComplaintTaskDetail";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-complaint"
          element={
            <ProtectedRoute>
              <NewComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint-task"
          element={
            <ProtectedRoute>
              <ComplaintTask />
            </ProtectedRoute>
          }
        />
        <Route
         path="/complaint-task/:id" 
        element={<ComplaintTaskDetail />} 
        />
        <Route
          path="/import-complaints"
          element={
            <ProtectedRoute>
              <ImportComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/:id"
          element={
            <ProtectedRoute>
              <AccountDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows"
          element={
            <ProtectedRoute>
              <Workflows />
            </ProtectedRoute>
              }
              />
        <Route
        path="/workflows/new"
        element={
          <ProtectedRoute>
            <WorkflowEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workflows/:id"
        element={
          <ProtectedRoute>
            <WorkflowEditor />
          </ProtectedRoute>
        }
      />
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default AppRoutes;