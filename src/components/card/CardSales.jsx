import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { RiArrowUpSLine } from 'react-icons/ri';
import 'react-toastify/dist/ReactToastify.css';
// import "./CardSales.css";

const Card = ({ product, selectedCategory }) => {
  const { _id, image, price, sku, name, quantity, description /* category */} = product;

  const [inputQuantity, setInputQuantity] = useState('');

  const handleAddToOrder = () => {
    if(inputQuantity === 0) {
      toast.error("La cantidad no puede estar vacía o ser cero.");
      return;
    }else if(inputQuantity !== parseInt(inputQuantity, 10)){
      toast.error("La cantidad debe ser un número entero.");
      return;
    }else{
      toast.success("Producto agregado al pedido");
      setInputQuantity('');
    }
    // Obtener todas las tarjetas
    const cards = document.querySelectorAll(".cardSales");

    // Recorrer todas las tarjetas y obtener la cantidad de cada una
    let totalQuantity = 0;
    
    cards.forEach((card) => {
    const quantity = card.querySelector(".input-quantity").value;
    totalQuantity += parseInt(quantity);
  });

    // Crear un objeto con los datos del producto y la cantidad solicitada
    const orderItem = {
      productId: _id,
      image,
      name,
      sku,
      price,
      description,
      quantity: inputQuantity,
    };

    // Guardar el objeto del pedido en el almacenamiento local
    localStorage.setItem(`orderItem-${_id}`, JSON.stringify(orderItem));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Para un desplazamiento suave
    });
  };

  // Function to remove <p> tags from the description
const cleanDescription = (htmlString) => {
  return htmlString.replace(/<\/?p>/g, '');
};

  return (
    <>
    {selectedCategory && (
      <div className="cardSales" /* style={{ display: selectedCategory === "Todos" || selectedCategory === category ? "block" : "none" }} */>
        <img src={image?.filePath} alt={image?.fileName}/>
        <p className="product_Name">{name}</p>
        <p className="product_ref">Ref: {sku}</p>
        <p className="product_ref" dangerouslySetInnerHTML={{ __html: cleanDescription(description) }}></p>
        <p className="product_price">$ {Number(price).toLocaleString("es-CO")}</p>
        {/* <p className="product_price">{category}</p> */}
        <input
          className="input-quantity"
          type="number"
          min='0'
          max='9999'
          placeholder="Cantidad a solicitar"
          maxLength='4'
          value={inputQuantity}
          required
          onChange={(e) => {
            if (e.target.value.length <= 4) {
              setInputQuantity(parseInt(e.target.value));
            }
          }}
        />
        <br />
        <button className="btn-add-to-order" onClick={handleAddToOrder}>Agregar</button>
        <div className="scroll-to-top" onClick={scrollToTop}>
          <RiArrowUpSLine size={30} /> {/* Tamaño del ícono */}
        </div>
      </div>
      )}
    </>
  );
};

export default Card;

