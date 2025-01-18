import React from "react";

const SubFooter = () => {
  return (
    <div className="third-part bg-[rgb(220,242,243)] w-full  my-[50px]">
      <div className="container gap-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 justify-center items-start py-10">
        <div className="instruction flex flex-col gap-2">
          <div className="title">1. Create your personal feedback URL.</div>
          <div className="instruction-desc">
            People will write anonymous and honest opinions about you on that
            URL.
          </div>
        </div>
        <div className="instruction flex flex-col gap-2">
          <div className="title">
            2. Share the URL through Instagram, Twitter, Facebook etc.
          </div>
        </div>
        <div className="instruction flex flex-col gap-2">
          <div className="title">3. Read what people think about you.</div>
          <div className="instruction-desc">
            The feedback you receive is private - only you can see it.
          </div>
        </div>
        <div className="instruction flex flex-col gap-2">
          <div className="title">4. Publish your favorite feedbacks.</div>
          <div className="instruction-desc">
            The feedback you receive is private - only you can see it.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
