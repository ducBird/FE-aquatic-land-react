import React from "react";
import Quality from "../../../assets/quality-assurance.png";
import Delivery from "../../../assets/delivery-time.png";
import SecurePayments from "../../../assets/secure-payment.png";

function Work() {
  return (
    <div className="max-w-[1212px] mx-auto flex flex-col lg:flex-row bg-gray-100 h-[400px] lg:h-[250px]">
      <div className="w-[405px] h-[100px] my-auto bg-gray-100 flex flex-1 items-center justify-center ml-10">
        <img src={Quality} alt="image" className="w-[60px] h-[60px]" />
        <div className="ml-4">
          <p className="text-[18px] font-semibold mb-2">Chất lượng</p>
          <p className="text-gray-500 text-[14px]">
            Đã thử và khảo sát. Chúng tôi chỉ cung cấp những thương hiệu và sản
            phẩm tốt nhất.
          </p>
        </div>
      </div>
      <div className="w-[405px] h-[100px] my-auto bg-gray-100 flex flex-1 items-center justify-center ml-10">
        <img src={Delivery} alt="image" className="w-[60px] h-[60px]" />
        <div className="ml-4">
          <p className="text-[18px] font-semibold mb-2">Vận chuyển</p>
          <p className="text-gray-500 text-[14px]">
            Chúng tôi có sẵn đội ngũ giao hàng cho mọi nhu cầu giao hàng của
            mình.
          </p>
        </div>
      </div>
      <div className="w-[405px] h-[100px] my-auto bg-gray-100 flex flex-1 items-center justify-center mx-10">
        <img src={SecurePayments} alt="image" className="w-[60px] h-[60px]" />
        <div className="ml-4">
          <p className="text-[18px] font-semibold mb-2">Thanh toán an toàn</p>
          <p className="text-gray-500 text-[14px]">
            Chúng tôi cung cấp các tùy chọn thanh toán trực tuyến an toàn.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Work;
