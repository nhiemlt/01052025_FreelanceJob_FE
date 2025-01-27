import React, { useState } from 'react';
import Select from 'react-select';

const AddDetailModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    idSanPham: '',
    soLuong: '',
    donGia: '',
    nguoiCapNhat: '',
    trangThai: 1,
    trongLuong: '',
    idCoAoList: [],
    idThietKeList: [],
    idThuongHieuList: [],
    idKieuDangList: [],
    idChatLieuList: [],
    idKichThuocList: [],
    idMauSacList: [],
    idMoTaList: [],
  });

  const options = {
    idCoAoList: [
      { label: 'Cổ tròn', value: 1 },
      { label: 'Cổ đứng', value: 2 },
      { label: 'Cổ chữ V', value: 3 },
    ],
    idThietKeList: [
      { label: 'Thiết kế đơn giản', value: 1 },
      { label: 'Thiết kế phức tạp', value: 2 },
    ],
    idThuongHieuList: [
      { label: 'Thương hiệu A', value: 1 },
      { label: 'Thương hiệu B', value: 2 },
      { label: 'Thương hiệu C', value: 3 },
    ],
    idKieuDangList: [
      { label: 'Kiểu dáng ôm', value: 1 },
      { label: 'Kiểu dáng rộng', value: 2 },
    ],
    idChatLieuList: [
      { label: 'Cotton', value: 1 },
      { label: 'Polyester', value: 2 },
      { label: 'Len', value: 3 },
    ],
    idKichThuocList: [
      { label: 'S', value: 1 },
      { label: 'M', value: 2 },
      { label: 'L', value: 3 },
      { label: 'XL', value: 4 },
    ],
    idMauSacList: [
      { label: 'Đỏ', value: 1 },
      { label: 'Xanh', value: 2 },
      { label: 'Vàng', value: 3 },
      { label: 'Đen', value: 4 },
    ],
    idMoTaList: [
      { label: 'Mô tả chi tiết 1', value: 1 },
      { label: 'Mô tả chi tiết 2', value: 2 },
      { label: 'Mô tả chi tiết 3', value: 3 },
    ],
  };

  const handleSelectChange = (selectedOptions, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Thêm mới sản phẩm chi tiết</h2>

        <div className="grid grid-cols-2 gap-6 mb-4">

          <div>
            <label htmlFor="soLuong" className="block mb-2">Số lượng</label>
            <input
              type="number"
              id="soLuong"
              name="soLuong"
              value={formData.soLuong}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="donGia" className="block mb-2">Đơn giá</label>
            <input
              type="number"
              id="donGia"
              name="donGia"
              value={formData.donGia}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Object.keys(options).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block mb-2">
                {key.replace('id', '').replace(/([A-Z])/g, ' $1')}
              </label>
              <Select
                isMulti
                options={options[key]}
                onChange={(selectedOptions) => handleSelectChange(selectedOptions, key)}
                value={options[key].filter((option) => formData[key]?.includes(option.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDetailModal;
