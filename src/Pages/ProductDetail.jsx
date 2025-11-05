import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleBuy = async () => {
    if (!user) return navigate("/login");

    // store in localStorage or redirect to checkout
    localStorage.setItem(
      "cart",
      JSON.stringify([{ productId: product.id, qty, price: product.price }])
    );

    navigate("/checkout");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.photos[0]} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(parseInt(e.target.value))}
      />
      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
}
