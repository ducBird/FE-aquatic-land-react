import React from "react";
import { AiOutlineShop, AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import LoginCart from "../../Auth/Login/LoginCart";

const FooterTool = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleLogin = () => {
    setOpenLogin(true);
  };

  return (
    <>
      <div className="container">
        <div className=" w-full fixed z-10 bg-white bottom-0">
          <div className="border-t-2 py-3">
            <div className="flex justify-evenly">
              <div className="flex flex-col">
                <div className="m-auto text-[20px] font-medium">
                  <AiOutlineShop />
                </div>
                <span>Shop</span>
              </div>
              <div className="flex flex-col">
                <div className="m-auto text-[20px] font-medium">
                  <AiOutlineHeart />
                </div>
                <span>Wishlist</span>
              </div>
              <div className="flex flex-col">
                <div className="m-auto text-[20px] font-medium">
                  <BsHandbag />
                </div>
                <span>Cart</span>
              </div>
              <div onClick={handleLogin} className="flex flex-col">
                <div className="m-auto text-[20px] font-medium">
                  <RxPerson />
                </div>
                <span>My account</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginCart openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
};
export default FooterTool;
