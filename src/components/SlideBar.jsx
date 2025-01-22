import { useState } from "react";
import { Link } from "react-router-dom";
import SubSlideBar from "./SubSlideBar";
function SlideBar() {
  const [click, setClick] = useState("thongKe");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenu2, setShowSubMenu2] = useState(false);

  const handleClick = (item) => {
    setClick(item);
    setShowSubMenu(item === "quanLySanPham" ? !showSubMenu : false);
    setShowSubMenu2(item === "quanLyTaiKhoan" ? !showSubMenu2 : false);
  };

  //   Các thành phần có trong sản phẩm
  const ItemOfProduct = [
    { label: "Sản phẩm", icon: "fa-solid fa-cube", path: "product" },
    { label: "Danh mục", icon: "fa-solid fa-tag", path: "" },
    { label: "Báo cáo sản phẩm", icon: "fa-solid fa-book", path: "" },
    { label: "Chất liệu", icon: "fa-solid fa-book", path: "" },
  ];
  //   Các thành phần có trong quản lý tài khoản
  const ItemOfAcount = [
    { label: "Nhân Viên", icon: "fa-solid fa-cube", path: "employee" },
    { label: "Khách Hàng", icon: "fa-solid fa-tag", path: "customer" },
  ];
  return (
    <div className="slideBar-items">
      <div className="logo">
        <img src="/public/logo2.png" alt="Đây là logo" />
      </div>
      <div className="nav">
        <ul className="item">
          <li
            onClick={() => handleClick("thongKe")}
            className={click == "thongKe" ? "active" : ""}
          >
            <Link to="/admin/statistic">Thống kê</Link>
          </li>

          <li
            onClick={() => handleClick("nhanVien")}
            className={click == "nhanVien" ? "active" : ""}
          >
            <Link to="/admin/customer">Nhân Viên</Link>
          </li>

          <li
            onClick={() => handleClick("banHangTaiQuay")}
            className={click == "banHangTaiQuay" ? "active" : ""}
          >
            <Link>Bán hàng tại quầy</Link>
          </li>
          <li>
            <Link>Đơn Hàng</Link>
          </li>
          <li
            onClick={() => handleClick("quanLySanPham")}
            className={click == "quanLySanPham" ? "active" : ""}
          >
            <Link>Quản lý sản phẩm</Link>
          </li>
          {showSubMenu && <SubSlideBar items={ItemOfProduct} />}
          <li
            onClick={() => handleClick("quanLyTaiKhoan")}
            className={click == "quanLyTaiKhoan" ? "active" : ""}
          >
            <Link>Quản lý tài khoản</Link>
          </li>
          {showSubMenu2 && <SubSlideBar items={ItemOfAcount} />}
          <li>
            <Link to="/admin/return">Trả Hàng</Link>
          </li>
          <li>
            <Link>Khuyến mãi</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SlideBar;
