import { AiOutlineClose } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";

const ShoppingCart = () => {
  return (
    <>
      <div className="bg-primary_green text-[#ffff] text-center py-4 mt-[80px] ">
        <h1 className="font-medium text-[20px]">SHOPPING CART</h1>
      </div>
      <div className="container ">
        <div className="px-3 md:grid md:grid-cols-12 ">
          <div className=" md:col-span-8 md:mr-4">
            <ul className="block md:hidden">
              <li className="border-b">
                <div className="flex justify-between py-3 px-2">
                  <div className="">
                    <img
                      className="w-[80px]"
                      src="	https://easyscape.co.za/wp-content/uploads/2020/11/Micranthemum-Monte-Carlo.png"
                      alt=""
                    />
                  </div>
                  <div className="max-w-[200px] md:max-w-[220px] leading-[33px]">
                    <h2 className="font-medium leading-[20px]">
                      Micranthemum sp ‘Monte Carlo’
                    </h2>
                    <div className="leading-[15px]">
                      <p className="text-primary_green text-[13px] ">
                        only 4 left
                      </p>
                      <span className="text-[12px]">SKU: APT-P-1-1</span>
                    </div>
                    <div className="flex justify-between  border-dashed border-b-[1px]">
                      <span className="text-[12px] font-semibold">PRICE</span>
                      <span>R400</span>
                    </div>
                    <div className="flex justify-between border-dashed border-b-[1px] items-center py-2">
                      <span className="text-[12px] font-semibold">
                        QUANTITY
                      </span>
                      <div className=" border h-[30px] w-[80px] flex justify-between items-center text-center rounded-[10px] overflow-hidden">
                        <span className="border-r flex-1  h-full hover:bg-primary_green cursor-pointer transition-all">
                          -
                        </span>
                        <span className=" flex-1  h-full">1</span>
                        <span className="border-l flex-1  h-full hover:bg-primary_green cursor-pointer transition-all">
                          +
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <span className="text-[12px] font-semibold">
                        SUBTOTAL
                      </span>
                      <span className="text-primary_green font-semibold">
                        R400
                      </span>
                    </div>
                  </div>
                  <span className="cursor-pointer text-[20px]">
                    <AiOutlineClose />
                  </span>
                </div>
              </li>
            </ul>
            <div>
              <table className="md:table hidden w-full mt-[60px]">
                <thead className=" text-left ">
                  <tr className="md:text-[20px]">
                    <th></th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2">
                    <td className="py-[15px] ">
                      <span className="cursor-pointer">
                        <AiOutlineClose />
                      </span>
                    </td>
                    <td className="py-[15px] w-[100px] ">
                      <img
                        className="w-[100%]"
                        src="	https://easyscape.co.za/wp-content/uploads/2020/11/Micranthemum-Monte-Carlo.png"
                        alt=""
                      />
                    </td>
                    <td className="py-[15px] w-[200px]">
                      <div className="w-[85%] md:text-[14px]">
                        <h2 className="font-medium leading-[20px]">
                          Micranthemum sp ‘Monte Carlo’
                        </h2>
                        <div className="leading-[15px]">
                          <p className="text-primary_green text-[13px] ">
                            only 4 left
                          </p>
                          <span className="text-[12px]">SKU: APT-P-1-1</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-[15px] ">
                      <div className="flex justify-between items-center ">
                        <span>R400</span>
                      </div>
                    </td>
                    <td className="py-[15px] ">
                      <div className="flex  items-center py-2">
                        <div className=" border h-[50px] w-[100px] flex justify-between items-center text-center rounded-[10px] overflow-hidden">
                          <span className="border-r flex-1  h-full hover:bg-primary_green cursor-pointer transition-all flex items-center justify-center">
                            -
                          </span>
                          <span className=" flex-1 h-full  flex items-center justify-center">
                            1
                          </span>
                          <span className="border-l flex-1  h-full hover:bg-primary_green cursor-pointer transition-all flex items-center justify-center">
                            +
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-[15px] ">
                      <div className="flex justify-between ">
                        <span className="text-primary_green font-semibold">
                          R400
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="py-3 px-6">
                <div className="flex flex-col mt-4 gap-4 ">
                  <button className="bg-primary_green py-2 rounded-[20px] text-white hover:opacity-[0.9]">
                    UPDATE BASKET
                  </button>
                </div>
              </div>
              <div className="p-5 mt-5 md:flex md:justify-center">
                <input
                  type="text"
                  className="border w-[100%] md:w-[40%] md:mr-2 p-2  rounded-[5px] outline-none "
                  placeholder="Coupon code"
                />
                <div className="flex flex-col mt-4 gap-4 md:mt-0 ">
                  <button className="bg-primary_green py-2 rounded-[20px] text-white hover:opacity-[0.9] md:px-4 md:py-2">
                    APPLY COUPON
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:col-span-4 mt-5">
            <div className="border-2 p-5 flex flex-col leading-[28px]">
              <h1 className=" font-semibold text-[25px]">BASKET TOTALS</h1>
              <div className="flex justify-between mt-3">
                <span className="text-[16px] font-medium">Subtotal</span>
                <span>R800</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between ">
                <h1 className="text-[16px] font-medium">Shipping</h1>
                <div className="flex">
                  <h1>Flat rate (MAY Vary)</h1>
                  <span className="text-primary_green">:R150</span>
                  <input type="radio" name="check" className="ml-2" />
                </div>
              </div>
              <div className="flex justify-end">
                <h2>Collect at Easy Scape</h2>
                <input type="radio" name="check" className="ml-2" />
              </div>
              <h2 className="text-right">
                Sipping to <span className="text-gray-400">Gauteng.</span>
              </h2>
              <h2 className="text-primary_green text-right">Change address</h2>
              <hr className="my-3" />
              <div className="">
                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Total</span>
                  <span className="text-[18px] font-medium text-primary_green">
                    R950
                  </span>
                </div>
                <h2 className="text-right">(includes R123 VAT)</h2>
                <div className="flex flex-col mt-4 gap-4">
                  <button className="bg-primary_green py-2 rounded-[20px] text-white hover:opacity-[0.9]">
                    PROCESS TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F4F4F4] md:mt-[50px]">
        <div className="container mt-[20px] ">
          <div className=" py-8 px-3 flex flex-col gap-3 md:flex-row">
            <div className="flex items-center">
              <BiMedal size={60} className="text-gray-600" />
              <div className="ml-4 flex flex-col flex-1 text-text_gray">
                <h1 className="text-[22px] font-medium">Quallty</h1>
                <p>
                  Tried and Tested. We stock only the best aquascaping brands
                  and products.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <TbTruckDelivery size={60} className="text-gray-600" />
              <div className="ml-4 flex flex-col flex-1 text-text_gray">
                <h1 className="text-[22px] font-medium">Delivery</h1>
                <p>
                  We make use of The Courier Guy for all our delivery needs.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <RiSecurePaymentFill size={60} className="text-gray-600" />
              <div className="ml-4 flex flex-col flex-1 text-text_gray">
                <h1 className="text-[22px] font-medium">Secure Payments</h1>
                <p>
                  We offer secure credit and EFT payment options through
                  Payfast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShoppingCart;
