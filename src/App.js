import React, { useContext } from 'react';
import { AuctionBody } from './components/auctions/Body';
import { NavComp } from './components/authentication/NavComp';
import { AuthProvider } from './context/AuthContext';
import './App.css';

export const App = () => {
  return (
    <AuthProvider>
      <NavComp />
      <AuctionBody />
    </AuthProvider>
  );
};
