// import { axiosClient } from "../../../libraries/axiosClient";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosClient } from "../../../libraries/axiosClient";
function Services() {
  return (
    <div className="pt-10 m-10">
      <button
        type="submit"
        onClick={async () => {
          const paymentUrl = await axiosClient.post(
            "/payment/create_payment_url",
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              amount: 20000,
              bankCode: "NCB",
              orderDescription: "thanh toan don hang test",
              orderType: "other",
              language: "vn",
            }
          );
          window.location.replace(paymentUrl.data);
        }}
        className="border px-5 py-2 bg-primary_green text-white rounded-full"
      >
        Thanh toán VNpay
      </button>
    </div>
  );
}

export default Services;
