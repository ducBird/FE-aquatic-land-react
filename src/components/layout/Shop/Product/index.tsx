// import Link from "next/link";
import { useState, useEffect } from "react";
import { MdAddShoppingCart, MdSearch } from "react-icons/md";
import { motion } from "framer-motion";
import Popup from "../Popup";
import { Link } from "react-router-dom";
import { useCarts } from "../../../../hooks/useCart";
import { IProduct } from "../../../../interfaces/IProducts";
import numeral from "numeral";
interface IProps {
  product: IProduct;
}
interface CartItems {
  product: IProduct;
  quantity: number;
}
function Product(props: IProps) {
  const { product } = props;
  const { add } = useCarts((state) => state);

  // state chứa id product được chọn
  const [productId, setProductId] = useState<string | undefined>("");
  const [productItem, setProductItem] = useState<IProduct>();
  // popup
  const [showPopup, setShowPopup] = useState(false);

  const [hoveredProductId, setHoveredProductId] = useState<string | undefined>(
    ""
  );
  const [hoveredViewProductId, setHoveredViewProductId] = useState<
    string | undefined
  >("");
  const Cart: CartItems = { product: product, quantity: 1 };
  const link = `/shop/product/${product?._id}`;
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleProductHover = (productId: string | undefined) => {
    setHoveredProductId(productId);
  };
  const handleViewProductHover = (productId: string | undefined) => {
    setHoveredViewProductId(productId);
  };
  useEffect(() => {
    setProductItem(product);
  }, [product]);

  return (
    <>
      <div className="relative border border-gray-300 rounded-md h-[390px] shadow-md">
        <Link to={link}>
          <div>
            <img
              src={productItem?.product_image}
              alt="image"
              className="w-[190px] h-[190px] object-contain mx-auto my-7 "
            />
            <p className="h-[50px]">{productItem?.name}</p>
            <div className="price text-lg text-primary_green mb-1">
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
        <div className="flex absolute bottom-0 w-full h-10 items-center justify-center">
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="text-2xl cursor-pointer relative group"
          >
            {hoveredProductId === productItem?._id && (
              <div className="text-sm text-white w-[120px] absolute top-[-190%] left-1/2 transform -translate-x-1/2 bg-black py-2 px-4 opacity-100">
                Add to basket
                <div className="arrow-down absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-black rotate-45 transform origin-center" />
                </div>
              </div>
            )}
            <button
              className="group-hover ~.hover-text:opacity-100"
              onMouseEnter={() => handleProductHover(productItem?._id)}
              onMouseLeave={() => setHoveredProductId("")}
              onClick={() => {
                add(Cart);
              }}
            >
              <MdAddShoppingCart />
            </button>
          </motion.div>
          <div className="border border-r-gray-300 mx-4 h-7"></div>
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="text-2xl cursor-pointer relative group"
          >
            {hoveredViewProductId === productItem?._id && (
              <div className="text-sm text-white w-[120px] absolute top-[-190%] left-1/2 transform -translate-x-1/2 bg-black py-2 px-4 opacity-100">
                Quick view
                <div className="arrow-down absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-3 h-3 bg-black rotate-45 transform origin-center" />
                </div>
              </div>
            )}
            <button
              className="group-hover ~.hover-text:opacity-100"
              onMouseEnter={() => handleViewProductHover(product._id)}
              onMouseLeave={() => setHoveredViewProductId("")}
              onClick={() => {
                openPopup();
                setProductId(productItem?._id);
              }}
            >
              <MdSearch />
            </button>
          </motion.div>
        </div>
        {/* hiển thị popup view xem nhanh của sản phẩm */}
        <Popup
          showPopup={showPopup}
          closePopup={closePopup}
          productId={productId}
        />
      </div>
    </>
  );
}

export default Product;
