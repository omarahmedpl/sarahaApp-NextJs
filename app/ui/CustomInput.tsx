"use client";
import React from "react";
import { CustomInputProps } from "../lib/definations";

const CustomInput: React.FC<CustomInputProps> = ({
  input,
  error,
  className = "",
  width,
  ...props
}) => {
  return (
    <div className={`${width} mb-4`}>
      <div className={`flex flex-row items-center gap-8 ${width}`}>
        {input.label ? (
          <label
            htmlFor={input.id}
            className="block lg:min-w-[200px] lg:text-end font-bold"
          >
            {input.label}
          </label>
        ) : null}
        <input
          type={input.type}
          id={input.id}
          name={input.name}
          className={`w-full p-2 border border-transparent focus:border-primary outline-none duration-200 rounded ${className}`}
          {...props}
        />
      </div>
      {error && (
        <div
          className={`text-red-500 mt-2 ${
            width === "w-full" ? "" : "lg:ms-[230px]"
          }`}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
