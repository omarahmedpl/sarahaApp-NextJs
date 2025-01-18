"use client";
import Image from "next/image";

const AvatarImage: React.FC<{ src?: string; mt?: boolean }> = ({
  src = "/avatar.png",
  mt = true,
}) => {
  return (
    <div
      className={`image-card rounded-full overflow-hidden w-[100px] h-[100px] ${
        mt ? "mt-[-50px]" : ""
      }`}
    >
      <Image alt="avatar" src={src} width={100} height={100} quality={100} />
    </div>
  );
};

export default AvatarImage;
