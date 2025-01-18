"use client";
import { confirmEmail } from "@/app/actions/auth";
import Error from "@/app/ui/Error";
import Loading from "@/app/ui/Loading";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ConfirmEmail = ({}) => {
  const emailToken = usePathname().split("/confirmEmail/")[1];
  const [loading, setLoading] = useState(false);
  const isMount = useRef(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirm = async () => {
      try {
        setLoading(true);

        await confirmEmail({ token: emailToken, setError });
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isMount.current) {
      confirm();
      isMount.current = false;
    }
  }, [emailToken]); // Add emailToken as a dependency

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container text-center">
      <h1 className="font-bold text-[22px]">Email confirmed Successfully</h1>
      <p className="text-[25px]">
        You would be redirected to the login page now!
      </p>
    </div>
  );
};

export default ConfirmEmail;
