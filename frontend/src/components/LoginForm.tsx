"use client"

import { ILoginCredentials } from "@/models";
import { useFormInput } from "@/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const { state: loginCredentials, handleInputChange } = useFormInput<ILoginCredentials>({ username: '', password: '' });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // Add error state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: loginCredentials.username,
      password: loginCredentials.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push('/');
      router.refresh()
    }
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="formBasicUsername" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="formBasicUsername"
          name="username"
          placeholder="Username"
          value={loginCredentials.username}
          onChange={handleInputChange}

        />
      </div>
      <div className="mb-3">
        <label htmlFor="formBasicPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="formBasicPassword"
          name="password"
          placeholder="Password"
          value={loginCredentials.password}
          onChange={handleInputChange}
        />
      </div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
