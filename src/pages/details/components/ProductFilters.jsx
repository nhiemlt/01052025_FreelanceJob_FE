import React from 'react';
import Select from 'react-select';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ProductFilters = ({ filters, search, handleSearchChange, handleFilterChange, thuongHieus, xuatXus, chatLieus, coAos, tayAos, mauSacs, kichThuocs }) => {
    return (
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
    );
};

export default ProductFilters;
