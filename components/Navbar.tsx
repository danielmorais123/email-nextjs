import React, { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { signInWithGoogle, signOut } from "../auth/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Badge, Dropdown, Menu, MenuProps, Space } from "antd";
import { Category, User } from "../types/types";
import { DownOutlined } from "@ant-design/icons";
import authUser, { selectUser } from "../redux/slices/authUser";
import { useSelector } from "react-redux";
import pic from "../images/user.png";
import { poppins } from "../fonts/fonts";
import { useRouter } from "next/router";
const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const authUser: User = useSelector(selectUser);
  const router = useRouter();

  let menus;

  if (authUser?.notifications?.length > 0) {
    menus = Object.entries(authUser?.notifications).map((key) => {
      return (
        <div
          key={key[0]}
          className={`cursor-pointer transition-all hover:bg-gray-100  xs:max-w-[400px] ${poppins.className}`}
        >
          {" "}
          <div className="flex flex-col h-[70px]">
            <div className="flex items-center h-full ">
              <img className="h-[45px] p-1  object-contain" src={pic.src} />
              <div className="flex flex-col justify-center ml-1">
                <div className={`  text-xs`}>
                  <p className="tracking-wider font-bold">
                    {key[1]?.userSender?.displayName}
                  </p>
                  <p className="text-[12px] text-gray-500/80">
                    {key[1]?.description}
                  </p>
                </div>
                <div className={` flex flex-col ml-0  `}>
                  <span className={`text-[10px]  font-bold`}></span>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      );
    });
  }

  return (
    <div className="w-full mx-auto h-16 bg-white rounded-xl flex items-center ">
      <div className="w-[95%] md:w-[80%] mx-auto flex justify-between">
        <img
          src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
          className="h-10 w-10"
        />
        <div className="flex items-center space-x-4">
          <Dropdown
            overlay={
              authUser?.notifications?.length === 0 ? (
                <Menu>No notifications yet</Menu>
              ) : (
                <Menu>{menus}</Menu>
              )
            }
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Badge dot={true}>
              <FontAwesomeIcon
                icon={faBell}
                className="cursor-pointer relative w-[16px] h-[16px] text-gray-400"
              />
            </Badge>
          </Dropdown>
          {session ? (
            <button
              onClick={signOut}
              className="button bg-[#f56e6e] text-white hover:bg-[#d05e5e] text-xs flex items-center"
            >
              Sign Out{" "}
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="ml-2 h-3 w-3"
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="button bg-blue-500 text-white hover:bg-blue-400 text-xs flex items-center"
            >
              Sign In{" "}
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="ml-2 h-3 w-3"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
