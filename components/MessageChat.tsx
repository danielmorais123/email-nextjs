import { useSelector } from "react-redux";
import { Message, User } from "../types/types";
import { selectUser } from "../redux/slices/authUser";
import { selectUsers } from "../redux/slices/users";

interface MessageChatProps {
  msg: Message;
}

const MessageChat = ({ msg }: MessageChatProps) => {
  const authUser: User = useSelector(selectUser);

  return (
    <div className="text-black bg-white flex flex-col mt-1">
      <div
        className={`flex items-center p-0.5 mx-2 ${
          msg?.user?._id === authUser?._id
            ? "self-end flex-row-reverse "
            : "self-start"
        }`}
      >
        <img
          onError={(e) =>
            /* @ts-ignore */
            (e.target.src =
              "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
          }
          src={msg?.user?.photoProfile}
          className={`h-[50px] object-contain rounded-full p-2 ${
            authUser?._id === msg?.user?._id ? "ml-2" : "mr-2"
          } `}
        />
        <div
          className={`bg-[#f5f3f3] w-fit min-w-[120px] min-h-[50px] max-w-[93%] h-fit rounded-lg ${
            msg?.user?._id === authUser?._id ? "self-end " : "self-start  "
          }  `}
        >
          <p className="p-1 text-xs">{msg.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
