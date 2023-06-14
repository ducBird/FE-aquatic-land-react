import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Form, Input, Button } from "antd";
interface Props {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginCart = (props: Props) => {
  const { openLogin, setOpenLogin } = props;
  const handleLoginClose = () => {
    setOpenLogin(false);
  };
  return (
    <div>
      <div
        className={`fixed h-screen z-20 w-[100%] bg-black/50 ${
          openLogin ? `visible` : `invisible`
        }`}
        onClick={handleLoginClose}
      ></div>
      <div
        className={`fixed top-0 r-0 h-screen z-[100] w-[80%] lg:w-[25%] bg-white border-r shadow-xl transition-transform duration-500 ${
          openLogin ? `-translate-x-full` : `translate-x-full`
        } left-full`}
      >
        <div className="flex items-center justify-between px-3 py-6 border border-b">
          <h2 className="text-[20px] font-semibold">Sign in</h2>
          <div
            onClick={handleLoginClose}
            className="flex items-center cursor-pointer hover:opacity-[0.7]"
          >
            <span className="text-[20px] font-[100]">
              <MdOutlineClose />
            </span>
            <h2 className="text-[18px]">Close</h2>
          </div>
        </div>
        <div className="px-3 mt-4  border-b">
          {/* <form action="">
            <div>
              <div className="flex">
                <h1 className="font-bold text-[15px]">
                  Username or email address
                </h1>
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </div>
              <input
                type="text"
                className="text-gray-500 outline-none border w-[100%] h-[40px] px-2"
              />
            </div>
            <div className="mt-3">
              <div className="flex">
                <h1 className="font-bold text-[15px]">Password</h1>
                <span className="ml-1 text-red-600 text-[20px]">*</span>
              </div>
              <input
                type="password"
                className="text-gray-500 outline-none border w-[100%] h-[40px] px-2"
              />
            </div>
            <button className="w-[100%] mt-5 py-2 rounded-[20px] text-white font-bold bg-primary_green hover:opacity-[0.9]">
              LOGIN
            </button>
            <div className="flex justify-between items-center my-5">
              <div className="text-[15px] font-bold flex">
                <label
                  htmlFor="remember-checkbox"
                  className="cursor-pointer flex"
                >
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                    className="mr-[4px]"
                  />
                  <span>Remember me</span>
                </label>
              </div>
              <h2 className="text-[15px] text-primary_green cursor-pointer hover:opacity-[0.7]">
                Lost your password?
              </h2>
            </div>
          </form> */}
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <div className="flex">
              <h2 className="mb-2 text-[15px] font-medium">
                Username or email address
              </h2>
              <span className="ml-1 text-red-600 text-[20px]">*</span>
            </div>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username or email!",
                },
              ]}
            >
              <Input className="outline-none border border-gray-400 h-[40px]" />
            </Form.Item>
            <div className="flex">
              <h2 className="mb-2 text-[15px] font-medium">Password</h2>
              <span className="ml-1 text-red-600 text-[20px]">*</span>
            </div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="outline-none border border-gray-400 h-[40px]" />
            </Form.Item>

            <Form.Item className="mt-[45px]">
              <button
                className="border w-[100%] rounded-[20px] py-2 bg-primary_green text-[20px] text-white font-semibold"
                type="submit"
              >
                Login
              </button>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-between items-center my-1">
                <div className="text-[15px] font-bold flex">
                  <label
                    htmlFor="remember-checkbox"
                    className="cursor-pointer flex"
                  >
                    <input
                      type="checkbox"
                      id="remember-checkbox"
                      className="mr-[4px]"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
                <h2 className="text-[15px] text-primary_green cursor-pointer hover:opacity-[0.7]">
                  Lost your password?
                </h2>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className="text-center  border-b py-3">
          <div className="opacity-[0.1] font-thin m-auto">
            <AiOutlineUser size={"80px"} className="m-auto" />
          </div>
          <div className="">
            <h2 className="font-bold mb-4">No account yet?</h2>
            <Link to={"/component/auth/register"} onClick={handleLoginClose}>
              <span className="border-b-2 border-primary_green font-semibold text-[14px] cursor-pointer hover:opacity-[0.7]">
                CREATE AN ACCOUNT
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCart;
