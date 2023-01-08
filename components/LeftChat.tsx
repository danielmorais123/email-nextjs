import React, { Dispatch, useEffect, useState, SetStateAction } from "react";
import { Chat, User } from "../types/types";
import { supabase } from "../database/supabase";
import ChatUser from "./ChatUser";
import { useSelector } from "react-redux";
import { selectUsers } from "../redux/slices/users";
import { selectUser } from "../redux/slices/authUser";
import { selectMessages } from "../redux/slices/messages";
import UserProfile from "./UserProfile";

interface LeftProps {
  chatIdSelected: number;
  setChatIdSelected: Dispatch<SetStateAction<number>>;
}

const LeftChat = ({ chatIdSelected, setChatIdSelected }: LeftProps) => {
  const users: User[] = useSelector(selectUsers);
  const [chats, setChats] = useState<Chat[]>([]);
  const authUser: User = useSelector(selectUser);
  const msgs = useSelector(selectMessages);
  const [searchChat, setSearchChat] = useState<string>("");

  useEffect(() => {
    supabase
      .from("chat")
      .select("*")
      .or(`userOne.eq.${authUser?._id},userTwo.eq.${authUser?._id}`)
      .then((res) => {
        console.log({ try: res });
        if (res?.data && res?.data?.length > 0) {
          setChats(res?.data);
          setChatIdSelected(res?.data[res?.data.length - 1]?.id);
        }
      });
  }, [authUser]);

  useEffect(() => {
    if (!msgs) return;
    supabase
      .from("chat")
      .select("*")
      .or(`userOne.eq.${authUser?._id},userTwo.eq.${authUser?._id}`)
      .then((res) => {
        console.log({ try: res });
        if (res?.data && res?.data?.length > 0) {
          setChats(res?.data);
        }
      });
  }, [msgs]);

  return (
    <div className="bg-white min-h-[80vh]  md:max-w-[304px] w-[92%] mx-auto md:mx-0 rounded-2xl shadow-xl">
      <div className="w-[90%] mx-auto">
        <UserProfile user={authUser} />
        <div className="relative w-full mt-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Chats"
            required
            value={searchChat}
            onChange={(e) => setSearchChat(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-[#1A1A1A] text-sm mt-3 pl-1">Chats</p>
        {chats?.map((chat, idx) => (
          <ChatUser
            key={chat?.id}
            chat={chat}
            chatIdSelected={chatIdSelected}
            setChatIdSelected={setChatIdSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftChat;
