import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const PlanetList = React.lazy(() => import('./components/PlanetList'));
const ResidentList = React.lazy(() => import('./components/ResidentList'));
const VehicleList = React.lazy(() => import('./components/VehicleList'));
const Navigation = React.lazy(() => import('./components/Navigation'));

function App() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Navigation /> */}
        <Routes>
          <Route path='/' element={<PlanetList />} />
          <Route path='/planets' element={<PlanetList />} />
          <Route path='/residents/:planetName' element={<ResidentList />} />
          <Route path='/vehicles/:residentName' element={<VehicleList />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
