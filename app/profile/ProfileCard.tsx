'use client'
import Image from "next/image";
import { FC } from "react";
import { UserDataInterface } from "../lib/definations";
import AvatarImage from "../ui/AvatarImage";
import Link from "next/link";

interface IProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  userData: UserDataInterface;
  messages: number;
}
const ProfileCard: FC<IProfileCardProps> = ({
  userData,
  messages,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="top-image h-[200px] w-full">
        <Image
          alt="message-image"
          src={"/pic.jpg"}
          className="!w-full h-full object-cover object-top"
          width={500}
          height={500}
          quality={100} // Set quality to 100 for maximum clarity
        />
      </div>
      <AvatarImage src={userData?.image} />
      <div className="user-name font-bold mt-3 text-[25px]">
        {userData.username}
      </div>
      <div className="num-of-messages flex justify-center items-center flex-col">
        <div className="num-title text-[17px]">Messages</div>
        <div className="num font-bold text-[20px]">{messages}</div>
      </div>
      <Link
        href={`/u/${userData._id}`}
        style={{wordBreak : "break-word"}}
        className="share-profile-link text-primary font-bold break-words px-3 mb-3"
      >
        {`${process.env.NEXT_PUBLIC_BASE_URL}/u/${userData._id}`}
      </Link>
    </div>
  );
};

export default ProfileCard;
