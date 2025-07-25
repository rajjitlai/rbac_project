import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";

import Register from "./pages/Register";
import AdminPanel from "./pages/admin/AdminPanel";
import Dashboard from "./pages/admin/Dashboard";
import PublicRoute from "./components/PublicRoute";
import Shopping from "./components/Shopping";
import Todo from "./components/Todo";
import RoleRedirect from "./components/RoleRedirect";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route
            path="/admin-panel"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/shopping"
            element={
              <PrivateRoute>
                <Shopping />
              </PrivateRoute>
            }
          />
          <Route path="/todo"
            element={
              <PrivateRoute>
                <Todo />
              </PrivateRoute>
            } />
          <Route path="/" element={
            <PrivateRoute>
              <RoleRedirect />
            </PrivateRoute>
          }/>        
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App