import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    sku: "",
}

/**
 * AddProduct component for adding a new product.
 * Handles form state, image upload, and product creation.
 */
const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('')
    const isLoading = useSelector(selectIsLoading);

    const { name, category, price, quantity, sku } = product

    /**
     * Handle input change for the product form.
     * @param {Object} e - Event object.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    /**
     * Handle image change for product upload.
     * @param {Object} e - Event object.
     */
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    /**
     * Save the product by dispatching the createProduct action.
     * @param {Object} e - Event object.
     */
    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('sku', sku);
        formData.append('category', category)
        formData.append('quantity', quantity)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', productImage)

        // Logging the form data for verification
        console.log(...formData);

        await dispatch(createProduct(formData));

        // Navigate to the dashboard after product creation
        navigate('/dashboard');
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className='--mt'>Agregar Nuevo Producto</h3>
            <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    )
}

export default AddProduct
