"use client";
import React from "react";
import CustomInput from "../ui/CustomInput";
import { loginArray } from "../lib/consts";
import { login } from "../actions/auth";
import { useActionState } from "react"; // Assuming this import exists

const initialState = {
  formData: {},
  errors: {},
};

const Login: React.FC = () => {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <>
      <div className="container">
        <div className="title mb-5">Login</div>
        <span className="bg-slate-300 mb-10 h-[1px] w-full block" />
        <form action={action} className="registration mb-5">
          {loginArray.map((input) => (
            <CustomInput
              key={input.input.id}
              input={input.input}
              error={
                state?.errors?.[
                  input.input.id as keyof typeof state.errors
                ]?.join(", ") || ""
              }
              defaultValue={
                state?.formData[input.input.name as keyof typeof state.formData]
              }
            />
          ))}
          <div className="mb-5 lg:ms-[230px]">
            <a href="/forgot-password" className="text-primary">
              Forgot Password?
            </a>
          </div>
          <button
            disabled={pending}
            type="submit"
            className="btn btn-primary lg:ms-[230px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
