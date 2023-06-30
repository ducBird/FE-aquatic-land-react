import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { axiosClient } from "../../../../libraries/axiosClient";
import Product from "../Product";
// import Link from "next/link";
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useCarts } from "../../../../hooks/useCart";

interface IProducts {
  _id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  product_image: string;
  discount: number;
}
interface ICategories {
  _id: string;
  name: string;
}
interface ISubCategories {
  _id: string;
  name: string;
}
interface CartItems {
  product: IProducts | null;
  quantity: number;
}
function ProductDetail() {
  const { add } = useCarts((state) => state);
  const [product, setProduct] = useState<IProducts | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Array<IProducts>>([]);

  const [categories, setCategories] = useState<Array<ICategories>>([]);
  const [subCategories, setSubCategories] = useState<Array<ISubCategories>>([]);

  const [quantity, setQuantity] = useState<string>("1");
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  // lấy id từ query của router
  //   const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axiosClient.get("/products/product/" + id).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);

  // get data categories
  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  // get data subcategories
  useEffect(() => {
    axiosClient.get("/sub-categories").then((response) => {
      setSubCategories(response.data);
    });
  }, []);

  const categoryId = product?.category_id;
  const subCategoryId = product?.sub_category_id;

  // ?.name có ý nghĩa là khi đã tìm thấy id phù hợp với categoryId thì dùng ?.name để truy cập vòa thuộc tính name và gán vào biến categoryName
  const categoryName = categories.find((item) => item._id === categoryId)?.name;
  const subCategoryName = subCategories.find(
    (item) => item._id === subCategoryId
  )?.name;

  // tìm ra các sản phẩm liên quan với product được chọn làm product detail
  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await axiosClient.get(
            "/products/" + categoryId + "/sub/" + subCategoryId
          );
          setRelatedProducts(response.data);
        } catch (error) {
          console.error("Error fetching related products:", error);
        }
      };

      fetchRelatedProducts();
    }
  }, [product, subCategoryId, categoryId]);

  //Loại trừ sản phẩm khỏi danh sách sản phẩm liên quan
  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct._id !== id
  );
  const Cart: CartItems = {
    product: product,
    quantity: parseInt(quantity, 10),
  };

  // các nút tăng hay giảm số lượng khi đặt hàng
  // nút trừ
  const minusClick = () => {
    setQuantity((prevQuantity: any) => {
      const newQuantity = prevQuantity - 1;
      if (newQuantity > 0) {
        return newQuantity.toString();
      } else {
        return "1";
      }
    });
  };

  const plusClick = () => {
    setQuantity((prevQuantity: any) => {
      const newQuantity = parseInt(prevQuantity, 10) + 1;
      return newQuantity.toString();
    });
  };

  return (
    <div className="m-4 lg:px-20 lg:py-8 py-4">
      <div className="product-detail">
        <div className="flex">
          <Link to="/shop">
            <p>Shop</p>
          </Link>
          <p className="mx-2">/</p>
          <Link to={`/product-category/${categoryId}`}>
            <p>{categoryName}</p>
          </Link>
          <p className="mx-2">/</p>
          <Link to={`/product-category/${categoryId}/sub/${subCategoryId}`}>
            <p className="font-semibold">{subCategoryName}</p>
          </Link>
        </div>
        <div className="lg:flex mt-3 lg:mt-10 ">
          <div className="lg:flex-1 h-[400px] lg:h-[500px] w-full flex items-center justify-center">
            <img
              src={product?.product_image}
              alt="image"
              className="cursor-pointer w-full h-full object-contain"
            />
          </div>
          <div className="p-7 lg:flex-1 border border-gray-200 h-auto lg:ml-4">
            {/* name */}
            <div className="">
              <h3 className="text-2xl text-black font-semibold">
                {product?.name}
              </h3>
            </div>

            {/* price */}
            <div className="mt-4 text-primary_green font-bold text-lg">
              10.000 VNĐ
            </div>

            {/* Stock */}
            <div className="flex mt-4">
              <MdDone className="text-primary_green" size={20} />
              <p></p>
            </div>

            {/* quantity */}
            <div className="cart flex mt-4">
              <div className="quantity flex border border-gray-200 rounded-md w-[120px] h-[42px]">
                <div className="flex flex-none p-1 border-r w-[25px] items-center justify-center">
                  <button
                    disabled={parseInt(quantity, 10) === 1}
                    onClick={minusClick}
                  >
                    -
                  </button>
                </div>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleChange}
                  className="flex-auto w-full text-center"
                />
                <div className="flex flex-none p-1 border-l w-[25px] items-center justify-center">
                  <button onClick={plusClick}>+</button>
                </div>
              </div>
              <div className="add-to-cart flex border border-gray-200 rounded-full bg-primary_green w-auto h-[42px] ml-10 items-center justify-center">
                <button
                  className="p-3 text-white text-sm hover:font-bold"
                  onClick={() => {
                    add(Cart);
                  }}
                >
                  ADD TO BASKET
                </button>
              </div>
            </div>

            <div className="border border-b-0 my-9"></div>
            <div className="flex">
              <p className="font-bold">Categories: </p>
              <Link to={`/product-category/${categoryId}`}>
                <p className="ml-2 hover:font-bold">{categoryName}</p>
              </Link>
              <p>,</p>
              <Link to={`/product-category/${categoryId}/sub/${subCategoryId}`}>
                <p className="ml-1 hover:font-bold">{subCategoryName}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-b-0 border-gray-200 my-12"></div>
      <div className="related-products my-7">
        <h4 className="text-xl font-semibold my-4">Related Products</h4>
        <div className="grid gap-x-2 gap-y-2 grid-cols-2 lg:grid-cols-5 text-center mt-5">
          <Product productItems={filteredRelatedProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
