import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { LoginCard, RegisterCard, ForgotPasswordCard } from '@kit/components/auth';
import { ResetPasswordCard, OTPVerifyCard, LockScreenCard } from '@kit/components/auth';
import AuthLayout from '@kit/layouts/AuthLayout';
import { Card } from '@kit/components/cards';
import { SocialButton } from '@kit/components/buttons';

export default function AuthShowcase() {
  return (
    <ContentWrapper
      title="Authentication"
      subtitle="Presentational auth cards — they emit values via onSubmit and contain no auth logic"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Authentication' }]}
    >
      <ShowcaseSection
        title="Auth Cards"
        description="Drop any of these inside AuthLayout for a full sign-in screen."
        variants={['login', 'register', 'forgot password']}
        code={`<AuthLayout>\n  <LoginCard\n    brand="Admin UI Kit"\n    onSubmit={values => console.log(values)}\n    loading={submitting}\n    error={{ email: 'Unknown address' }}\n    footer={<>No account? <a href="/register">Create one</a></>}\n  />\n</AuthLayout>`}
        props={[
          { name: 'onSubmit', type: 'func', description: 'Receives the form values object.' },
          { name: 'loading', type: 'bool', default: 'false', description: 'Spinner on the submit button.' },
          { name: 'error', type: 'object', description: 'Per-field error messages.' },
          { name: 'footer', type: 'node', description: 'Links below the form.' },
        ]}
        muted
      >
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-xl-4 d-flex justify-content-center">
            <LoginCard footer={<>No account? <a href="#register">Create one</a></>} />
          </div>
          <div className="col-md-6 col-xl-4 d-flex justify-content-center">
            <RegisterCard footer={<>Already registered? <a href="#login">Sign in</a></>} />
          </div>
          <div className="col-md-6 col-xl-4 d-flex justify-content-center">
            <ForgotPasswordCard footer={<><a href="#login">Back to sign in</a></>} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Reset, OTP & Lock screen"
        description="The rest of the authentication flow."
        variants={['reset password', 'verify code', 'lock screen']}
        code={`<ResetPasswordCard onSubmit={fn} />\n<OTPVerifyCard length={6} onSubmit={fn} onResend={fn} />\n<LockScreenCard user={user} onUnlock={fn} />`}
        muted
      >
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-xl-4 d-flex justify-content-center"><ResetPasswordCard /></div>
          <div className="col-md-6 col-xl-4 d-flex justify-content-center"><OTPVerifyCard onResend={() => {}} sentTo="j***@example.com" /></div>
          <div className="col-md-6 col-xl-4 d-flex justify-content-center"><LockScreenCard user={{ name: 'Jane Smith' }} onSwitchUser={() => {}} /></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="AuthLayout shells"
        description="Four page shells to drop the cards into. `split` shows a branded panel beside the form."
        variants={AuthLayout.VARIANTS}
        code={`<AuthLayout variant="split" headline="Welcome back" tagline="Sign in to continue">\n  <LoginCard />\n</AuthLayout>`}
      >
        <div className="row g-3">
          {AuthLayout.VARIANTS.map((variant) => (
            <div className="col-6 col-lg-3" key={variant}>
              <Card className="mb-0 h-100 text-center" hoverable>
                <div className="uikit-auth-preview" data-variant={variant}>
                  <span className="uikit-auth-preview__panel" />
                  <span className="uikit-auth-preview__card" />
                </div>
                <div className="fw-semibold mt-2" style={{ fontSize: '.8125rem' }}>{variant}</div>
              </Card>
            </div>
          ))}
        </div>
        <p className="text-secondary-soft small mt-3 mb-0">
          See them live under <strong>Templates → Sign In / Sign Up</strong>.
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="SocialButton"
        description="Branded sign-in buttons to pair with the auth cards."
        variants={SocialButton.BRANDS}
        code={`<SocialButton brand="google" block />\n<SocialButton brand="github" filled block />`}
      >
        <div className="row g-2">
          <div className="col-md-6"><SocialButton brand="google" block /></div>
          <div className="col-md-6"><SocialButton brand="microsoft" block /></div>
          <div className="col-md-6"><SocialButton brand="github" filled block /></div>
          <div className="col-md-6"><SocialButton brand="apple" filled block /></div>
        </div>
      </ShowcaseSection>

    </ContentWrapper>
  );
}
