import { useRef, useState } from "react";

const VerifyInput = ({ length, verifyEmail }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");

    // Only proceed if the pasted data is numeric
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    const pastedCode = pastedData.slice(0, length).split("");

    if (pastedCode.length > 1) {
      // Fill the OTP array with the pasted characters
      for (let i = 0; i < pastedCode.length; i++) {
        if (index + i < length) {
          newOtp[index + i] = pastedCode[i];
        }
      }
      setOtp(newOtp);

      // Focus on the first empty input after the pasted code
      const firstEmptyIndex = newOtp.findIndex((value) => value === "");
      console.log(firstEmptyIndex);
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex].focus();
      } else {
        inputRefs.current[length - 1].focus();
      }
    } else {
      newOtp[index] = pastedCode;
      setOtp(newOtp);
    }

    const otpCombined = newOtp.join("");
    if (otpCombined.length === length) {
      verifyEmail(otpCombined);
    }
  };

  const handleChange = (index, e) => {
    console.log("ran handleChange");

    const value = e.target.value;

    if (isNaN(value) || value.includes(" ")) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move focus to the first empty input if it's not the last input
    if (value && newOtp.some((inputValue) => !inputValue)) {
      inputRefs.current[newOtp.indexOf("")].focus();
    }

    const otpCombined = newOtp.join("");
    if (otpCombined.length === length) {
      verifyEmail(otpCombined);
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous field using backspace
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index === 0) {
      setTimeout(() => {
        inputRefs.current[0].setSelectionRange(1, 1);
      }, 0);
    }

    if (
      e.key === "ArrowRight" &&
      index < length &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleFocus = (index) => {
    setTimeout(() => {
      if (otp[index]) {
        inputRefs.current[index].setSelectionRange(1, 1);
      }
    }, 0);
  };

  return (
    <div className="grid grid-cols-6 gap-2 sm:w-72 2xl:w-[400px] mb-4">
      {otp.map((value, index) => (
        <input
          autoFocus={index === 0}
          className="aspect-square bg-[var(--surface-container-high)] text-[var(--on-background)] rounded-md px-3 text-center"
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={(e) => handleFocus(index, e)}
          onPaste={(e) => handlePaste(index, e)}
        />
      ))}
    </div>
  );
};

export default VerifyInput;
