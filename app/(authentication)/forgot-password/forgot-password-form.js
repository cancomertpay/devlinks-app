"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { resetPassword } from "@/lib/actions/auth";
import Input from "@/components/UI/input/input";
import Button from "@/components/UI/button/button";

function ForgotPasswordForm() {
  const [state, action] = useFormState(resetPassword, undefined);

  // Worded so it reads the same whether or not the address is registered
  if (state?.sent) {
    return (
      <div className="flex flex-col gap-5">
        <p className="rounded-lg bg-neutral-light-purple p-4 leading-relaxed text-neutral-dark-grey">
          If an account exists for that address, a reset link is on its way.
          Check your inbox, and your spam folder if it is not there.
        </p>
        <Link
          href="/login"
          className="text-center text-sm font-semibold text-primary-index transition-colors duration-300 ease-in-out hover:text-neutral-dark-grey"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <Input
          id="email"
          name="email"
          title="Email Address"
          type="email"
          placeholder="e.g. alex@email.com"
          error={state?.errors?.email}
        />
        {state?.errors?.email && (
          <p className="text-sm italic text-error">{state.errors.email}</p>
        )}
      </div>

      <Button style="primary" disabled={false}>
        Send reset link
      </Button>

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-neutral-grey transition-colors duration-300 ease-in-out hover:text-primary-index"
        >
          Back to login
        </Link>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
