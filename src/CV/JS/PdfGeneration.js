import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = async (Element) => {
  const cvElement = document.querySelector(`${Element}`);

  if (!cvElement) {
    console.error("CV element not found!");
    return;
  }

  const canvas = await html2canvas(cvElement, {
    scale: 2, // better quality
    useCORS: true,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageHeight = 297;
  const pageWidth = 210;
  const topBottomMargin = 9;
  const usableHeight = pageHeight - 2 * topBottomMargin;
  const imgWidth = pageWidth - 20;

  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const totalPages = Math.ceil(imgHeight / usableHeight);

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) pdf.addPage();

    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    const sliceHeight = (usableHeight * canvas.height) / imgHeight;

    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;

    pageCtx.drawImage(
      canvas,
      0,
      page * sliceHeight,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight
    );

    const imgData = pageCanvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, topBottomMargin, imgWidth, usableHeight);
  }

  pdf.save("My_CV.pdf");
};

export default generatePDF;
