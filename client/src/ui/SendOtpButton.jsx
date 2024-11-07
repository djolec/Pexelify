import { useState, useEffect } from "react";
import LoaderSmall from "./LoaderSmall";
import useSendOTP from "../features/authentication/useSendOTP";
import useGetCooldown from "../features/authentication/useGetCooldown";
import { useLocation } from "react-router-dom";
import { apiOtpCooldown } from "../services/apiAuth";

const SendOtpButton = () => {
  const [cooldown, setCooldown] = useState(0);
  const location = useLocation();
  const { sendOTP, isSendingOTP } = useSendOTP();
  const { data, refetch } = useGetCooldown(
    location?.state?.email,
    apiOtpCooldown,
  );

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
      className="h-10 w-full rounded-full bg-[var(--primary)] px-4 py-2 text-base text-[var(--on-primary)] disabled:cursor-not-allowed sm:w-72 2xl:h-12 2xl:w-[400px] 2xl:text-2xl"
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
