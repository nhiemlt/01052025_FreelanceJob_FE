import React, { useState, useEffect, useCallback } from "react";
import { FaTrash, FaFileImage } from "react-icons/fa";
import ProductDetailService from "../services/ProductDetailService";

export default function ProductVariants({
  attributes = {},
  onVariantsChange,
  productId,
}) {
  const {
    colors = [],
    sizes = [],
    brands = [],
    origins = [],
    materials = [],
    collarTypes = [],
    sleeveTypes = [],
  } = attributes;

  const [variants, setVariants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});

  const formatAttributes = useCallback(
    (items) => items.map(({ value, label }) => ({ value, label })),
    []
  );

  const generateVariantsModel = useCallback(() => {
    return {
      productId,
      attributes: {
        colors: formatAttributes(colors || []),
        sizes: formatAttributes(sizes || []),
        brands: formatAttributes(brands || []),
        origins: formatAttributes(origins || []),
        materials: formatAttributes(materials || []),
        collarTypes: formatAttributes(collarTypes || []),
        sleeveTypes: formatAttributes(sleeveTypes || []),
      },
    };
  }, [
    colors,
    sizes,
    brands,
    origins,
    materials,
    collarTypes,
    sleeveTypes,
    productId,
    formatAttributes,
  ]);

  useEffect(() => {
    const fetchVariants = async () => {
      if (
        !Array.isArray(colors) ||
        !Array.isArray(sizes) ||
        !colors.length ||
        !sizes.length
      ) {
        setVariants([]);
        onVariantsChange([]);
        return;
      }

      setLoading(true);
      try {
        const generateModel = generateVariantsModel();
        console.log("Generate Model:", generateModel);

        if (!generateModel.productId) {
          throw new Error("Sản phẩm không có ID hợp lệ");
        }

        const generatedVariants =
          await ProductDetailService.generateProductDetails(generateModel);
        console.log("Generated Variants:", generatedVariants);

        if (!Array.isArray(generatedVariants)) {
          throw new Error("Dữ liệu trả về không phải là mảng");
        }

        const formattedVariants = generatedVariants.map((variant) => ({
          ...variant,
          price: variant.price || "",
          quantity: variant.quantity || "",
          image: variant.image || null,
        }));

        setVariants(formattedVariants);
        onVariantsChange(formattedVariants);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Có lỗi xảy ra khi tạo biến thể sản phẩm"
        );
        console.error("Error details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [generateVariantsModel, onVariantsChange, colors, sizes]);

  const handleVariantChange = (index, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };

      if (
        (field === "price" || field === "quantity") &&
        value &&
        !/^(0|[1-9]\d*)$/.test(value)
      ) {
        setError(
          `${field === "price" ? "Giá" : "Số lượng"} phải là số nguyên không âm`
        );
        return prevVariants;
      }

      onVariantsChange(updatedVariants);

      if (updatedVariants[index].id) {
        const updatedData = {
          ...updatedVariants[index],
          [field]:
            field === "price" || field === "quantity" ? parseInt(value) : value,
        };
        ProductDetailService.updateProductDetail(
          updatedVariants[index].id,
          updatedData
        ).catch((err) => {
          setError(err.message || "Có lỗi xảy ra khi cập nhật biến thể");
        });
      }

      return updatedVariants;
    });
  };

  const handleRemoveVariant = (index) => {
    setVariants((prevVariants) => {
      const variantToRemove = prevVariants[index];
      if (variantToRemove.id) {
        ProductDetailService.deleteProductDetail(variantToRemove.id).catch(
          () => {
            setError("Có lỗi xảy ra khi xóa biến thể");
          }
        );
      }

      const updatedVariants = prevVariants.filter((_, i) => i !== index);
      onVariantsChange(updatedVariants);
      return updatedVariants;
    });
  };

  const handleImageUpload = (index, file) => {
    setSelectedImages((prevImages) => {
      const updatedImages = { ...prevImages, [index]: file };
      handleVariantChange(index, "image", file);
      return updatedImages;
    });
  };

  if (!variants.length && !loading) return null;

  return (
    <div className="mt-6 p-6 border-2 border-blue-100 rounded-xl bg-white shadow-md">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        colors.map((color) => (
          <div key={color.value} className="mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Chi tiết sản phẩm màu {color.label}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-blue-50">
                    {[
                      "STT",
                      "Kích thước",
                      "Thương hiệu",
                      "Xuất xứ",
                      "Chất liệu",
                      "Cổ áo",
                      "Tay áo",
                      "Giá",
                      "Số lượng",
                      "Xóa",
                    ].map((header) => (
                      <th
                        key={header}
                        className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variants
                    .filter((v) => v.color?.value === color.value)
                    .map((variant, index) => (
                      <tr
                        key={`${variant.color?.value}-${variant.size?.value}-${index}`}
                        className="border-b hover:bg-blue-50 transition-colors"
                      >
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{variant.size?.label}</td>
                        <td className="py-3 px-4">{variant.brand?.label}</td>
                        <td className="py-3 px-4">{variant.origin?.label}</td>
                        <td className="py-3 px-4">{variant.material?.label}</td>
                        <td className="py-3 px-4">
                          {variant.collarType?.label}
                        </td>
                        <td className="py-3 px-4">
                          {variant.sleeveType?.label}
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            placeholder="Nhập giá"
                            className="border-2 border-blue-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            value={variant.quantity}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            placeholder="Nhập số lượng"
                            className="border-2 border-blue-100 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleRemoveVariant(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(0, e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center justify-center h-24 border-2 border-dashed border-blue-200 rounded-lg">
                {selectedImages[0] ? (
                  <img
                    src={URL.createObjectURL(selectedImages[0])}
                    alt="Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <FaFileImage size={48} className="text-blue-400" />
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
