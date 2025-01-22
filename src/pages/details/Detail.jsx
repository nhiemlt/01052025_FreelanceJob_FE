import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import DetailModel from './components/UpdateDetailModal ';
import AddProductModal from './components/AddDetailModal'; 


export default function Detail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const productDetails = [
    {
      id: 101,
      thongTinSanPham: { maSanPham: 'SP001', tenSanPham: 'Áo sơ mi cổ tròn' },
      soLuong: 50,
      donGia: 120000,
      nguoiCapNhat: 'Nguyen Van A',
      trangThai: 1,
      trongLuong: 0.3,
      ngayTao: '2023-12-21',
      ngayCapNhat: '2023-12-22',
      coAo: { id: 1, maCoAo: 'CA001', tenCoAo: 'Cổ tròn', trangThai: 1 },
      thietKe: {
        id: 1,
        maThietKe: 'TK001',
        tenThietKe: 'Thiết kế cơ bản',
        trangThai: 1,
      },
      thuongHieu: {
        id: 1,
        maThuongHieu: 'TH001',
        tenThuongHieu: 'Thương hiệu A',
        trangThai: 1,
      },
      kieuDang: {
        id: 1,
        maKieuDang: 'KD001',
        tenKieuDang: 'Dáng ôm',
        trangThai: 1,
      },
      chatLieu: { id: 2, maChatLieu: 'CL002', tenChatLieu: 'Cotton', trangThai: 1 },
      kichThuoc: {
        id: 1,
        maKichThuoc: 'KT001',
        tenKichThuoc: 'Size M',
        trangThai: 1,
      },
      mauSac: { id: 5, maMauSac: 'MS005', tenMauSac: 'Trắng', trangThai: 1 },
      moTa: { id: 1, maMoTa: 'MT001', tenMoTa: 'Áo sơ mi cổ tròn thoáng mát' },
    },
    {
      id: 102,
      thongTinSanPham: { maSanPham: 'SP002', tenSanPham: 'Áo sơ mi cổ vuông' },
      soLuong: 30,
      donGia: 150000,
      nguoiCapNhat: 'Tran Van B',
      trangThai: 1,
      trongLuong: 0.35,
      ngayTao: '2023-11-15',
      ngayCapNhat: '2023-11-16',
      coAo: { id: 2, maCoAo: 'CA002', tenCoAo: 'Cổ vuông', trangThai: 1 },
      thietKe: {
        id: 2,
        maThietKe: 'TK002',
        tenThietKe: 'Thiết kế sang trọng',
        trangThai: 1,
      },
      thuongHieu: {
        id: 2,
        maThuongHieu: 'TH002',
        tenThuongHieu: 'Thương hiệu B',
        trangThai: 1,
      },
      kieuDang: {
        id: 2,
        maKieuDang: 'KD002',
        tenKieuDang: 'Dáng suông',
        trangThai: 1,
      },
      chatLieu: { id: 3, maChatLieu: 'CL003', tenChatLieu: 'Lụa', trangThai: 1 },
      kichThuoc: {
        id: 2,
        maKichThuoc: 'KT002',
        tenKichThuoc: 'Size L',
        trangThai: 1,
      },
      mauSac: { id: 3, maMauSac: 'MS003', tenMauSac: 'Xanh', trangThai: 1 },
      moTa: { id: 2, maMoTa: 'MT002', tenMoTa: 'Áo sơ mi cổ vuông mềm mại' },
    },
    {
      id: 103,
      thongTinSanPham: { maSanPham: 'SP003', tenSanPham: 'Áo sơ mi cổ V' },
      soLuong: 20,
      donGia: 200000,
      nguoiCapNhat: 'Le Thi C',
      trangThai: 1,
      trongLuong: 0.3,
      ngayTao: '2023-10-10',
      ngayCapNhat: '2023-10-11',
      coAo: { id: 3, maCoAo: 'CA003', tenCoAo: 'Cổ V', trangThai: 1 },
      thietKe: {
        id: 3,
        maThietKe: 'TK003',
        tenThietKe: 'Thiết kế hiện đại',
        trangThai: 1,
      },
      thuongHieu: {
        id: 3,
        maThuongHieu: 'TH003',
        tenThuongHieu: 'Thương hiệu C',
        trangThai: 1,
      },
      kieuDang: {
        id: 3,
        maKieuDang: 'KD003',
        tenKieuDang: 'Dáng rộng',
        trangThai: 1,
      },
      chatLieu: {
        id: 4,
        maChatLieu: 'CL004',
        tenChatLieu: 'Polyester',
        trangThai: 1,
      },
      kichThuoc: {
        id: 3,
        maKichThuoc: 'KT003',
        tenKichThuoc: 'Size XL',
        trangThai: 1,
      },
      mauSac: { id: 1, maMauSac: 'MS001', tenMauSac: 'Đỏ', trangThai: 1 },
      moTa: { id: 3, maMoTa: 'MT003', tenMoTa: 'Áo sơ mi cổ V phong cách' },
    },
    {
      id: 104,
      thongTinSanPham: { maSanPham: 'SP004', tenSanPham: 'Áo sơ mi cổ chữ U' },
      soLuong: 100,
      donGia: 180000,
      nguoiCapNhat: 'Phan Van D',
      trangThai: 1,
      trongLuong: 0.4,
      ngayTao: '2023-09-05',
      ngayCapNhat: '2023-09-06',
      coAo: { id: 4, maCoAo: 'CA004', tenCoAo: 'Cổ chữ U', trangThai: 1 },
      thietKe: {
        id: 4,
        maThietKe: 'TK004',
        tenThietKe: 'Thiết kế thanh lịch',
        trangThai: 1,
      },
      thuongHieu: {
        id: 4,
        maThuongHieu: 'TH004',
        tenThuongHieu: 'Thương hiệu D',
        trangThai: 1,
      },
      kieuDang: {
        id: 4,
        maKieuDang: 'KD004',
        tenKieuDang: 'Dáng ôm nhẹ',
        trangThai: 1,
      },
      chatLieu: { id: 5, maChatLieu: 'CL005', tenChatLieu: 'Cao cấp', trangThai: 1 },
      kichThuoc: {
        id: 4,
        maKichThuoc: 'KT004',
        tenKichThuoc: 'Size S',
        trangThai: 1,
      },
      mauSac: { id: 4, maMauSac: 'MS004', tenMauSac: 'Đen', trangThai: 1 },
      moTa: { id: 4, maMoTa: 'MT004', tenMoTa: 'Áo sơ mi cổ chữ U thời trang' },
    },
  ];
  

  const filteredItems = productDetails.filter((item) =>
    item.id.toString().includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveProduct = (data) => {
    console.log('Cập nhật chi tiết sản phẩm:', data);
    setIsModalOpen(false);
  };

  const handleAddProduct = (data) => {
    console.log('Thêm mới sản phẩm chi tiết:', data);
    setIsAddModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderRows = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
    return currentItems.map((item, index) => (
      <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        <td className="px-4 py-2">{item.id}</td>
        <td className="px-4 py-2">{item.thongTinSanPham.tenSanPham}</td>
        <td className="px-4 py-2">{item.soLuong}</td>
        <td className="px-4 py-2">{item.donGia.toLocaleString()} VND</td>
        <td className="px-4 py-2">{item.thuongHieu.tenThuongHieu}</td>
        <td className="px-4 py-2">{item.kieuDang.tenKieuDang}</td>
        <td className="px-4 py-2">{item.chatLieu.tenChatLieu}</td>
        <td className="px-4 py-2">{item.kichThuoc.tenKichThuoc}</td>
        <td className="px-4 py-2">{item.mauSac.tenMauSac}</td>
        <td className="px-4 py-2">
          {item.trangThai === 1 ? 'Hoạt động' : 'Không hoạt động'}
        </td>
        <td className="px-4 py-2 flex gap-2 justify-center items-center">
          <AiOutlineEdit
            className="text-orange-500 hover:text-orange-600 cursor-pointer"
            size={20}
            onClick={() => setIsModalOpen(true)}
          />
          <AiOutlineDelete
            className="text-red-500 hover:text-red-600 cursor-pointer"
            size={20}
            onClick={() => console.log('Xóa', item)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-xl font-bold mb-4'>Chi tiết sản phẩm</h1>

      <div className='flex items-center justify-between mb-4'>
        <div className='relative'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Tìm sản phẩm theo ID'
            className='border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <svg
            className='absolute right-3 top-2.5 text-gray-400 w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 17a6 6 0 100-12 6 6 0 000 12zm10 4l-4.35-4.35'
            />
          </svg>
        </div>

        <div className='flex gap-2'>
          <button className='bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600'>
            Export Excel
          </button>
          <button
            className='bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600'
            onClick={() => setIsAddModalOpen(true)}
          >
            Thêm mới
          </button>
        </div>
      </div>

      <table className='table-auto w-full bg-white rounded-lg shadow text-center whitespace-nowrap'>
        <thead>
          <tr className='bg-gray-100 text-center'>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Tên</th>
            <th className='px-4 py-2'>SL</th>
            <th className='px-4 py-2'>Giá</th>
            <th className='px-4 py-2'>Thương hiệu</th>
            <th className='px-4 py-2'>Kiểu dáng</th>
            <th className='px-4 py-2'>Chất liệu</th>
            <th className='px-4 py-2'>Kích thước</th>
            <th className='px-4 py-2'>Màu sắc</th>
            <th className='px-4 py-2'>Trạng thái</th>
            <th className='px-4 py-2'>Hành động</th>
          </tr>
        </thead>

        <tbody>{renderRows()}</tbody>
      </table>

      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor='entries' className='text-sm text-gray-700'>
            Xem
          </label>
          <select
            id='entries'
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500'
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
          <span className='text-sm text-gray-700'>Sản phẩm</span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className='text-sm text-gray-700'>{currentPage}</span>
          <button
            className='px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredItems.length}
          >
            {'>'}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <DetailModel
          productDetails={productDetails[0]}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
}
