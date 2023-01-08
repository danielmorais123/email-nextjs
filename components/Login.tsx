import { useState } from "react";
import authImg from "../images/auth.svg";
import { anton } from "../fonts/fonts";
import Input from "./input/Input";
import ProviderButton from "./button/ProviderButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-[95%] text-white rounded-xl mx-auto flex items-center  justify-start text-left lg:justify-around p-2">
      {" "}
      <div className="w-full  justify-center hidden lg:flex">
      <img
        src={authImg.src}
        className="w-[80%] max-w-[550px] object-contain "
      /></div>
      <div className="flex flex-col w-full  items-start sm:items-center ">
        <p className="mb-4 mt-3 text-md xs:text-lg ">
          Sign In - <span className={``}> Gmail Composer</span>
        </p>
        <Input
          placeholder="email@email.com"
          value={email}
          setValue={setEmail}
          label="Email Address"
          type={""}
          htmlFor="email"
        />
        <Input
          placeholder="yourpassword"
          value={password}
          setValue={setPassword}
          label="Password"
          type="passowrd"
          htmlFor="password"
        />
        <div className="flex  flex-col items-center flex-grow justify-center w-full">
          <button className="button mt-3 sm:max-w-[350px] w-full text-sm bg-[#DB4437] hover:bg-[#DB4437]/80">
            Sign In
          </button>
        </div>
        <hr className="text-white w-full my-6 sm:max-w-[350px]" />
        <div className="flex flex-col space-y-3 w-full">
          <ProviderButton provider="Facebook" />
          <ProviderButton provider="Google" />
        </div>
      </div>
    </div>
  );
};

export default Login;
