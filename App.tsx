import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import { UserProvider, useUser } from './context/UserContext';

function AppContent() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');

  if (user?.isLoggedIn) {
    return <DashboardPage />;
  }

  return currentPage === 'login' ? (
    <LoginPage onNavigateToSignup={() => setCurrentPage('signup')} />
  ) : (
    <SignupPage onNavigateToLogin={() => setCurrentPage('login')} />
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;