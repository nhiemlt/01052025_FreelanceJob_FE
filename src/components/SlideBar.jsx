import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaUserTie,
  FaStore,
  FaBox,
  FaUsers,
  FaUndo,
  FaChevronDown,
} from "react-icons/fa";

function SlideBar() {
  const [activeMenu, setActiveMenu] = useState("thongKe");
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu(menu);
    if (menu === "quanLySanPham") setShowProductMenu(!showProductMenu);
    if (menu === "quanLyTaiKhoan") setShowAccountMenu(!showAccountMenu);
  };

  const productItems = [
    { label: "Sản phẩm", icon: <FaBox />, path: "product" },
    { label: "Chất liệu", icon: <FaBox />, path: "material" },
    { label: "Cổ áo", icon: <FaBox />, path: "collar" },
    { label: "Màu sắc", icon: <FaBox />, path: "color" },
    { label: "Kích thước", icon: <FaBox />, path: "size" },
    { label: "Tay áo", icon: <FaBox />, path: "sleeve" },
    { label: "Thương hiệu", icon: <FaBox />, path: "brand" },
    { label: "Xuất xứ", icon: <FaBox />, path: "origin" },
  ];

  const accountItems = [
    { label: "Nhân Viên", icon: <FaUserTie />, path: "employee" },
    { label: "Khách Hàng", icon: <FaUsers />, path: "customer" },
  ];

  return (
    <div className="w-64 min-h-screen bg-base-200 shadow-lg p-4">
      <div className="flex justify-center mb-4">
        <img src="/public/logo2.png" alt="Logo" className="w-24" />
      </div>

      <ul className="menu w-full">
        <li>
          <Link
            to="/admin/statistic"
            className={`menu-item ${activeMenu === "thongKe" ? "active" : ""}`}
            onClick={() => toggleMenu("thongKe")}
          >
            <FaChartBar /> Thống kê
          </Link>
        </li>

        <li>
          <Link
            to="/admin/customer"
            className={`menu-item ${activeMenu === "nhanVien" ? "active" : ""}`}
            onClick={() => toggleMenu("nhanVien")}
          >
            <FaUserTie /> Nhân Viên
          </Link>
        </li>

        <li>
          <Link
            to="/admin/counterSale"
            className={`menu-item ${activeMenu === "banHangTaiQuay" ? "active" : ""}`}
            onClick={() => toggleMenu("banHangTaiQuay")}
          >
            <FaStore /> Bán hàng tại quầy
          </Link>
        </li>

        <li>
          <Link
            to="/admin/order"
            className={`menu-item ${activeMenu === "donHang" ? "active" : ""}`}
            onClick={() => toggleMenu("donHang")}
          >
            <FaBox /> Đơn Hàng
          </Link>
        </li>

        {/* Quản lý sản phẩm */}
        <li>
          <div
            className="menu-item flex justify-between"
            onClick={() => toggleMenu("quanLySanPham")}
          >
            <span className="flex items-center gap-2">
              <FaBox /> Quản lý sản phẩm
            </span>
            <FaChevronDown className={`transition ${showProductMenu ? "rotate-180" : ""}`} />
          </div>
          {showProductMenu && (
            <ul className="pl-4">
              {productItems.map((item) => (
                <li key={item.path}>
                  <Link to={`/admin/${item.path}`} className="menu-subitem">
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Quản lý tài khoản */}
        <li>
          <div
            className="menu-item flex justify-between"
            onClick={() => toggleMenu("quanLyTaiKhoan")}
          >
            <span className="flex items-center gap-2">
              <FaUsers /> Quản lý tài khoản
            </span>
            <FaChevronDown className={`transition ${showAccountMenu ? "rotate-180" : ""}`} />
          </div>
          {showAccountMenu && (
            <ul className="pl-4">
              {accountItems.map((item) => (
                <li key={item.path}>
                  <Link to={`/admin/${item.path}`} className="menu-subitem">
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <Link to="/admin/return" className="menu-item">
            <FaUndo /> Trả Hàng
          </Link>
        </li>
        <li>
          <Link className="menu-item">
            <FaBox /> Khuyến mãi
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SlideBar;
