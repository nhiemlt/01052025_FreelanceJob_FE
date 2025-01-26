import React, { useState, useEffect } from "react";
import { FaTrash, FaFileImage } from "react-icons/fa";

export default function ProductVariants({ colors, sizes, onVariantsChange }) {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (colors.length > 0 && sizes.length > 0) {
      const newVariants = [];
      colors.forEach((color) => {
        sizes.forEach((size) => {
          newVariants.push({
            color,
            size,
            price: "",
            quantity: "",
            image: null,
          });
        });
      });
      setVariants(newVariants);
    } else {
      setVariants([]);
    }
  }, [colors, sizes]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
    onVariantsChange(newVariants);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    onVariantsChange(newVariants);
  };

  if (variants.length === 0) return null;

  return (
    <div className="mt-6 p-6 border-2 border-blue-100 rounded-xl bg-white shadow-md">
      <table className="min-w-full">
        <thead>
          <tr className="bg-blue-50">
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">STT</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Kích thước</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Giá</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Số lượng</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index} className="border-b hover:bg-blue-50 transition-colors">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{variant.size.label}</td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                  className="border-2 border-blue-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-300 transition-all"
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
                  className="border-2 border-blue-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-300 transition-all"
                />
              </td>
              <td className="py-3 px-4">
                <button 
                  onClick={() => handleRemoveVariant(index)} 
                  className="text-red-500 hover:text-red-700 hover:scale-110 transition-all"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 bg-blue-50 p-4 rounded-lg relative">
        <input
          type="file"
          onChange={(e) => handleVariantChange(0, "image", e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id="file-upload"
        />
        <div className="flex items-center justify-center h-24 border-2 border-dashed border-blue-200 rounded-lg relative">
          <FaFileImage size={48} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
}