import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import VoucherService from '../services/VoucherService';
import CustomerService from '../services/CustomerService';
import { toast } from 'react-toastify';

const UpdateModal = ({ isOpen, onCancel, voucherId, fetchVouchers }) => {
    const [voucher, setVoucher] = useState({
        maPhieuGiamGia: '',
        tenPhieuGiamGia: '',
        thoiGianApDung: null,
        thoiGianHetHan: null,
        giaTriGiam: '',
        soTienToiThieuHd: '',
        soTienGiamToiDa: '',
        loaiGiam: "0",
        soLuong: '',
        khachHangId: []
    });
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (isOpen) {
            fetchVoucherDetails();
            fetchCustomersByVoucherId();
        }
    }, [isOpen, currentPage, pageSize]);

    const fetchVoucherDetails = async () => {
        try {
            const response = await VoucherService.getById(voucherId);
            console
            setVoucher(response.data);
        } catch (error) {
            console.error("Error fetching voucher details:", error);
        }
    };

    const fetchCustomersByVoucherId = async () => {
        try {
            const response = await CustomerService.getByVoucherId(voucherId, currentPage, pageSize);
            setCustomers(response.content);
            console.log(response);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching customers by voucher ID:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoucher(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        setVoucher(prev => ({ ...prev, [name]: date }));
    };

    const validateForm = () => {
        const { maPhieuGiamGia, tenPhieuGiamGia, thoiGianApDung, thoiGianHetHan, giaTriGiam, soTienToiThieuHd, soTienGiamToiDa, soLuong } = voucher;

        if (!maPhieuGiamGia || !tenPhieuGiamGia || !thoiGianApDung || !thoiGianHetHan || !giaTriGiam || !soTienToiThieuHd || !soTienGiamToiDa || (voucher.loaiGiam !== "0" && !soLuong)) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return false;
        }

        if (!/^[a-zA-Z0-9]+$/.test(maPhieuGiamGia)) {
            toast.error("Mã phiếu giảm giá chỉ được chứa chữ và số, không có khoảng trắng.");
            return false;
        }

        if (new Date(thoiGianApDung) >= new Date(thoiGianHetHan)) {
            toast.error("Thời gian áp dụng phải trước thời gian hết hạn.");
            return false;
        }

        if (giaTriGiam <= 0 || isNaN(giaTriGiam)) {
            toast.error("Giá trị giảm phải lớn hơn 0.");
            return false;
        }

        if (soTienToiThieuHd < 0 || isNaN(soTienToiThieuHd)) {
            toast.error("Số tiền tối thiểu hóa đơn không hợp lệ.");
            return false;
        }

        if (soTienGiamToiDa < 0 || isNaN(soTienGiamToiDa)) {
            toast.error("Số tiền giảm tối đa không hợp lệ.");
            return false;
        }

        if (voucher.loaiGiam === "1" && soLuong <= 0) {
            toast.error("Số lượng phải lớn hơn 0.");
            return false;
        }

        return true;
    };

    const handleUpdateVoucher = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const voucherData = { ...voucher };
            if (voucher.loaiGiam === "0") {
                delete voucherData.soLuong;
            }
            await VoucherService.update(voucherId, voucherData);

            toast.success("Cập nhật phiếu giảm giá thành công!");
            fetchVouchers();
            onCancel();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal modal-open">
                <div className="modal-box relative max-w-7xl w-full">
                    <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onCancel}>✖</button>
                    <h3 className="font-bold text-lg text-orange-600 text-center">Cập nhật phiếu giảm giá</h3>
                    <div className="flex">
                        {/* Bên trái - Thông tin khách hàng */}
                        <div className="w-2/5">
                            <div className="py-3 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Mã phiếu giảm giá</label>
                                    <input
                                        type="text"
                                        name="maPhieuGiamGia"
                                        value={voucher.maPhieuGiamGia}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập mã phiếu giảm giá"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Tên phiếu giảm giá</label>
                                    <input
                                        type="text"
                                        name="tenPhieuGiamGia"
                                        value={voucher.tenPhieuGiamGia}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập tên phiếu giảm giá"
                                    />
                                </div>
                            </div>

                            <div className="py-3 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Thời gian áp dụng</label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={voucher.thoiGianApDung}
                                            onChange={(date) => handleDateChange('thoiGianApDung', date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="input input-bordered w-full pl-10"
                                            placeholderText="Chọn thời gian áp dụng"
                                        />
                                        <FaCalendarAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Thời gian hết hạn</label>
                                    <div className="relative">
                                        <DatePicker
                                            selected={voucher.thoiGianHetHan}
                                            onChange={(date) => handleDateChange('thoiGianHetHan', date)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="input input-bordered w-full pl-10"
                                            placeholderText="Chọn thời gian hết hạn"
                                        />
                                        <FaCalendarAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="py-3 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Phần trăm giảm</label>
                                    <input
                                        type="number"
                                        name="giaTriGiam"
                                        value={voucher.giaTriGiam}
                                        onChange={handleChange}
                                        min={1}
                                        max={90}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập phàn trăm giảm"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Số tiền tối thiểu HD</label>
                                    <input
                                        type="number"
                                        name="soTienToiThieuHd"
                                        value={voucher.soTienToiThieuHd}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập số tiền tối thiểu HD"
                                        min={1000}
                                        step={1000}
                                    />
                                </div>
                            </div>

                            <div className="py-3 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Số tiền giảm tối đa</label>
                                    <input
                                        type="number"
                                        name="soTienGiamToiDa"
                                        value={voucher.soTienGiamToiDa}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập số tiền giảm tối đa"
                                        min={1000}
                                        step={1000}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Loại giảm</label>
                                    <select
                                        name="loaiGiam"
                                        value={voucher.loaiGiam}
                                        onChange={handleChange}
                                        className="select select-bordered w-full"
                                        disabled
                                    >
                                        <option value={0}>Tất cả</option>
                                        <option value={1}>Gửi riêng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="py-3 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-600">Số lượng</label>
                                    <input
                                        type="number"
                                        name="soLuong"
                                        value={voucher.soLuong}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                        placeholder="Nhập số lượng"
                                        disabled={voucher.loaiGiam === "1"}
                                        min={0}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bên phải - Thông tin phiếu giảm giá */}
                        <div className="w-3/5 pr-4 border-r pl-4">
                            <div className="py-3">
                                <label className="text-sm font-medium text-gray-600">Danh sách khách hàng</label>
                                <div className="max-h-64 overflow-y-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2">Chọn</th>
                                                <th className="px-4 py-2">Tên khách hàng</th>
                                                <th className="px-4 py-2">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map(customer => (
                                                <tr key={customer.id} className="cursor-pointer">
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={true}
                                                            disabled
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">{customer.tenKhachHang}</td>
                                                    <td className="px-4 py-2">{customer.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-orange-500 hover:text-white"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 0}
                                    >
                                        {"<"}
                                    </button>
                                    <span className="text-sm text-gray-700">Trang {currentPage + 1} / {totalPages}</span>
                                    <button
                                        className="px-3 py-1 border rounded-lg text-gray-500 hover:bg-orange-500 hover:text-white"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages - 1}
                                    >
                                        {">"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action flex justify-end gap-2">
                        <button className="btn bg-orange-500 hover:bg-orange-600 text-white" onClick={handleUpdateVoucher}>Cập nhật phiếu giảm giá</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateModal;