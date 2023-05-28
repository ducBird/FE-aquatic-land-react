import React from "react";
import { PageMenuData } from "../../../../meta/NavPageMenu";

interface INavPage {
  isMobile: boolean;
}

export default function NavPage({ isMobile }: INavPage) {
  const menudata = PageMenuData;
  return (
    <div className="lg:flex lg:items-center lg:flex-row lg:px-[10px] lg:w-full">
      <ul className="lg:inline-flex lg:justify-center lg:items-center lg:w-full">
        {menudata.map((data, index) => {
          return isMobile ? (
            // NAVBAR MOBILE
            <li
              key={index}
              className="relative flex flex-wrap w-full max-w-full uppercase"
            >
              <a
                href="#"
                className="relative flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] border border-b-black/10 text-[13px] font-semibold focus:ring-2 focus:text-primary_green focus:ring-primary_green transition-all duration-300"
              >
                {data.icon && (
                  <span className="me-[6px]">
                    {data.icon && <data.icon size={20} />}
                  </span>
                )}
                <span>{data.value}</span>
              </a>
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
                className="flex flex-wrap flex-1 w-full px-[20px] py-[5px] items-center min-h-[50px] text-[14px] font-bold hover:text-primary_green transition-all duration-300"
              >
                <span>{data.value}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
