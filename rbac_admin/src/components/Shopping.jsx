import { useEffect, useState } from "react";
import apiService from "../api/rbac";

const Shopping = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [cartItem, setCartItem] = useState('');
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await apiService.getProducts();
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError(`Failed to fetch products: ${error.response?.data?.message || error.message}`);
            setProducts([]);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await apiService.getCart();
            setCart(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Cart fetch error:', error);
            setError(`Cart fetch failed: ${error.response?.data?.error || error.message || 'Unknown error'}`);
            setCart([]);
        }
    };


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const handleCreateProduct = async () => {
        try {
            await apiService.createProduct(productName);
            alert('Product created successfully');
            setProductName('');
            setError('');
            fetchProducts();
        } catch (error) {
            setError(`Failed to create product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAddToCart = async () => {
        try {
            const parsed = parseInt(cartItem);
            if (!parsed || isNaN(parsed)) return alert('Please select a valid product');
            await apiService.modifyCart({ productId: parsed });
            alert('Added to cart');
            setCartItem('');
            setError('');
            fetchCart();
        } catch (error) {
            setError(`Failed to modify cart: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCheckout = async () => {
        try {
            await apiService.checkout();
            alert('Checkout successful');
            setCart([]);
            fetchCart()
            setError('');
        } catch (error) {
            setError(`Failed to checkout: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Shopping</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-6">
                {/* Product List Dropdown */}
                <div>
                    <h3 className="text-xl font-medium mb-2">Add to Cart</h3>
                    <select
                        value={cartItem}
                        onChange={(e) => setCartItem(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="">Select product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Add to Cart
                    </button>
                </div>

                {/* Create Product */}
                <div>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleCreateProduct}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Product
                    </button>
                </div>

                {/* Checkout Button */}
                <div className="mt-4">
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    >
                        Checkout
                    </button>
                </div>

                {/* Cart Display */}
                {cart.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-medium mb-2">Cart</h3>
                        <ul className="list-disc pl-5">
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.productName || `Product #${item.productId}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shopping;
