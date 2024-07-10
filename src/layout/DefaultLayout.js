import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppSidebar, AppFooter, AppHeader } from '../components/index';
import ManageTestPage from '../views/test/TestPage';
import UserList from '../views/manage-user/UserList';
import Dashboard from '../views/dashboard/Dashboard';
import AddTestPage from '../views/test/AddTestPage';
import DetailTestPage from '../views/test/DetailTestPage';
import EditExam from '../views/test/EditTestPage';
import QuizView from '../views/quiz/Quizview';
import AddQuestion from '../views/manage-question/AddQuestion';
import UserProfile from '../views/pages/Profile';
import ChangePassword from '../views/pages/ChangePassword';
import StatisticsChart from '../views/dashboard/MainChart';
import UserHistoryPage from '../views/quiz/UserHistory';
const DefaultLayout = ({ handleLogout }) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader handleLogout={handleLogout} />
        <div className="body flex-grow-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/management/users" element={<UserList />} />
            <Route path="/test" element={<ManageTestPage />} />
            <Route path="/my-tests" element={<ManageTestPage />} />
            <Route path="/test/create" element={<AddTestPage />} />
            <Route path="/test/detail/:id" element={<DetailTestPage />} />
            <Route path="/test/edit/:id" element={<EditExam />} />
            <Route path="/quiz/view/:id" element={<QuizView />} />
            <Route path="/quiz/create/:id" element={<AddQuestion />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/statistic" element={<StatisticsChart />} />
            <Route path="/user-history" element={<UserHistoryPage />} />
          </Routes>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
