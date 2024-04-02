import { useEffect, useState, React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/nav/NavBar';
import { useAuthContext } from '../../contexts/AuthContext';
import FullScreenLoading from '../../components/generic/FullScreenLoading';
import Api from '../../api/Api';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
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
      .catch(() => navigate('/login'));
  }, [dispatch, pathname]);

  if (loading) {
    return <FullScreenLoading />;
  }

  if (!loading && !user) {
    return navigate('/login');
  }

  return (
    <>
      <Navbar />
      {loading ? <FullScreenLoading /> : children}
    </>
  );
}

export default ProtectedRoute;
