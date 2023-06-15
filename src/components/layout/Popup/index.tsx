import { axiosClient } from "../../../libraries/axiosClient";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ReactModal from "react-modal";
// Thiết lập các style cho modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "850px",
    width: "100%",
    height: "450px",
    padding: "20px",
  },
};

interface IModalProps {
  productId: string;
  showPopup: boolean;
  closePopup: () => void;
}
interface IProduct {
  _id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  product_image: string;
}
const Popup: React.FC<IModalProps> = ({ closePopup, showPopup, productId }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  useEffect(() => {
    // Thêm hoặc xóa thanh scoll khi showModal thay đổi
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showPopup]);

  useEffect(() => {
    if (productId) {
      axiosClient.get("/products/product/" + productId).then((response) => {
        setProduct(response.data);
      });
    }
  }, [productId]);
  return (
    <div>
      <ReactModal
        isOpen={showPopup}
        onRequestClose={closePopup}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex w-full h-full">
          <div className="flex-1 items-center justify-center">
            <img
              src={product?.product_image}
              alt="image"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="flex-1 font-semibold cursor-pointer text-2xl">
            <p className="p-2">{product?.name}</p>
          </div>
        </div>
        <button
          onClick={closePopup}
          className="absolute text-2xl top-2 right-2 text-red-500"
        >
          <MdOutlineClose />
        </button>
      </ReactModal>
    </div>
  );
};

export default Popup;
