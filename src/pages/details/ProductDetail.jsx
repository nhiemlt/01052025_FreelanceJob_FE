import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AiOutlineSearch, AiFillCaretUp, AiFillCaretDown, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailService from "./services/ProductDetailService";
import Switch from "react-switch";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { maSanPham } = useParams();

  const [sanPhams, setSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [coAos, setCoAos] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [tayAos, setTayAos] = useState([]);
  const [thuongHieus, setThuongHieus] = useState([]);
  const [xuatXus, setXuatXus] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [filters, setFilters] = useState({
    thuongHieuIds: [],
    xuatXuIds: [],
    chatLieuIds: [],
    coAoIds: [],
    tayAoIds: [],
    mauSacIds: [],
    kichThuocIds: [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [soLuong, setSoLuong] = useState('');
  const [donGia, setDonGia] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSelectOptions();
  }, []);

  useEffect(() => {
    if (maSanPham) {
      setSearch(maSanPham);
      setPage(0);
    }
  }, [maSanPham]);

  useEffect(() => {
    if (search) {
      fetchProductDetails();
    }
  }, [search, page, pageSize, sortConfig, filters]);

  const fetchSelectOptions = async () => {
    try {
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

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const result = await ProductDetailService.getAllProductDetails(
        page,
        size,
        search,
        "ngay_tao",
        "desc",
        filters
      );
      setSanPhams(result.content);
      setTotalPages(result.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Error fetching product details");
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reset to the first page
  };

  const handleFilterChange = (field, selectedOptions) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
    setPage(0);
  };


  const handleToggleStatus = async (id) => {
    try {
      const updatedProduct = await ProductDetailService.toggleProductDetailStatus(id);
  
      setSanPhams((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, trangThai: updatedProduct.trangThai } : product
        )
      );
      toast.success("Thay đổi trạng thái thành công!");
    } catch (error) {
      console.error("Error toggling product detail status:", error);
      toast.error("Không thể thay đổi trạng thái. Vui lòng thử lại!");
    }
  };


  const handleUpdateProduct = (product) => {
    setCurrentProduct(product);
    setSoLuong(product.soLuong);
    setDonGia(product.donGia);
    setHinhAnh(product.hinhAnh);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleUpdateSubmit = async () => {
    const productDetailData = { soLuong, donGia, hinhAnh };
    try {
      const result = await ProductDetailService.updateProductDetail(currentProduct.id, productDetailData);
  
      setSanPhams((prev) =>
        prev.map((p) => (p.id === currentProduct.id ? result : p))
      );
      setModalVisible(false);
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDeleteProduct = async () => {
    try {
      if (productToDelete) {
        await ProductDetailService.deleteProductDetail(productToDelete.id);
        setSanPhams((prev) =>
          prev.filter((p) => p.id !== productToDelete.id)
        );
        toast.success("Xóa sản phẩm thành công!");
      }
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Xóa sản phẩm thất bại. Vui lòng thử lại!");
    }
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Chi tiết sản phẩm</h1>

      <div className="grid grid-cols-4 gap-4 mb-2">
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã và tên sản phẩm"
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg px-3 py-1.5 w-full pl-8 mt-2 text-sm "
          />
          <AiOutlineSearch className="absolute left-2 top-8 text-gray-400" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Thương hiệu</label>
          <Select
            name="thuongHieuId"
            options={thuongHieus.map(th => ({ value: th.id, label: th.tenThuongHieu }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("thuongHieuIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Xuất xứ</label>
          <Select
            name="xuatXuId"
            options={xuatXus.map(x => ({ value: x.id, label: x.tenXuatXu }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("xuatXuIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Chất liệu</label>
          <Select
            name="chatLieuId"
            options={chatLieus.map(c => ({ value: c.id, label: c.tenChatLieu }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("chatLieuIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Cổ áo</label>
          <Select
            name="coAoId"
            options={coAos.map(c => ({ value: c.id, label: c.tenCoAo }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("coAoIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Tay áo</label>
          <Select
            name="tayAoId"
            options={tayAos.map(t => ({ value: t.id, label: t.tenTayAo }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("tayAoIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Màu sắc</label>
          <Select
            name="mauSacId"
            options={mauSacs.map(m => ({ value: m.id, label: m.tenMauSac }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("mauSacIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Kích thước</label>
          <Select
            name="kichThuocId"
            options={kichThuocs.map(k => ({ value: k.id, label: k.tenKichThuoc }))}
            isMulti
            onChange={selectedOptions => handleFilterChange("kichThuocIds", selectedOptions)}
            className="rounded-lg py-1.5 text-sm w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-xs px-4 py-2 bg-white rounded-lg shadow overflow-hidden text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Mã sản phẩm</th>
                <th className="px-4 py-2">Tên sản phẩm</th>
                <th className="px-4 py-2">Chất liệu</th>
                <th className="px-4 py-2">Cổ áo</th>
                <th className="px-4 py-2">Màu sắc</th>
                <th className="px-4 py-2">Kích thước</th>
                <th className="px-4 py-2">Tay áo</th>
                <th className="px-4 py-2">Thương hiệu</th>
                <th className="px-4 py-2">Xuất xứ</th>
                <th className="px-4 py-2">SL</th>
                <th className="px-4 py-2">Đơn giá</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {sanPhams.map((sanPham, index) => (
                <tr key={sanPham.id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sanPham.sanPham.maSanPham}</td>
                  <td className="px-4 py-2">{sanPham.sanPham.tenSanPham}</td>
                  <td className="px-4 py-2">{sanPham.chatLieu?.tenChatLieu || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.coAo?.tenCoAo || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.mauSac?.tenMauSac || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.kichThuoc?.tenKichThuoc || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.tayAo?.tenTayAo || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.thuongHieu?.tenThuongHieu || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.xuatXu?.tenXuatXu || 'N/A'}</td>
                  <td className="px-4 py-2">{sanPham.soLuong}</td>
                  <td className="px-4 py-2">{sanPham.donGia}</td>
                  <td className="px-4 py-2">
                    {new Date(sanPham.ngayTao).toLocaleDateString('vi-VN')}
                  </td>

                  <td className="px-4 py-2">
                    <Switch
                      onChange={() => handleToggleStatus(sanPham.id)}
                      checked={sanPham.trangThai}
                      offColor="#d6d6d6"
                      onColor="#4CAF50"
                      offHandleColor="#888"
                      onHandleColor="#fff"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={20}
                      width={40}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleUpdateProduct(sanPham)}
                    >
                      <AiOutlineEdit className="text-xl" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteModal(sanPham)}
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="entries" className="text-sm text-gray-700">Xem</label>
          <select
            id="entries"
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-700">Sản phẩm</span>
        </div>


        <div className="flex items-center">
          <button
            className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-orange-500 hover:text-white"
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
          >
            {"<"}
          </button>
          <div className="mx-2 text-xs">{`Trang ${page + 1} / ${totalPages}`}</div>
          <button
            className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-orange-500 hover:text-white"
            onClick={() => setPage(page < totalPages - 1 ? page + 1 : totalPages - 1)}
          >
            {">"}
          </button>
        </div>
      </div>


      {modalVisible && (
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
              <h3 className="text-lg font-semibold mb-4">Chọn hình ảnh</h3>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {hinhAnh ? (
                      <img
                        src={hinhAnh}
                        alt="Product"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
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
                          <span className="font-semibold">Nhấp để tải ảnh</span> hoặc kéo và thả
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    name="hinhAnh"
                    onChange={(e) => setHinhAnh(URL.createObjectURL(e.target.files[0]))}
                    className="hidden"
                  />
                </label>
              </div>
            </div>


            <div className="flex justify-between">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-400"
              >
                Đóng
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}



      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>
              Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2 hover:bg-gray-400"
                onClick={closeDeleteModal}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={confirmDeleteProduct}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
