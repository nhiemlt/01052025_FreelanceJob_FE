import React, { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import ProductVariants from "./components/ProductVariants";
import ProductDetailService from "./services/ProductDetailService";

export default function AddProduct() {
    const [sanPhams, setSanPhams] = useState([]);
    const [chatLieus, setChatLieus] = useState([]);
    const [coAos, setCoAos] = useState([]);
    const [kichThuocs, setKichThuocs] = useState([]);
    const [mauSacs, setMauSacs] = useState([]);
    const [tayAos, setTayAos] = useState([]);
    const [thuongHieus, setThuongHieus] = useState([]);
    const [xuatXus, setXuatXus] = useState([]);

    const [generateData, setGenerateData] = useState({
        sanPham: "",
        thuongHieu: [],
        xuatXu: [],
        chatLieu: [],
        coAo: [],
        tayAo: [],
        mauSac: [],
        kichThuoc: [],
    });

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

    const handleSelectChange = (name, selectedOption) => {
        const newGenerateData = { ...generateData };

        if (selectedOption) {
            if (name === "sanPham") {
                newGenerateData.sanPham = selectedOption.value;
            } else if (name === "thuongHieu") {
                newGenerateData.thuongHieu = selectedOption.map((opt) => opt.value);
            } else if (name === "xuatXu") {
                newGenerateData.xuatXu = selectedOption.map((opt) => opt.value);
            } else if (name === "chatLieu") {
                newGenerateData.chatLieu = selectedOption.map((opt) => opt.value);
            } else if (name === "coAo") {
                newGenerateData.coAo = selectedOption.map((opt) => opt.value);
            } else if (name === "tayAo") {
                newGenerateData.tayAo = selectedOption.map((opt) => opt.value);
            } else if (name === "mauSac") {
                newGenerateData.mauSac = selectedOption.map((opt) => opt.value);
            } else if (name === "kichThuoc") {
                newGenerateData.kichThuoc = selectedOption.map((opt) => opt.value);
            }
        }

        setGenerateData(newGenerateData);
    };

    const handleGenerate = () => {
        let allSelected = true;

        for (const [key, value] of Object.entries(generateData)) {
            if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
                allSelected = false;
                console.log(`Thuộc tính ${key} chưa được chọn hoặc có giá trị không hợp lệ.`);
            }
        }

        if (!allSelected) {
            alert("Vui lòng chọn đầy đủ tất cả các thuộc tính!");
        }
    };


    return (
        <div className="min-h-screen">
            <div>
                <div className="grid grid-cols-5 gap-6 px-6 py-4">
                    {/* Thuộc tính sản phẩm */}
                    <div className="col-span-2 mt-6 p-6 border rounded-lg bg-white shadow-lg">
                        <h2 className="text-2xl font-semibold  mb-6">Thuộc tính sản phẩm</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                <CreatableSelect
                                    name="tenSanPham"
                                    options={sanPhams.map(sanPham => ({ value: sanPham.id, label: sanPham.tenSanPham }))}
                                    isClearable
                                    onChange={(selectedOption) => {
                                        if (selectedOption && !selectedOption.__isNew__) {
                                            setGenerateData((prevData) => ({
                                                ...prevData,
                                                sanPham: selectedOption.value,
                                            }));
                                        } else if (selectedOption && selectedOption.__isNew__) {
                                            const newSanPham = { tenSanPham: selectedOption.label };
                                            ProductDetailService.createSanPham(newSanPham).then((newProduct) => {
                                                setSanPhams((prev) => [...prev, { id: newProduct.id, tenSanPham: newProduct.tenSanPham }]);
                                                setGenerateData((prevData) => ({
                                                    ...prevData,
                                                    sanPham: newProduct.id,
                                                }));
                                            });
                                        }
                                    }}
                                    className="rounded-lg text-sm w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Thương hiệu</label>
                                    <Select
                                        name="thuongHieuId"
                                        options={thuongHieus.map(th => ({ value: th.id, label: th.tenThuongHieu }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("thuongHieu", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Xuất xứ</label>
                                    <Select
                                        name="xuatXuId"
                                        options={xuatXus.map(x => ({ value: x.id, label: x.tenXuatXu }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("xuatXu", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Chất liệu</label>
                                    <Select
                                        name="chatLieuId"
                                        options={chatLieus.map(c => ({ value: c.id, label: c.tenChatLieu }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("chatLieu", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Cổ áo</label>
                                    <Select
                                        name="coAoId"
                                        options={coAos.map(c => ({ value: c.id, label: c.tenCoAo }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("coAo", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Tay áo</label>
                                    <Select
                                        name="tayAoId"
                                        options={tayAos.map(t => ({ value: t.id, label: t.tenTayAo }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("tayAo", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Màu sắc</label>
                                    <Select
                                        name="mauSacId"
                                        options={mauSacs.map(m => ({ value: m.id, label: m.tenMauSac }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("mauSac", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Kích thước</label>
                                    <Select
                                        name="kichThuocId"
                                        options={kichThuocs.map(k => ({ value: k.id, label: k.tenKichThuoc }))}
                                        isMulti
                                        onChange={(selectedOption) => handleSelectChange("kichThuoc", selectedOption)}
                                        className="rounded-lg py-1.5 text-sm w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biến thể sản phẩm */}
                    {Object.values(generateData).every(
                        (value) => value && (!Array.isArray(value) || value.length > 0)
                    ) ? (
                        <div className="col-span-3 mt-6 p-6 border rounded-lg bg-white shadow-lg">
                            <h2 className="text-2xl font-semibold  mb-6">Biến thể sản phẩm</h2>
                            <ProductVariants generateData={generateData} />
                        </div>
                    ) : (
                        <div className="col-span-3 mt-6 p-6 border rounded-lg bg-white shadow-lg flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 flex items-center justify-center">
                                <FaLightbulb className="text-5xl text-orange-500" />
                            </div>
                            <p className="text-gray-600 mt-4">Chọn các thuộc tính để hiển thị sản phẩm chi tiết.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}