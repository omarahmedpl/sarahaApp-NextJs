"use client";
import React from "react";
import CustomInput from "../ui/CustomInput";
import { signUpArray } from "../lib/consts";
import { signup } from "../actions/auth";
import { useActionState } from "react"; // Assuming this import exists

const SignUp: React.FC = () => {
  const initialState = {
    formData: {},
    errors: {},
  };

  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <div className="container">
      <div className="title mb-5">Register</div>
      <span className="bg-slate-300 mb-10 h-[1px] w-full block" />
      <form action={action} className="registration mb-5">
        {signUpArray.map((input) => (
          <CustomInput
            key={input.input.id}
            input={input.input}
            error={
              state?.errors?.[input.input.id as keyof typeof state.errors]?.join(
                ", "
              ) || ""
            } // Convert string[] to a single string
            defaultValue={
              state?.formData[input.input.name as keyof typeof state.formData]
            }
          />
        ))}
        <button
          disabled={pending}
          type="submit"
          className="btn btn-primary lg:ms-[230px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
