import React, { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import LeftChat from "./LeftChat";
import Navbar from "./Navbar";
import { poppins } from "../fonts/fonts";
import RightChat from "./RightChat";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages, setMessages } from "../redux/slices/messages";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { BASE_URL } from "../urls";
import { setUser } from "../redux/slices/authUser";
import Login from "./Login";
const ChatComponent = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const [chatIdSelected, setChatIdSelected] = useState<number>(0);
  const msgs = useSelector(selectMessages);

  useEffect(() => {
    supabase
      .from("message")
      .select()
      .eq("chatId", chatIdSelected)
      .order("created_at",{
        ascending: true,
      })
      .then((response) => {
        console.log({ msgs: response });
        if (response?.data && response?.data?.length > 0) {
          dispatch(setMessages(response?.data));
        } else {
          dispatch(setMessages([]));
        }
      });
  }, [chatIdSelected]);

  useEffect(() => {
    if (!session) {
      dispatch(setUser(null));
      return;
    }
    axios
      .get(`${BASE_URL}/api/users/${session?.user?.email}`)
      .then((res) => dispatch(setUser(res.data?.user)));
  }, [session]);

  return (
    <div className={`${poppins.className} bg-[#f1f3f7] min-h-screen`}>
      {session ? (
        <>
          <Navbar />
          <div className="mt-5 flex md:w-[95%] flex-col md:flex-row md:mx-auto md:space-x-4 space-y-4 md:space-y-0">
            <LeftChat
              chatIdSelected={chatIdSelected}
              setChatIdSelected={setChatIdSelected}
            />
            <RightChat chatIdSelected={chatIdSelected} />
          </div>{" "}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ChatComponent;
