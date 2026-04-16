import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Locations from './components/Locations';
import Catalog from './components/Catalog';
import CustomDesigns from './components/CustomDesigns';
import ProcessStrip from './components/ProcessStrip';
import BrandLogo from './components/BrandLogo';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import AdminPanel from './components/AdminPanel';
import ProductDetail from './components/ProductDetail';

// Detectar ruta /admin
const isAdminRoute = () => window.location.pathname === '/admin';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(isAdminRoute());

  // Escuchar cambios de ruta (por si navegan sin recargar)
  useEffect(() => {
    const handlePop = () => setIsAdmin(isAdminRoute());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  // Panel admin
  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen app-wrapper">
      <Navbar cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <ProcessStrip />
        <Catalog onAddToCart={addToCart} onOpenProduct={setSelectedProduct} />

        <Locations />
        <CustomDesigns onOpenProduct={setSelectedProduct} />
      </main>

      <Footer />
      
      <Chatbot cartItems={cart} />
      
      {isCartOpen && (
        <CartModal 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart} 
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default App;
