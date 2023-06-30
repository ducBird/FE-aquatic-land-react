import { Link } from "react-router-dom";
import { IProduct } from "../../../../interfaces/IProducts";
import { useCarts } from "../../../../hooks/useCart";
import { CartItems } from "../../../../interfaces/ICartItems";
import numeral from "numeral";
interface IProductsProps {
  products: IProduct[];
}

function HotProductsHome(props: IProductsProps) {
  const { add } = useCarts((state) => state);
  const { products } = props;
  const findProductsDiscount = products.filter((product) => {
    return product.discount >= 10;
  });
  return (
    <div className="mt-16 w-full">
      <p
        className="md:text-2xl text-xl font-semibold capitalize text-headingColor 
      relative before:absolute before:rounded-lg before:content before:w-[120px] lg:before:w-36
      before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-primary_green to-green-700 mr-auto"
      >
        Hot Products
      </p>

      <div className="w-full mt-9 grid grid-flow-col gap-3 overflow-x-auto text-center">
        {findProductsDiscount &&
          findProductsDiscount.map((item, index) => {
            const Cart: CartItems = {
              product: item,
              quantity: 1,
            };

            return (
              <div
                key={index}
                className="relative w-[200px] h-[400px] lg:w-[231px] lg:h-[440px] text-center border mb-5 justify-center rounded-md
    shadow-md "
              >
                <Link to={`shop/product/${item._id}`}>
                  <div className="w-full flex items-center justify-center lg:h-[70%] h-[60%]">
                    <img
                      src={item.product_image}
                      alt="image"
                      className="w-[90%]  object-contain p-3"
                    />
                  </div>
                  <p className="lg:h-[14%] h-[20%] font-bold cursor-pointer">
                    {item.name}
                  </p>
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
                </Link>
                <button
                  className="bg-primary_green border rounded-full shadow-md"
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

export default HotProductsHome;
