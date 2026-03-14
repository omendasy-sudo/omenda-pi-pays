import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import { restoreAuth } from './services/api';

restoreAuth();

const App = () => {
  return (
    <>
      <header className="topbar">
        <nav className="nav container">
          <Link to="/">Home</Link>
          <Link to="/login">Pi Login</Link>
          <Link to="/products">China B2B Catalog</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
};

export default App;
