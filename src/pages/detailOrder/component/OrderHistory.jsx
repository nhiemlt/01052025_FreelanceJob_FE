export default function OrderHistory({ orderStatuses }) {
  return (
    <div className="bg-white shadow rounded my-4">
      <p className="text-sm font-bold mb-2 p-2">Lịch sử đơn hàng</p>
      <div className="flex items-center space-x-4 overflow-x-auto p-4 ">
        {orderStatuses.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${
                item.isCompleted
                  ? "bg-orange-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {item.isCompleted ? "✓" : index + 1}
            </div>

            {/* Arrow */}
            {index < orderStatuses.length - 1 && (
              <div
                className={`h-1 w-16 ${
                  item.isCompleted ? "bg-orange-500" : "bg-gray-300"
                }`}
              ></div>
            )}

            {/* Status text */}
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold">{item.status}</p>
              {item.date && (
                <p className="text-xs text-gray-500">{item.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
