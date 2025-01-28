import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductDetailService from "../services/ProductDetailService";

export default function ProductUpdateModal({ modalVisible, currentProduct, onClose, onUpdate }) {
  const [soLuong, setSoLuong] = useState("");
  const [donGia, setDonGia] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");

  useEffect(() => {
    if (currentProduct) {
      setSoLuong(currentProduct.soLuong);
      setDonGia(currentProduct.donGia);
      setHinhAnh(currentProduct.hinhAnh);
    }
  }, [currentProduct]);

  const handleUpdateSubmit = async () => {
    const productDetailData = { soLuong, donGia, hinhAnh };
    try {
      const result = await ProductDetailService.updateProductDetail(currentProduct.id, productDetailData);
      onUpdate(result);  // Call the onUpdate function passed as a prop to update the product in the parent component
      toast.success("Cập nhật sản phẩm thành công!");
      onClose();  // Close the modal after successful update
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  if (!modalVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Cập nhật chi tiết sản phẩm</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Số lượng</label>
          <input
            type="number"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Đơn giá</label>
          <input
            type="number"
            value={donGia}
            onChange={(e) => setDonGia(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
          <input
            type="text"
            value={hinhAnh}
            onChange={(e) => setHinhAnh(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-sm rounded-lg mr-2"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateSubmit}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
