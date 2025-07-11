import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="text-center mt-10 text-blue-600 space-y-4">
      <div className="text-2xl font-bold">Main Page</div>

      <div>
        <Link to="/check-input" className="text-blue-500 underline">
          → Check input page (入力画面サンプル)
        </Link>
      </div>
      <div>
        <Link to="/check-key" className="text-blue-500 underline">
          → Check key page (ウィンドウズ操作サンプル)
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
