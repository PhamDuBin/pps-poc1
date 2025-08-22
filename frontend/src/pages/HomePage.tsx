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
        <Link to="/check-saleByCategory" className="text-blue-500 underline">
          → Check sale by category page (大分類別売上)
        </Link>
      </div>
      <div>
        <Link to="/check-key" className="text-blue-500 underline">
          → Check key page (ウィンドウズ操作サンプル)
        </Link>
      </div>
      <div>
        <Link to="/position-custome" className="text-blue-500 underline">
          → Display position customization sample page
          (表示位置カスタマイズサンプル)
        </Link>
      </div>
      <div>
        <Link to="/mouse-test" className="text-blue-500 underline">
          → Mouse testing (不確定インジケーター10&12)
        </Link>
      </div>
      <div>
        <Link to="/noti-control" className="text-blue-500 underline">
          → Notification Control (通知コントロール)
        </Link>
      </div>
      <div>
        <Link to="/scroll" className="text-blue-500 underline">
          → Scroll (不確定インジケーター02)
        </Link>
      </div>
      <div>
        <Link to="/print" className="text-blue-500 underline">
          → Print Page (確定インジケーター)
        </Link>
      </div>
      <div>
        <Link to="/tank-meter" className="text-blue-500 underline">
          → Tank Meter Page (入力値と連動する動的タンクメータ)
        </Link>
      </div>
      <div>
        <Link to="/tranc-info" className="text-blue-500 underline">
          → Tranc Info Page (01.01.01_取引情報照会_構成情報_250719)
        </Link>
      </div>
      <div>
        <Link to="/sale-slip-entry-info" className="text-blue-500 underline">
          → Sale Slip Entry Page (03.03.01_売上伝票入力_伝票対象選択ランチャー)
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
