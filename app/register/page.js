"use client";

import { useRouter } from 'next/navigation'
import { useFormState } from "react-dom";
import AuthForm from "@/components/UI/form/AuthForm";
import { signup } from "@/lib/actions/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";
import Image from "next/image";

function RegisterPage() {
  const [state, action] = useFormState(signup, undefined);
  const [user, loading] = useAuthState(auth);
  const router = useRouter()

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse">
          <Image
            src="/images/logo-devlinks-small.svg"
            alt="loading"
            width={62}
            height={62}
          />
        </div>
      </div>
    );
  }

  if(user) {
    router.push('/')
  }

  return <AuthForm action={action} state={state} type="register" />;
}

export default RegisterPage;
