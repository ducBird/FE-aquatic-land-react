import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { axiosClient } from "../../../libraries/axiosClient";
interface typeCity {
  id: string;
  city: string;
}
const ordersSchema = Yup.object({
  first_name: Yup.string()
    .min(2, "The firstname must be unique and between 2 - 50 characters")
    // .max(50, "The firstname must be unique and between 1 - 50 characters")
    .required("The name is not blank"),
  last_name: Yup.string()
    .min(2, "The lastname must be unique and between 2 - 50 characters")
    .required("The name is not blank"),
  shipping_information: Yup.string()
    .min(5, "The address must be unique and between 5 - 100 characters")
    .required("The address is not blank"),
  phoneNumber: Yup.string()
    .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
    .required("The phone is not blank"),
  email: Yup.string().email("Invalid email"),
  shipping_city: Yup.string().required("The city is not blank"),
});
const CheckOut = () => {
  // const [isLocation, setIsLocation] = React.useState<string>("");
  // const [isCity, setIsCity] = React.useState<string>("");
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      shipping_information: "",
      phoneNumber: "",
      email: "",
      shipping_city: "",
    },
    validationSchema: ordersSchema,
    onSubmit: (values) => {
      axiosClient
        .post("/orders", values)
        .then((response) => {
          window.alert("Thành công");
        })
        .catch((error) => {
          window.alert("Thất bại");
        });
    },
  });

  const [city, setCity] = React.useState([]);
  //chứa tên tp vừa chọn
  const [selectedCity, setSelectedCity] = React.useState<typeCity>();
  React.useEffect(() => {
    axios
      .get("https://63528f71a9f3f34c3741633b.mockapi.io/api/v1/users")
      .then((response) => {
        setCity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log("city", city);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    // console.log("cityid", cityId);
    const selectCity = city.find((city: typeCity) => city.id === cityId);
    console.log("selected city", selectCity);
    if (selectCity) {
      setSelectedCity(selectCity);
      formik.setFieldValue("shipping_city", selectCity.city);
      // setIsCity(selectCity.city);
      // set lại initialValue có giá trị đã thay đổi
    }
  };

  // React.useEffect(() => {
  //   console.log("location", isLocation);
  // }, [isLocation]);
  // React.useEffect(() => {
  //   console.log("city", isCity);
  // }, [isCity]);
  // const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const concatenatedString = event.target.value + isCity;
  //   setIsLocation(concatenatedString);
  //   formik.setFieldValue("shipping_information", concatenatedString);
  //   console.log("con", concatenatedString);
  //   formik.handleChange(event);
  // };

  return (
    <>
      <div className="bg-primary_green text-[#ffff] text-center py-4 mt-[80px] ">
        <h1 className="font-medium text-[20px]">CHECKOUT</h1>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="container px-3">
          <div className="md:grid md:grid-cols-12">
            <div className="md:col-span-8 md:mr-4">
              <div className="flex mt-8 gap-2">
                <h1 className="text-black font-bold">Returning customers?</h1>
                <a
                  href=""
                  className="text-primary_green underline font-semibold"
                >
                  Click here to login
                </a>
              </div>
              <div className="flex mt-8 gap-2">
                <h1 className="text-black font-bold">Have a coupon?</h1>
                <a
                  href=""
                  className="text-primary_green underline font-semibold"
                >
                  Click here to enter your code
                </a>
              </div>
              <div className="mt-8">
                <h1 className="text-[22px] font-semibold">
                  BILLING & SHIPPING
                </h1>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="md:flex md:gap-4">
                    <div className="w-full">
                      <div className="mb-1">
                        <span className="text-[18px] font-medium">
                          Fisrt name
                        </span>
                        <span className="ml-1 text-red-600 text-[20px]">*</span>
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                      />
                      <p className="text-red-500">
                        {formik.touched.first_name
                          ? formik.errors.first_name
                          : null}
                      </p>
                    </div>
                    <div className="w-full">
                      <div className="mb-1">
                        <span className="text-[18px] font-medium">
                          Last name
                        </span>
                        <span className="ml-1 text-red-600 text-[20px]">*</span>
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                      />
                      <p className="text-red-500">
                        {formik.touched.last_name
                          ? formik.errors.last_name
                          : null}
                      </p>
                    </div>
                  </div>
                  {/* <div className="w-full">
                    <div className="mb-1">
                      <span className="text-[18px] font-medium">
                        Company name
                      </span>
                      <span className="ml-1  text-[20px]">(optional)</span>
                    </div>
                    <input
                      type="text"
                      name=""
                      className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                    />
                  </div> */}
                </div>
                <div>
                  {/* <div className="flex">
                    <h2 className="font-semibold">Country / Region</h2>
                    <span className="ml-1 text-[20px] text-red-500">*</span>
                  </div>
                  <h2 className="mt-0 mb-4">South Africa</h2> */}
                  <div className="flex flex-col">
                    <div className="flex">
                      <h2 className="font-semibold">Street address</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      name="shipping_information"
                      value={formik.values.shipping_information}
                      onChange={formik.handleChange}
                      // value={isLocation}
                      // onChange={handleLocation}
                      onBlur={formik.handleBlur}
                      placeholder="House number and street name"
                      className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                    />
                    <p className="text-red-500">
                      {formik.touched.shipping_information
                        ? formik.errors.shipping_information
                        : null}
                    </p>
                  </div>
                  <div className="flex flex-col mt-3">
                    <div className="flex">
                      <h2 className="font-semibold">Town / City</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <select
                      className="border border-[#e5e7eb] p-2 rounded-[5px] outline-none cursor-pointer w-[150px]"
                      value={formik.values.shipping_city}
                      onChange={handleCityChange}
                    >
                      <option
                        value=""
                        className="cursor-pointer text-[13px] md:text-[16px]"
                      >
                        {selectedCity ? selectedCity.city : "Chọn thành phố"}
                      </option>
                      {city.map((city: typeCity) => (
                        <option
                          key={city.id}
                          value={city.id}
                          className=" text-[13px] md:text-[16px]"
                        >
                          {city.city}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500">
                      {formik.touched.shipping_city
                        ? formik.errors.shipping_city
                        : null}
                    </p>
                  </div>
                  {/* <div className="flex flex-col mt-3">
                    <div className="flex">
                      <h2 className="font-semibold">Street address</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      name=""
                      placeholder="House number and street name"
                      className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                    />
                  </div> */}
                  <div className="flex flex-col mt-3">
                    <div className="flex">
                      <h2 className="font-semibold">Phone</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                    />
                    <p className="text-red-500">
                      {formik.touched.phoneNumber
                        ? formik.errors.phoneNumber
                        : null}
                    </p>
                  </div>
                  <div className="flex flex-col mt-3">
                    <div className="flex">
                      <h2 className="font-semibold">Email address</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border w-[100%] p-2 rounded-[10px] md:rounded-[5px] outline-none"
                    />
                    <p className="text-red-500">
                      {formik.touched.email ? formik.errors.email : null}
                    </p>
                    {/* <div className=" flex mt-4 ">
                      <input
                        type="checkbox"
                        className=" h-[22px] w-[20px] mr-3"
                      />
                      <p className="font-semibold">
                        Subscribe to our newsletter for Specials, Product
                      </p>
                    </div>
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[22px] mr-3"
                      />
                      <span className="font-semibold">Create an account?</span>
                    </div> */}
                    <div className="flex gap-8 mt-3">
                      <h1 className="font-semibold">Payment methods</h1>
                      <div className="flex flex-col">
                        <div className="flex  gap-1">
                          <input
                            type="radio"
                            id="option1"
                            name="options"
                            value="option1"
                          />
                          <label htmlFor="option1">Option 1</label>
                        </div>
                        <div className="flex  gap-1">
                          <input
                            type="radio"
                            id="option2"
                            name="options"
                            value="option2"
                          />
                          <label htmlFor="option2">Option 2</label>
                        </div>
                        <div className="flex  gap-1">
                          <input
                            type="radio"
                            id="option3"
                            name="options"
                            value="option3"
                          />
                          <label htmlFor="option3">Option 3</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-6 font-bold text-[22px]">
                    ADDTIONAL INFORMATION
                  </h1>
                  <div className="flex flex-col mt-4">
                    <span className="font-bold mb-2">
                      Order notes (optional)
                    </span>
                    <textarea
                      className="p-3 outline-none border"
                      placeholder="Notes about your order, e.g special notes for delivery"
                      rows={4}
                      cols={20}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 md:mt-8">
              <div className="mt-4 bg-[#f7f7f7] p-3">
                <h1 className="text-center py-4 text-[22px] font-bold">
                  YOUR ORDER
                </h1>
                <div className="">
                  <table className="w-[100%] bg-white p-3">
                    <thead>
                      <tr className="flex justify-between p-3">
                        <th>Product</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="flex justify-between p-3  border-t-2">
                        <td className="flex w-[222px]">
                          <div className="w-[100px] ">
                            <img
                              className="w-[100%] bg-cover"
                              src="	https://easyscape.co.za/wp-content/uploads/2020/11/Micranthemum-Monte-Carlo.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-2 flex flex-col gap-2">
                            <h2 className="font-medium leading-[20px]">
                              Micranthemum sp ‘Monte Carlo’
                            </h2>
                            <div className="leading-[15px] flex flex-col gap-2">
                              <p className="text-primary_green text-[13px] ">
                                only 4 left
                              </p>
                              <span className="text-[12px] flex items-center">
                                <AiOutlineClose />
                                <span className="text-[15px]">1</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>R400</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="flex justify-between p-3  border-t-2">
                        <th>Subtotal</th>
                        <td>R400</td>
                      </tr>
                      <tr className="flex justify-between p-3  border-t-2">
                        <th>Shipping</th>
                        <td className="flex flex-col ">
                          <div className="flex justify-end gap-1">
                            <span>Flat rate (May Vary): R150</span>
                            <input type="radio" name="name" id="" />
                          </div>
                          <div className="flex justify-end gap-1">
                            <span>Collect at Easy Scape</span>
                            <input type="radio" name="name" />
                          </div>
                        </td>
                      </tr>
                      <tr className="flex justify-between p-3  border-t-2">
                        <th>Total</th>
                        <td className="text-primary_green font-bold">R550</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <h1 className="mt-4 text-[20px] font-bold text-center">
                  PayFast
                </h1>
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>Please note: </strong>
                    We only ship living products Monday - Thursday (Gauteng) Mon
                    - Wednesday (out of Gauteng) because we do not want your
                    plants sitting in warehouses over the weekend.
                  </p>
                  <button
                    type="submit"
                    className="bg-primary_green w-[100%] rounded-[20px] py-3 text-white font-bold hover:bg-opacity-[0.8]"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="bg-[#F4F4F4] md:mt-[50px]">
        <div className="container mt-[20px] ">
          <div className=" py-8 px-3 flex flex-col gap-3 md:flex-row">
            <div className="flex items-center">
              <BiMedal size={60} className="text-gray-600" />
              <div className="ml-4 flex flex-col flex-1 text-text_gray">
                <h1 className="text-[22px] font-medium">Quality</h1>
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
export default CheckOut;
