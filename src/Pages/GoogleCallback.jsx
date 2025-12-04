import { useEffect } from "react";
import { api } from "@/utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Pages/AuthContext";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) return;

    async function verifyGoogle() {
      try {
        const res = await api.post("/oauth/oauth-verify", { code });

        // IF EXISTING USER then LOGIN
        if (res.data.token) {
          await login(res.data.token);
          return navigate("/admin/products", { replace: true }); 
        }

        // IF NEW USER then register
        return navigate("/admin/signup", {
          state: res.data, 
        });
      } catch (err) {
        console.error(err);
      }
    }

    verifyGoogle();
  }, []);

  return <p className="text-center mt-10">Verifying Google Login...</p>;
}
