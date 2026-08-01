import HeadingGroup from "@/components/UI/heading/heading-group";
import ForgotPasswordForm from "./forgot-password-form";

function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-5 px-8 pt-14 md:w-[476px] md:px-10 md:py-10">
      <HeadingGroup
        title="Reset password"
        subtitle="Enter your email and we'll send you a link to get back in"
      />
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordPage;
