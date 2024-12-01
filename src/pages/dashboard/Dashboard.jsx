import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import ListProducts from '../../components/product/productList/ListProduct';
import { getUser } from '../../services/authService';
import Production from '../../components/production/Production';

/**
 * Dashboard component displaying product information based on user role.
 * Admins see ProductSummary and ProductList, Sales see ListProducts, others see Production.
 */
const Dashboard = () => {
  // State for user role and loading status
  const [roleUser, setRoleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to redirect logged-out users
  useRedirectLoggedOutUser('/login');

  // Redux setup
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isError, message } = useSelector((state) => state.product);

  // Fetch products and user role on component mount and when isLoggedIn changes
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
      getUser()
        .then((data) => {
          const roleUser = data.role[0];
          setRoleUser(roleUser);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  // Set loading status after a delay
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(loadingTimeout); 
  }, []); 

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          Cargando...
        </div>
      ) : (
        <>
          {roleUser === 'Admin' ? (
            <>
              <ProductSummary products={products} />
              <ProductList products={products} isLoading={isLoading} />
            </>
          ) : roleUser === 'Sales' ? (
            <>
              <ListProducts products={products} isLoading={isLoading} />
            </>
          ) : (
            <>
              <Production products={products} isLoading={isLoading} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
