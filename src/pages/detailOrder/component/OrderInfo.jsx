import { useParams } from "react-router-dom";

export default function OrderInfo({ order }) {
  const { id } = useParams();
  return (
    <div className="bg-white shadow rounded my-4 p-2">
      <h2 className="text-lg font-bold mb-4">
        Thông tin đơn hàng - {order.loaiDon}
      </h2>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="space-y-4">
          <p>
            <strong>Mã:</strong> {id}
          </p>
          <p>
            <strong>Tên khách hàng:</strong> {order.tenKhachHang}
          </p>
          <p>
            <strong>SĐT người nhận:</strong> {order.soDienThoai || "Không có"}
          </p>
        </div>
        <div className="space-y-4">
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                order.trangThai === "Hoàn thành"
                  ? "bg-pink-200 text-pink-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {order.trangThai}
            </span>
          </p>
          <p>
            <strong>Loại:</strong>{" "}
            <span
              className={`px-2 py-1 rounded ${
                order.loaiDon === "Tại quầy"
                  ? "bg-green-200 text-green-600"
                  : "bg-blue-200 text-blue-600"
              }`}
            >
              {order.loaiDon}
            </span>
          </p>
          <p>
            <strong>Tên người nhận:</strong> {order.tenNguoiNhan || "Không có"}
          </p>
        </div>
      </div>
    </div>
  );
}
