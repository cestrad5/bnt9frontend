import { useState } from "react";
import CardSales from "../../card/CardSales";

/**
 * ProductDetail component for displaying product details and filtering by category.
 * @param {Object[]} products - Array of product objects.
 * @returns {JSX.Element} - Rendered ProductDetail component.
 */
const ProductDetail = ({ products }) => {
  // Extract unique categories from the products
  const allCategories = [...new Set(products.map((product) => product.category))];
  const [selectedCategory, setSelectedCategory] = useState("Todos"); // Initially, show all products

  /**
   * Handle category selection.
   * @param {string} category - Selected category.
   */
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="product-detail-sales">
      {/* Category filter buttons */}
      <div className="category-filter">
        <button onClick={() => handleCategorySelect("Todos")} className="buttonFilter">
          Todos
        </button>
        {allCategories.map((category) => (
          <button className="buttonFilter" key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Display filtered products */}
      {products
        .filter((product) => (selectedCategory === "Todos" || product.category === selectedCategory) && product.quantity > 0)
        .sort((a, b) => a.sku - b.sku)
        .map((product) => (
          <CardSales key={product._id} product={product} selectedCategory={selectedCategory} />
        ))}
    </div>
  );
};

export default ProductDetail;
