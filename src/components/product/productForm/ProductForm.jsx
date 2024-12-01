import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../card/Card';

/**
 * ProductForm component for adding or editing product details.
 * @param {Object} props - Component properties.
 * @param {Object} props.product - Product object containing details like sku, name, category, price, quantity.
 * @param {string} props.productImage - URL of the product image.
 * @param {string} props.imagePreview - URL of the image preview.
 * @param {string} props.description - Product description.
 * @param {Function} props.setDescription - Function to set the product description.
 * @param {Function} props.handleInputChange - Function to handle input changes.
 * @param {Function} props.handleImageChange - Function to handle image changes.
 * @param {Function} props.saveProduct - Function to save the product.
 * @returns {JSX.Element} - Rendered ProductForm component.
 */
const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct }) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          <Card cardClass={'group'}>
            <label>
              <h4>Imagen del Producto</h4>
            </label>
            <code className='--color-dark'>Formatos: jpg, jpeg, png</code>
            <input type='file' name='image' onChange={(e) => handleImageChange(e)} />
            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt='product' />
              </div>
            ) : (<h4>No hay imagen para este producto</h4>)}
          </Card>
          <label>
            <h4>Referencia:</h4>
          </label>
          <input type='text' placeholder='Referencia' name='sku' value={product?.sku} onChange={handleInputChange} />
          <label>
            <h4>Nombre del producto:</h4>
          </label>
          <input type='text' placeholder='Nombre del producto' name='name' value={product?.name} onChange={handleInputChange} />
          <label>
            <h4>Categoría:</h4>
          </label>
          <input type='text' placeholder='Categoría' name='category' value={product?.category} onChange={handleInputChange} />
          <label>
            <h4>Precio:</h4>
          </label>
          <input type='text' placeholder='Precio' name='price' value={product?.price} onChange={handleInputChange} />
          <label>
            <h4>Cantidad:</h4>
          </label>
          <input type='text' placeholder='Cantidad' name='quantity' value={product?.quantity} onChange={handleInputChange} />
          <label>
            <h4>Descripción del Producto:</h4>
          </label>
          <ReactQuill theme='snow' value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} />
          <div className='--my'>
            <button type='submit' className='btnSave'>
              Guardar Producto
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
};

// Quill modules and formats for the rich text editor
ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
