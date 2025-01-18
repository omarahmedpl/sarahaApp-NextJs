import React, { FC } from "react";

interface IErrorProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  error: string;
}
const Error: FC<IErrorProps> = ({ error, ...props }) => {
  return (
    <div
      className="container text-red-600 text-[30px] w-full text-center font-bold"
      {...props}
    >
      {error}
    </div>
  );
};

export default Error;
