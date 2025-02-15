import { useState } from "react";
import Tab from "./component/Tab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ProductList from "./component/ProductList";
import ProductModal from "./component/ProductModal";
import DetailCustomer from "./component/DetailCustomer";
import CustomerModal from "./component/CustomerModal";
import PaymentSection from "./component/PaymentSection";

export default function CounterSale() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Đơn hàng 1",
      products: [],
      totalAmount: 0,
      discount: 0,
      status: "HD8434353455",
      customer: "Khách hàng lẻ",
    },
  ]);
  const [currentTab, setCurrentTab] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCustormerModal, setShowCustomerModal] = useState(false);

  const generateOrderCode = () => {
    const randomCode = Math.floor(1000000 + Math.random() * 9000000); // Tạo số ngẫu nhiên 7 chữ số
    return `HD${randomCode}`;
  };

  const addNewOrder = () => {
    const newOrderCode = generateOrderCode();
    setOrders([
      ...orders,
      {
        id: orders.length + 1,
        name: `Đơn hàng ${orders.length + 1}`,
        products: [],
        totalAmount: 0,
        discount: 0,
        status: newOrderCode,
        customer: "Khách hàng lẻ",
      },
    ]);
    setCurrentTab(orders.length);
    toast.success("Đơn hàng đã được tạo !");
    console.log(toast);
  };

  const addProductToOrder = (product) => {
    const updatedOrders = [...orders];
    updatedOrders[currentTab].products.push(product);
    updatedOrders[currentTab].totalAmount += product.price;
    setOrders(updatedOrders);
    toast.success(`Sản phẩm ${product.name} đã được thêm vào giỏ hàng!`);
  };

  const selectCustomer = (customer) => {
    const updatedOrders = [...orders];
    updatedOrders[currentTab].customer = customer;
    setOrders(updatedOrders);
    toast.success(`Đã chọn khách hàng: ${customer}`);
  };

  const applyDiscount = (discountAmount) => {
    const updatedOrders = [...orders];
    updatedOrders[currentTab].discount = discountAmount;
    setOrders(updatedOrders);
    toast.success("Mã giảm giá đã được áp dụng!");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex space-x-4 bg-white shadow rounded py-4 px-4">
        <button
          onClick={addNewOrder}
          className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
        >
          Tạo hóa đơn mới
        </button>
      </div>
      <Tab
        orders={orders}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="bg-white shadow rounded py-4 px-4 mt-4">
        <div className="flex items-center justify-between ">
          <p className="text-sm font-semibold">
            {orders[currentTab]?.name} - {orders[currentTab]?.status}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowProductModal(true)}
              className="px-4 py-1 border border-orange-500 rounded-lg bg-orange-500 text-white"
            >
              Thêm sản phẩm
            </button>
            <button className="px-4 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
              Quét QR
            </button>
          </div>
        </div>
      </div>
      <ProductList products={orders[currentTab]?.products} />
      {showProductModal && (
        <ProductModal
          onClose={() => setShowProductModal(false)}
          onSelectProduct={addProductToOrder}
        />
      )}
      <DetailCustomer
        onclick={() => setShowCustomerModal(true)}
        customer={orders[currentTab]?.customer}
      />
      {showCustormerModal && (
        <CustomerModal
          onClose={() => setShowCustomerModal(false)}
          onSelectCustomer={selectCustomer}
        />
      )}
      <PaymentSection
        order={orders[currentTab]}
        applyDiscount={applyDiscount}
      />
      <ToastContainer />
    </div>
  );
}
