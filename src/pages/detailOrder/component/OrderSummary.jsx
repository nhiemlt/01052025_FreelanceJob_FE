export default function OrderSummary({ orderSummary }) {
  return (
    <div className="p-4 border rounded bg-white shadow my-4">
      {/* Phiếu giảm giá và giảm giá cửa hàng */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong>Phiếu giảm giá:</strong>{" "}
          {orderSummary.maPhieuGiamGia || "Không có"}
        </p>
        <p>
          <strong>Giảm giá từ cửa hàng:</strong>{" "}
          {orderSummary.giamGiaCuaHang || "0%"}
        </p>
      </div>

      {/* Tổng tiền */}
      <div className="mt-4 text-sm">
        <p>
          <strong>Tổng tiền hàng:</strong>{" "}
          <span className="float-right">
            {orderSummary.tongTienHang.toLocaleString("vi-VN")} VND
          </span>
        </p>
        <p>
          <strong>Giảm giá:</strong>{" "}
          <span className="float-right text-green-500">
            -{orderSummary.giamGia.toLocaleString("vi-VN")} VND
          </span>
        </p>
        <p>
          <strong>Phí vận chuyển:</strong>{" "}
          <span className="float-right">
            {orderSummary.phiVanChuyen.toLocaleString("vi-VN")} VND
          </span>
        </p>
      </div>

      {/* Ghi chú phí vận chuyển */}
      <p className="mt-2 text-xs text-gray-500">
        Miễn phí vận chuyển với đơn hàng có tổng tiền trên 1.000.000 VND
      </p>

      {/* Tổng tiền cuối cùng */}
      <div className="mt-4 text-lg font-bold text-right text-red-500">
        <p>Tổng tiền: {orderSummary.tongTien.toLocaleString("vi-VN")} VND</p>
      </div>
    </div>
  );
}
