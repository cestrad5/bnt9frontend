import React from "react";
import Pdfview from "../pdfview/Pdfview";
import './PdfModal.css'
import DocuPDF from "./DocuPDF";
import { PDFViewer } from "@react-pdf/renderer";

/**
 * PdfModal component for displaying a modal with a PDF viewer for a specific order.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {string} props.orderId - ID of the order to display in the PDF viewer.
 * @returns {JSX.Element|null} - Rendered PdfModal component or null if the modal is closed.
 */
const PdfModal = ({ isOpen, onClose, orderId }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {orderId ? (
        <>
          <PDFViewer style={{ width: "100%", height: "90vh" }}>
            <DocuPDF orderId={orderId} />
          </PDFViewer>
          <button className='btnPrimary' onClick={onClose}>Cerrar PDF</button>
        </>
      ) : null}
    </div>
  );
};

export default PdfModal;
