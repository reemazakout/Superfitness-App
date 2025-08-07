import { useForgetPasswordContext } from "../../context/forgget-password-provider";
import CreateNewPasswordStep from "./steps/create-new-password-step";
import EnterEmailStep from "./steps/enter-email-step";
import VerifyOtpStep from "./steps/verify-otp-step";

export default function ForgetPasswordSteps() {
  // Context
  const { step } = useForgetPasswordContext();

  //  Switch Steps
  switch (step) {
    case 1:
      return <EnterEmailStep />;
    case 2:
      return <VerifyOtpStep />;
    case 3:
      return <CreateNewPasswordStep />;
    default:
      return <EnterEmailStep />;
  }

  return null;
}
