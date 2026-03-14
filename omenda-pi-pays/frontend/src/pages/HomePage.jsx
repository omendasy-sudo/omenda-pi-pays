import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="container">
      <h1>Omenda Pi Pays</h1>
      <p>Source real China B2B wholesale goods with Pi, hold funds in escrow, and release payment after supplier confirmation.</p>
      <Link to="/products" className="btn">
        Browse China B2B Catalog
      </Link>
    </main>
  );
};

export default HomePage;
