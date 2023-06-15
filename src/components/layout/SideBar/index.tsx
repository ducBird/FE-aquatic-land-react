import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { axiosClient } from "../../../libraries/axiosClient";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { motion } from "framer-motion";
interface ICategories {
  _id: string;
  name: string;
}
interface ISubCategories {
  _id: string;
  category_id: string;
  name: string;
}
interface IProducts {
  _id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  product_image: string;
}

interface CurrentCategory {
  category_id: string | null;
  sub_category_id: string | null;
}
interface SiteBarProps {
  closeSitebarOnClick: () => void;
}
function SideBar({ closeSitebarOnClick }: SiteBarProps) {
  // category
  const [categories, setCategories] = useState<Array<ICategories>>([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );

  const [categoryCurrent, setCategoryCurrent] = useState<CurrentCategory>();

  // sub categories
  const [subCategories, setSubCategories] = useState<Array<ISubCategories>>([]);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState<
    string | null
  >(null);

  // products
  const [products, setProducts] = useState<Array<IProducts>>([]);

  // const router = useRouter();
  const { categoryId } = useParams();
  const { subCategoryId } = useParams();

  useEffect(() => {
    setCategoryCurrent({ category_id: null, sub_category_id: null });
    const url = window.location.href;
    const urlArray = url.split("/");
    let categoryId: string | null = null;
    let subCategoryId: string | null = null;
    if (urlArray.includes("product-category") && urlArray.includes("sub")) {
      categoryId = urlArray[urlArray.length - 3];
      subCategoryId = urlArray[urlArray.length - 1];
    } else {
      categoryId = urlArray[urlArray.length - 1];
      subCategoryId = null;
    }
    setCategoryCurrent({
      category_id: categoryId,
      sub_category_id: subCategoryId,
    });
  }, [categoryId, subCategoryId]);

  // get categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // get subcategory
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axiosClient.get("/sub-categories");
        setSubCategories(response.data);
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  // get data products
  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        const response = await axiosClient.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchDataProducts();
  }, []);

  // hàm dùng để mở hoặc đóng category
  const toggleCategory = (
    categoryId: string | null,
    subCategoryId: string | null
  ) => {
    if (categoryCurrent?.category_id === categoryId) {
      // Đang mở và sẽ đóng
      setCategoryCurrent({ category_id: null, sub_category_id: null });
    } else {
      // Đang đóng và sẽ mở
      setCategoryCurrent({
        category_id: categoryId,
        sub_category_id: subCategoryId,
      });
    }
  };
  // sự kiện khi hover qua categoryId
  const handleCategoryMouseEnter = (categoryId: string) => {
    setHoveredCategoryId(categoryId);
  };

  const handleCategoryMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  // sự kiện khi hover qua SubCategoryId
  const handleSubCategoryMouseEnter = (subCategoryId: string) => {
    setHoveredSubCategoryId(subCategoryId);
  };

  const handleSubCategoryMouseLeave = () => {
    setHoveredSubCategoryId(null);
  };

  return (
    <>
      <div className="search-sitebar ">
        {/* search */}
        <p className="text-md font-semibold">SEARCH</p>
        <div className="border border-gray-300 w-full mt-4 rounded-md h-12 flex p-2">
          <input
            type="text"
            className="w-[85%]"
            placeholder=" Seach for products"
          />
          <div className="w-[15%] flex items-center justify-center hover:bg-green-700 cursor-pointer">
            <MdSearch className="text-2xl hover:text-white" />
          </div>
        </div>
        {/* border-b */}
        <div className="border border-b-gray-300 mt-7"></div>
        {/* categories */}
        <div className="mt-4">
          <p className="text-md font-semibold">CATEGORIES</p>
          <ul>
            {categories &&
              categories.map((category) => {
                // biến dùng để lọc ra các subcategories nằm trong 1 category
                const subCategoriesData = subCategories.filter(
                  (subCategory) => subCategory.category_id === category._id
                );

                // biến dùng để lọc ra các products nằm trong categories đó
                const productsData = products.filter(
                  (product) => product.category_id === category._id
                );

                // biến dùng để kiểm tra xem một category có được chọn không
                const categoriesLink = `/product-category/${category._id}`;
                return (
                  <li
                    className={`my-3 ${
                      categoryCurrent?.category_id === category._id &&
                      !categoryCurrent?.sub_category_id
                        ? "current-cat"
                        : ""
                    }`}
                    key={category._id}
                  >
                    <div className="flex">
                      <Link
                        to={categoriesLink}
                        className="basis-[250%]"
                        onClick={closeSitebarOnClick}
                        onMouseEnter={() =>
                          handleCategoryMouseEnter(category._id)
                        }
                        onMouseLeave={handleCategoryMouseLeave}
                      >
                        {category.name}
                      </Link>

                      <p
                        className={`count basis-1/4 border border-gray-300 rounded-full px-3 flex items-center justify-center ${
                          hoveredCategoryId === category._id
                            ? "bg-green-800 text-white"
                            : ""
                        }`}
                      >
                        {productsData.length}
                      </p>
                      <button
                        className={`basis-1/4 border border-gray-300 rounded-full ml-2 transition
                          duration-300 delay-100 flex items-center ${
                            subCategoriesData.length === 0 ? "invisible" : ""
                          }`}
                        onClick={() => {
                          toggleCategory(category._id, null);
                        }}
                      >
                        {categoryCurrent?.category_id === category._id ? (
                          <motion.p
                            whileTap={{ scale: 0.85 }}
                            className="bg-gray-200 rounded-full w-full h-full flex items-center justify-center text-lg "
                          >
                            <MdKeyboardArrowUp className="transition duration-300" />
                          </motion.p>
                        ) : (
                          <motion.p
                            whileTap={{ scale: 0.85 }}
                            className="rounded-full w-full flex items-center justify-center text-lg"
                          >
                            <MdKeyboardArrowDown className="transition duration-300" />
                          </motion.p>
                        )}
                      </button>
                    </div>
                    {categoryCurrent?.category_id === category._id &&
                      subCategoriesData.length > 0 && (
                        <ul className="ml-[20px] mt-2">
                          {subCategoriesData.map((subCategory, index) => {
                            // biến dùng để lọc ra các products nằm trong subcategories nào
                            const subCategoriesProductsData = products.filter(
                              (product) =>
                                product.sub_category_id === subCategory._id
                            );

                            return (
                              <li
                                key={subCategory._id}
                                className={`my-2 ${
                                  categoryCurrent.sub_category_id ===
                                  subCategory._id
                                    ? "current-cat"
                                    : ""
                                }`}
                              >
                                <div className="flex">
                                  <Link
                                    className="basis-[250%]"
                                    to={`/product-category/${category._id}/sub/${subCategory._id}`}
                                    key={index}
                                    onClick={closeSitebarOnClick}
                                    onMouseEnter={() =>
                                      handleSubCategoryMouseEnter(
                                        subCategory._id
                                      )
                                    }
                                    onMouseLeave={handleSubCategoryMouseLeave}
                                  >
                                    {subCategory.name}
                                  </Link>
                                  <p
                                    className={`count basis-1/4 border border-gray-300 rounded-full px-4 flex items-center justify-center ${
                                      hoveredSubCategoryId === subCategory._id
                                        ? "text-white bg-green-800"
                                        : ""
                                    }`}
                                  >
                                    {subCategoriesProductsData.length}
                                  </p>
                                  <div className="basis-1/4 ml-2"></div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
export default SideBar;
