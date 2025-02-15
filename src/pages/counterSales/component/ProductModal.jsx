export default function ProductModal({ onClose, onSelectProduct }) {
  const products = [
    { id: 1, name: "Chiếc Áo Bà Ba", price: 100000 },
    { id: 2, name: "Hỡi Cô Lái Đò", price: 200000 },
    { id: 3, name: "Anh Ba Khía", price: 300000 },
  ];

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Chọn sản phẩm</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {product.name} - {product.price.toLocaleString()} VND
              </span>
              <button
                onClick={() => handleSelectProduct(product)}
                className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
              >
                Chọn
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="px-4 py-1 border border-orange-500 rounded-lg bg-orange-500 text-white"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
