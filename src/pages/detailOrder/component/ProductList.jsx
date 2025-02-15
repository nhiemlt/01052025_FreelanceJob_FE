export default function ProductList({ productList }) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      {/* Tiêu đề */}
      <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4">
        {productList.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* Hình ảnh sản phẩm */}
            <div className="flex items-center space-x-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                {/* Tên sản phẩm */}
                <h3 className="font-semibold text-gray-700">{product.name}</h3>
                {/* Giá và kích cỡ */}
                <p className="text-sm text-gray-500 line-through">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
                <p className="text-sm text-gray-600">Size: {product.size}</p>
                <p className="text-sm text-gray-600">x{product.quantity}</p>
              </div>
            </div>

            {/* Điều chỉnh số lượng */}
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 flex items-center justify-center border rounded">
                -
              </button>
              <p>{product.quantity}</p>
              <button className="w-8 h-8 flex items-center justify-center border rounded">
                +
              </button>
            </div>

            {/* Tổng tiền */}
            <div className="text-right">
              <p className="font-semibold text-red-500">
                {product.total.toLocaleString("vi-VN")} VND
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
