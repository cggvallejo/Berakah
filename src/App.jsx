import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.cartId !== id));
  };

  return (
    <div className="relative min-h-screen app-wrapper">
      <Navbar cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <Catalog onAddToCart={addToCart} />
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
    </div>
  );
}

export default App;
