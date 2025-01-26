import React, { useState } from "react";

export default function ProductModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    tenSanPham: "",
    moTa: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Thêm nhanh sản phẩm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tên sản phẩm</label>
            <input
              type="text"
              name="tenSanPham"
              value={formData.tenSanPham}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Mô tả</label>
            <textarea
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
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