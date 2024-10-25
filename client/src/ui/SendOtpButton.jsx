import { useState, useEffect } from "react";
import LoaderSmall from "./LoaderSmall";
import useSendOTP from "../features/authentication/useSendOTP";
import useOtpCooldown from "../features/authentication/useOtpCooldown";
import { useLocation } from "react-router-dom";

const SendOtpButton = () => {
  const [cooldown, setCooldown] = useState(0);
  const location = useLocation();
  const { sendOTP, isSendingOTP } = useSendOTP();
  const { data, refetch } = useOtpCooldown(location?.state?.email);

  const handleSendOTP = () => {
    sendOTP(location?.state?.email, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  useEffect(() => {
    if (data && data.data?.resetTime) {
      const reset = new Date(data.data.resetTime).getTime() / 1000;
      const currentTime = new Date().getTime() / 1000;
      const diff = Math.ceil(reset - currentTime);

      setCooldown(diff);

      const interval = setInterval(() => {
        setCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
      }, 1000);

      if (diff <= 0) clearInterval(interval);
      return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <button
      onClick={handleSendOTP}
      className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] h-10 2xl:h-12 2xl:text-2xl text-base disabled:cursor-not-allowed sm:w-72 2xl:w-[400px]"
      type="button"
      disabled={isSendingOTP || cooldown > 0}
    >
      {isSendingOTP ? (
        <LoaderSmall />
      ) : cooldown > 0 ? (
        `Wait ${Math.ceil(cooldown)}s to resend`
      ) : (
        "Resend verification code"
      )}
    </button>
  );
};

export default SendOtpButton;
