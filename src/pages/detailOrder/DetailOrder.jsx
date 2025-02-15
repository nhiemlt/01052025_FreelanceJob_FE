import Button from "./component/Button";
import HeaderTitle from "./component/headerTitle";
import OrderHistory from "./component/OrderHistory";
import OrderInfo from "./component/OrderInfo";
import OrderSummary from "./component/OrderSummary";
import PaymentHistory from "./component/PayMentHistory";
import ProductList from "./component/ProductList";

export default function DetailOrder() {
  const orderStatuses = [
    { status: "Tạo đơn hàng", date: "21-12-2023 13:48:14", isCompleted: true },
    { status: "Đã xác nhận", date: "21-12-2023 14:00:00", isCompleted: true },
    { status: "Đang chuẩn bị", date: null, isCompleted: false },
    { status: "Đang giao", date: null, isCompleted: false },
    { status: "Hoàn thành", date: null, isCompleted: false },
  ];

  const order = {
    maHoaDon: "HD10",
    tenKhachHang: "Khách lẻ",
    soDienThoai: "0123456789",
    loaiDon: "Tại quầy", // Hoặc "Online"
    trangThai: "Hoàn thành",
    tenNguoiNhan: null,
  };

  const paymentHistory = [
    {
      soTien: "2,127,500 đ",
      thoiGian: "21-12-2023 13:51:03",
      loaiGiaoDich: "Thanh toán",
      phuongThucThanhToan: "Tiền mặt",
      trangThai: "Thành công",
      ghiChu: "",
      nhanVienXacNhan: "Nguyễn Văn Nhật",
    },
  ];

  const productList = [
    {
      id: 1,
      name: "Áo Xanh Dương",
      price: 80000,
      size: 40,
      quantity: 3,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oAPe3TfCq8pBskCyf2yyvl1xtqNNSUim7A&s",
      total: 240000,
    },
    {
      id: 2,
      name: "Converse Venom Tím",
      price: 712500,
      size: 41,
      quantity: 3,
      imageUrl:
        "https://dongphucgiadinh.com/wp-content/uploads/2022/07/ao-dong-phuc-cong-ty-gao-house-24.jpg",
      total: 2137500,
    },
  ];

  const orderSummary = {
    maPhieuGiamGia: "PGG12",
    giamGiaCuaHang: "0%",
    tongTienHang: 2377500,
    giamGia: 250000,
    phiVanChuyen: 0,
    tongTien: 2127500,
  };
  return (
    <div className="p-6 bg-white min-h-screen">
      <HeaderTitle />
      <OrderHistory orderStatuses={orderStatuses} />
      <Button />
      <OrderInfo order={order} />
      <PaymentHistory paymentHistory={paymentHistory} />
      <ProductList productList={productList} />
      <OrderSummary orderSummary={orderSummary} />
    </div>
  );
}
