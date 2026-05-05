/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { logger } from '@/src/utils/logger';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalLoading from './components/GlobalLoading';
import { Toaster } from 'sonner';
import CommandPalette from './components/CommandPalette';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/Dashboard';
import LearningPath from './pages/student/LearningPath';
import ReviewCenter from './pages/student/ReviewCenter';
import AdminDashboard from './pages/admin/Dashboard';
import VocabularyManager from './pages/admin/VocabularyManager';
import CategoryManager from './pages/admin/CategoryManager';
import LessonManager from './pages/admin/LessonManager';
import HanziManager from './pages/admin/HanziManager';
import QuizManager from './pages/admin/QuizManager';
import ChallengeManager from './pages/admin/ChallengeManager';
import DocumentManager from './pages/admin/DocumentManager';
import RadicalManager from './pages/admin/RadicalManager';
import StudentManager from './pages/admin/StudentManager';
import UserDetails from './pages/admin/UserDetails';
import LogManager from './pages/admin/LogManager';
import MediaManager from './pages/admin/MediaManager';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import VocabularyPage from './pages/student/Vocabulary';
import StudentLessonDetail from './pages/student/LessonDetail';
import LessonReview from './pages/student/LessonReview';
import HistoryPage from './pages/student/History';
import ProfilePage from './pages/student/Profile';
import ImportJobManager from './pages/admin/ImportJobManager';
import NotFoundPage from './pages/NotFound';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'student' | 'admin' }> = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <GlobalLoading message="Đang xác thực quyền truy cập..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Luôn đợi đến khi object user có dữ liệu
  if (!user) {
    return <GlobalLoading message="Đang tải hồ sơ cá nhân..." />;
  }

  // Kiểm tra quyền (Role) - Chấp nhận cả role hoặc roles (mảng)
  const userRole = (user.role || '').toLowerCase();
  
  if (role && userRole !== role.toLowerCase()) {
    logger.warn(`Truy cập bị từ chối: Cần ${role}, tài khoản hiện tại là ${userRole}`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="learning" element={<LearningPath />} />
        <Route path="review" element={<ReviewCenter />} />
        <Route path="lessons/:id" element={<StudentLessonDetail />} />
        <Route path="lessons/:id/review" element={<LessonReview />} />
        <Route path="vocabulary" element={<VocabularyPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="jobs" element={<ImportJobManager />} />
        <Route path="vocabularies" element={<VocabularyManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="lessons" element={<LessonManager />} />
        <Route path="lessons/:lessonId/hanzi" element={<HanziManager />} />
        <Route path="lessons/:lessonId/quizzes" element={<QuizManager />} />
        <Route path="lessons/:lessonId/challenge" element={<ChallengeManager />} />
        <Route path="documents" element={<DocumentManager />} />
        <Route path="media" element={<MediaManager />} />
        <Route path="radicals" element={<RadicalManager />} />
        <Route path="students" element={<StudentManager />} />
        <Route path="students/:id" element={<UserDetails />} />
        <Route path="logs" element={<LogManager />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors closeButton />
      <Router>
        <AuthProvider>
          <CommandPalette />
          <AppRoutes />
        </AuthProvider>
      </Router>
    </Provider>
  );
}
