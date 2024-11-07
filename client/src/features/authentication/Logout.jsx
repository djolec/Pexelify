import { useAuth } from "../../context/AuthContext";
import LogoutIcon from "../../assets/svg/logout.svg?react";
import useLogout from "./useLogout";
import truncateText from "../../utils/truncateText";

const Logout = () => {
  const { auth } = useAuth();

  const logout = useLogout();

  return (
    <div className="-translate-x-4">
      <button
        onClick={logout}
        className="relative flex w-full flex-row items-center gap-3 rounded-full px-4 py-3 text-[var(--on-background)] after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:hover:bg-gray-600/10 2xl:w-[340px] 2xl:py-4"
      >
        <LogoutIcon className="h-7 w-auto fill-[var(--on-background)] 2xl:h-10" />
        <span className="text-2xl sm:text-xl 2xl:text-4xl">Log out</span>
      </button>
      <h4 className="translate-x-4 text-xl text-[var(--on-background)] 2xl:text-2xl">
        {truncateText(auth.username, 22)}
      </h4>
    </div>
  );
};

export default Logout;
