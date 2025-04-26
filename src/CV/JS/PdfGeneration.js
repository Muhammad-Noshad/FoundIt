import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = async (Element) => {
  const cvElement = document.querySelector(`${Element}`);

  if (!cvElement) {
    console.error("CV element not found!");
    return;
  }

  const canvas = await html2canvas(cvElement, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: "#ffffff", // force white background
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

    const sliceHeight = Math.min(
      (usableHeight * canvas.height) / imgHeight,
      canvas.height - (page * (usableHeight * canvas.height)) / imgHeight
    );

    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;

    // Fill the background with white before drawing
    pageCtx.fillStyle = "#ffffff";
    pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

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

    const imgData = pageCanvas.toDataURL("image/jpeg", 0.7);

    const actualImgHeight = (sliceHeight * imgWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "JPEG",
      10,
      topBottomMargin,
      imgWidth,
      actualImgHeight
    );
  }

  pdf.save("My_CV.pdf");
};

export default generatePDF;
