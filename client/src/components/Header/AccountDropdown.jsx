import { useState } from "react";
import { UserSolid } from "@/assets/UserSolid";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "@/slices/api/usersApiSlice";
import { clearCredentials } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

export default function AccountDropdown({ userInfo }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap(); // make logout API call and unwrap the Promise
      dispatch(clearCredentials()); // clear STATE and LOCALSTORAGE
      navigate("/");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <main className="flex flex-col justify-center gap-2">
      {/* //? Account Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onBlur={() => setDropdownOpen(false)}
        className={`flex gap-2 items-center justify-between min-w-40 border border-onyx px-3 py-1 text-black rounded-full ${
          dropdownOpen
            ? "dark:text-white dark:ring-1 dark:ring-white"
            : "dark:text-white"
        } hover:ring-white hover:ring-1 md:me-0 `}
      >
        {/* User solid icon */}
        <div className="flex gap-2">
          <UserSolid />
          <span className="text-[.95rem]">{userInfo.name}</span>
        </div>
        {/* Down Arrow */}
        <svg
          className={`w-2 h-2 ms-3 transition-all ease-in-out ${
            dropdownOpen ? "rotate-180" : " "
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <section
        className={`${
          dropdownOpen ? "block" : "opacity-0"
        } absolute top-[100%] right-20 z-50 text-[.95rem] text-left bg-white dark:bg-cardBlack divide-y divide-onyx border border-onyx rounded-md w-fit pt-1`}
      >
        <div className="px-6 py-2 text-gray-900 dark:text-white cursor-default">
          <div className="truncate font-medium">My Account</div>
          <div className="truncate text-googleBlue">{userInfo.email}</div>
        </div>

        <div className="p-2">
          <Link
            // to="/profile/personal-info"
            to="/profile/orders"
            className="px-4 py-1 hover:bg-neutral-800 rounded-sm flex items-center gap-4"
          >
            <SettingsIcon sx={{ fontSize: 18 }} />
            <span>Profile</span>
          </Link>
        </div>
        <div className="p-2">
          <button
            onClick={logoutHandler}
            className="px-4 py-1 hover:text-[#f74557] rounded-md w-full text-left flex items-center gap-4"
          >
            <LogoutIcon sx={{ fontSize: 18 }}  />
            <span>Log out</span>
          </button>
        </div>
      </section>
    </main>
  );
}
