import React, { useState, useEffect, useRef } from "react";

function OtpComponent({ length = 4, otpPass, verified, setVerified }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const onOtpSubmit = () => {
    const combinedOtp = otp.join("");
    if (combinedOtp === otpPass.toString()) {
      setVerified("verified");
    } else {
      setVerified("failed");
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Check if all inputs are filled and submit OTP
    if (otp.every((digit) => digit !== "")) {
      onOtpSubmit();
    }
  }, [otp]); // Trigger onOtpSubmit whenever otp changes

  const handleChange = (index, e) => {
    if (verified !== "verified") {
      const value = e.target.value;

      // Allow only numeric input and only one character
      if (isNaN(value) || value.length > 1) return;

      const newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1); // Allow only one character

      setOtp(newOtp);

      // Move to next input if current field is filled
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // Optional: Move focus to the next empty input
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <div className="flex">
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-[90px] h-[100px] m-[5px] focus:outline-none text-center text-black text-5xl bg-[#dbe2ef] border-2 ${
                verified === "verified"
                  ? "border-green-500"
                  : verified === "failed"
                  ? "border-red-500"
                  : "border-gray-300 focus:border-3 focus:border-black"
              } rounded-[12px]`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OtpComponent;
