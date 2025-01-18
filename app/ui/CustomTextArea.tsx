"use client";
import React from "react";
import { CustomTextAreaProps } from "../lib/definations";

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  input,
  error,
  autoFocus = true,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-5">
      <div className="flex flex-row items-center gap-8">
        {" "}
        {input.label && (
          <label
            htmlFor={input.id}
            className="block lg:min-w-[200px] lg:text-end font-bold"
          >
            {input.label}
          </label>
        )}
        <textarea
          id={input.id}
          name={input.name}
          rows={10}
          className={`w-full bg-white p-2 border ${
            autoFocus ? "border-primary" : "border-transparent"
          } focus:border-primary outline-none duration-200 rounded ${className}`}
          {...props}
        />
      </div>
      {error && <div className="text-red-500 lg:ms-[230px] mt-2">{error}</div>}
    </div>
  );
};

export default CustomTextArea;
