import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import NameModal from "./components/NameModal";
import AttributeModal from "./components/AttributeModal";
import ProductVariants from "./components/ProductVariants";
import ProductService from "./services/ProductService";
import ProductDetailService from "./services/ProductDetailService";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    tenSanPham: "",
    trangThai: "",
    thuongHieuId: [],
    xuatXuId: [],
    chatLieuId: [],
    coAoId: [],
    tayAoId: [],
    mauSacId: [],
    kichThuocId: [],
    variants: [],
  });

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [modalAttribute, setModalAttribute] = useState("");
  const [existingProducts, setExistingProducts] = useState([]);
  const [attributes, setAttributes] = useState({
    brands: [],
    origins: [],
    materials: [],
    collarTypes: [],
    sleeveTypes: [],
    colors: [],
    sizes: [],
  });

  const navigate = useNavigate();

  // Fetch data from ProductDetailService
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetails = await ProductDetailService.getAllProductDetails();

        // Map attribute data
        const mapAttribute = (key, labelKey) =>
          productDetails.map((detail) => ({
            value: detail[key]?.id,
            label: detail[key]?.[labelKey],
          }));

        setAttributes({
          brands: mapAttribute("thuongHieu", "tenThuongHieu"),
          origins: mapAttribute("xuatXu", "tenXuatXu"),
          materials: mapAttribute("chatLieu", "tenChatLieu"),
          collarTypes: mapAttribute("coAo", "tenCoAo"),
          sleeveTypes: mapAttribute("tayAo", "tenTayAo"),
          colors: mapAttribute("mauSac", "tenMauSac"),
          sizes: mapAttribute("kichThuoc", "tenKichThuoc"),
        });

        const productsData = mapAttribute("sanPham", "tenSanPham");
        setExistingProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle changes to form fields
  const handleChange = (selectedOptions, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    });
  };

  const handleProductNameChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setFormData({ ...formData, tenSanPham: value });

    if (!existingProducts.some((product) => product.value === value)) {
      setIsNameModalOpen(true);
    }
  };

  // Save new product to the list
  const handleSaveNewProduct = (newProduct) => {
    setExistingProducts([...existingProducts, newProduct]);
    setFormData({ ...formData, tenSanPham: newProduct.value });
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

  const allAttributesSelected =
    formData.thuongHieuId.length > 0 &&
    formData.xuatXuId.length > 0 &&
    formData.chatLieuId.length > 0 &&
    formData.coAoId.length > 0 &&
    formData.tayAoId.length > 0 &&
    formData.mauSacId.length > 0 &&
    formData.kichThuocId.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-4">
          {/* Left Section */}
          <div className="col-span-2 mt-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Thuộc tính sản phẩm</h2>

            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-medium">Tên sản phẩm</label>
              <CreatableSelect
                name="tenSanPham"
                value={existingProducts.find(
                  (product) => product.value === formData.tenSanPham
                )}
                onChange={handleProductNameChange}
                options={existingProducts}
                className="rounded-lg py-2 w-full"
                isClearable
              />
            </div>

            {/* Thuộc tính */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Thương hiệu", data: attributes.brands, key: "thuongHieuId" },
                { label: "Xuất xứ", data: attributes.origins, key: "xuatXuId" },
                { label: "Chất liệu", data: attributes.materials, key: "chatLieuId" },
                { label: "Cổ áo", data: attributes.collarTypes, key: "coAoId" },
                { label: "Tay áo", data: attributes.sleeveTypes, key: "tayAoId" },
                { label: "Màu sắc", data: attributes.colors, key: "mauSacId" },
                { label: "Kích thước", data: attributes.sizes, key: "kichThuocId" },
              ].map(({ label, data, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium">{label}</label>
                  <CreatableSelect
                    name={key}
                    value={data.filter((item) =>
                      formData[key].includes(item.value)
                    )}
                    onChange={handleChange}
                    options={data}
                    className="rounded-lg py-2 w-full"
                    onCreateOption={() => handleOpenModal(label.toLowerCase())}
                    isClearable
                    isMulti
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          {allAttributesSelected && (
            <div className="col-span-3 mt-6 p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-4">Biến thể sản phẩm</h2>
              <ProductVariants
                attributes={{
                  colors: attributes.colors.filter((color) =>
                    formData.mauSacId.includes(color.value)
                  ),
                  sizes: attributes.sizes.filter((size) =>
                    formData.kichThuocId.includes(size.value)
                  ),
                  brands: attributes.brands.filter((brand) =>
                    formData.thuongHieuId.includes(brand.value)
                  ),
                  origins: attributes.origins.filter((origin) =>
                    formData.xuatXuId.includes(origin.value)
                  ),
                  materials: attributes.materials.filter((material) =>
                    formData.chatLieuId.includes(material.value)
                  ),
                  collarTypes: attributes.collarTypes.filter((collar) =>
                    formData.coAoId.includes(collar.value)
                  ),
                  sleeveTypes: attributes.sleeveTypes.filter((sleeve) =>
                    formData.tayAoId.includes(sleeve.value)
                  ),
                }}
                onVariantsChange={handleVariantsChange}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
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

      {/* Modals */}
      <NameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleSaveNewProduct}
      />
      <AttributeModal
        isOpen={isAttributeModalOpen}
        onClose={() => setIsAttributeModalOpen(false)}
        onSave={handleSaveNewAttribute}
        attributeName={modalAttribute}
      />
    </div>
  );
}
