import React, { useState } from "react";
import Otp from "../Components/Otp";
import Panel from "../Components/Panel";

const OtpForm = () => {
  const [verificationStatus, setVerificationStatus] = useState("verify");
  const otpPass = 1234; // The expected OTP

  return (
    <Panel
      height="32.125rem"
      width="47.25rem"
      className="isCentre flex flex-col items-center"
    >
      <h2 className="font-sans font-bold text-[2.5rem] leading-[3.25rem] text-center w-full tracking[-0.05em] text-black mt-4">
        Mobile Phone Verification
      </h2>
      <p className="font-sans font-thin text-[1.5265rem] leading-[2rem] text-center tracking[-0.04em] text-[#bfbfbf] mt-4">
        Enter the 4-digit verification code that was sent to <br /> your phone
        number.
      </p>
      <div className="mt-5">
        <Otp
          length={4}
          otpPass={otpPass}
          verified={verificationStatus}
          setVerified={setVerificationStatus}
        />
        <button
          className={`bg-[#112D4E] text-white rounded-[8px] text-[1.56rem] mt-5 px-4 py-2 transition duration-200 w-full h-16 ${
            verificationStatus === "failed"
              ? "bg-[#EB2D5B]"
              : verificationStatus === "verified"
              ? "bg-[#23CF9B]"
              : ""
          }`}
          disabled={verificationStatus === "verified"} // Disable button if already verified
        >
          {verificationStatus === "verify"
            ? "Verify Account"
            : verificationStatus === "verified"
            ? "Verified"
            : "Verification Failed"}
        </button>
        <p className="text-[#BFBFBF] font-sans text-[1.56rem] text-center mt-5">
          Didn’t receive code?{" "}
          <span className="text-[#112D4E] cursor-pointer"> Resend</span>
        </p>
      </div>
    </Panel>
  );
};

export default OtpForm;
