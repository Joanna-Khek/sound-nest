"use client";

import { useLogin } from "@/hooks";
import { Form } from "@/components/forms";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "text",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign in"
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
}
