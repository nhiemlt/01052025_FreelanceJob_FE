import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

export default function ProductModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    idDanhMuc: "",
    tenSanPham: "",
    maSanPham: "",
    moTa: "",
    trangThai: "",
  });

  const [errors, setErrors] = useState({});

  // Dữ liệu mẫu cho danh mục
  const categories = [
    { id: 1, name: "Điện thoại" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Phụ kiện" },
    { id: 4, name: "Máy tính bảng" },
  ];

  // Tạo mã sản phẩm ngẫu nhiên
  const generateProductCode = () => {
    const randomCode = `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormData({ ...formData, maSanPham: randomCode });
  };

  // Xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kiểm tra dữ liệu đầu vào
  const validate = () => {
    const newErrors = {};

    if (!formData.idDanhMuc) {
      newErrors.idDanhMuc = "Danh mục không được null";
    }

    if (!formData.tenSanPham) {
      newErrors.tenSanPham = "Tên sản phẩm không được để trống";
    } else if (formData.tenSanPham.length > 255) {
      newErrors.tenSanPham = "Tên sản phẩm không quá 255 ký tự";
    }

    if (!formData.maSanPham) {
      newErrors.maSanPham = "Mã sản phẩm không được null";
    }

    if (formData.moTa && formData.moTa.length > 255) {
      newErrors.moTa = "Mô tả không quá 255 ký tự";
    }

    if (formData.trangThai === "") {
      newErrors.trangThai = "Trạng thái không được null";
    } else if (![0, 1].includes(parseInt(formData.trangThai))) {
      newErrors.trangThai = "Trạng thái phải là 0 hoặc 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData); // Gửi dữ liệu về component cha
      onClose(); // Đóng modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Thêm sản phẩm mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Danh mục */}
            <div>
              <label className="block text-sm font-medium">Danh mục</label>
              <select
                name="idDanhMuc"
                value={formData.idDanhMuc}
                onChange={handleChange}
                className={`border rounded-lg px-4 py-2 w-full ${
                  errors.idDanhMuc ? "border-red-500" : ""
                }`}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.idDanhMuc && (
                <p className="text-red-500 text-sm">{errors.idDanhMuc}</p>
              )}
            </div>

            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-medium">Tên sản phẩm</label>
              <input
                type="text"
                name="tenSanPham"
                value={formData.tenSanPham}
                onChange={handleChange}
                className={`border rounded-lg px-4 py-2 w-full ${
                  errors.tenSanPham ? "border-red-500" : ""
                }`}
              />
              {errors.tenSanPham && (
                <p className="text-red-500 text-sm">{errors.tenSanPham}</p>
              )}
            </div>

            {/* Mã sản phẩm */}
            <div>
              <label className="block text-sm font-medium">Mã sản phẩm</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="maSanPham"
                  value={formData.maSanPham}
                  onChange={handleChange}
                  className={`border rounded-lg px-4 py-2 w-full ${
                    errors.maSanPham ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={generateProductCode}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  <FaSyncAlt /> Generate
                </button>
              </div>
              {errors.maSanPham && (
                <p className="text-red-500 text-sm">{errors.maSanPham}</p>
              )}
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Mô tả</label>
              <textarea
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
                className={`border rounded-lg px-4 py-2 w-full ${
                  errors.moTa ? "border-red-500" : ""
                }`}
              />
              {errors.moTa && (
                <p className="text-red-500 text-sm">{errors.moTa}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium">Trạng thái</label>
              <select
                name="trangThai"
                value={formData.trangThai}
                onChange={handleChange}
                className={`border rounded-lg px-4 py-2 w-full ${
                  errors.trangThai ? "border-red-500" : ""
                }`}
              >
                <option value="">Chọn trạng thái</option>
                <option value="0">Không hoạt động</option>
                <option value="1">Hoạt động</option>
              </select>
              {errors.trangThai && (
                <p className="text-red-500 text-sm">{errors.trangThai}</p>
              )}
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
