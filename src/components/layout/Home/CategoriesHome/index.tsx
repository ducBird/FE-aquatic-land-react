import { useState } from "react";
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";
import { ICategory } from "../../../../interfaces/ICategory";
import { IProduct } from "../../../../interfaces/IProducts";
import { Link } from "react-router-dom";
import { CartItems } from "../../../../interfaces/ICartItems";
import { useCarts } from "../../../../hooks/useCart";
import numeral from "numeral";
interface IProps {
  categories: ICategory[];
  products: IProduct[];
}
function CategoriesHome(props: IProps) {
  const { categories, products } = props;
  const [filter, setFilter] = useState<string>("Dry Goods");
  const findProductByCategoryName = products.filter(
    (product) => product.category.name === filter
  );
  const { add } = useCarts((state) => state);

  return (
    <div className="mt-16">
      <p
        className="md:text-2xl text-xl font-semibold capitalize text-headingColor 
            relative before:absolute before:rounded-lg before:content before:w-24 md:before:w-28
            before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-primary_green to-green-700 mr-auto"
      >
        Categories
      </p>
      <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none lg:overflow-x-hidden">
        {categories &&
          categories.map((category, index) => {
            const categoryName = category.name ? category.name : "";
            return (
              <motion.div
                whileTap={{ scale: 0.85 }}
                key={index}
                className={`group ${
                  filter === category?.name ? "bg-primary_green" : "bg-green-50"
                } w-28 min-w-[94px] h-32 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center 
                  justify-center duration-100 transition-all ease-in-out hover:bg-primary_green`}
                onClick={() => {
                  setFilter(categoryName);
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category?.name ? "bg-white" : "bg-primary_green"
                  } group-hover:bg-white 
                  flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category?.name ? "text-black" : "text-white"
                    } group-hover:text-black text-lg`}
                  />
                </div>
                <p
                  className={`md:text-sm text-xs ${
                    filter === category?.name ? "text-white" : "text-black"
                  } group-hover:text-white`}
                >
                  {category?.name}
                </p>
              </motion.div>
            );
          })}
      </div>
      <div className="w-full lg:flex lg:items-center lg:justify-center gap-5 mt-5">
        {findProductByCategoryName &&
          findProductByCategoryName.map((item, index) => {
            const Cart: CartItems = {
              product: item,
              quantity: 1,
            };

            return (
              <div
                key={index}
                className="relative w-[70%] h-[350px] lg:w-[230px] lg:h-[430px] text-center border mb-5 justify-center rounded-md
                            shadow-md mx-auto lg:mx-0"
              >
                <Link to={`shop/product/${item._id}`}>
                  <div className="w-full flex items-center justify-center lg:h-[65%] lg:mt-0 mt-4">
                    <img
                      src={item.product_image}
                      alt="image"
                      className="lg:w-[90%] h-[200px] object-contain p-3"
                    />
                  </div>
                  <p className="h-[14%] font-bold cursor-pointer">
                    {item.name}
                  </p>
                </Link>
                <div className="price text-lg text-primary_green mb-1">
                  <span
                    className={
                      item?.discount
                        ? "line-through text-black"
                        : "list-none  font-bold"
                    }
                  >
                    {numeral(item?.price).format("0,0").replace(/,/g, ".")}
                  </span>
                  <span
                    className={item?.discount ? "pl-2 font-bold" : "hidden"}
                  >
                    {numeral(item?.total).format("0,0").replace(/,/g, ".")}
                  </span>
                </div>
                <button
                  className="absolute bottom-3 left-[30%] right-[30%] bg-primary_green border rounded-full shadow-md"
                  onClick={() => {
                    add(Cart);
                  }}
                >
                  <p className="px-5 py-1 text-white hover:font-bold">Buy</p>
                </button>
                {item.discount > 0 && (
                  <div className="absolute top-0 right-0">
                    <p className="px-3 py-1 text-red-500 font-bold">
                      - {item.discount}%
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CategoriesHome;