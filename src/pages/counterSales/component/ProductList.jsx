export default function ProductList({ products }) {
  return (
    <div className="border border-gray-200 px-2 py-2 rounded-lg mt-2">
      <p className="font-bold">Giỏ hàng</p>
      <div className="min-h-[300px]">
        {products.length === 0 ? (
          <div className="grid place-items-center h-[300px]">
            <p className="text-lg text-gray-400 text-center">
              Chưa có sản phẩm nào trong giỏ hàng !!
            </p>
          </div>
        ) : (
          <ul className="mt-2 space-y-2">
            {console.log(products)}
            {products.map((product, index) => (
              <li className="flex justify-between border-b py-2" key={index}>
                <span>{product.name}</span>
                <span>{product.price.toLocaleString()} VND</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
