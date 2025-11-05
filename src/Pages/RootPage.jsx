// import { Button } from "@/Components/ui/button";
// import { useAuth } from "@/Pages/AuthContext";
// import Sidebar from "./Sidebar";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootPage() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/user/login", { replace: true });
//   };

  return (
    <div className="flex min-h-screen">
      <div className="flex">
              <Navbar />

        <Outlet /> {/* ✅ nested routes will render here */}
        
      </div>
    </div>
  );
}
