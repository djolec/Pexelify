import { useEffect } from "react";
import ThemeBtn from "../ui/ThemeBtn";
import useVerify from "../features/authentication/useVerify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SendOtpButton from "../ui/SendOtpButton";
import PexelifyBanner from "../ui/PexelifyBanner";
import VerifyInput from "../ui/VerifyInput";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, isVerifying } = useVerify();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/login");
    }
  }, [location, navigate]);

  if (!location?.state?.email) {
    return null;
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh]">
      <div className="absolute sm:right-10 sm:top-10 right-4 top-4">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <div className="w-full sm:w-72 flex-col items-center gap-4 2xl:gap-6 px-8 sm:px-0 2xl:w-[400px]">
        <VerifyInput length={6} verifyEmail={verifyEmail} />
        <SendOtpButton />
      </div>
    </div>
  );
};

export default EmailVerification;
