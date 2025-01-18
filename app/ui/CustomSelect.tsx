"use client";
import React from "react";
import { CustomSelectProps } from "../lib/definations";

const CustomSelect: React.FC<CustomSelectProps> = ({
  input,
  error,
  options,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-5">
      <div className="flex flex-row items-center gap-8">
        <label
          htmlFor={input.id}
          className="block lg:min-w-[200px] lg:text-end font-bold"
        >
          {input.label}
        </label>
        <select
          id={input.id}
          name={input.name}
          className={`w-full p-2 border bg-white border-transparent focus:border-primary outline-none duration-200 rounded ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-500 lg:ms-[230px] mt-2">{error}</div>}
    </div>
  );
};

export default CustomSelect;
