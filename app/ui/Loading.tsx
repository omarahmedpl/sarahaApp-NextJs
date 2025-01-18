import Image from "next/image";

const Loading = ({}) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[#f5f8fa] z-50 flex justify-center items-center">
        <div className="bg-[#f5f8fa] p-5 rounded-lg">
          <div className="logo flex justify-center flex-col items-center gap-2">
            <Image src="/Logo.png" className="ms-[-10px]" alt="Saraha Logo" width={70} height={70} />
            <div className="logo-text text-[32px] text-black font-[700]">
              Sarahah
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Loading;
