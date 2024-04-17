import React from "react";
import Button from "../button/button";
import Input from "../input/input";
import Link from "next/link";

function AuthForm({ action, type = "login" }) {
  if (!action) {
    throw new Error("Action is required for AuthForm component");
  }
  const registerForm = type === "register";
  return (
    <form action={action} className="flex flex-col gap-5">
      <Input
        id="email"
        name={registerForm ? "email" : "login-email"}
        title="Email Address"
        type="email"
        placeholder="e.g. alex@email.com"
      />
      <Input
        id="password"
        name={registerForm ? "password" : "login-password"}
        title={registerForm ? "Create password" : "Password"}
        type="password"
        placeholder={
          registerForm ? "At least .8 characters" : "Enter your password"
        }
        innerImg="/images/icon-password.svg"
      />
      {registerForm && (
        <Input
          id="confirm-password"
          name="confirm-password"
          title="Confirm password"
          type="password"
          placeholder={
            registerForm ? "At least .8 characters" : "Enter your password"
          }
          innerImg="/images/icon-password.svg"
        />
      )}
      {registerForm && (
        <p className="text-xs text-neutral-grey">
          Password must contain at least 8 characters
        </p>
      )}
      <Button style="primary" disabled={false}>
        {registerForm ? "Create new account" : "Login"}
      </Button>
      <div>
        <div className="text-center">
          {registerForm ? (
            <>
              <p className="text-sm text-neutral-grey">
                Already have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-grey">
                Don't have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/register"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
