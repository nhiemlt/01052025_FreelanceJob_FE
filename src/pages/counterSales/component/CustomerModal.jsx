export default function CustomerModal({ onClose, onSelectCustomer }) {
  const customers = [
    {
      id: 1,
      email: "anhcdph47217@pft.edu.vn",
      name: "Cao Đức Anh",
      ngaySinh: "26/11/2001",
      sdt: "01334354435",
      gt: 1,
    },
    {
      id: 2,
      email: "meoemeo@pft.edu.vn",
      name: "Anh đau từ lúc em đi",
      ngaySinh: "21/01/2001",
      sdt: "01334354435",
      gt: 1,
    },
    {
      id: 3,
      email: "anhbakhia@pft.edu.vn",
      name: "Vùng lá me bay",
      ngaySinh: "22/12/2001",
      sdt: "01334354435",
      gt: 0,
    },
    {
      id: 4,
      email: "hoicolaido@pft.edu.vn",
      name: "Tái sinh",
      ngaySinh: "27/10/2001",
      sdt: "01334354435",
      gt: 0,
    },
    {
      id: 5,
      email: "guiemnguoihatinh@pft.edu.vn",
      name: "Mất kết nối",
      ngaySinh: "16/03/2001",
      sdt: "01334354435",
      gt: 1,
    },
  ];

  const handleSelectCustomer = (customer) => {
    onSelectCustomer(customer.name);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold ">Chọn khách hàng</h2>
          <button
            onClick={onClose}
            className="font-bold p-3 text-gray-600 hover:text-orange-400"
          >
            X
          </button>
        </div>
        <div className="bg-white border border-orange-500 rounded-lg shadow-sm my-2 px-4 py-1">
          <input
            className="flex-1 outline-none placeholder-gray-400 text-gray-700 "
            type="text"
            placeholder="Tìm kiếm khách hàng..."
          />
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>Họ Tên</th>
                <th>Ngày Sinh</th>
                <th>Số Điện Thoại</th>
                <th>Giới Tính</th>
                <th colSpan={3}></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr>
                  <td>{customer.id}</td>
                  <td>{customer.email}</td>
                  <td>{customer.name}</td>
                  <td>{customer.ngaySinh}</td>
                  <td>{customer.sdt}</td>
                  <td>{customer.gt == 0 ? "Nữ" : "Nam"}</td>
                  <td>
                    <button
                      onClick={() => handleSelectCustomer(customer)}
                      className="px-3 py-1 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
                    >
                      Chọn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
