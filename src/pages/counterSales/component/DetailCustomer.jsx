export default function DetailCustomer({ onclick, customer }) {
  return (
    <div className="border border-gray-200 px-2 py-2 rounded-lg mt-2">
      <div className="flex justify-between mt-2">
        <p className="font-bold">Thông tin khách hàng</p>
        <button
          onClick={onclick}
          className="px-4 py-1 border border-orange-500 rounded-lg bg-orange-500 text-white"
        >
          Chọn khách hàng
        </button>
      </div>
      <div className="flex space-x-4">
        <p className="font-bold">Tên khách hàng:</p>
        <p className="font-bold text-orange-400">{customer}</p>
      </div>
    </div>
  );
}
