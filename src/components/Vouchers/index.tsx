import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ReactModal from "react-modal";
import { axiosClient } from "../../libraries/axiosClient";
import { IVouchers } from "../../interfaces/IVouchers";
// Thiết lập các style cho modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    height: "600px",
    padding: "20px",
  },
};

interface IModalProps {
  showPopup: boolean;
  closePopupVoucher: () => void;
  totalOrder: number;
}

const Vouchers: React.FC<IModalProps> = ({
  closePopupVoucher,
  showPopup,
  totalOrder,
}) => {
  const [vouchers, setVouchers] = useState<IVouchers[]>([]);
  useEffect(() => {
    // Thêm hoặc xóa thanh scoll khi showModal thay đổi
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showPopup]);
  useEffect(() => {
    axiosClient.get("/vouchers").then((response) => {
      setVouchers(response.data);
    });
  }, []);
  return (
    <div>
      <ReactModal
        isOpen={showPopup}
        onRequestClose={closePopupVoucher}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <p className="text-2xl font-bold  text-primary_green">Voucher</p>
          <button
            onClick={closePopupVoucher}
            className="absolute text-3xl top-4 right-4 text-red-500"
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className="mt-10 border">
          {vouchers &&
            vouchers.map((voucher, index) => {
              return (
                <div
                  key={index}
                  className="m-5 border rounded-lg p-10 text-primary_green font-bold flex items-center justify-center"
                >
                  <p className="flex-1">{voucher.name}</p>
                  <button className="border p-3 bg-primary_green rounded-lg text-white">
                    {totalOrder >= voucher.minimumOrderAmount
                      ? "Áp dụng"
                      : "Chưa đủ điều kiện"}
                  </button>
                </div>
              );
            })}
        </div>
      </ReactModal>
    </div>
  );
};

export default Vouchers;
