import React, { useEffect, useState , useContext} from "react";
import { api } from "@/utils/api"; 
import ProductCard from "@/Pages/ProductCard"; 
import { CartContext } from "@/context/cart";
import CartPage from "./Cart";
import Navbar from "./Navbar";


export default function Products() {
  const [products, setProducts] = useState([]);       
  const [search, setSearch] = useState("");          
  const [loading, setLoading] = useState(false);      
  const [error, setError] = useState("");             
 const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)




  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(cartItems)

      const res = await api.get("/product", { params: { search } });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // fetch when component mounts or when search changes
  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <div className="py-8">
      <div>
        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center text-gray-600">Loading products...</div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <>
            {Array.isArray(products) && products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard  key={product.id} product={product} />
                ))}
                {/* <div>
                  <button onClick={()=>{
                    addToCart(products)
                  }}>Add To Cart</button>
                </div> */}
              </div>
             
            ) : (
              <div className="text-center text-gray-500 mt-10">
                No products found.
              </div>
            )}
          </>
        )}
        {/* <CartPage/>  */}
       
      </div>
    </div>
  );
}
