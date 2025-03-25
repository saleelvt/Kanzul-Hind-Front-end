// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';


// Lazy-load each page component
// import { UserHomePage } from './components/pages/user/userHome';
const UserHomePage = lazy(() => import('./components/pages/user/userHome'));

import { AdminLogin } from './components/forms/admin/login';
import AdminHomePage from './components/pages/admin/adminDashBoard';
import AddProduct from './components/pages/admin/addProduct';

import { useSelector } from 'react-redux';
import { RootState } from './reduxKit/store';
   
export const App: React.FC = React.memo(() => {
  const {isLogged,}=useSelector((state:RootState)=>state.auth)
  console.log("my role and my isLogged", isLogged);
  return (
    <Fragment> 
      <Toaster position="top-center" /> 
      {/* Wrap Routes in Suspense for lazy-loaded components */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={ <UserHomePage/>} />
          <Route path="/adminLogin" element={ <AdminLogin />} />
          <Route path="/adminHomepage" element={<AdminHomePage />}/>
          <Route path="/adminAddProduct" element={<AddProduct /> }/>
          {/* <Route path="/adminProductList" element={ <DocumentList /> } /> */}
        </Routes>
      </Suspense>
    </Fragment>
  );
});
