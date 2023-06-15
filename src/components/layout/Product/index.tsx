// import Link from "next/link";
import React, { useState } from "react";
import { MdAddShoppingCart, MdSearch } from "react-icons/md";
import { motion } from "framer-motion";
import Popup from "../Popup";
import { Link } from "react-router-dom";
interface IProducts {
  _id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  product_image: string;
  discount: number;
}
interface IProps {
  displayedItems: Array<IProducts>;
}

function Product(props: IProps) {
  const { displayedItems } = props;
  // state chứa id product được chọn
  const [productId, setProductId] = useState<string>("");

  // popup
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      {displayedItems.length > 0 ? (
        displayedItems.map((item, index) => {
          const link = `/shop/product/${item._id}`;
          const productId = () => setProductId(item._id);
          return (
            <div key={item._id}>
              <div className="relative border border-gray-300 rounded-sm h-[390px]">
                <Link to={link} key={index}>
                  <div>
                    <img
                      src={item.product_image}
                      alt="image"
                      className="w-[190px] h-[190px] object-contain mx-auto my-7 "
                    />
                    <p>{item.name}</p>
                    {item.discount ? (
                      <div className="absolute top-2 right-2 py-1 px-3 bg-red-500 rounded-md">
                        <p className="text-white">- {item.discount}%</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
                <div className="flex absolute bottom-0 w-full h-10 items-center justify-center">
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="text-2xl cursor-pointer relative group"
                  >
                    <div
                      className="text-sm text-white w-[120px] hover-text absolute top-[-190%] left-1/2 transform 
          -translate-x-1/2 bg-black py-2 px-4 opacity-0 group-hover:opacity-100"
                    >
                      Add to basket
                      <div className="arrow-down absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-black rotate-45 transform origin-center" />
                      </div>
                    </div>
                    <MdAddShoppingCart />
                  </motion.div>
                  <div className="border border-r-gray-300 mx-4 h-7"></div>
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="text-2xl cursor-pointer relative group"
                  >
                    <div
                      className="text-sm text-white w-[100px] hover-text absolute top-[-190%] left-1/2 transform 
          -translate-x-1/2 bg-black py-2 px-4 opacity-0 group-hover:opacity-100"
                    >
                      Quick view
                      <div className="arrow-down absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-black rotate-45 transform origin-center" />
                      </div>
                    </div>
                    <div className="">
                      <a
                        onClick={() => {
                          openPopup();
                          productId();
                        }}
                      >
                        <MdSearch />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No items to display</p>
      )}
      {/* hiển thị popup view xem nhanh của sản phẩm */}
      <Popup
        showPopup={showPopup}
        closePopup={closePopup}
        productId={productId}
      />
    </>
  );
}

export default Product;
