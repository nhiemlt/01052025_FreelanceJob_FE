import axios from "axios";

const ProductService = {
    async getAllProducts(page = 0, size = 10, keyword = '') {
        try {
            const response = await axios.get(`http://localhost:8080/api/san-pham`, {
                params: {
                    page,
                    size,
                    keyword,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    async getProductById(id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/san-pham/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product data:", error);
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            const response = await axios.post(`http://localhost:8080/api/san-pham`, productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },

    async updateProduct(id, productData) {
        try {
            const response = await axios.put(`http://localhost:8080/api/san-pham/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    async toggleProductStatus(id) {
        try {
            const response = await axios.patch(`http://localhost:8080/api/san-pham/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error toggling product status:", error);
            throw error;
        }
    },

    async deleteProduct(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/san-pham/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    },

    async getAllBrands() {
        try {
            const response = await axios.get(`http://localhost:8080/api/brands`);
            return response.data;
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    },

    async getAllOrigins() {
        try {
            const response = await axios.get(`http://localhost:8080/api/origins`);
            return response.data;
        } catch (error) {
            console.error("Error fetching origins:", error);
            throw error;
        }
    },

    async getAllMaterials() {
        try {
            const response = await axios.get(`http://localhost:8080/api/materials`);
            return response.data;
        } catch (error) {
            console.error("Error fetching materials:", error);
            throw error;
        }
    },

    async getAllCollarTypes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/collarTypes`);
            return response.data;
        } catch (error) {
            console.error("Error fetching collar types:", error);
            throw error;
        }
    },

    async getAllSleeveTypes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/sleeveTypes`);
            return response.data;
        } catch (error) {
            console.error("Error fetching sleeve types:", error);
            throw error;
        }
    },

    async getAllColors() {
        try {
            const response = await axios.get(`http://localhost:8080/api/colors`);
            return response.data;
        } catch (error) {
            console.error("Error fetching colors:", error);
            throw error;
        }
    },

    async getAllSizes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/sizes`);
            return response.data;
        } catch (error) {
            console.error("Error fetching sizes:", error);
            throw error;
        }
    },
};

export default ProductService;