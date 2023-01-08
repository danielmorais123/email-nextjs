import {
  faTrash,
  faStar,
  faGem,
  faFile,
  faEnvelopeCircleCheck,
  faInbox,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Category, Menu } from "../types/types";
import ComposeModal from "./ComposeModal";
import { useSelector, useDispatch } from "react-redux";
import { select, selectSelected } from "../redux/slices/selected";


const randomColor = [
  "text-orange-400",
  "text-red-400",
  "text-sky-400",
  "text-blue-400",
  "text-violet-400",
];

const LeftEmailSide = () => {
  const [menu, setMenu] = useState<Menu[]>([
    {
      id: 1,
      icon: faInbox,
      title: "All Inbox",
      description: "How to boost website",
      notis: "16",
    },
    {
      id: 2,
      icon: faStar,
      title: "Starred",
      description: "Selected Messages",
    },
    {
      id: 3,
      icon: faGem,
      title: "Important",
      description: "Selected Messages",
    },
    {
      id: 4,
      icon: faFile,
      title: "Draft",
      description: "Re-edit your messages",
    },
    {
      id: 5,
      icon: faEnvelopeCircleCheck,
      title: "Sent Mail",
      description: "Sucessfully messages",
    },
    {
      id: 6,
      icon: faTrash,
      title: "Trash",
      description: "Removed messages",
    },
  ]);
  const [categories, setCategories] = useState<Category[]>([
    {
      category: "Theme support",
    },
    {
      category: "Freelance",
    },
    {
      category: "Social",
    },
    {
      category: "Friends",
    },
    {
      category: "Family",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selected: number = useSelector(selectSelected);



  return (
    <div className="bg-white  md:max-w-[304px] w-[92%] mx-auto md:mx-0 rounded-2xl shadow-xl ">
      <div className="w-[90%] mx-auto">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#f56e6e] text-white hover:bg-[#d05e5e] transition-all w-full rounded-xl py-2.5 mt-5 text-[13px]  tracking-wider"
        >
          Compose
        </button>
        <div className=" rounded-lg my-4 w-full">
          {menu.map((m, index) => (
            <>
              {m?.id === selected ? (
                <div
                  key={m?.id}
                  className={`bg-[#6e9ffa] relative ${
                    m?.id === 1 ? "rounded-t-lg" : null
                  } ${
                    m?.id === menu.length ? "rounded-b-lg" : null
                  } cursor-pointer relative w-full p-2 flex items-center`}
                >
                  <div className="w-[95%] mx-auto relative flex items-center">
                    <div className="w-[16px] h-[16px]">
                      <FontAwesomeIcon
                        icon={m?.icon}
                        className="text-white w-full"
                      />
                    </div>
                    <div className="ml-3 text-sm flex flex-col text-white">
                      <p>{m.title}</p>
                      <p className="text-xs tracking-wide">{m.description}</p>
                    </div>
                  </div>
                  <span className="bg-[#3b76e1] px-2 text-xs rounded-full absolute right-2 text-white">
                    {m?.notis}
                  </span>
                </div>
              ) : (
                <div
                  key={m?.id}
                  onClick={() => dispatch(select(m.id))}
                  className={`${m?.id === 1 ? "rounded-t-lg" : null} ${
                    m?.id === menu.length ? "rounded-b-lg" : null
                  }  cursor-pointer relative border w-full p-2 flex items-center"`}
                >
                  <div className="w-[95%] mx-auto flex items-center relative">
                    <div className="w-[16px] h-[16px]">
                      <FontAwesomeIcon
                        icon={m?.icon}
                        className={` ${
                          m?.id === 6 ? "text-[#f56e6e]" : "text-gray-400"
                        }  w-full`}
                      />
                    </div>

                    <div className="ml-3 text-sm flex flex-col">
                      <p className="text-[#1a1a1a] ">{m.title}</p>
                      <p className="text-xs tracking-wide text-gray-400">
                        {m.description}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#3b76e1] px-2 text-xs rounded-full absolute right-2 top-4 text-white">
                    {m?.notis}
                  </span>
                </div>
              )}
            </>
          ))}
        </div>
        <div>
          <h1 className="uppercase tracking-wide">Labels</h1>
          <div className="mt-2 mb-4 shadow-md">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${index === 0 ? "rounded-t-lg" : null} ${
                  index + 1 === categories.length ? "rounded-b-lg" : null
                }  cursor-pointer relative border w-full p-3 flex items-center"`}
              >
                <div className="w-[95%] mx-auto flex items-center relative">
                  <div className="ml-3 text-sm flex flex-col">
                    <p className="text-[#7f838b] ">{category.category}</p>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faCirclePlay}
                  className={`${randomColor[index]} h-[16px] object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {open ? <ComposeModal setOpen={setOpen} open={open} /> : null}
    </div>
  );
};

export default LeftEmailSide;
