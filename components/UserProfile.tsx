import { User } from "../types/types";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex items-center p-2">
      <img
        src={user?.photoProfile}
        className="w-[40px] object-contain rounded-full"
        onError={(e) =>
          /* @ts-ignore */
          (e.target.src =
            "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg?w=2000")
        }
      />
      <div className="ml-2">
        <p className="text-black text-sm">{user?.displayName}</p>
        <p className="text-black text-[9px] tracking-wide flex items-center  ">
          {" "}
          <p className="font-bold">Created:</p>
          <p className="ml-1">
            {/* @ts-ignore */} {new Date(user?.createdAt).toDateString()}
          </p>{" "}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
