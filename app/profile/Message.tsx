import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteMessage } from "../actions/user";

interface IMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: {
    message: string;
    _id: string;
    createdAt: string;
  };
  onDelete: () => void;
}
const Message: FC<IMessageProps> = ({ message, onDelete, ...props }) => {
  return (
  
  );
};

export default Message;
