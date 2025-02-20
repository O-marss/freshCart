import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { UserContext } from "../../context/UserContext";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowRight, MdOutlineFavoriteBorder } from "react-icons/md";
import {
  IoIosHelpCircleOutline,
  IoMdArrowDropdown,
} from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import useCategories from "../../Hooks/useCategories";
import useWishList from "../../Hooks/useWishList";
import useCart from "../../Hooks/useCart";
import SearchBar from "../SearchBar/SearchBar";
import MobileSearchBar from "../MobileSearchBar/MobileSearchBar";

export default function Navbar({ hideOverlay, showOverlay }) {

  const { userToken, setUserToken, userName, setUserName } = useContext(UserContext);

  const { data: categories } = useCategories(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "getAllCategories"
  );


  const { cartResponse } = useCart();
  const { wishListResponse } = useWishList();
  const { data } = cartResponse;
  const { data: wishListData } = wishListResponse;

  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null)

  const handleBlur = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      setCategoryIsOpen(false);
      hideOverlay()
    }
  };

  const handleUserMenuBlur = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.relatedTarget)) {
      setUserMenuOpen(false);
      hideOverlay()
    }
  };

  const handleCategoryMenu = () => {
    if (categoryIsOpen === true) {
      setCategoryIsOpen(false);
      hideOverlay()
    } else {
      setCategoryIsOpen(true);
      showOverlay()
    }
  };
  const handleUserMenu = () => {
    if (userMenuOpen === true) {
      setUserMenuOpen(false);
      hideOverlay()
    } else {
      setUserMenuOpen(true);
      showOverlay()
    }
  };

  const handleNavMenu = () => {
    if (navIsOpen === true) {
      setNavIsOpen(false);
      hideOverlay()
    } else {
      setNavIsOpen(true);
      showOverlay()
    }
  };

  function signOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUserName(null);
    setUserToken(null);
    navigate("");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 start-0 end-0 flex flex-col gap-3 bg-white  shadow-md md:shadow-none px-1 lg:px-8 border-b border-b-gray-400 z-[99999] ${isScrolled ? "py-2" : "py-3 md:py-4"
          }`}
      >
        <nav
          className={`lg:container flex items-center justify-start bg-white px-4 lg:px-14`}
          aria-label="Global"
        >
          <div onClick={() => handleNavMenu()} className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparen"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <Link to={""} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img className="w-[100px] md:w-[130px]" src={logo} alt="" />
          </Link>

          <div className={`${styles.nav_btns} relative hidden md:block`} ref={menuRef} tabIndex={-1} onBlur={handleBlur}>
            <button
              onClick={() => {
                handleCategoryMenu();
              }}
              className="py-2 px-3 relative z-50 text-sm font-semibold text-[#222]"
            >
              <BiCategory className="inline-block text-md me-1" />
              Categories
            </button>
            <div
              className={
                categoryIsOpen
                  ? `${styles.categories_menu} z-[99999]`
                  : `!h-0 !scale-0 ${styles.categories_menu}`
              }
            >
              <span className="bg-white fixed top-[-6px] left-10 w-[12px] h-[12px] rotate-[45deg] border-t border-t-[#0e0e0e2e] border-l border-l-[#0e0e0e2e]"></span>
              {categories?.map((category) => (
                <Link
                  key={category._id}
                  to={`/specificCategory/${category._id}`}
                  className={` text-sm overflow-y-hidden ${styles.categories}`}
                  onClick={() => handleCategoryMenu()}
                >
                  <span className="block px-3 py-3 hover:bg-gray-200">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={`flex font-semibold text-[12px] md:text-sm`}>
            <Link to={`products`} className={`py-2 px-2 lg:px-3 ${styles.nav_links}`}>Products</Link>
            <Link to={`brands`} className={`py-2 px-2 lg:px-3 ${styles.nav_links}`}>Brands</Link>
          </div>

          {/* ########## Search ############# */}
          <SearchBar hideOverlay={hideOverlay} showOverlay={showOverlay} />

          {!userToken && (
            <>
              <div
                className={`${styles.nav_btns} relative hidden md:flex md:justify-end space-x-3 ms-2 me-1 z-50 py-1 px-5`}
              >
                <NavLink
                  to={"signin"}
                  className=" font-medium text-[#222] text-sm relative z-50"
                >
                  Sign in
                </NavLink>
              </div>
            </>
          )}

          <div
            className={`ms-auto md:gap-2.5 ${isFocused && !userToken ? "hidden" : "flex"
              } md:flex `}

          >
            <div
              className={`${userToken && "hidden"
                } user_icon flex items-center justify-center md:hidden`}
            >
              <NavLink
                to={"signin"}
                className="hover:bg-[#ccebff] hover:rounded-full p-1"
              >
                <AiOutlineUser className="text-2xl" />
              </NavLink>
            </div>
            <div className="favorite_icon flex items-center justify-center">
              <NavLink
                to={"favorites"}
                className="hover:bg-[#ccebff] hover:rounded-full p-1 relative"
              >
                <MdOutlineFavoriteBorder className="text-2xl" />


                {userToken && wishListData?.count > 0 ? (
                  <span className="absolute -top-1 right-0 bg-main px-1 rounded-full text-white text-[12px]">
                    {wishListData?.count}
                  </span>
                ) : (
                  <span className="absolute -top-1 right-0 bg-main px-1 rounded-full text-white text-[12px]">
                    0
                  </span>
                )}
              </NavLink>
            </div>
            <div className="cart_icon flex items-center justify-center">
              <NavLink
                to={"cart"}
                className="hover:bg-[#ccebff] hover:rounded-full p-1 relative"
              >
                <IoCartOutline className="text-2xl " />
                {userToken && data?.numOfCartItems > 0 ? (
                  <span className="absolute -top-1 right-0 bg-main px-1 rounded-full text-white text-[12px]">
                    {data?.numOfCartItems}
                  </span>
                ) : (
                  <span className="absolute -top-1 right-0 bg-main px-1 rounded-full text-white text-[12px]">
                    0
                  </span>
                )}
              </NavLink>
            </div>
            <div
              className={`${userToken ? "flex" : "hidden"
                } cart_icon items-center justify-center relative`}
              ref={userMenuRef} tabIndex={-1} onBlur={handleUserMenuBlur}

            >
              <button
                onClick={() => {
                  handleUserMenu();
                }}
                className="hover:bg-[#ccebff] hover:rounded-full p-1 flex gap-2 items-center justify-center "
              >
                <FaUserCircle className="text-2xl" />
                <IoMdArrowDropdown className="hidden md:block" />
              </button>
              <div
                className={`${userMenuOpen
                  ? `${styles.list_menu}`
                  : `!h-0 !scale-0 ${styles.list_menu}`
                  } md:!right-0  `}

              >
                <Link
                  to={""}
                  className="user_name flex gap-4 items-center bg-[#ccebff] p-5 rounded-t-md border-b border-[#0e0e0e2e] "
                  onClick={handleUserMenu}
                >
                  <FaUserCircle className="text-xl" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{userName}</span>
                    <span className="text-sm">View your profile</span>
                  </div>
                </Link>
                <Link
                  to={""}
                  className="help_center flex gap-4 items-center px-5 py-3 hover:bg-[#eee]"
                  onClick={handleUserMenu}

                >
                  <IoIosHelpCircleOutline className="text-xl" />
                  <span className="text-sm">Help Center</span>
                </Link>
                <Link
                  to={""}
                  className="account_setting flex gap-4 items-center px-5 py-3 hover:bg-[#eee]"
                  onClick={handleUserMenu}

                >
                  <IoSettingsOutline className="text-xl" />
                  <span className="text-sm">Account Settings</span>
                </Link>

                <div
                  onClick={() => signOut()}
                  className="sign_out w-full flex gap-4 items-center px-5 py-3 hover:bg-[#eee] cursor-pointer"
                >
                  <RiLogoutBoxLine className="text-xl" />
                  <span className=" font-medium text-[#222] text-sm">
                    Sign Out
                  </span>
                </div>
                <span className="absolute top-[-6px] end-5 w-[12px] h-[12px] rotate-[45deg] border-t border-t-[#ccebff] border-l border-l-[#ccebff] bg-[#ccebff]"></span>
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        {/* Background backdrop, show/hide based on slide-over state. */}

        <div
          className={`${navIsOpen ? "top-auto" : "top-full"
            } fixed inset-x-0 bottom-0 z-[99] w-full overflow-y-auto bg-white px-3 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-[top]`}
        >
          <div className="flex items-center">
            <h3 className="text-center text-md text-[#222] font-semibold flex-1 justify-center">
              Browse Categories
            </h3>
            <button
              onClick={() => handleNavMenu()}
              onBlur={() => setNavIsOpen(false)}
              type="button"
              className="-m-2.5 bg-transparent hover:bg-gray-200 rounded-full p-2.5 text-[#222] transition-all "
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root ">
            <div className="-my-6">
              <div className="flex flex-col py-6">
                {categories?.map((category) => (
                  <div
                    key={category._id + 1}
                    className="flex justify-between items-center"
                  >
                    <Link
                      to={`/specificcategory/${category._id}`}
                      className="w-full flex justify-between items-center px-3 py-3 text-sm hover:bg-black hover:bg-opacity-5"
                    >
                      <span>{category.name}</span>
                      <MdKeyboardArrowRight className="text-xl" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ########## After sign in Search in mobile ############# */}
        <MobileSearchBar hideOverlay={hideOverlay} showOverlay={showOverlay} />
      </header>
    </>
  );
}
