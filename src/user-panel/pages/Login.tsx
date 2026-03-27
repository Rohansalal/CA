import React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthPage } from '../components/auth/AuthPage';

export const Login: React.FC = () => {
  const location = useLocation();
  const state = location.state ?? {};
  const returnTo: string = (state as any)?.returnTo || '/dashboard';

  return (
    <AuthPage
      initialMode="login"
      returnTo={returnTo}
      locationState={state as Record<string, unknown>}
    />
  );
};
