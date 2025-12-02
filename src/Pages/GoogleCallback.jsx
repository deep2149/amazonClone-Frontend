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

        // Existing user → auto login
        if (res.data.token) {
          await login(res.data.token);
          return navigate("/user/products", { replace: true });
        }

        // New user → redirect to a "complete profile" page
        navigate("/complete-signup", {
          state: res.data, // pass name, email, picture
        });
      } catch (err) {
        console.error(err);
      }
    }

    verifyGoogle();
  }, []);

  return <p>Verifying Google Login...</p>;
}
