/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import FileManager from './pages/admin/FileManager';
import SystemSettings from './pages/admin/SystemSettings';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import StudentLessons from './pages/student/Lessons';
import StudentLessonDetail from './pages/student/LessonDetail';
import StudentQuiz from './pages/student/Quiz';
import VocabularyPage from './pages/student/Vocabulary';
import HistoryPage from './pages/student/History';
import ProfilePage from './pages/student/Profile';
import AdminImportPage from './pages/admin/ImportData';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'student' | 'admin' }> = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Các Tuyến Đường Công Khai (Public Routes) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Các Tuyến Đường Cho Học Viên (Student Routes) */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="lessons" element={<StudentLessons />} />
          <Route path="lessons/:id" element={<StudentLessonDetail />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route path="quiz/:id" element={<StudentQuiz />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="progress" element={<div className="p-8 text-center text-slate-500 italic">Tính năng tiến độ đang được phát triển...</div>} />
        </Route>

        {/* Các Tuyến Đường Cho Quản Trị Viên (Admin Routes) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div className="p-8 text-center text-slate-500 italic">Quản lý người dùng đang được phát triển...</div>} />
          <Route path="lessons" element={<div className="p-8 text-center text-slate-500 italic">Quản lý bài học đang được phát triển...</div>} />
          <Route path="hanzi" element={<div className="p-8 text-center text-slate-500 italic">Quản lý hán tự đang được phát triển...</div>} />
          <Route path="import" element={<AdminImportPage />} />
          <Route path="files" element={<FileManager />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* Chuyển hướng dự phòng (Fallback Route) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}


