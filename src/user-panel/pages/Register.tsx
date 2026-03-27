import React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthPage } from '../components/auth/AuthPage';

export const Register: React.FC = () => {
  const location = useLocation();
  const state = location.state ?? {};
  const returnTo: string = (state as any)?.returnTo || '/dashboard';

  return (
    <AuthPage
      initialMode="register"
      returnTo={returnTo}
      locationState={state as Record<string, unknown>}
    />
  );
};
