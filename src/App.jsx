import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('isAuthenticated');
  return isAuth ? (
    <div className="flex">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Right Layout (Navbar + Main Content) */}
      <div className="flex-1 bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  ) : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}