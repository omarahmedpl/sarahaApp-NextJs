import { FC } from "react";

interface IEditProfileSectionProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}
const EditProfileSection: FC<IEditProfileSectionProps> = ({
  children,
  icon,
  label,
}) => {
  return <div className=" w-full">
    <div className="flex flex-row gap-2 items-center">
      {icon}
      <span className="font-bold text-[25px]">{label}</span>
    </div>
    <span className="w-full h-[1px] my-[20px] bg-[#d4dbe0] block" />
    {children}
  </div>;
};

export default EditProfileSection;
