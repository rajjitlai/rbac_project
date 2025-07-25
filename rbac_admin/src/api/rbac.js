import axios from "axios";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ?
        { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" }
};

const apiService = {
    createRole: async (name) => {
        return axios.post('http://localhost:3000/rbac/roles', { name }, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    createPermission: async (name) => {
        return axios.post('http://localhost:3000/rbac/permissions', { name }, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    assignRole: async (userId, roleId) => {
        return axios.post('http://localhost:3000/rbac/assign-role', { userId, roleId }, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    assignPermission: async (roleId, permissionId) => {
        return axios.post('http://localhost:3000/rbac/assign-permission', { roleId, permissionId }, {
            headers: { 'Content-Type': 'application/json' }
        });
    },

    getProducts: async () => {
        return axios.get('http://localhost:3000/shopping/products', {
            headers: getAuthHeaders()
        });
    },
    createProduct: async (name) => {
        return axios.post('http://localhost:3000/shopping/products', { name }, {
            headers: getAuthHeaders()
        });
    },
    modifyCart: async ({ productId }) => {
        return axios.post('http://localhost:3000/shopping/cart', { productId }, {
            headers: getAuthHeaders()
        });
    },
    checkout: async () => {
        return axios.post('http://localhost:3000/shopping/checkout', {}, {
            headers: getAuthHeaders()
        });
    },
    createTodo: async (title) => {
        return axios.post('http://localhost:3000/todo/todos', { title }, {
            headers: getAuthHeaders()
        });
    },
    getTodos: async () => {
        return axios.get('http://localhost:3000/todo/todos', {
            headers: getAuthHeaders()
        });
    },
    updateTodo: async (id, title) => {
        return axios.put(`http://localhost:3000/todo/todos/${id}`, { title }, {
            headers: getAuthHeaders()
        });
    },
    deleteTodo: async (id) => {
        return axios.delete(`http://localhost:3000/todo/todos/${id}`, {
            headers: getAuthHeaders()
        });
    },

    // extra for fetching roles and permissions
    getRoles: async () => {
        return axios.get('http://localhost:3000/rbac/roles', {
            headers: { 'Content-Type': 'application/json' }
        });
    },

    getPermissions: async () => {
        return axios.get('http://localhost:3000/rbac/permissions', {
            headers: { 'Content-Type': 'application/json' }
        });
    },

    // for fetching cart
    getCart: async () => {
    return axios.get('http://localhost:3000/shopping/cart', {
        headers: getAuthHeaders()
    });
},
};

export default apiService;
