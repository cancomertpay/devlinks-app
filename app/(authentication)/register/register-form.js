"use client";

import { useFormState } from "react-dom";
import { signup } from "@/lib/actions/auth";
import AuthForm from "@/components/UI/form/auth-form";

function RegisterForm() {
  const [state, action] = useFormState(signup, undefined);

  return <AuthForm action={action} state={state} type="register" />;
}

export default RegisterForm;
