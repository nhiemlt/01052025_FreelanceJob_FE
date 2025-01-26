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
            return response.data.data.content;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    async getBrands() {
        try {
            const response = await axios.get(`http://localhost:8080/api/brands`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    },

    async getOrigins() {
        try {
            const response = await axios.get(`http://localhost:8080/api/origins`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching origins:", error);
            throw error;
        }
    },

    async getMaterials() {
        try {
            const response = await axios.get(`http://localhost:8080/api/materials`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching materials:", error);
            throw error;
        }
    },

    async getCollarTypes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/collarTypes`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching collar types:", error);
            throw error;
        }
    },

    async getSleeveTypes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/sleeveTypes`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching sleeve types:", error);
            throw error;
        }
    },

    async getColors() {
        try {
            const response = await axios.get(`http://localhost:8080/api/colors`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching colors:", error);
            throw error;
        }
    },

    async getSizes() {
        try {
            const response = await axios.get(`http://localhost:8080/api/sizes`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching sizes:", error);
            throw error;
        }
    },
};

export default ProductService;