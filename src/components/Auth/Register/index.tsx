import { Form, Input } from "antd";
import { FaGoogle } from "react-icons/fa";
import React from "react";
const Register = (props) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const handleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <div className="bg-primary_green text-[#ffff] text-center py-4 ">
        <h1 className="font-medium text-[30px]">My Account</h1>
      </div>
      <div className="container px-3">
        <div className="md:grid md:grid-cols-12 gap-4">
          <div className="md:col-span-6 md:p-4">
            {isLogin ? (
              <div>
                <h1 className="md:mt-[50px] my-5 font-semibold text-[20px]">
                  REGISTER
                </h1>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <div className="flex">
                    <h2 className="mb-2 text-[15px] font-medium">
                      Email address
                    </h2>
                    <span className="ml-1 text-red-600 text-[20px]">*</span>
                  </div>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address!",
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
                      className="border w-[100%] rounded-[20px] py-2 bg-primary_green text-[20px] text-white font-semibold hover:opacity-[0.7]"
                      type="submit"
                    >
                      REGISTER
                    </button>
                  </Form.Item>

                  <div className=" flex justify-around cursor-pointer items-center w-[100%] rounded-[20px] py-2 bg-orange-700 text-[20px] text-white font-semibold hover:opacity-[0.7]">
                    REGISTER WITH GOOGLE
                    <FaGoogle />
                  </div>
                </Form>
              </div>
            ) : (
              <div>
                <h1 className="md:mt-[50px] my-5 font-semibold text-[20px]">
                  LOGIN
                </h1>
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
                      LOGIN
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
                  <div className=" flex justify-around cursor-pointer items-center w-[100%] rounded-[20px] py-2 bg-orange-700 text-[20px] text-white font-semibold hover:opacity-[0.7]">
                    LOGIN WITH GOOGLE
                    <FaGoogle />
                  </div>
                </Form>
              </div>
            )}
          </div>
          <div className="md:hidden relative my-8">
            <hr className="my-6 " />
            <span className="hr-or font-semibold">OR</span>
          </div>

          {/* <div className="border-register"></div> */}

          <div className="md:col-span-6 md:border-l-2">
            <div className="text-center md:mt-[50px] md:p-4">
              <h1 className="text-center font-medium text-[25px]">LOGIN</h1>
              <p className="text-gray-700 text-center my-4">
                Registering for this site allows you to access your order status
                and history. Just fill in the fields below, and we'll get a new
                account set up for you in no time. We will only ask you for
                information necessary to make the purchase process faster and
                easier.
              </p>
              <button
                onClick={handleForm}
                className="border px-4 py-2 rounded-[20px] bg-primary_green font-semibold hover:opacity-[0.7]"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
