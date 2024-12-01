import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import DOMPurify from "dompurify";

/**
 * ProductDetail component for displaying detailed information about a product.
 * @returns {JSX.Element} - Rendered ProductDetail component.
 */
const ProductDetail = () => {
  // Custom hook to redirect logged-out users to the login page
  useRedirectLoggedOutUser("/login");
  
  // Redux hooks
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  /**
   * Function to determine the stock status based on the quantity.
   * @param {number} quantity - The quantity of the product.
   * @returns {JSX.Element} - Rendered stock status.
   */
  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">En Inventario</span>;
    }
    return <span className="--color-danger">Sin Inventario</span>;
  };

  // Fetch product details on component mount
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, id, isError, message, dispatch]);

  return (
    <div className="product-detail-form">
      <h3 className="--mt">Detalles del Producto</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image?.filePath}
                  alt={product.image?.fileName}
                />
              ) : (
                <p>No hay imágenes establecidas para este producto.</p>
              )}
            </Card>
            <h4>Disponibilidad: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Nombre: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; Referencia : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Categoria : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Precio : </b> {"$"}
              {Number(product.price).toLocaleString("es-CO")}
            </p>
            <p>
              <b>&rarr; Cantidad en Inventario : </b> {Number(product.quantity).toLocaleString("es-CO")}
            </p>
            <p>
              <b>&rarr; Valor Total en Inventario : </b> {"$"}
              {Number(product.price * product.quantity).toLocaleString("es-CO")}
            </p>
            <hr />
            {/* 
            Uncomment the following section if you want to display additional information:
            
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
            */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
