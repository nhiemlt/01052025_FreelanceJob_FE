import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ProductModal from './components/ProductModal';

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const navigate = useNavigate();

  const items = [
    { id: 1, name: 'Sản phẩm 6', date: '21/12/2023' },
    { id: 2, name: 'Sản phẩm 2', date: '21/12/2023' },
    { id: 3, name: 'Đế cao su', date: '21/12/2023' },
    { id: 4, name: 'Đế vàng', date: '21/12/2023' },
    { id: 5, name: 'Đế nhựa', date: '21/12/2023' },
  ];

  const handleSaveProduct = (data) => {
    if (currentProduct) {
      console.log('Cập nhật sản phẩm:', { ...currentProduct, ...data });
    } else {
      console.log('Thêm sản phẩm mới:', data);
    }
    setCurrentProduct(null);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    console.log('Xóa sản phẩm với ID:', id);
  };

  const handleViewDetail = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const renderRows = () => {
    return items.map((item, index) => (
      <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        <td className='px-4 py-2'>{item.id}</td>
        <td className='px-4 py-2'>{item.name}</td>
        <td className='px-4 py-2'>{item.date}</td>
        <td className='px-4 py-2 flex justify-center gap-4'>
          <button
            className='text-blue-500 hover:text-blue-600'
            onClick={() => handleViewDetail(item.id)}
          >
            <AiOutlineEye size={20} />
          </button>
          <button
            className='text-orange-500 hover:text-orange-600'
            onClick={() => handleEditProduct(item)}
          >
            <AiOutlineEdit size={20} />
          </button>
          <button
            className='text-red-500 hover:text-red-600'
            onClick={() => handleDeleteProduct(item.id)}
          >
            <AiOutlineDelete size={20} />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-xl font-bold mb-4'>Quản lý sản phẩm</h1>

      <div className='flex items-center justify-between mb-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Tìm sản phẩm'
            className='border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
        </div>

        <div className='flex gap-2'>
          <button className='bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600'>
            Export Excel
          </button>
          <button
            className='bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600'
            onClick={() => setIsModalOpen(true)}
          >
            + Thêm mới
          </button>
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveProduct}
          />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <table className='table-auto w-full bg-white rounded-lg shadow overflow-hidden text-center'>
        <thead>
          <tr className='bg-gray-100 text-center'>
            <th className='px-4 py-2'>STT</th>
            <th className='px-4 py-2'>Tên</th>
            <th className='px-4 py-2'>Ngày thêm</th>
            <th className='px-4 py-2'>Hành động</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

      {/* Phân trang */}
      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor='entries' className='text-sm text-gray-700'>
            Xem
          </label>
          <select
            id='entries'
            className='border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
          <span className='text-sm text-gray-700'>Sản phẩm</span>
        </div>

        <div className='flex items-center gap-2'>
          <button className='px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100'>
            {'<'}
          </button>
          <span className='text-sm text-gray-700'>1</span>
          <button className='px-3 py-1 border rounded-lg text-gray-500 hover:bg-gray-100'>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
