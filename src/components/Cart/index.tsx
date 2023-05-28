import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

interface Props {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = (props: Props) => {
  const { openCart, setOpenCart } = props;
  const handleCloseCart = () => {
    setOpenCart(false);
  };
  return (
    <div>
      <div
        className={`fixed h-screen z-20 w-[100%] bg-black/50 ${
          openCart ? `visible` : `invisible`
        }`}
        onClick={handleCloseCart}
      ></div>
      <div
        className={`fixed h-screen z-[100] w-[70%] lg:w-[25%] bg-white border-r shadow-xl transition-transform duration-500 ${
          openCart ? `-translate-x-full` : `translate-x-full`
        } left-full`}
      >
        <h4>Shopping Cart</h4>
        <div className="cart-menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="relative">
          <button
            className="fixed bottom-4 left-4 w-10 h-10 bg-primary_green/80 text-white rounded-full flex justify-center items-center shadow-lg"
            onClick={handleCloseCart}
          >
            <MdOutlineClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
