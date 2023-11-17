import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ReactModal from "react-modal";
import numeral from "numeral";
import moment from "moment";
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
    maxWidth: "700px",
    width: "100%",
    height: "650px",
    padding: "20px",
  },
};

interface IModalProps {
  showPopup: boolean;
  closePopup: () => void;
  vnpTransactionStatus: any;
  vnpResponseCode: any;
  storedTotal: string | null;
  vnp_Amount: any;
  vnp_TransactionNo: any;
  vnp_PayDate: any;
  vnp_OrderInfo: any;
  vnp_BankCode: any;
}

const PopupVnpayReturnUrl: React.FC<IModalProps> = ({
  closePopup,
  showPopup,
  vnpTransactionStatus,
  vnpResponseCode,
  storedTotal,
  vnp_Amount,
  vnp_TransactionNo,
  vnp_PayDate,
  vnp_BankCode,
  vnp_OrderInfo,
}) => {
  useEffect(() => {
    // Thêm hoặc xóa thanh scoll khi showModal thay đổi
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showPopup]);

  return (
    <div>
      <ReactModal
        isOpen={showPopup}
        onRequestClose={closePopup}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mt-10 mb-4 lg:mt-0 lg:mb-0">
          <p className="text-3xl font-bold  text-primary_green">
            Thông tin thanh toán
          </p>
          <button
            onClick={closePopup}
            className="absolute text-3xl top-12 lg:top-4 right-4 text-red-500"
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className="lg:mt-10 mb-10 text-xl">
          <p>
            Thành tiền: {numeral(storedTotal).format("0,0").replace(/,/g, ".")}{" "}
            vnđ
          </p>
          <p>
            Nội dung thanh toán: <span>{vnp_OrderInfo}</span>
          </p>
          <p>
            Ngân hàng giao dịch: <span>{vnp_BankCode}</span>
          </p>
          <p>
            Mã giao dịch: <span>{vnp_TransactionNo}</span>
          </p>
          <p>
            Ngày giao dịch:{" "}
            <span>
              {moment(vnp_PayDate, "YYYY-MM-DDTHH:mm:ssZ").format(
                "YYYY/MM/DD HH:mm:ss"
              )}
            </span>
          </p>
          <p>
            Trạng thái thanh toán:{" "}
            <span>
              {vnpResponseCode === "00" &&
              vnpTransactionStatus === "00" &&
              vnp_Amount === vnp_Amount
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </span>
          </p>
        </div>
      </ReactModal>
    </div>
  );
};

export default PopupVnpayReturnUrl;
