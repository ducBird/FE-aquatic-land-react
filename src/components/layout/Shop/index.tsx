import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import Products from "../Products";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../../libraries/axiosClient";
interface ICategories {
  _id: string;
  name: string;
}
interface ISubCategories {
  _id: string;
  name: string;
}
function Shop() {
  const [categories, setCategories] = useState<Array<ICategories>>([]);
  const [subCategories, setSubCategories] = useState<Array<ISubCategories>>([]);
  const [openSitebar, setOpenSiteBar] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const handleSiteBar = () => {
    setOpenSiteBar(true);
  };
  const handleSiteBarClose = () => {
    setOpenSiteBar(false);
  };
  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (windowSize.width < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    // console.log(windowSize);
  }, [windowSize]);

  useEffect(() => {
    // Thêm hoặc xóa thanh scoll khi showModal thay đổi
    if (openSitebar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openSitebar]);
  // get categories
  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  // get subcategories
  useEffect(() => {
    axiosClient.get("/sub-categories").then((response) => {
      setSubCategories(response.data);
    });
  }, []);
  const { categoryId } = useParams();
  const { subCategoryId } = useParams();

  // ?.name có ý nghĩa là khi đã tìm thấy id phù hợp với categoryId thì dùng ?.name để truy cập vòa thuộc tính name và gán vào biến categoryName
  const categoryName = categories.find((item) => item._id === categoryId)?.name;
  const subCategoryName = subCategories.find(
    (item) => item._id === subCategoryId
  )?.name;
  return (
    <>
      <div className="w-full bg-primary_green h-[75px]">
        {subCategoryId ? (
          <h3 className="h-full w-full flex items-center justify-center text-3xl lg:text-4xl text-white font-bold">
            {subCategoryName}
          </h3>
        ) : categoryId ? (
          <h3 className="h-full w-full flex items-center justify-center text-3xl lg:text-4xl text-white font-bold">
            {categoryName}
          </h3>
        ) : (
          <h3 className="h-full w-full flex items-center justify-center text-3xl lg:text-4xl text-white font-bold">
            Shop
          </h3>
        )}
      </div>
      <div
        className={`fixed h-screen z-20 w-[100%] ${
          openSitebar ? "bg-black/50 visible" : "invisible"
        }`}
        onClick={handleSiteBarClose}
      ></div>
      <div className="w-full h-auto relative lg:flex lg:px-20 mb-10">
        {isMobile && (
          <div className="flex m-5">
            <button onClick={handleSiteBar}>
              <FiMenu size={19} />
            </button>
            <p className="ml-2" onClick={handleSiteBar}>
              Show SiteBar
            </p>
          </div>
        )}
        <div
          className={`${
            isMobile
              ? "absolute left-0 -top-5 z-20 bg-white h-screen w-full"
              : "lg:w-[25%] lg:block "
          } p-5 ${isMobile && !openSitebar ? "hidden" : ""}`}
        >
          <button
            className="absolute top-3 right-3 text-red-500 lg:hidden"
            onClick={handleSiteBarClose}
          >
            <MdOutlineClose size={25} />
          </button>
          <p className="my-8"></p>
          <div
            className="sitebar-content h-full overflow-y-auto"
            style={{ overflowY: "auto", maxHeight: "800px" }}
          >
            <SideBar closeSitebarOnClick={handleSiteBarClose} />
          </div>
        </div>

        <div
          className={`shop-content lg:w-[70%] m-5 lg:m-10 ${
            isMobile && openSitebar ? "lg:ml-[30%]" : ""
          }`}
        >
          <Products
            categoryName={categoryName}
            subCategoryName={subCategoryName}
          />
        </div>
      </div>
    </>
  );
}

export default Shop;
