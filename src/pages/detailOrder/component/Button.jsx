export default function Button() {
  return (
    <div className="flex space-x-4 bg-white shadow rounded py-4 px-4">
      {/* Button Quét mã */}
      <button className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
        Chi tiết
      </button>

      {/* Button Tạo Hóa Đơn */}
      <button className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
        In hóa đơn
      </button>
    </div>
  );
}
