import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsCamera } from "react-icons/bs";
import { HiOutlinePhone } from "react-icons/hi";
import AquaticLogo from "../../../assets/ImageAquaticLand.png";

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="w-full mt-[100px] px-3">
          <div className="md:grid md:grid-cols-12">
            <div className="md:col-span-3">
              <h1 className="text-[20px] font-semibold mb-[15px]">
                Quick Links
              </h1>
              <ul className="flex flex-col gap-2">
                <li className="">
                  <a href="" className="">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    My account
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Return Policy
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h1 className="text-[20px] font-semibold mb-[15px] mt-[35px] md:mt-0">
                Navigation
              </h1>
              <ul className="flex flex-col gap-2">
                <li className="">
                  <a href="" className="">
                    Aquarium
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Aquatic Plants
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Books / Posters
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Bundles
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Fertilisers & Conditioners
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Filtration & Media
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Gift Vouchers
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h1 className="text-[20px] font-semibold mb-[15px] mt-[35px] md:mt-0">
                Brands
              </h1>
              <ul className="flex flex-col gap-2 text-text_gray">
                <li className="">
                  <a href="" className="">
                    Twinstar
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Strideways
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Scape
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    Oase
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    EpicAquatics
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    DOOA
                  </a>
                </li>
                <li>
                  <a href="" className="">
                    CO2art
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:flex md:flex-col md:col-span-3">
              <div className="w-[100%] h-[80] mt-[35px] md:mt-0">
                <img src={AquaticLogo} height="100%" alt="" />
              </div>
              <div className="mt-[20px] text-text_gray">
                <p className="text-center">
                  Easy Scape is the most affordable and convenient supplier of
                  premium, competition grade Aquascaping gear in South Africa.
                </p>
              </div>
              <div className="flex justify-center gap-4 my-[35px] text-[20px] cursor-pointer">
                <BsFacebook className="opacity-[0.4] hover:opacity-[1]" />
                <BsCamera className="opacity-[0.4] hover:opacity-[1]" />
                <HiOutlinePhone className="opacity-[0.4] hover:opacity-[1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full lg:mb-0 mb-[80px]">
        <p className="my-[15px] text-center">COPYRIGHT EASYSCAPE 2020 </p>
      </div>
    </>
  );
};
export default Footer;
