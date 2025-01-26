import React, { useState } from "react";
import Select from "react-select";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import EditProductModal from "./components/EditProductModal"; // Import modal

export default function ProductDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    thuongHieuId: null,
    xuatXuId: null,
    chatLieuId: null,
    coAoId: null,
    tayAoId: null,
    mauSacId: [],
    kichThuocId: [],
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      maSanPham: "SP001",
      tenSanPham: "Sản phẩm A",
      thuongHieu: "Apple",
      xuatXu: "Việt Nam",
      chatLieu: "Cotton",
      coAo: "Cổ tròn",
      tayAo: "Ngắn tay",
      mauSac: "Đỏ",
      kichThuoc: "S",
      gia: 100000,
      soLuong: 10,
      trangThai: 1,
    },
    {
      id: 2,
      maSanPham: "SP002",
      tenSanPham: "Sản phẩm B",
      thuongHieu: "Samsung",
      xuatXu: "Trung Quốc",
      chatLieu: "Polyester",
      coAo: "Cổ tim",
      tayAo: "Dài tay",
      mauSac: "Xanh",
      kichThuoc: "M",
      gia: 200000,
      soLuong: 5,
      trangThai: 0,
    },
  ]);

  const brands = [
    { value: 1, label: "Apple" },
    { value: 2, label: "Samsung" },
    { value: 3, label: "Sony" },
  ];

  const origins = [
    { value: 1, label: "Việt Nam" },
    { value: 2, label: "Trung Quốc" },
    { value: 3, label: "Mỹ" },
  ];

  const materials = [
    { value: 1, label: "Cotton" },
    { value: 2, label: "Polyester" },
    { value: 3, label: "Len" },
  ];

  const collarTypes = [
    { value: 1, label: "Cổ tròn" },
    { value: 2, label: "Cổ tim" },
    { value: 3, label: "Cổ bẻ" },
  ];

  const sleeveTypes = [
    { value: 1, label: "Ngắn tay" },
    { value: 2, label: "Dài tay" },
  ];

  const colors = [
    { value: 1, label: "Đỏ" },
    { value: 2, label: "Xanh" },
    { value: 3, label: "Vàng" },
  ];

  const sizes = [
    { value: 1, label: "S" },
    { value: 2, label: "M" },
    { value: 3, label: "L" },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (selectedOption, { name }) => {
    setFilters({ ...filters, [name]: selectedOption });
  };

  const handleMultiFilterChange = (selectedOptions, { name }) => {
    setFilters({ ...filters, [name]: selectedOptions });
  };

  const handleToggleStatus = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, trangThai: product.trangThai === 1 ? 0 : 1 }
          : product
      )
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.maSanPham.includes(searchTerm) &&
      (!filters.thuongHieuId ||
        product.thuongHieu === filters.thuongHieuId.label) &&
      (!filters.xuatXuId || product.xuatXu === filters.xuatXuId.label) &&
      (!filters.chatLieuId || product.chatLieu === filters.chatLieuId.label) &&
      (!filters.coAoId || product.coAo === filters.coAoId.label) &&
      (!filters.tayAoId || product.tayAo === filters.tayAoId.label) &&
      (filters.mauSacId.length === 0 ||
        filters.mauSacId.some((color) => product.mauSac === color.label)) &&
      (filters.kichThuocId.length === 0 ||
        filters.kichThuocId.some((size) => product.kichThuoc === size.label))
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Chi tiết sản phẩm</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Tìm kiếm
          </label>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã sản phẩm"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full pl-10 mt-3"
          />
          <AiOutlineSearch className="absolute left-2 top-10 text-gray-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thương hiệu
          </label>
          <Select
            name="thuongHieuId"
            value={filters.thuongHieuId}
            onChange={handleFilterChange}
            options={brands}
            isClearable
            placeholder="Chọn thương hiệu"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Xuất xứ
          </label>
          <Select
            name="xuatXuId"
            value={filters.xuatXuId}
            onChange={handleFilterChange}
            options={origins}
            isClearable
            placeholder="Chọn xuất xứ"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chất liệu
          </label>
          <Select
            name="chatLieuId"
            value={filters.chatLieuId}
            onChange={handleFilterChange}
            options={materials}
            isClearable
            placeholder="Chọn chất liệu"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cổ áo
          </label>
          <Select
            name="coAoId"
            value={filters.coAoId}
            onChange={handleFilterChange}
            options={collarTypes}
            isClearable
            placeholder="Chọn cổ áo"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tay áo
          </label>
          <Select
            name="tayAoId"
            value={filters.tayAoId}
            onChange={handleFilterChange}
            options={sleeveTypes}
            isClearable
            placeholder="Chọn tay áo"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Màu sắc
          </label>
          <Select
            name="mauSacId"
            value={filters.mauSacId}
            onChange={handleMultiFilterChange}
            options={colors}
            isClearable
            isMulti
            placeholder="Chọn màu sắc"
            className="rounded-lg py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kích thước
          </label>
          <Select
            name="kichThuocId"
            value={filters.kichThuocId}
            onChange={handleMultiFilterChange}
            options={sizes}
            isClearable
            isMulti
            placeholder="Chọn kích thước"
            className="rounded-lg py-2 w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow overflow-hidden text-center">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Tên sản phẩm</th>
              <th className="px-4 py-2">Mã sản phẩm</th>
              <th className="px-4 py-2">Màu sắc</th>
              <th className="px-4 py-2">Kích thước</th>
              <th className="px-4 py-2">Thương hiệu</th>
              <th className="px-4 py-2">Xuất xứ</th>
              <th className="px-4 py-2">Chất liệu</th>
              <th className="px-4 py-2">Giá</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{product.tenSanPham}</td>
                <td className="px-4 py-3">{product.maSanPham}</td>
                <td className="px-4 py-3">{product.mauSac}</td>
                <td className="px-4 py-3">{product.kichThuoc}</td>
                <td className="px-4 py-3">{product.thuongHieu}</td>
                <td className="px-4 py-3">{product.xuatXu}</td>
                <td className="px-4 py-3">{product.chatLieu}</td>
                <td className="px-4 py-3">
                  {product.gia.toLocaleString()} VND
                </td>
                <td className="px-4 py-3">{product.soLuong}</td>
                <td
                  className={`px-4 py-2 ${product.trangThai === 1 ? "status-active" : "status-inactive"}`}
                >
                  <span className="status-dot"></span>
                  {product.trangThai === 1 ? " Còn hàng" : " Hết hàng"}
                </td>
                <td className="px-4 py-3 flex justify-center gap-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700 mt-5"
                  >
                    <AiOutlineEye size={20} />
                  </button>
                  <Switch
                    checked={product.trangThai === 1}
                    onChange={() => handleToggleStatus(product.id)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    className="mt-5"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        product={currentProduct}
        onSave={handleSaveProduct}
      />

      <style>{`
        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }
        .status-active .status-dot {
          background-color: #00a000;
        }
        .status-inactive .status-dot {
          background-color: #808080;
        }
        .status-active {
          color: #00a000;
        }
        .status-inactive {
          color: #808080;
        }
      `}</style>
    </div>
  );
}