import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages, setMessages } from "../redux/slices/messages";

import { Message, User } from "../types/types";
import MessageChat from "./MessageChat";
import { selectChatSelected } from "../redux/slices/chatIdSelected";
import { supabase } from "../database/supabase";
import { selectUser } from "../redux/slices/authUser";
import UserProfile from "./UserProfile";

interface RightChatProps {
  chatIdSelected: number;
}

const RightChat = ({ chatIdSelected }: RightChatProps) => {
  const authUser: User = useSelector(selectUser);
  const msgs: Message[] = useSelector(selectMessages);
  const [userInChat, setUserInChat] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const refMsg = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase
      .from("chat")
      .select()
      .eq("id", chatIdSelected)
      .then((response) => {
        console.log({ response });
        if (response?.data && response?.data?.length > 0) {
          setUserInChat(
            response.data[0].usersInChat?.find(
              (userInChat: User) => userInChat?._id !== authUser?._id
            )
          );
        }
      });
  }, [chatIdSelected, authUser]);

  useEffect(() => {
    const sub = supabase
      .channel("*")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log({ payload });
        /* @ts-ignore */
        supabase
          .from("message")
          .select("*")
          .eq("chatId", chatIdSelected)
          .order("created_at", {
            ascending: true,
          })
          /* @ts-ignore */
          .then((resJson) => dispatch(setMessages(resJson?.data)));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [chatIdSelected]);

  async function addMessage() {
    if (!message) return;

    await supabase.from("message").insert({
      chatId: chatIdSelected,
      user: authUser,
      message,
    });

    await supabase
      .from("chat")
      .update({
        lastMessage: message,
        lastMessage_date: new Date(),
      })
      .eq("id", chatIdSelected);

    setMessage("");
  }

  const scrollToLastMessage = () => {
    /* @ts-ignore */
    refMsg.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [msgs]);

  return (
    <div className="bg-white shadow-lg rounded-2xl w-[92%] mx-auto md:mx-0 flex  flex-col  justify-between">
      <div className="flex flex-col">
        {userInChat ? <UserProfile user={userInChat} /> : null}
        <hr className="w-full text-black" />
        <div className=" w-full max-h-[68vh] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-400 scrollbar-track-gray-100">
          {msgs.map((msg: Message, idx: number) => (
            <MessageChat msg={msg} key={idx} />
          ))}
          <div ref={refMsg} />
        </div>{" "}
      </div>
      <div className=" w-full">
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Add emoji</span>
          </button>
          <textarea
            id="chat"
            rows={1}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            onClick={addMessage}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightChat;
