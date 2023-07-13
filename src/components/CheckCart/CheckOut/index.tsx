import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { axiosClient } from "../../../libraries/axiosClient";
import { useCarts } from "../../../hooks/useCart";
import numeral from "numeral";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import LoginCart from "../../Auth/Login/LoginCard";
interface typeCity {
  id: string;
  city: string;
}
interface IOrderDetails {
  product_id: string;
  quantity: number;
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
  email: Yup.string().email("Invalid email").required("The email is not blank"),
  shipping_city: Yup.string().required("The city is not blank"),
});
const CheckOut = () => {
  // const [isLocation, setIsLocation] = React.useState<string>("");
  // const [isCity, setIsCity] = React.useState<string>("");
  // payment paypal

  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [checkInput, setCheckInput] = useState(0);
  const [sdkReady, setSdkReady] = useState(false);
  const [city, setCity] = React.useState([]);
  //chứa tên tp vừa chọn
  // const [selectedCity, setSelectedCity] = React.useState<typeCity>();
  const [openLogin, setOpenLogin] = React.useState(false);
  // hàm để set lại giá trị khi chọn các phương thức thanh toán
  // zustand
  const { items } = useCarts((state) => state) as any;
  const totalOrder = items.reduce((total, item) => {
    return total + item.product.total * item.quantity;
  }, 0);
  const userString = localStorage.getItem("user-storage");
  const user = userString ? JSON.parse(userString) : null;
  const userLogin = user && Object.keys(user.state.users).length !== 0;
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      shipping_information: "",
      phoneNumber: "",
      email: "",
      shipping_city: "",
      order_details: [] as IOrderDetails[],
      total_money_order: totalOrder,
      payment_information: paymentMethod,
      customer_id: user.state.users.user._id,
    },
    validationSchema: ordersSchema,
    onSubmit: async (values) => {
      values.order_details = [];
      items.forEach((item) => {
        const orderDetail: IOrderDetails = {
          product_id: item.product._id,
          quantity: item.quantity,
        };
        values.order_details.push(orderDetail);
      });
      await axiosClient
        .post("/orders", values)
        .then(() => {
          window.alert("Đặt hàng thành công");
          window.localStorage.removeItem("cart-storage");
          window.location.reload(); // Tải lại trang
        })
        .catch(() => {
          window.alert("Đặt hàng thất bại");
        });
    },
  });
  const handleLogin = () => {
    setOpenLogin(true);
  };
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

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
    formik.setFieldValue("payment_information", selectedPaymentMethod);
  };

  const onSuccessPaypal = async (details, data) => {
    // Create an object containing the order data
    const orderData = {
      // Populate the order data based on the formik values
      // Assuming you have access to the formik values here
      first_name: formik.values.first_name,
      last_name: formik.values.last_name,
      shipping_information: formik.values.shipping_information,
      phoneNumber: formik.values.phoneNumber,
      email: formik.values.email,
      shipping_city: formik.values.shipping_city,
      order_details: [] as IOrderDetails[],
      payment_information: paymentMethod,
      payment_status: true,
      total_money_order: totalOrder,
      customer_id: user.state.users.user._id,
    };

    items.forEach((item) => {
      const orderDetail = {
        product_id: item.product._id,
        quantity: item.quantity,
      };
      orderData.order_details.push(orderDetail);
    });

    try {
      // Send the order data to the server
      await axiosClient.post("/orders", orderData);
      window.alert("Đặt hàng thành công");
      window.localStorage.removeItem("cart-storage");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Đợi 5 giây
      window.location.reload(); // Tải lại trang
    } catch (error) {
      console.error(error);
      window.alert("Đặt hàng thất bại");
    }
    // OPTIONAL: Call your server to save the transaction
    return fetch("/paypal-transaction-complete", {
      method: "post",
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
  };
  // hàm add Script paypal
  const addPaypalScript = async () => {
    const { data } = await axiosClient.get("/payment-paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  // payment vnpay
  const onSuccessVnpay = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = queryParams.get("vnp_ResponseCode");
    const vnpTransactionStatus = queryParams.get("vnp_TransactionStatus");
    // Kiểm tra xem đã chuyển hướng trở lại từ VNPay hay chưa
    if (vnpResponseCode === "00" && vnpTransactionStatus === "00") {
      // Thực hiện gửi yêu cầu đặt hàng
      // Khôi phục dữ liệu từ Local Storage
      let orderData;
      try {
        orderData = JSON.parse(localStorage.getItem("formValues") || "{}");
      } catch (error) {
        console.error("Lỗi khi phân tích chuỗi JSON:", error);
        return;
      }

      if (orderData !== null) {
        items.forEach((item) => {
          const orderDetail = {
            product_id: item.product._id,
            quantity: item.quantity,
          };
          orderData.order_details.push(orderDetail);
        });
        // Cập nhật giá trị payment_information thành "vnpay"
        orderData.payment_information = "vnpay";

        // Thực hiện gửi yêu cầu đặt hàng với dữ liệu đã lưu trữ
        try {
          await axiosClient.post("/orders", orderData);
          window.alert("Đặt hàng thành công");
          window.localStorage.removeItem("formValues");
          window.localStorage.removeItem("cart-storage");
          window.location.reload(); // Tải lại trang
          window.location.replace(
            "http://127.0.0.1:3000/component/checkcart/checkout"
          );
        } catch (error) {
          console.error(error);
          window.alert("Đặt hàng thất bại");
        }
      }
    }
  };

  const checkInputData = async () => {
    let isLogShown = false;
    const requiredFields: {
      [key in keyof typeof formik.values]: string;
    } = {
      first_name: "Họ",
      last_name: "Tên",
      shipping_information: "Địa chỉ",
      shipping_city: "Thành phố",
      phoneNumber: "Số điện thoại",
      email: "Email",
      order_details: "Thông tin đơn hàng",
      total_money_order: "Chọn sản phẩm cần mua",
      payment_information: "Thông tin thanh toán",
      customer_id: "tài khoản",
    };

    const missingFields: string[] = [];
    for (const field in requiredFields) {
      if (!formik.values[field]) {
        missingFields.push(requiredFields[field]);
      }
    }
    setCheckInput(missingFields.length);
    if (missingFields.length > 0) {
      if (!isLogShown) {
        alert(`Vui lòng nhập đầy đủ thông tin ${missingFields.join(", ")}`);
        isLogShown = true;
      }

      return false;
    }
    return true;
  };
  const paymentVnpayClick = async () => {
    const inputValid = await checkInputData();
    if (inputValid === false) {
      return;
    }
    // Lưu các giá trị vào localStorage trước khi chuyển hướng đến trang thanh toán Vnpay
    localStorage.setItem("formValues", JSON.stringify(formik.values));
    const paymentUrl = await axiosClient.post("/payment/create_payment_url", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      amount: totalOrder,
      bankCode: "NCB",
      orderDescription: "thanh toan don hang test",
      orderType: "other",
      language: "vn",
    });
    window.location.replace(paymentUrl.data);
  };

  useEffect(() => {
    onSuccessVnpay();
  }, []);

  // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const cityId = event.target.value;
  //   // console.log("cityid", cityId);
  //   const selectCity = city.find((city: typeCity) => city.id === cityId);
  //   console.log("selected city", selectCity);
  //   if (selectCity) {
  //     setSelectedCity(selectCity);
  //     formik.setFieldValue("shipping_city", selectCity.city);
  //     // setIsCity(selectCity.city);
  //     // set lại initialValue có giá trị đã thay đổi
  //   }
  // };

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
      <div className="w-full bg-primary_green lg:h-[75px] lg:p-10 h-auto p-5 text-center">
        <h1 className="h-full w-full flex items-center justify-center text-2xl lg:text-4xl text-white font-bold">
          CHECKOUT
        </h1>
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
                  {/* <div className="flex flex-col mt-3">
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
                  </div> */}
                  <div className="flex flex-col mt-3">
                    <div className="flex">
                      <h2 className="font-semibold">Town / City</h2>
                      <span className="ml-1 text-[20px] text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      name="shipping_city"
                      value={formik.values.shipping_city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border p-2"
                    />
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
                      <div className="flex flex-col ">
                        <div className="flex gap-1 ">
                          <input
                            type="radio"
                            id="CASH"
                            name="payment_information"
                            value="CASH"
                            onChange={handlePaymentMethodChange}
                            checked={paymentMethod === "CASH"}
                          />
                          <label htmlFor="CASH" className="cursor-pointer">
                            Thanh toán bằng tiền mặt
                          </label>
                        </div>
                        <div
                          className="flex gap-1"
                          onMouseDown={checkInputData}
                        >
                          <input
                            type="radio"
                            id="paypal_payment"
                            name="payment_information"
                            value="paypal"
                            onChange={handlePaymentMethodChange}
                            checked={paymentMethod === "paypal"}
                          />
                          <label
                            htmlFor="paypal_payment"
                            className="cursor-pointer"
                          >
                            Thanh toán bằng paypal
                          </label>
                        </div>
                        <div className="flex gap-1" onClick={paymentVnpayClick}>
                          <input
                            type="radio"
                            id="vnpay"
                            name="payment_information"
                            value="vnpay"
                            onChange={handlePaymentMethodChange}
                            checked={paymentMethod === "vnpay"}
                          />
                          <label htmlFor="vnpay" className="cursor-pointer">
                            Thanh toán bằng vnpay
                          </label>
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
                      {items.length > 0 ? (
                        items.map((item, index) => {
                          return (
                            <tr
                              className="flex justify-between p-3 border-t-2"
                              key={index}
                            >
                              <td className="flex w-full p-3">
                                <div className="flex-none w-[100px]">
                                  <img
                                    className="w-[90%] bg-cover"
                                    src={item.product.product_image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-2 flex flex-col gap-2">
                                  <h2 className="font-medium leading-[20px]">
                                    {item.product.name}
                                  </h2>
                                  <div className="leading-[15px] flex flex-col gap-2">
                                    <p className="text-primary_green text-[13px] ">
                                      only 4 left
                                    </p>
                                    <span className="text-[12px] flex items-center">
                                      <AiOutlineClose />
                                      <span className="text-[15px]">
                                        {item.quantity}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span>
                                  {" "}
                                  {numeral(item.quantity * item.product?.total)
                                    .format("0,0")
                                    .replace(/,/g, ".")}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <Link to="/shop">
                          <div className="p-3 text-center cursor-pointer">
                            <p className="py-1 px-4 border bg-primary_green text-white rounded-full">
                              Return to shop
                            </p>
                          </div>
                        </Link>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="flex justify-between p-3  border-t-2">
                        <th>Subtotal</th>
                        <td>
                          {numeral(totalOrder).format("0,0").replace(/,/g, ".")}
                        </td>
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
                        <td className="text-primary_green font-bold">
                          {numeral(totalOrder).format("0,0").replace(/,/g, ".")}
                        </td>
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
                  {paymentMethod === "paypal" &&
                  sdkReady &&
                  checkInput === 0 ? (
                    <div className="z-0">
                      <PayPalButton
                        amount={parseFloat((totalOrder / 20000).toFixed(2))}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={onSuccessPaypal}
                        onError={(error) => {
                          alert("Error");
                          console.log("error", error);
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={` w-[100%] rounded-[20px] py-3 text-white font-bold hover:bg-opacity-[0.8] ${
                        items.length !== 0
                          ? "bg-primary_green"
                          : " bg-primary_green opacity-50"
                      }`}
                      disabled={!userLogin && items.length === 0}
                      onClick={() => {
                        if (!userLogin) {
                          alert("Please login");
                          handleLogin();
                        }
                      }}
                    >
                      PLACE ORDER
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="bg-[#F4F4F4] md:mt-[50px]">
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
      </div> */}
      <LoginCart openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
};
export default CheckOut;
