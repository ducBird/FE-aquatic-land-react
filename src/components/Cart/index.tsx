import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { BsFillCartXFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = (props: Props) => {
  const { openCart, setOpenCart } = props;
  const handleCloseCart = () => {
    setOpenCart(false);
  };
  const [products, setProducts] = React.useState(true);
  return (
    <div>
      <div
        className={`fixed h-screen z-20 w-[100%] bg-black/50 ${
          openCart ? `visible` : `invisible`
        }`}
        onClick={handleCloseCart}
      ></div>
      <div
        className={`fixed h-screen z-[100] w-[80%] lg:w-[25%] bg-white border-r shadow-xl transition-transform duration-500 ${
          openCart ? `-translate-x-full` : `translate-x-full`
        } left-full`}
      >
        <div className="py-6 px-3 border border-b flex justify-between items-center">
          <img
            className=" w-[100px] "
            src="https://easyscape.co.za/wp-content/uploads/2021/08/EasyScape.svg"
            alt="image_brand"
          />
          <h4 className="font-extrabold">Shopping Cart</h4>
          <div
            className="flex items-center font-medium cursor-pointer gap-1 hover:opacity-[0.7] text-[20px]"
            onClick={handleCloseCart}
          >
            <MdOutlineClose />
          </div>
        </div>
        {products ? (
          <div className=" h-[100vh] mb-5">
            <div className="h-[65vh] border-b">
              <ul className="">
                <li className="border-b">
                  <div className="flex justify-between py-3 px-2">
                    <div className="">
                      <img
                        className="w-[80px]"
                        src="	https://easyscape.co.za/wp-content/uploads/2020/11/Micranthemum-Monte-Carlo.png"
                        alt=""
                      />
                    </div>
                    <div className="max-w-[180px] md:max-w-[220px] leading-[25px]">
                      <h2 className="font-medium leading-[20px]">
                        Micranthemum sp ‘Monte Carlo’
                      </h2>
                      <p className="text-primary_green text-[13px] ">
                        only 4 left
                      </p>
                      <span className="flex items-center">
                        1
                        <AiOutlineClose size={10} />
                        <span className="text-primary_green">R58</span>
                      </span>
                    </div>
                    <span className="cursor-pointer text-[20px]">
                      <AiOutlineClose />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-[35vh] py-3 px-6">
              <div className="flex justify-between">
                <span className="text-[20px] font-bold">Subtotal:</span>
                <span className="text-[20px]">R388</span>
              </div>
              <div className="flex flex-col mt-4 gap-4">
                <Link
                  className="bg-primary_green py-2 rounded-[20px] text-white hover:opacity-[0.9] text-center"
                  to={"/component/checkcart/shoppingcart"}
                >
                  <button>VIEW BASKET</button>
                </Link>
                <Link
                  to={"/component/checkcart/checkout"}
                  className="bg-primary_green py-2 rounded-[20px] text-white hover:opacity-[0.9] text-center"
                >
                  <button>CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-menu mt-8">
            <div className="text-center ">
              <BsFillCartXFill
                size={130}
                className="m-auto mb-3 text-[#f1f1f1]"
              />
              <h2 className="font-medium text-[16px] my-4">
                No product in the basket.
              </h2>
              <button className="text-[13px] text-white font-extrabold bg-primary_green p-3 rounded-[20px]">
                RETURN TO SHOP
              </button>
            </div>
          </div>
        )}
        {/* <div className="relative">
          <button
            className="fixed bottom-4 left-4 w-10 h-10 bg-primary_green/80 text-white rounded-full flex justify-center items-center shadow-lg"
            onClick={handleCloseCart}
          >
            <MdOutlineClose size={30} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
