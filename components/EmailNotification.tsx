import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { Email, User } from "../types/types";
import pic from "../images/user.png";
import authUser, { selectUser } from "../redux/slices/authUser";
import { useSelector } from "react-redux";

interface EmailProps {
  email: Email;
}

const EmailNotification = ({ email }: EmailProps) => {
  const authUser: User = useSelector(selectUser);
  const [checked, setChecked] = useState(false);

  const onChangeCheckBox = (event: CheckboxChangeEvent) => {
    setChecked(event.target.checked);
  };

  

  return (
    <div className="bg-white rounded-xl w-full">
      <div className="w-[95%] mx-auto p-2 flex items-center justify-between">
        <Checkbox onChange={onChangeCheckBox} checked={checked} />
        <div className="flex ml-3 items-center xs:min-w-[150px]">
          <img
            onError={(e) =>
              /* @ts-ignore */
              (e.target.src =
                "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
            }
            src={email?.fromUser?.photoProfile || pic.src}
            className="w-[40px] object-contain "
          />
          <div className="ml-1">
            <p className="text-xs">
              {email?.fromUser?.displayName || authUser?.displayName}
            </p>
          </div>
        </div>
        <div className="w-full">
          <p className="xs:text-xs hidden xs:flex sm:text-[13px] tracking-wider text-gray-500">
            {email?.emailContent}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-gray-400">
            {new Date(email.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
