import { useEffect } from "react";
import ChatComponent from "../components/ChatComponent";
import axios from "axios";
import { BASE_URL } from "../urls";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/slices/users";
import { supabase } from "../database/supabase";

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/users`)
      .then((response) => dispatch(setUsers(response?.data?.users)));
  }, []);


  

  return <ChatComponent />;
};

export default Chat;
