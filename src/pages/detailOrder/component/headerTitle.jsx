import { Link, useParams } from "react-router-dom";

export default function HeaderTitle() {
  const { id } = useParams();
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2 text-gray-700">
        <h1 className="text-lg font-bold">Quản lý đơn hàng</h1>
        <span className="text-gray-400">/</span>
        <span className="text-gray-500">{id}</span>
      </div>

      <Link
        to="/admin/order"
        className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
      >
        <button>Quay lại</button>
      </Link>
    </div>
  );
}
