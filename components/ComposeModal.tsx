import { Modal } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { poppins } from "../fonts/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { set } from "immer/dist/internal";
import { useSession } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authUser";
import axios from "axios";
import { BASE_URL } from "../urls";
import { User } from "../types/types";
interface ComposeProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const Buttons = ({ close, sendEmail }: any) => {
  return (
    <div
      className={`flex items-center space-x-2 justify-end ${poppins.className}`}
    >
      <button
        className="button bg-[#7f838b] hover:bg-[#6c6f76]"
        onClick={close}
      >
        Close
      </button>
      <button
        onClick={sendEmail}
        className="button bg-[#3b76e1] hover:bg-[#3264bf] flex items-center "
      >
        Send{" "}
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="h-[14px] object-contain ml-1"
        />{" "}
      </button>
    </div>
  );
};

const ComposeModal = ({ setOpen, open }: ComposeProps) => {
  const authUser: User = useSelector(selectUser);
  const [to, setTo] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function sendEmail() {
    axios
      .put(`${BASE_URL}/api/emails`, {
        authUserEmail: authUser?.email,
        to,
        subject,
        email,
        authUser
      })
      .then((response) => {
        console.log({ response });
      });
  }

  return (
    <Modal
      className={`${poppins.className}`}
      title="New Email"
      centered
      open={open}
      okText={null}
      footer={<Buttons close={() => setOpen(false)} sendEmail={sendEmail} />}
      // onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <hr className="w-full" />
      <div className="flex flex-col space-y-2 mt-4">
        <input
          type="text"
          placeholder="To"
          className="input"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Email"
          rows={5}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></textarea>
      </div>
      <hr className="mt-4" />
    </Modal>
  );
};

export default ComposeModal;
