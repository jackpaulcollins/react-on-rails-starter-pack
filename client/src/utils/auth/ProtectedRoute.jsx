import { React, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/nav/NavBar';
import { useAuthContext } from '../../contexts/AuthContext';
import { exchange } from '../../api/Api';
import FullScreenLoading from '../../components/generic/FullScreenLoading';

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const { user, dispatch } = useAuthContext();
  const location = useLocation();
  const { pathname } = location;

  const maybeHydrateUser = async () => {
    try {
      const refreshedUser = await exchange();

      if (refreshedUser) {
        dispatch({ type: 'SET_USER', payload: refreshedUser });
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setisLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      maybeHydrateUser();
    } else {
      setisLoggedIn(true);
      setLoading(false);
    }
  }, [user, pathname]);

  if (loading) {
    return <FullScreenLoading />;
  }

  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
