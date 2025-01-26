import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function EditProductModal({
  isOpen,
  onRequestClose,
  product,
  onSave,
}) {
  const [formData, setFormData] = useState({
    thuongHieuId: "",
    xuatXuId: "",
    chatLieuId: "",
    coAoId: "",
    tayAoId: "",
    mauSacId: "",
    kichThuocId: "",
    soLuong: 0,
    gia: 0,
    moTa: "",
    hinhAnh: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        thuongHieuId: product.thuongHieu || "",
        xuatXuId: product.xuatXu || "",
        chatLieuId: product.chatLieu || "",
        coAoId: product.coAo || "",
        tayAoId: product.tayAo || "",
        mauSacId: product.mauSac || "",
        kichThuocId: product.kichThuoc || "",
        soLuong: product.soLuong || 0,
        gia: product.gia || 0,
        moTa: product.moTa || "",
        hinhAnh: product.hinhAnh || null,
      });
    }
  }, [product]);

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : "" });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, hinhAnh: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const options = {
    thuongHieuId: [
      { value: "Apple", label: "Apple" },
      { value: "Samsung", label: "Samsung" },
      { value: "Sony", label: "Sony" },
    ],
    xuatXuId: [
      { value: "Việt Nam", label: "Việt Nam" },
      { value: "Trung Quốc", label: "Trung Quốc" },
      { value: "Mỹ", label: "Mỹ" },
    ],
    chatLieuId: [
      { value: "Cotton", label: "Cotton" },
      { value: "Polyester", label: "Polyester" },
      { value: "Len", label: "Len" },
    ],
    coAoId: [
      { value: "Cổ tròn", label: "Cổ tròn" },
      { value: "Cổ tim", label: "Cổ tim" },
      { value: "Cổ bẻ", label: "Cổ bẻ" },
    ],
    tayAoId: [
      { value: "Ngắn tay", label: "Ngắn tay" },
      { value: "Dài tay", label: "Dài tay" },
    ],
    mauSacId: [
      { value: "Đỏ", label: "Đỏ" },
      { value: "Xanh", label: "Xanh" },
      { value: "Vàng", label: "Vàng" },
    ],
    kichThuocId: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Cột 1: Thuộc tính sản phẩm */}
          <div className="col-span-1">
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4">
                Thuộc tính sản phẩm
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "thuongHieuId",
                  "xuatXuId",
                  "chatLieuId",
                  "coAoId",
                  "tayAoId",
                  "mauSacId",
                  "kichThuocId",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2">
                      {field === "thuongHieuId"
                        ? "Thương hiệu"
                        : field === "xuatXuId"
                          ? "Xuất xứ"
                          : field === "chatLieuId"
                            ? "Chất liệu"
                            : field === "coAoId"
                              ? "Cổ áo"
                              : field === "tayAoId"
                                ? "Tay áo"
                                : field === "mauSacId"
                                  ? "Màu sắc"
                                  : "Kích thước"}
                    </label>
                    <Select
                      name={field}
                      value={options[field].find(option => option.value === formData[field])}
                      onChange={handleChange}
                      options={options[field]}
                      isClearable
                      className="rounded-lg py-2 w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="soLuong"
                    value={formData.soLuong}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Giá</label>
                  <input
                    type="number"
                    name="gia"
                    value={formData.gia}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Mô tả sản phẩm và hình ảnh */}
          <div className="col-span-1">
            {/* Mô tả sản phẩm */}
            <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4">Mô tả sản phẩm</h3>
              <textarea
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full h-32"
                placeholder="Nhập mô tả sản phẩm"
              />
            </div>

            {/* Chọn hình ảnh */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Chọn hình ảnh</h3>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Nhấp để tải ảnh</span>{" "}
                      hoặc kéo và thả
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="hinhAnh"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Nút điều khiển */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onRequestClose}
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
      </div>
    </div>
  );
}