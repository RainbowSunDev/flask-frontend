import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomForm from '../pages/CustomForm'

const RoutesComponent  = () => {

  return (
    <Routes>
      <Route path="/" element={<CustomForm />} />
    </Routes>
  );
};

export default RoutesComponent ;