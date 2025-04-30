import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomizeOrder from './components/CustomizeOrder';
import Cart from './components/Cart';
import usePersistState from './hooks/usePersisteState';

function App() {
  const [cart, setCart] = usePersistState([],'cart'); // Cart state

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:mealId" element={<CustomizeOrder cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
