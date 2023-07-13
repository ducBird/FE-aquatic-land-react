import { useEffect, useState } from "react";
import userImage from "../../../assets/user.png";
import { axiosClient } from "../../../libraries/axiosClient";
import { IOrders } from "../../../interfaces/IOrders";

function HistoryOrderUser() {
  const userString = localStorage.getItem("user-storage");
  const user = userString ? JSON.parse(userString) : null;
  const [historyOrderUser, setHistoryOrderUser] = useState<Array<IOrders>>([]);
  useEffect(() => {
    if (user.state.users._id) {
      axiosClient.get("/orders").then((response) => {
        const filteredOrders = response.data.filter(
          (order) => order.customer_id === user.state.users._id
        );
        setHistoryOrderUser(filteredOrders);
      });
    }
  }, [user.state.users._id]);
  console.log(historyOrderUser);
  return (
    <div className="w-full">
      <div className="w-full bg-primary_green lg:h-[75px] lg:p-10 h-auto p-5 text-center lg:mb-0 mb-3">
        <h3 className="h-full w-full flex items-center justify-center text-3xl lg:text-4xl text-white font-bold">
          History Order User
        </h3>
      </div>
      <div className="w-full lg:m-10 flex items-center justify-center">
        {user && (
          <div className="lg:w-[700px] w-full lg:border-gray lg:border-2 text-center p-5 lg:flex lg:flex-col lg:justify-center lg:items-center">
            <h4 className="text-2xl font-bold text-primary_green mb-5">
              User Profile
            </h4>
            <div className="w-full flex items-center justify-center mb-3">
              <img
                src={userImage}
                alt="image"
                className="w-[150px] h-[150px] flex "
              />
            </div>
            <div className="lg:flex my-2 items-center lg:justify-between">
              <div className="lg:flex-grow lg:flex justify-end mr-2 w-[150px]">
                <p className="lg:text-right text-left text-primary_green">
                  First Name:
                </p>
              </div>
              <div className="flex-grow w-[300px]">
                <input
                  type="text"
                  value={user.state.users.first_name}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
            </div>
            <div className="lg:flex my-2 items-center lg:justify-between">
              <div className="lg:flex-grow lg:flex justify-end mr-2 w-[150px]">
                <p className="lg:text-right text-left text-primary_green">
                  Last Name:
                </p>
              </div>
              <div className="flex-grow w-[300px]">
                <input
                  type="text"
                  value={user.state.users.last_name}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
            </div>
            <div className="lg:flex my-2 items-center lg:justify-between">
              <div className="lg:flex-grow lg:flex justify-end mr-2 w-[150px]">
                <p className="lg:text-right text-left text-primary_green">
                  Email:
                </p>
              </div>
              <div className="flex-grow w-[300px]">
                <input
                  type="text"
                  value={user.state.users.email}
                  className="px-2 py-1 border rounded-md w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:mx-10 mx-5 my-4">
        <h3 className="my-3 text-xl text-primary_green font-bold">
          History Order
        </h3>
        {/* <div className="w-full bg-gray-300 p-2 border rounded-md">
          {historyOrderUser &&
            historyOrderUser.map((item, index) => {
              return (
                <div key={index}>
                  {item.order_details?.map((orderDetail, orderDetailIndex) => (
                    <div key={orderDetailIndex}>
                      <div>{orderDetail.product?.[0]?.name}</div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div> */}
      </div>
    </div>
  );
}

export default HistoryOrderUser;
