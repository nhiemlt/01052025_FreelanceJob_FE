import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import NameModal from "./components/NameModal";
import AttributeModal from "./components/AttributeModal";
import ProductVariants from "./components/ProductVariants";
import ProductService from "./services/ProductService"; // Import ProductService
import ProductDetailService from "./services/ProductDetailService"; // Import ProductDetailService

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
  const [existingProducts, setExistingProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [collarTypes, setCollarTypes] = useState([]);
  const [sleeveTypes, setSleeveTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await ProductDetailService.getAllProductDetails();
        
        const brandsData = productDetails.map(detail => detail.thuongHieu);
        const originsData = productDetails.map(detail => detail.xuatXu);
        const materialsData = productDetails.map(detail => detail.chatLieu);
        const collarTypesData = productDetails.map(detail => detail.coAo);
        const sleeveTypesData = productDetails.map(detail => detail.tayAo);
        const colorsData = productDetails.map(detail => detail.mauSac);
        const sizesData = productDetails.map(detail => detail.kichThuoc);
        const productsData = productDetails.map(detail => detail.sanPham);

        setBrands(brandsData);
        setOrigins(originsData);
        setMaterials(materialsData);
        setCollarTypes(collarTypesData);
        setSleeveTypes(sleeveTypesData);
        setColors(colorsData);
        setSizes(sizesData);
        setExistingProducts(productsData);

        setFormData((prevFormData) => ({
          ...prevFormData,
          thuongHieuId: brandsData[0]?.id || "",
          xuatXuId: originsData[0]?.id || "",
          chatLieuId: materialsData[0]?.id || "",
          coAoId: collarTypesData[0]?.id || "",
          tayAoId: sleeveTypesData[0]?.id || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

    if (!existingProducts.some((product) => product.tenSanPham === value)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.createProduct(formData);
      console.log("Lưu sản phẩm:", formData);
      navigate("/admin/product");
    } catch (error) {
      console.error("Error saving product:", error);
    }
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
                value={existingProducts.find((product) => product.tenSanPham === formData.tenSanPham) || null}
                onChange={handleProductNameChange}
                options={existingProducts.map((product) => ({ value: product.tenSanPham, label: product.tenSanPham }))}
                className="rounded-lg py-2 w-full"
              />
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Mô tả</label>
              <textarea
                name="moTa"
                value={formData.moTa || ""}
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
                    options={brands.map((brand) => ({ value: brand.id, label: brand.tenThuongHieu }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("thương hiệu")}
                    isClearable
                  />
                </div>

                {/* Xuất xứ */}
                <div>
                  <label className="block text-sm font-medium">Xuất xứ</label>
                  <CreatableSelect
                    name="xuatXuId"
                    value={origins.find((origin) => origin.id === formData.xuatXuId) || null}
                    onChange={handleChange}
                    options={origins.map((origin) => ({ value: origin.id, label: origin.tenXuatXu }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("xuất xứ")}
                    isClearable
                  />
                </div>

                {/* Chất liệu */}
                <div>
                  <label className="block text-sm font-medium">Chất liệu</label>
                  <CreatableSelect
                    name="chatLieuId"
                    value={materials.find((material) => material.id === formData.chatLieuId) || null}
                    onChange={handleChange}
                    options={materials.map((material) => ({ value: material.id, label: material.tenChatLieu }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("chất liệu")}
                    isClearable
                  />
                </div>

                {/* Cổ áo */}
                <div>
                  <label className="block text-sm font-medium">Cổ áo</label>
                  <CreatableSelect
                    name="coAoId"
                    value={collarTypes.find((collar) => collar.id === formData.coAoId) || null}
                    onChange={handleChange}
                    options={collarTypes.map((collar) => ({ value: collar.id, label: collar.tenCoAo }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("cổ áo")}
                    isClearable
                  />
                </div>

                {/* Tay áo */}
                <div>
                  <label className="block text-sm font-medium">Tay áo</label>
                  <CreatableSelect
                    name="tayAoId"
                    value={sleeveTypes.find((sleeve) => sleeve.id === formData.tayAoId) || null}
                    onChange={handleChange}
                    options={sleeveTypes.map((sleeve) => ({ value: sleeve.id, label: sleeve.tenTayAo }))}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal("tay áo")}
                    isClearable
                  />
                </div>

                {/* Màu sắc */}
                <div>
                  <label className="block text-sm font-medium">Màu sắc</label>
                  <Select
                    name="mauSacId"
                    value={colors.filter((color) => formData.mauSacId.includes(color.id)) || []}
                    onChange={handleMultiChange}
                    options={colors.map((color) => ({ value: color.id, label: color.tenMauSac }))}
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
                    options={sizes.map((size) => ({ value: size.id, label: size.tenKichThuoc }))}
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
                    <h3 className="text-md font-semibold mb-2">Màu: {color.tenMauSac}</h3>
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