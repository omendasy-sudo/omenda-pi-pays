import { useEffect, useState } from 'react';
import PiCheckout from '../components/PiCheckout';
import { fetchProducts } from '../services/api';

const sampleProducts = [
  {
    id: 101,
    name: 'BYD Seal 2025 EV',
    description: 'New-generation electric sedan with long-range battery, digital cockpit, and export-ready specs.',
    price: 18500,
  },
  {
    id: 102,
    name: 'Tesla Model 3 Highland',
    description: 'Refreshed EV sedan for premium fleet purchase, ride-hailing, and dealership resale.',
    price: 24200,
  },
  {
    id: 103,
    name: 'Toyota Land Cruiser Prado 2025',
    description: 'Next-generation SUV for safari, security, executive travel, and cross-border operations.',
    price: 31800,
  },
  {
    id: 104,
    name: 'Komatsu PC200 Excavator',
    description: 'Heavy-duty excavator for road works, mining, and large construction sites.',
    price: 64800,
  },
  {
    id: 105,
    name: 'Huawei 20kW Solar Inverter',
    description: 'Commercial inverter for solar mini-grid deployments, factories, and warehouse power systems.',
    price: 5400,
  },
  {
    id: 106,
    name: 'John Deere 5075E Tractor',
    description: 'Reliable agricultural tractor for farming cooperatives and mechanized land preparation.',
    price: 23500,
  },
];

const STD_PI_RATE = 0.17;
const GCV_RATE = 314159;

const toGcvPi = (standardPiPrice) => (standardPiPrice * STD_PI_RATE) / GCV_RATE;

const formatPi = (piAmount) => {
  if (piAmount >= 1) {
    return piAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }

  return piAmount.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderResult, setOrderResult] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetchProducts();
        const incoming = response.data.data ?? [];
        setProducts(incoming.length > 0 ? incoming : sampleProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return <p className="container">Loading China B2B catalog...</p>;
  }

  return (
    <main className="container">
      <h2>Real Product Trade Catalog</h2>
      <p>New-generation cars, heavy machinery, solar equipment, and commodity stock priced in Pi with GCV-aware display.</p>
      {orderResult && (
        <div className="alert">
          Order #{orderResult.id} created with escrow status: {orderResult.escrow?.status}
        </div>
      )}

      <div className="grid">
        {products.map((product) => {
          const standardPi = Number(product.price ?? product.price_pi ?? 0);
          const gcvPi = toGcvPi(standardPi);

          return (
            <article className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description || 'Verified trade listing with Pi settlement and escrow support.'}</p>
              <p className="price">{formatPi(gcvPi)} Pi</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '-0.25rem' }}>
                Approx. GCV value: ${(gcvPi * GCV_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <PiCheckout order={{ id: product.id, amount: gcvPi }} onOrderComplete={setOrderResult} />
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default ProductsPage;
