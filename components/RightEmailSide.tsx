import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailNotification from "./EmailNotification";
import { useEffect, useState } from "react";
import { Email, User } from "../types/types";
import userPic from "../images/user.png";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../database/supabase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authUser";

const RightEmailSide = () => {
  const authUser: User = useSelector(selectUser);
  const session = useSession();
  const [search, setSearch] = useState("");

  return (
    <div className=" w-[92%] mx-auto md:mx-0 ">
      <div className="flex">
        <div className="w-full xl:max-w-[240px] relative ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="text-sm outline-none p-2 w-full rounded-lg bg-white"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-2 h-[13px] top-3 text-gray-400"
          />
        </div>
      </div>

      <div className="mt-4">
        {authUser?.emails
          .filter((e) =>
            e.emailContent.toLowerCase().includes(search.toLowerCase())
          )
          .map((email, index) => (
            <EmailNotification email={email} key={index} />
          ))}
      </div>
    </div>
  );
};

export default RightEmailSide;
