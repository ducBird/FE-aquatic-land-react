import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { axiosClient } from "../../../../libraries/axiosClient";
import Product from "../Product";
// import Link from "next/link";
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useCarts } from "../../../../hooks/useCart";
import { IProduct } from "../../../../interfaces/IProducts";
import numeral from "numeral";
interface ICategories {
  _id: string;
  name: string;
}
interface ISubCategories {
  _id: string;
  name: string;
}
interface CartItems {
  product: IProduct | null;
  quantity: number;
}
function ProductDetail() {
  const { add } = useCarts((state) => state);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Array<IProduct>>([]);

  const [categories, setCategories] = useState<Array<ICategories>>([]);
  const [subCategories, setSubCategories] = useState<Array<ISubCategories>>([]);

  const [quantity, setQuantity] = useState<string>("1");

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    stock: 0,
  });
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  // lấy id từ query của router
  //   const router = useRouter();

  const { id } = useParams();
  // hàm tính toán và lấy ra giá của variant đầu tiên và giá của option đầu tiên để hiển thị mặc định trên web
  const calculateTotalPrice = (product: IProduct) => {
    let total = 0;
    let discountedTotal = 0;
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[selectedVariantIndex]; // Lấy biến thể được chọn

      if (variant.options && variant.options.length > 0) {
        const option = variant.options[selectedOptionIndex]; // Lấy option được chọn

        total = product.price; // Khởi tạo giá tổng bằng giá gốc của sản phẩm

        if (option.add_valuation) {
          total += option.add_valuation; // Cộng thêm giá của option vào giá tổng
        }
      }
    } else {
      total = product.price;
    }
    if (product.discount) {
      // Nếu có giảm giá
      discountedTotal = (total * (100 - product.discount)) / 100;
    } else {
      discountedTotal = total;
    }
    product.total = discountedTotal; // Cập nhật giá trị total trong product
    return {
      total,
      discountedTotal,
    }; // Nếu không có biến thể hoặc không có options, trả về giá gốc
  };

  const categoryId = product?.category_id;
  const subCategoryId = product?.sub_category_id;

  // ?.name có ý nghĩa là khi đã tìm thấy id phù hợp với categoryId thì dùng ?.name để truy cập vòa thuộc tính name và gán vào biến categoryName
  const categoryName = categories.find((item) => item._id === categoryId)?.name;
  const subCategoryName = subCategories.find(
    (item) => item._id === subCategoryId
  )?.name;

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
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const variant = product.variants[0]; // Lấy variant đầu tiên

      if (variant.options && variant.options.length > 0) {
        const option = variant.options[0]; // Lấy option đầu tiên
        setSelectedOption({
          value: option.value || "",
          stock: option.inventory_quantity || 0,
        });
      }
    }
  }, [product]);
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
                {product?.name} - {selectedOption?.value}
              </h3>
            </div>

            {/* price */}
            <div className="mt-4 text-primary_green font-bold text-lg">
              <div className="price text-lg text-primary_green mb-1">
                <span
                  className={
                    product?.discount
                      ? "line-through text-black"
                      : "list-none  font-bold"
                  }
                >
                  {product &&
                    numeral(calculateTotalPrice(product).total)
                      .format("0,0")
                      .replace(/,/g, ".")}
                  {/* {numeral(productItem?.price).format("0,0").replace(/,/g, ".")} */}
                </span>
                <span
                  className={product?.discount ? "pl-2 font-bold" : "hidden"}
                >
                  {product &&
                    numeral(calculateTotalPrice(product).discountedTotal)
                      .format("0,0")
                      .replace(/,/g, ".")}
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="flex mt-4 items-center gap-2 text-primary_green">
              <MdDone size={20} />
              <p>{selectedOption.stock}</p>
              <p>in stock</p>
            </div>

            {/* variants */}
            <div className="variants mt-2">
              {product &&
                product.variants.map((variant, variantIndex) => (
                  <div className="mt-2" key={variantIndex}>
                    <p>{variant.title}</p>
                    <div className="flex gap-2 mt-3">
                      {variant.options.map((option, optionIndex) => (
                        <button
                          className={`px-5 py-1 text-black hover:font-bold border rounded-full ${
                            variantIndex === selectedVariantIndex &&
                            optionIndex === selectedOptionIndex
                              ? "bg-primary_green text-white"
                              : ""
                          }`}
                          key={optionIndex}
                          onClick={() => {
                            setSelectedVariantIndex(variantIndex);
                            setSelectedOptionIndex(optionIndex);
                            setSelectedOption({
                              value: option?.value || "",
                              stock: option?.inventory_quantity || 0,
                            });
                          }}
                        >
                          {option?.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
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
          {filteredRelatedProducts &&
            filteredRelatedProducts.map((item) => {
              return <Product product={item} key={item?._id} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
