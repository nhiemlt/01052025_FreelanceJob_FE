const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_ENDPOINTS = {
  ORDERS: {
    BASE: `${API_BASE_URL}/hoa-don/hien-thi`,
    SEARCH: `${API_BASE_URL}/hoa-don/search`,
    COUNT: `${API_BASE_URL}/hoa-don/count`,
  },
  DETAILORDERS: {
    BASE: `${API_BASE_URL}/hdct/hien-thi`,
  },
  VOUCHERS: {
    BASE: `${API_BASE_URL}/phieu-giam-gia/hien-thi`,
  },
};
export default API_ENDPOINTS;
