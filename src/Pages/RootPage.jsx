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
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* ✅ nested routes will render here */}
      </main>
    </div>
  );
}
