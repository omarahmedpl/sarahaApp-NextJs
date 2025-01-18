"use client";
import Link from "next/link";
// import { withAuth } from "./actions/middleware";

function Home() {
  return (
    <div className="flex flex-col sm:min-h-[78vh]">
      <div className="main-part container flex gap-2 flex-col">
        <div className="text-[24px] font-bold">
          Are you ready to face frankness?
        </div>
        <p className=" mb-5">
          Get honest feedback from your coworkers and friends.
        </p>
      </div>
      <div className="second-part container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2">
        <div className="list-one">
          <h4 className="title">At work</h4>
          <ul>
            <li>Strengthen Areas for Improvement</li>
            <li>Enhance your areas of strength</li>
          </ul>
          <div className="links-reg-login flex flex-row gap-2 *:text-primary">
            <Link href="/sign-up" className="btn">
              Register
            </Link>
            <span className="!text-black">|</span>
            <Link href="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
        <div className="list-two">
          <h4 className="title">With Your Friends</h4>
          <ul>
            <li>Improve your friendship</li>
            <li>Let your friends be honest with you</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
