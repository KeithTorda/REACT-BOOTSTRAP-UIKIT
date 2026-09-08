import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { LoginCard } from '../components/auth';
import { SocialButton } from '../components/buttons';

/** TEMPLATE — Complete sign-in screen (split-screen shell). */
export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      variant="split"
      brand="Admin UI Kit"
      headline="Welcome back"
      tagline="Sign in to pick up where you left off."
    >
      <LoginCard
        brand="Admin UI Kit"
        loading={loading}
        onSubmit={() => { setLoading(true); window.setTimeout(() => setLoading(false), 900); }}
        footer={
          <>
            <div className="d-flex align-items-center gap-2 my-3">
              <hr className="flex-grow-1 m-0" /><span className="uikit-helper mt-0">or</span><hr className="flex-grow-1 m-0" />
            </div>
            <div className="d-flex flex-column gap-2">
              <SocialButton brand="google" block />
              <SocialButton brand="microsoft" block />
            </div>
            <div className="mt-3">No account? <a href="#register">Create one</a></div>
          </>
        }
      />
    </AuthLayout>
  );
}
