import React from 'react';
import GlobalState from './global/GlobalState';
import { BrowserRouter } from 'react-router-dom';
import ModalProvider from './modal/ModalProvider';

const Providers = ({ children }) => (
  <BrowserRouter>
    <GlobalState>
        <ModalProvider>
            {children}
        </ModalProvider>
    </GlobalState>
  </BrowserRouter>
);

export default Providers;
