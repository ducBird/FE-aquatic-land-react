// import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IProduct } from "../../../../interfaces/IProducts";
import numeral from "numeral";
import PopupView from "../Popup/PopupView";
import PopupVariantOption from "../Popup/PopupVariantOption";
interface IProps {
  product: IProduct;
}
function Product(props: IProps) {
  const { product } = props;

  // state chứa id product được chọn
  const [productId, setProductId] = useState<string | undefined>("");
  const [productItem, setProductItem] = useState<IProduct | undefined>();
  // popup
  const [showPopupView, setShowPopupView] = useState(false);
  const [showPopupVariant, setShowPopupVariant] = useState(false);

  const link = `/shop/product/${product?._id}`;
  const openPopup = (type: string) => {
    if (type === "view") {
      setShowPopupView(true);
    } else if (type === "variant") {
      setShowPopupVariant(true);
    }
    setProductId(productItem?._id);
  };

  const closePopup = () => {
    setShowPopupView(false);
    setShowPopupVariant(false);
  };

  useEffect(() => {
    setProductItem(product);
  }, [product]);

  return (
    <>
      <div className="relative border border-gray-300 rounded-md h-[400px] shadow-md ">
        <Link to={link} onClick={() => window.scrollTo(0, 0)}>
          <div>
            <img
              src={productItem?.product_image}
              alt="image"
              className="w-[190px] h-[190px] object-contain mx-auto my-7 "
            />
            <div>
              <p className="h-[50px]">{productItem?.name} </p>
            </div>
            <div className="price text-lg text-primary_green mb-3 mt-5">
              <span
                className={
                  productItem?.discount
                    ? "line-through text-black"
                    : "list-none  font-bold"
                }
              >
                {numeral(productItem?.price).format("0,0").replace(/,/g, ".")}
              </span>
              <span
                className={productItem?.discount ? "pl-2 font-bold" : "hidden"}
              >
                {numeral(productItem?.total).format("0,0").replace(/,/g, ".")}
              </span>
            </div>

            {productItem?.discount ? (
              <div className="absolute top-2 right-2 py-1 px-3 bg-red-500 rounded-md">
                <p className="text-white">- {productItem?.discount}%</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>

        <div className="flex items-center justify-center h-[25px]">
          <motion.div whileTap={{ scale: 0.85 }} className=" cursor-pointer">
            <button
              className="px-4 py-1 border rounded-full bg-primary_green text-white"
              onClick={() => {
                openPopup("variant");
                setProductId(productItem?._id);
              }}
            >
              Buy
            </button>
          </motion.div>
          <div className="mx-2 border-r border-0 h-full"></div>
          <motion.div whileTap={{ scale: 0.85 }} className=" cursor-pointer">
            <button
              className="px-4 py-1 border rounded-full bg-primary_green text-white"
              onClick={() => {
                openPopup("view");
                setProductId(productItem?._id);
              }}
            >
              View
            </button>
          </motion.div>
        </div>

        {/* hiển thị popup view xem nhanh của sản phẩm */}
        <PopupView
          showPopup={showPopupView}
          closePopup={closePopup}
          productId={productId}
        />
        <PopupVariantOption
          showPopup={showPopupVariant}
          closePopup={closePopup}
          productId={productId}
        />
      </div>
    </>
  );
}

export default Product;
