import axios from "axios";

const ProductDetailService = {
    async getAllProductDetails(page = 0, size = 10, keyword = '') {
        try {
            const response = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet`, {
                params: {
                    page,
                    size,
                    keyword,
                },
            });
            return response.data.data.content; // Access the content array
        } catch (error) {
            console.error("Error fetching product details:", error);
            throw error;
        }
    },

    async getProductDetailById(id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching product detail:", error);
            throw error;
        }
    },

    async createProductDetail(productDetailData) {
        try {
            const response = await axios.post(`http://localhost:8080/api/san-pham-chi-tiet`, productDetailData);
            return response.data.data;
        } catch (error) {
            console.error("Error creating product detail:", error);
            throw error;
        }
    },

    async updateProductDetail(id, productDetailData) {
        try {
            const response = await axios.put(`http://localhost:8080/api/san-pham-chi-tiet/${id}`, productDetailData);
            return response.data.data;
        } catch (error) {
            console.error("Error updating product detail:", error);
            throw error;
        }
    },

    async toggleProductDetailStatus(id) {
        try {
            const response = await axios.patch(`http://localhost:8080/api/san-pham-chi-tiet/${id}/toggle-trang-thai`);
            return response.data.data;
        } catch (error) {
            console.error("Error toggling product detail status:", error);
            throw error;
        }
    },

    async deleteProductDetail(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/san-pham-chi-tiet/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting product detail:", error);
            throw error;
        }
    },

    async generateProductDetails(generateModel) {
        try {
            const response = await axios.post(`http://localhost:8080/api/san-pham-chi-tiet/generate`, generateModel);
            return response.data.data;
        } catch (error) {
            console.error("Error generating product details:", error);
            throw error;
        }
    },
};

export default ProductDetailService;