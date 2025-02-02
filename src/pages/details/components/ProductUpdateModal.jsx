import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import ProductDetailService from "../services/ProductDetailService";

export default function ProductUpdateModal({
  modalVisible,
  currentProduct,
  onClose,
  onUpdate,
  thuongHieus,
  xuatXus,
  chatLieus,
  coAos,
  tayAos,
  mauSacs,
  kichThuocs
}) {
  const [soLuong, setSoLuong] = useState("");
  const [donGia, setDonGia] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [thuongHieu, setThuongHieu] = useState(null);
  const [xuatXu, setXuatXu] = useState(null);
  const [chatLieu, setChatLieu] = useState(null);
  const [coAo, setCoAo] = useState(null);
  const [tayAo, setTayAo] = useState(null);
  const [mauSac, setMauSac] = useState(null);
  const [kichThuoc, setKichThuoc] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");


  useEffect(() => {
    if (currentProduct) {
      setSoLuong(currentProduct.soLuong || "");
      setDonGia(currentProduct.donGia || "");
      setHinhAnh(currentProduct.hinhAnh || "");
      setThuongHieu(currentProduct.thuongHieu ? { value: currentProduct.thuongHieu.id, label: currentProduct.thuongHieu.tenThuongHieu } : null);
      setXuatXu(currentProduct.xuatXu ? { value: currentProduct.xuatXu.id, label: currentProduct.xuatXu.tenXuatXu } : null);
      setChatLieu(currentProduct.chatLieu ? { value: currentProduct.chatLieu.id, label: currentProduct.chatLieu.tenChatLieu } : null);
      setCoAo(currentProduct.coAo ? { value: currentProduct.coAo.id, label: currentProduct.coAo.tenCoAo } : null);
      setTayAo(currentProduct.tayAo ? { value: currentProduct.tayAo.id, label: currentProduct.tayAo.tenTayAo } : null);
      setMauSac(currentProduct.mauSac ? { value: currentProduct.mauSac.id, label: currentProduct.mauSac.tenMauSac } : null);
      setKichThuoc(currentProduct.kichThuoc ? { value: currentProduct.kichThuoc.id, label: currentProduct.kichThuoc.tenKichThuoc } : null);
    }
  }, [currentProduct]);
  const handleUpdateSubmit = async () => {
    const productData = {
      sanPham: currentProduct.id,  // Giả sử bạn có id sản phẩm
      thuongHieu: thuongHieu?.value,
      xuatXu: xuatXu?.value,
      chatLieu: chatLieu?.value,
      coAo: coAo?.value,
      tayAo: tayAo?.value,
      mauSac: mauSac?.value,
      kichThuoc: kichThuoc?.value,
      soLuong: Number(soLuong),
      donGia: Number(donGia),
      hinhAnh: selectedImage ? previewImage : hinhAnh // Nếu có hình ảnh mới thì truyền đường dẫn hình ảnh mới, nếu không thì giữ lại hình ảnh cũ
    };

    try {
      const result = await ProductDetailService.updateProductDetail(currentProduct.id, productData);
      onUpdate(result);
      toast.success("Cập nhật sản phẩm thành công!");
      setPreviewImage("");
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };


  if (!modalVisible) return null;


  const handleImageUpload = (file) => {
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Chỉ hỗ trợ định dạng JPEG, PNG!");
      return;
    }

    const fileURL = URL.createObjectURL(file);
    setPreviewImage(fileURL);
    setSelectedImage(file);
  };

  const handleClose = () => {
    setSoLuong("");
    setDonGia("");
    setHinhAnh("");
    setThuongHieu(null);
    setXuatXu(null);
    setChatLieu(null);
    setCoAo(null);
    setTayAo(null);
    setMauSac(null);
    setKichThuoc(null);
    setSelectedImage(null);
    setPreviewImage("");

    onClose();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Cập nhật chi tiết sản phẩm</h2>

        <div className="flex space-x-6">
          <div className="w-1/2 grid grid-cols-2 gap-4">
            <div> 
              <label className="block text-sm font-medium text-gray-700">Chất liệu</label>
              <Select
                value={chatLieu}
                onChange={(option) => setChatLieu(option)}
                options={chatLieus.map(c => ({ value: c.id, label: c.tenChatLieu }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cổ áo</label>
              <Select
                value={coAo}
                onChange={(option) => setCoAo(option)}
                options={coAos.map(c => ({ value: c.id, label: c.tenCoAo }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Màu sắc</label>
              <Select
                value={mauSac}
                onChange={(option) => setMauSac(option)}
                options={mauSacs.map(m => ({ value: m.id, label: m.tenMauSac }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kích thước</label>
              <Select
                value={kichThuoc}
                onChange={(option) => setKichThuoc(option)}
                options={kichThuocs.map(k => ({ value: k.id, label: k.tenKichThuoc }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tay áo</label>
              <Select
                value={tayAo}
                onChange={(option) => setTayAo(option)}
                options={tayAos.map(t => ({ value: t.id, label: t.tenTayAo }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Thương hiệu</label>
              <Select
                value={thuongHieu}
                onChange={(option) => setThuongHieu(option)}
                options={thuongHieus.map(th => ({ value: th.id, label: th.tenThuongHieu }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Xuất xứ</label>
              <Select
                value={xuatXu}
                onChange={(option) => setXuatXu(option)}
                options={xuatXus.map(x => ({ value: x.id, label: x.tenXuatXu }))}
                className="w-full"
              />
            </div>
          </div>



          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Số lượng</label>
              <input
                type="number"
                value={soLuong}
                onChange={(e) => setSoLuong(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Đơn giá</label>
              <input
                type="number"
                value={donGia}
                onChange={(e) => setDonGia(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
              <div className="mt-2 bg-blue-50 p-4 rounded-lg border-2 border-dashed border-blue-300 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {previewImage ? (
                  <div className="flex flex-col items-center justify-center h-32">
                    <img
                      src={previewImage}
                      className="h-full w-full object-contain rounded-lg"
                      onError={() => setPreviewImage(null)}
                      alt="Preview"
                    />
                  </div>
                ) : hinhAnh ? (
                  <div className="flex flex-col items-center justify-center h-32">
                    <img
                      src={hinhAnh}
                      className="h-full w-full object-contain rounded-lg"
                      onError={() => setHinhAnh(null)}
                      alt="Product Image"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32">
                    <p className="text-gray-500">Thả hình ảnh vào đây hoặc{" "}
                      <span className="text-blue-500 cursor-pointer">chọn ảnh</span>
                    </p>
                    <p className="text-gray-400 text-sm">Hỗ trợ: jpeg, png</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={handleClose} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200">Hủy</button>
              <button onClick={handleUpdateSubmit} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  