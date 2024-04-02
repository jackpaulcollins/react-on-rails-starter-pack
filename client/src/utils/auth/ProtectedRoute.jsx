import { useEffect, useState, React } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/nav/NavBar';
import { useAuthContext } from '../../contexts/AuthContext';
import FullScreenLoading from '../../components/generic/FullScreenLoading';
import Api from '../../api/Api';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setLoading(true);

    Api.post('/exchange')
      .then((response) => {
        // eslint-disable-next-line no-shadow
        const { user } = response.data;
        dispatch({ type: 'SET_USER', payload: user });
        setLoading(false);
      })
      .catch(() => {
        <Navigate to="/login" />;
      });
  }, [dispatch, pathname]);

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      {loading ? <FullScreenLoading /> : children}
    </>
  );
}

export default ProtectedRoute;
