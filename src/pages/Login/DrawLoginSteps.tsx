import ResetPassword from "./ResetPassword";
import ForcePasswordChange from "./ForcePasswordChange";
import SignIn from "./SignIn";
import { LoginPage } from "@/interfaces/pages/Login";
import { useLoginPage } from "./LoginPageContext";
import Register from "./Register";

export default function DrawLoginSteps() {
  const { currentPage } = useLoginPage();
  if (currentPage === LoginPage.LOGIN) {
    return <SignIn />;
  } else if (currentPage === LoginPage.REGISTER) {
    return <Register />;
  } else if (currentPage === LoginPage.RESET_PASSWORD) {
    return <ResetPassword />;
  } else if (currentPage === LoginPage.FORCE_PASSWORD_CHANGE) {
    return <ForcePasswordChange />;
  } else {
    return <div />;
  }
}
