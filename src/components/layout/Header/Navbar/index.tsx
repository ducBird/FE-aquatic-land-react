import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import NavPage from "../Subnav/NavPage";
import NavCategories from "../Subnav/NavCategories";
import { ICategory } from "../../../../interfaces/ICategory";
import { axiosClient } from "../../../../libraries/axiosClient";

interface Props {
  openMenu: boolean;
  isMobile: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  closeNavbar: () => void;
}

const Navbar = (props: Props) => {
  const { openMenu, setOpenMenu, isMobile, closeNavbar } = props;
  const [showMenuPage, setShowMenuPage] = useState(true);
  const [showMenuCategories, setShowMenuCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => {
        const filteredCategories = response.data.filter(
          (category: ICategory) => {
            return category.is_delete === false;
          }
        );
        setCategories(filteredCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClose = () => {
    setOpenMenu(false);
  };
  const handleMenuPage = () => {
    setShowMenuPage(true);
    setShowMenuCategories(false);
  };
  const handleMenuCategories = () => {
    setShowMenuCategories(true);
    setShowMenuPage(false);
  };
  return (
    <nav>
      <div
        className={`fixed h-screen z-20 w-[100%] bg-black/50 ${
          openMenu ? `visible` : `invisible`
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`fixed h-screen z-[21] w-[calc(100%-6rem)] bg-white border-r shadow-xl transition-transform duration-500 ${
          openMenu ? `translate-x-0` : `-translate-x-full`
        } left-0`}
      >
        <div className="mobile-nav">
          <div className="wd-search-form">
            <form className="search-form relative shadow-md" action="">
              <input
                className="w-full h-[70px] font-semibold pl-5 pr-12"
                type="text"
                placeholder="Search for products"
              />
              <button className="search-submit p-3 absolute top-0 right-0 bottom-0">
                <BiSearchAlt size={28} className="text-gray-600" />
              </button>
            </form>
            <div className="search-result"></div>
          </div>
          <div className="relative">
            <ul className="wd-nav flex border-b-black/10 flex-wrap uppercase">
              <li
                className={`relative flex-grow flex-shrink-0 basis-1/2 max-w-[50%] border-r`}
              >
                <a
                  href="#"
                  className="relative flex items-center flex-row text-[13px] font-bold h-full leading-4"
                  onClick={handleMenuPage}
                >
                  <span className="static flex-grow flex-shrink basis-auto px-[15px] py-[18px] text-center">
                    menu
                  </span>
                </a>
              </li>
              <li className="relative flex-grow flex-shrink-0 basis-1/2 max-w-[50%]">
                <a
                  href="#"
                  className="relative flex items-center flex-row text-[13px] font-bold h-full"
                  onClick={handleMenuCategories}
                >
                  <span className="static flex-grow flex-shrink basis-auto px-[15px] py-[18px] text-center">
                    categories
                  </span>
                </a>
              </li>
            </ul>
            <div
              className={`absolute bottom-0 h-1 w-1/2 bg-primary_green transition-all duration-300 ${
                showMenuPage ? `translate-x-0` : `-translate-x-full`
              } ${showMenuCategories ? `translate-x-full` : `translate-x-0`}`}
            ></div>
          </div>
          {showMenuPage ? (
            <NavPage
              isMobile={isMobile}
              setOpenMenu={setOpenMenu}
              closeNavbar={closeNavbar}
            />
          ) : (
            <NavCategories categories={categories} />
          )}
        </div>
        <div className="relative">
          <button
            className="fixed bottom-4 right-4 w-10 h-10 bg-primary_green/80 text-white rounded-full flex justify-center items-center shadow-lg"
            onClick={handleClose}
          >
            <MdOutlineClose size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
