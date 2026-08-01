"use client";
import { useFormState } from "react-dom";
import { signin } from "@/lib/actions/auth";
import AuthForm from "@/components/UI/form/auth-form";

function LoginForm() {
  const [state, action] = useFormState(signin, undefined);

  return <AuthForm action={action} state={state} />;
}

export default LoginForm;
