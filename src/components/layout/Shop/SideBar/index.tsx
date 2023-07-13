import { useState, useEffect } from "react";
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { axiosClient } from "../../../../libraries/axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import numeral from "numeral";
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
  categories: ICategories[];
  subCategories: ISubCategories[];
  onHandleFilterProducts: (filter: number[]) => void;
}
function SideBar({
  closeSitebarOnClick,
  categories,
  subCategories,
  onHandleFilterProducts,
}: SiteBarProps) {
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [categoryCurrent, setCategoryCurrent] = useState<CurrentCategory>();
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState<
    string | null
  >(null);

  // products
  const [products, setProducts] = useState<Array<IProducts>>([]);

  // xử lý click tìm kiếm
  const [searchValue, setSearchValue] = useState<string>("");
  // const router = useRouter();
  const { categoryId } = useParams();
  const { subCategoryId } = useParams();

  const [sliderValue, setSliderValue] = useState([0, 1000000]); // Giá trị ban đầu của thanh trượt là từ 0 đến 100

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
  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search-products?name=${formattedValue}`);
    } else {
      alert("Please enter your information in the search box ");
    }
  };
  const formattedValue = searchValue.replace(/\s+/g, "+");
  const navigate = useNavigate();
  // hàm dùng để sử dụng phím enter để tìm kiếm
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      closeSitebarOnClick();
    }
  };

  // sự kiện thanh lọc giá sản phẩm
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <>
      <div className="search-sitebar ">
        {/* search */}
        <p className="text-md font-semibold">SEARCH</p>
        <div className="relative border border-gray-300 w-full mt-4 rounded-md h-12 flex">
          <input
            type="text"
            className="w-[85%] h-full rounded-md border-none pl-4"
            placeholder=" Search for products"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div
            className="w-[15%] h-full flex items-center justify-center hover:bg-green-700 cursor-pointer hover:text-white"
            onClick={() => {
              handleSearch();
              closeSitebarOnClick();
            }}
          >
            <Link
              to={
                searchValue.trim() !== ""
                  ? `/search-products?name=${formattedValue}`
                  : ""
              }
            >
              <MdSearch className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
      {/* border-b */}
      <div className="border border-b-0 mt-7"></div>

      {/* categories */}
      <div className="categories-sitebar mt-4">
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
                      className={`count basis-1/4  border border-gray-300 rounded-full px-3 flex items-center justify-center ${
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
                      <ul className="ml-[10px] mt-2">
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
                                    handleSubCategoryMouseEnter(subCategory._id)
                                  }
                                  onMouseLeave={handleSubCategoryMouseLeave}
                                >
                                  {subCategory.name}
                                </Link>
                                <p
                                  className={`count basis-1/4  border border-gray-300 rounded-full px-4 flex items-center justify-center ${
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
        <div className="border border-t-0 my-7"></div>
        <div className="slider-container mb-5 px-3">
          <Slider
            min={0}
            max={1000000}
            value={sliderValue}
            onChange={handleSliderChange}
            range
            className="z-0"
          />
        </div>
        <div className="flex text-lg">
          <p>Price:</p>
          <p className="ml-2 font-bold">
            {numeral(sliderValue[0]).format("0,0")} -{" "}
            {numeral(sliderValue[1]).format("0,0")}
          </p>
        </div>
        <button
          onClick={() => {
            onHandleFilterProducts(sliderValue);
            closeSitebarOnClick();
          }}
          className="border py-1 px-4 rounded-full bg-primary_green text-white font-bold mt-2"
        >
          FILTER
        </button>
      </div>
    </>
  );
}
export default SideBar;
