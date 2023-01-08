import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Chat, User } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../redux/slices/users";
import { selectUser } from "../redux/slices/authUser";
import { supabase } from "../database/supabase";

interface ChatUserProps {
  chat: Chat;
  chatIdSelected: number;
  setChatIdSelected: Dispatch<SetStateAction<number>>;
}

const ChatUser = ({
  chat,
  chatIdSelected,
  setChatIdSelected,
}: ChatUserProps) => {
  const authUser: User = useSelector(selectUser);
  const users: User[] = useSelector(selectUsers);
  const [userInChat, setUserInChat] = useState<User>();

  useEffect(() => {
    setUserInChat(chat.usersInChat.find((user) => user?._id !== authUser?._id));
  }, [authUser,chat]);

  return (
    <div
      className={`flex items-center py-1.5 cursor-pointer rounded-lg mt-1 ${
        chatIdSelected === chat?.id ? "bg-[#f7f0f0]" : "bg-transparent"
      }`}
      onClick={() => setChatIdSelected(chat?.id)}
    >
      <img
        onError={(e) =>
          /* @ts-ignore */
          (e.target.src =
            "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
        }
        src={userInChat?.photoProfile}
        className="h-[52px] object-contain p-1 rounded-full"
      />
      <div className="flex flex-col ml-1 ">
        <p className="text-[#1a1a1a] text-xs font-bold">
          {userInChat?.displayName}
        </p>
        <p className="text-gray-400 text-xs line-clamp-2">{chat?.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatUser;
