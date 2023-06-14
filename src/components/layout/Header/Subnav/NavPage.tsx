import React from "react";
import { PageMenuData } from "../../../../meta/NavPageMenu";
import LoginCart from "../../../Auth/Login/LoginCart";
import { Link } from "react-router-dom";

interface INavPage {
  isMobile: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavPage({ isMobile, setOpenMenu }: INavPage) {
  const menudata = PageMenuData;
  // const [openLogin, setOpenLogin] = React.useState(false);
  const handleLogin = () => {
    // setOpenLogin(true);
    setOpenMenu(false);
  };
  const lastItemIndex = menudata.length - 1;
  return (
    <>
      <div className="lg:flex lg:items-center lg:flex-row lg:px-[10px] lg:w-full">
        <ul className="lg:inline-flex lg:justify-center lg:items-center lg:w-full">
          {menudata.map((data, index) => {
            return isMobile ? (
              // NAVBAR MOBILE
              <li
                key={index}
                className="relative flex flex-wrap w-full max-w-full uppercase"
              >
                {/* <a
                href="#"
                className="relative flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] border border-b-black/10 text-[13px] font-semibold focus:ring-2 focus:text-primary_green focus:ring-primary_green transition-all duration-300"
              >
                {data.icon && (
                  <span className="me-[6px]">
                    {data.icon && <data.icon size={20} />}
                  </span>
                )}
                <span>{data.value}</span>
              </a> */}
                {index === lastItemIndex ? (
                  <Link
                    to={"/component/auth/register"}
                    className="relative flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] border border-b-black/10 text-[13px] font-semibold focus:ring-2 focus:text-primary_green focus:ring-primary_green transition-all duration-300"
                    onClick={handleLogin}
                  >
                    {data.icon && (
                      <span className="me-[6px]">
                        {data.icon && <data.icon size={20} />}
                      </span>
                    )}
                    <span>{data.value}</span>
                  </Link>
                ) : (
                  <a
                    href="#"
                    className={`flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] text-[14px] font-bold hover:text-primary_green transition-all duration-300 ${
                      data.icon ? "" : ""
                    }`}
                  >
                    <span>{data.value}</span>
                  </a>
                )}
              </li>
            ) : (
              // NAVBAR DESKTOP
              <li
                key={index}
                className={`relative flex flex-wrap uppercase ${
                  data.icon ? "hidden" : ""
                }`}
              >
                <a
                  href="#"
                  className="flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] text-[14px] font-bold hover:text-primary_green transition-all duration-300 header__menu"
                >
                  <span className="header__navpage">{data.value}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <LoginCart openLogin={openLogin} setOpenLogin={setOpenLogin} /> */}
    </>
  );
}
