// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemDetail from "./pages/ProblemDetail";

import SubmissionPage from "./pages/SubmissionPage";
import SubmissionsList from "./pages/SubmissionsList";
import SubmissionView from "./pages/SubmissionView";

import ProfilePage from "./pages/ProfilePage";
import RankingPage from "./pages/RankingPage";
import UserPublicProfile from "./pages/UserPublicProfile";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Layout wrapper */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />

              {/* submissions */}
              <Route
                path="/problem/:id/submission"
                element={<SubmissionPage />}
              />
              <Route path="/submission/:id" element={<SubmissionView />} />
              <Route
                path="/submissions/:id"
                element={<SubmissionsList />}
              />

              {/* Profile (self) */}
              <Route path="/profile" element={<ProfilePage />} />

              {/* Ranking */}
              <Route path="/ranking" element={<RankingPage />} />

              {/* Public user profile */}
              <Route path="/user/:id" element={<UserPublicProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
