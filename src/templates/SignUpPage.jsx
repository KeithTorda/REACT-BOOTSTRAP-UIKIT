import AuthLayout from '../layouts/AuthLayout';
import { RegisterCard } from '../components/auth';
import { SocialButton } from '../components/buttons';

/** TEMPLATE — Complete registration screen (centered shell). */
export default function SignUpPage() {
  return (
    <AuthLayout variant="centered">
      <RegisterCard
        brand="Admin UI Kit"
        footer={
          <>
            <div className="d-flex align-items-center gap-2 my-3">
              <hr className="flex-grow-1 m-0" /><span className="uikit-helper mt-0">or</span><hr className="flex-grow-1 m-0" />
            </div>
            <SocialButton brand="google" block />
            <div className="mt-3">Already registered? <a href="#login">Sign in</a></div>
          </>
        }
      />
    </AuthLayout>
  );
}
