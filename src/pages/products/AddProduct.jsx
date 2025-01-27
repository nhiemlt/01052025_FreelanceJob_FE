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
  const navigate = useNavigate();

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [coAos, setCoAos] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [tayAos, setTayAos] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);
  const [xuatXus, setXuatXus] = useState([]);


  useEffect(() => {
    fetchSelectOptions();
  }, []);

  const fetchSelectOptions = async () => {
    try {
      const sanPhamdata = await ProductDetailService.getSanPham();
      setSanPhams(sanPhamdata);

      const chatLieuData = await ProductDetailService.getChatLieu();
      setChatLieus(chatLieuData);

      const coAoData = await ProductDetailService.getCoAo();
      setCoAos(coAoData);

      const kichThuocData = await ProductDetailService.getKichThuoc();
      setKichThuocs(kichThuocData);

      const mauSacData = await ProductDetailService.getMauSac();
      setMauSacs(mauSacData);

      const tayAoData = await ProductDetailService.getTayAo();
      setTayAos(tayAoData);

      const thuongHieuData = await ProductDetailService.getThuongHieu();
      setThuongHieus(thuongHieuData);

      const xuatXuData = await ProductDetailService.getXuatXu();
      setXuatXus(xuatXuData);
    } catch (error) {
      setError("Error fetching select options");
    }
  };

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

  const [modals, setModals] = useState({
    isNameModalOpen: false,
    isAttributeModalOpen: false,
    modalAttribute: "",
  });



  const handleSaveNewProduct = (newProduct) => {
    setExistingProducts((prev) => [...prev, newProduct]);
    setFormData((prev) => ({ ...prev, tenSanPham: newProduct.value }));
    setModals((prev) => ({ ...prev, isNameModalOpen: false }));
  };

  const handleSaveNewAttribute = () => {
    setModals((prev) => ({ ...prev, isAttributeModalOpen: false }));
  };

  const handleOpenModal = (attribute) => {
    setModals({ isAttributeModalOpen: true, modalAttribute: attribute });
  };

  const handleVariantsChange = (newVariants) => {
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.createProduct(formData);
      navigate("/admin/product");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const allAttributesSelected = Object.values(formData).every(
    (field) => Array.isArray(field) && field.length > 0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 mt-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-4">Thuộc tính sản phẩm</h2>

            <div>
              <label className="block text-sm font-medium">Tên sản phẩm</label>
              <CreatableSelect
                name="tenSanPham"
                options={sanPhams.map(sanPham => ({ value: sanPham.value, label: sanPham.label }))}
                value={sanPhams.find(sanPham => sanPham.value === formData.tenSanPham) || null}
                isClearable
                className="rounded-lg py-1.5 text-sm w-full"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">


              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Thương hiệu</label>
                <Select
                  name="thuongHieuId"
                  options={thuongHieus.map(th => ({ value: th.id, label: th.tenThuongHieu }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Xuất xứ</label>
                <Select
                  name="xuatXuId"
                  options={xuatXus.map(x => ({ value: x.id, label: x.tenXuatXu }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Chất liệu</label>
                <Select
                  name="chatLieuId"
                  options={chatLieus.map(c => ({ value: c.id, label: c.tenChatLieu }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cổ áo</label>
                <Select
                  name="coAoId"
                  options={coAos.map(c => ({ value: c.id, label: c.tenCoAo }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tay áo</label>
                <Select
                  name="tayAoId"
                  options={tayAos.map(t => ({ value: t.id, label: t.tenTayAo }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Màu sắc</label>
                <Select
                  name="mauSacId"
                  options={mauSacs.map(m => ({ value: m.id, label: m.tenMauSac }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kích thước</label>
                <Select
                  name="kichThuocId"
                  options={kichThuocs.map(k => ({ value: k.id, label: k.tenKichThuoc }))}
                  isMulti
                  className="rounded-lg py-1.5 text-sm w-full"
                />
              </div>
            </div>
          </div>

          {allAttributesSelected && (
            <div className="col-span-3 mt-6 p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-4">Biến thể sản phẩm</h2>
              <ProductVariants
                attributes={attributes}
                onVariantsChange={handleVariantsChange}
              />
            </div>
          )}
        </div>

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

      <NameModal
        isOpen={modals.isNameModalOpen}
        onClose={() => setModals((prev) => ({ ...prev, isNameModalOpen: false }))}
        onSave={handleSaveNewProduct}
      />

      <AttributeModal
        isOpen={modals.isAttributeModalOpen}
        onClose={() => setModals((prev) => ({ ...prev, isAttributeModalOpen: false }))}
        onSave={handleSaveNewAttribute}
        attributeName={modals.modalAttribute}
      />
    </div>
  );
}
