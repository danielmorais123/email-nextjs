import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { ObjectId } from "mongodb";
import { StaticImageData } from "next/image";

export interface Menu {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
  notis?: string;
}

export interface Category {
  category: string;
}

export interface User {
  _id: string;
  photoProfile: string;
  emailConfirmed: boolean;
  createdAt: string | Date;
  provider: string;
  displayName: string;
  email: string;
  notifications: Notification[] | [];
  emails: Email[] | [];
}

export interface Email {
  _id: string | ObjectId;
  fromUser: User | null;
  title: string;
  type: string;
  emailContent: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  type: string;
  description: string;
  createdAt: string | Date;
  userSender?: User;
  userSenderId?: string;
}

export interface Chat {
  id: number;
  created_at: string | Date | any;
  usersInChat: User[];
  lastMessage: string;
  lastMessage_date: Date | string | any;
  userOne: string;
  userTwo: string;
}

export interface Message {
  id: number;
  created_at: string | Date | any;
  chatId: number;
  user: User;
  message: string;
}
