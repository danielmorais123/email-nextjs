import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";

interface InputProps {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  type: string;
  htmlFor: string;
}

const Input = ({
  placeholder,
  label,
  value,
  setValue,
  type,
  htmlFor,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-6 w-full flex sm:max-w-[350px] justify-center flex-col items-start  ">
      <label
        htmlFor={htmlFor}
        className=" mb-2 text-sm font-medium text-white "
      >
        {label}
      </label>
      <div className="w-full relative ">
        <input
          type={type && !showPassword ? "password" : "email"}
          id={htmlFor}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {type ? (
          <FontAwesomeIcon
            icon={faEye}
            className="absolute right-3 top-4 w-[15px] text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Input;
