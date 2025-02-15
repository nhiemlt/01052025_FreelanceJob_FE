export default function PaymentHistory({ paymentHistory }) {
  return (
    <div className="p-4 border rounded bg-white shadow my-4">
      {/* Tiêu đề */}
      <h2 className="text-lg font-bold mb-4">Lịch sử thanh toán</h2>

      {/* Bảng hiển thị lịch sử thanh toán */}
      <table className="w-full border-collapse border-spacing-0 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Số tiền</th>
            <th className="border p-2">Thời gian</th>
            <th className="border p-2">Loại giao dịch</th>
            <th className="border p-2">PTTT</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Ghi chú</th>
            <th className="border p-2">Nhân viên xác nhận</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 text-right">{item.soTien}</td>
              <td className="border p-2 text-center">{item.thoiGian}</td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 bg-blue-200 text-blue-600 rounded">
                  {item.loaiGiaoDich}
                </span>
              </td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 bg-orange-200 text-orange-600 rounded">
                  {item.phuongThucThanhToan}
                </span>
              </td>
              <td className="border p-2 text-center">
                <span className="px-2 py-1 bg-green-200 text-green-600 rounded">
                  {item.trangThai}
                </span>
              </td>
              <td className="border p-2">{item.ghiChu || "Không có"}</td>
              <td className="border p-2 text-center">{item.nhanVienXacNhan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
