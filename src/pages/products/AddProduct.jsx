import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import NameModal from "./components/NameModal";
import AttributeModal from "./components/AttributeModal";
import ProductVariants from "./components/ProductVariants";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    tenSanPham: "",
    moTa: "",
    trangThai: "",
    thuongHieuId: "",
    xuatXuId: "",
    chatLieuId: "",
    coAoId: "",
    tayAoId: "",
    mauSacId: [],
    kichThuocId: [],
    variants: [],
  });

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [modalAttribute, setModalAttribute] = useState("");
  const [existingProducts, setExistingProducts] = useState([
    { id: 1, name: "Sản phẩm A" },
    { id: 2, name: "Sản phẩm B" },
    { id: 3, name: "Sản phẩm C" },
  ]);

  const navigate = useNavigate();

  const brands = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "Sony" },
  ];

  const origins = [
    { id: 1, name: "Việt Nam" },
    { id: 2, name: "Trung Quốc" },
    { id: 3, name: "Mỹ" },
  ];

  const materials = [
    { id: 1, name: "Cotton" },
    { id: 2, name: "Polyester" },
    { id: 3, name: "Len" },
  ];

  const collarTypes = [
    { id: 1, name: "Cổ tròn" },
    { id: 2, name: "Cổ tim" },
    { id: 3, name: "Cổ bẻ" },
  ];

  const sleeveTypes = [
    { id: 1, name: "Ngắn tay" },
    { id: 2, name: "Dài tay" },
  ];

  const colors = [
    { id: 1, name: "Đỏ" },
    { id: 2, name: "Xanh" },
    { id: 3, name: "Vàng" },
  ];

  const sizes = [
    { id: 1, name: "S" },
    { id: 2, name: "M" },
    { id: 3, name: "L" },
  ];

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      thuongHieuId: brands[0].id,
      xuatXuId: origins[0].id,
      chatLieuId: materials[0].id,
      coAoId: collarTypes[0].id,
      tayAoId: sleeveTypes[0].id,
    }));
  }, []);

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : "" });
  };

  const handleMultiChange = (selectedOptions, { name }) => {
    setFormData({ ...formData, [name]: selectedOptions ? selectedOptions.map(option => option.value) : [] });
  };

  const handleProductNameChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setFormData({ ...formData, tenSanPham: value });

    if (!existingProducts.some((product) => product.name === value)) {
      setIsNameModalOpen(true);
    }
  };

  const handleSaveNewProduct = (newProduct) => {
    setExistingProducts([...existingProducts, newProduct]);
    setFormData({ ...formData, tenSanPham: newProduct.tenSanPham });
    setIsNameModalOpen(false);
  };

  const handleSaveNewAttribute = (newAttribute) => {
    setIsAttributeModalOpen(false);
  };

  const handleOpenModal = (attribute) => {
    setModalAttribute(attribute);
    setIsAttributeModalOpen(true);
  };

  const handleVariantsChange = (newVariants) => {
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lưu sản phẩm:", formData);
    navigate("/admin/product");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Thuộc tính sản phẩm</h2>
            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-medium">Tên sản phẩm</label>
              <CreatableSelect
                name="tenSanPham"
                value={existingProducts.find((product) => product.name === formData.tenSanPham) || null}
                onChange={handleProductNameChange}
                options={existingProducts.map((product) => ({ value: product.name, label: product.name }))}
                className="rounded-lg py-2 w-full"
              />
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Mô tả</label>
              <textarea
                name="moTa"
                value={formData.moTa}
                onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                className="border rounded-lg py-2 w-full"
              />
            </div>

            {/* Thuộc tính sản phẩm */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Thuộc tính sản phẩm</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Thương hiệu */}
                <div>
                  <label className="block text-sm font-medium">Thương hiệu</label>
                  <CreatableSelect
                    name="thuongHieuId"
                    value={brands.find((brand) => brand.id === formData.thuongHieuId) || null}
                    onChange={handleChange}
                    options={brands.map((brand) => ({ value: brand.id, label: brand.name }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("thương hiệu")}
                    isClearable
                    isMulti
                  />
                </div>

                {/* Xuất xứ */}
                <div>
                  <label className="block text-sm font-medium">Xuất xứ</label>
                  <CreatableSelect
                    name="xuatXuId"
                    value={origins.find((origin) => origin.id === formData.xuatXuId) || null}
                    onChange={handleChange}
                    options={origins.map((origin) => ({ value: origin.id, label: origin.name }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("xuất xứ")}
                    isClearable
                    isMulti
                  />
                </div>

                {/* Chất liệu */}
                <div>
                  <label className="block text-sm font-medium">Chất liệu</label>
                  <CreatableSelect
                    name="chatLieuId"
                    value={materials.find((material) => material.id === formData.chatLieuId) || null}
                    onChange={handleChange}
                    options={materials.map((material) => ({ value: material.id, label: material.name }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("chất liệu")}
                    isClearable
                    isMulti
                  />
                </div>

                {/* Cổ áo */}
                <div>
                  <label className="block text-sm font-medium">Cổ áo</label>
                  <CreatableSelect
                    name="coAoId"
                    value={collarTypes.find((collar) => collar.id === formData.coAoId) || null}
                    onChange={handleChange}
                    options={collarTypes.map((collar) => ({ value: collar.id, label: collar.name }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("cổ áo")}
                    isClearable
                    isMulti
                  />
                </div>

                {/* Tay áo */}
                <div>
                  <label className="block text-sm font-medium">Tay áo</label>
                  <CreatableSelect
                    name="tayAoId"
                    value={sleeveTypes.find((sleeve) => sleeve.id === formData.tayAoId) || null}
                    onChange={handleChange}
                    options={sleeveTypes.map((sleeve) => ({ value: sleeve.id, label: sleeve.name }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("tay áo")}
                    isClearable
                    isMulti
                  />
                </div>

                {/* Màu sắc */}
                <div>
                  <label className="block text-sm font-medium">Màu sắc</label>
                  <Select
                    name="mauSacId"
                    value={colors.filter((color) => formData.mauSacId.includes(color.id)) || []}
                    onChange={handleMultiChange}
                    options={colors.map((color) => ({ value: color.id, label: color.name }))}
                    isMulti
                    className="rounded-lg py-2 w-full"
                    isClearable
                  />
                </div>

                {/* Kích thước */}
                <div>
                  <label className="block text-sm font-medium">Kích thước</label>
                  <Select
                    name="kichThuocId"
                    value={sizes.filter((size) => formData.kichThuocId.includes(size.id)) || []}
                    onChange={handleMultiChange}
                    options={sizes.map((size) => ({ value: size.id, label: size.name }))}
                    isMulti
                    className="rounded-lg py-2 w-full"
                    isClearable
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biến thể sản phẩm */}
          <div className="mt-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Biến thể sản phẩm</h2>
            {formData.mauSacId.length > 0 && formData.kichThuocId.length > 0 && (
              formData.mauSacId.map((colorId) => {
                const color = colors.find((c) => c.id === colorId);
                return (
                  <div key={colorId} className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Màu: {color.name}</h3>
                    <ProductVariants
                      colors={[color]}
                      sizes={sizes.filter((size) => formData.kichThuocId.includes(size.id))}
                      onVariantsChange={handleVariantsChange}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/product")}
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

      {/* Modal thêm nhanh sản phẩm */}
      <NameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleSaveNewProduct}
      />

      {/* Modal thêm nhanh thuộc tính */}
      <AttributeModal
        isOpen={isAttributeModalOpen}
        onClose={() => setIsAttributeModalOpen(false)}
        onSave={handleSaveNewAttribute}
        attributeName={modalAttribute}
      />
    </div>
  );
}