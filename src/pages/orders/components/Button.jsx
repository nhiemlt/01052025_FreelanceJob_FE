import { Link } from "react-router-dom";

export default function Button({ setQrCodeScan }) {
  return (
    <div className="flex space-x-4">
      {/* Button Quét mã */}
      <button
        onClick={setQrCodeScan}
        className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
      >
        Quét mã
      </button>

      {/* Button Tạo Hóa Đơn */}
      <Link to="/admin/counterSale">
        <button className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
          Tạo hóa đơn
        </button>
      </Link>
    </div>
  );
}
