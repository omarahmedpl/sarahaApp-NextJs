import { FC } from "react";
import { IoMail } from "react-icons/io5";
import Message from "./Message";
import { useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "../actions/user";

interface IMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: any[];
}
const Messages: FC<IMessagesProps> = ({ messages, ...props }) => {
  const queryClient = useQueryClient();

  // Refetch messages after deletion
  const refetchMessages = () => {
    queryClient.invalidateQueries(["profile"]);
  };

  return (
    <div {...props}>
      
    </div>
  );
};

export default Messages;
