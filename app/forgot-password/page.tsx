"use client";
import { useEffect, useState } from "react";
import { createFormikConfig } from "../utils/formik";
import { create } from "domain";
import { forgetPassowrdSchema } from "../actions/schema";
import CustomInput from "../ui/CustomInput";
import { forgetPassword, setCookie } from "../actions/auth";

const ForgetPassword = ({}) => {
  const [loading, setLoading] = useState(false);
  const forgetPasswordForm = createFormikConfig(
    {
      email: "",
    },
    forgetPassowrdSchema,
    async (values) => {
      localStorage.setItem("forget-password-email", values.email);
      await forgetPassword({ email: values.email, setLoading });
    }
  );
  useEffect(() => {
    console.log(forgetPasswordForm);
  }, [forgetPasswordForm]);
  return (
    <div className="container flex flex-col items-center gap-3">
      <div className="title !text-3xl">Forget Password</div>
      <form
        onSubmit={forgetPasswordForm.handleSubmit}
        className="form flex flex-col items-center !w-full"
      >
        <CustomInput
          input={{
            // label: "Email",
            type: "email",
            name: "email",
            id: "email",
          }}
          width="w-full"
          error={
            forgetPasswordForm.errors.email && forgetPasswordForm.touched.email
              ? forgetPasswordForm.errors.email
              : ""
          }
          value={forgetPasswordForm.values.email}
          onChange={forgetPasswordForm.handleChange}
          onBlur={forgetPasswordForm.handleBlur}
          className="!w-full mb-4"
          placeholder="Email"
        />
        <button
          type="submit"
          className="button btn-primary"
          disabled={loading || !forgetPasswordForm.isValid}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
