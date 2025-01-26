import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Switch from "react-switch";
import ProductService from "./services/ProductService";

export default function Product() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getAllProducts();
        console.log("Fetched products:", products); // Log fetched products
        setItems(products); // Set items with the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSaveProduct = (data) => {
    if (currentProduct) {
      console.log("Cập nhật sản phẩm:", { ...currentProduct, ...data });
    } else {
      console.log("Thêm sản phẩm mới:", data);
    }
    setCurrentProduct(null);
  };

  const handleToggleStatus = async (id) => {
    try {
      const updatedItems = items.map((item) =>
        item.id === id
          ? { ...item, trang_thai: item.trang_thai === 1 ? 0 : 1 }
          : item
      );
      setItems(updatedItems);
      await ProductService.updateProduct(id, { trang_thai: updatedItems.find(item => item.id === id).trang_thai });
      console.log("Cập nhật trạng thái sản phẩm với ID:", id);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleViewDetail = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const renderRows = () => {
    return sortedItems.map((item, index) => (
      <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{item.maSanPham}</td>
        <td className="px-4 py-2">{item.tenSanPham}</td>
        <td className="px-4 py-2">{item.soLuong}</td>
        <td
          className={`px-4 py-2 ${item.trangThai ? "status-active" : "status-inactive"}`}
        >
          <span className="status-dot"></span>
          {item.trangThai ? " Còn hàng" : " Hết hàng"}
        </td>
        <td className="px-4 py-2 flex justify-center gap-4">
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => handleViewDetail(item.id)}
          >
            <AiOutlineEye size={20} />
          </button>
          <Switch
            onChange={() => handleToggleStatus(item.id)}
            checked={item.trangThai}
            offColor="#808080"
            onColor="#00a000"
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </td>
      </tr>
    ));
  };

  const renderSortableHeader = (label, sortKey) => {
    const isSorted = sortConfig.key === sortKey;
    const isAscending = isSorted && sortConfig.direction === "asc";

    return (
      <th
        className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors relative"
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center justify-center">
          {label}
          <div className="ml-2 flex flex-col">
            <AiFillCaretUp
              className={`text-sm ${
                isSorted && isAscending
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />
            <AiFillCaretDown
              className={`text-sm ${
                isSorted && !isAscending
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />
          </div>
        </div>
      </th>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Quản lý sản phẩm</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm theo mã, tên sản phẩm"
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex gap-2">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600">
            Export Excel
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
            onClick={() => navigate("/admin/product/new")}
          >
            + Thêm mới
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <table className="table-auto w-full bg-white rounded-lg shadow overflow-hidden text-center">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="px-4 py-2">STT</th>
            {renderSortableHeader("Mã sản phẩm", "maSanPham")}
            {renderSortableHeader("Tên sản phẩm", "tenSanPham")}
            {renderSortableHeader("Số lượng", "soLuong")}
            {renderSortableHeader("Trạng thái", "trangThai")}
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      {/* Phân trang */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="entries" className="text-sm text-gray-700">
            Xem
          </label>
          <select
            id="entries"
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-700">Sản phẩm</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100">
            {"<"}
          </button>
          <span className="text-sm text-gray-700">1</span>
          <button className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100">
            {">"}
          </button>
        </div>
      </div>

      <style>{`
        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }
        .status-active .status-dot {
          background-color: #00a000;
        }
        .status-inactive .status-dot {
          background-color: #808080;
        }
        .status-active {
          color: #00a000;
        }
        .status-inactive {
          color: #808080;
        }
      `}</style>
    </div>
  );
}