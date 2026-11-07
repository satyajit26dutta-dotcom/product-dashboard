import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Admin User';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      {/* Left: App Title / Branding */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-blue-600">Dutta Store</h1>
      </div>

      {/* Right: User Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">{userEmail}</p>
          <span className="text-xs text-green-500 font-semibold">● Online</span>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}