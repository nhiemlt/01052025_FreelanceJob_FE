import { useState } from "react";

export default function PaymentSection({ order, applyDiscount }) {
  const [discountCode, setDiscountCode] = useState("");
  const [customerPaid, setCustomerPaid] = useState(0);

  const handleApplyDiscount = () => {
    if (discountCode === "MEME") {
      applyDiscount(100000); // Giảm giá 100,000 VND
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const remainingAmount = order.totalAmount - order.discount - customerPaid;
  return (
    <div className="border border-gray-200 px-2 py-2 rounded-lg mt-2">
      <p className="font-bold">Thông tin thanh toán</p>
      <div className="mt-4 bg-white p-4 rounded shadow w-1/3 ">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Tiền hàng:</span>
          <span>{order.totalAmount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Giảm giá:</span>
          <span>{order.discount.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mr-2 w-1/3"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Áp dụng mã
          </button>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Khách thanh toán:</span>
          <input
            type="text"
            value={customerPaid}
            onChange={(e) => setCustomerPaid(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 w-1/3 text-right"
          />
        </div>
        <div
          className={`flex justify-between items-center mb-2 ${remainingAmount >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          <span className="font-semibold">{`Tiền ${remainingAmount >= 0 ? "Thiếu" : "Thừa"}`}</span>
          <span>{Math.abs(remainingAmount).toLocaleString()} đ</span>
        </div>
        <button className="px-4 py-1 border border-orange-500 rounded-lg bg-orange-500 text-white w-full">
          Xác nhận đơn hàng
        </button>
      </div>
    </div>
  );
}
