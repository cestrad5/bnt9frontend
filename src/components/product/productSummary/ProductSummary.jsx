import React, { useEffect } from 'react'
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import { CALC_CATEGORY, CALC_OUTOFSTOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice';

// Icons
const productIcon = <BsCart4 size={30} color='#000000' />;
const earningIcon = <AiFillDollarCircle size={30} color='#32963d' />;
const outOfStockIcon = <BsCartX size={30} color='red' />;
const categoryIcon = <BiCategory size={30} color='#000000' />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * ProductSummary component for displaying an overview of inventory status.
 * @param {Object} props - Component properties.
 * @param {Object[]} props.products - Array of product objects.
 * @returns {JSX.Element} - Rendered ProductSummary component.
 */
const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <>
      <h3 className='--mt'>Estado del Inventario</h3>
      <div className='product-summary'>
        <div className='info-summary --flex-center'>
          <InfoBox icon={productIcon} title={'Total Productos'} count={products.length} bgColor='card1' />
          <InfoBox icon={earningIcon} title={'Costo Total'} count={`$${formatNumbers(totalStoreValue.toFixed(0))}`} bgColor='card2' />
          <InfoBox icon={outOfStockIcon} title={'Sin Existencia'} count={outOfStock} bgColor='card3' />
          <InfoBox icon={categoryIcon} title={'Categorias'} count={category.length} bgColor='card4' />
        </div>
      </div>
    </>
  );
};

export default ProductSummary;
