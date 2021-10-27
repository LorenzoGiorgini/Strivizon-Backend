import PdfPrinter from "pdfmake"

export const getPDFReadableStream = data => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
  
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: [data.name, data.description, data.price, data.category],
    defaultStyle: {
      font: "Helvetica",
    },
    
    // ...
  }

  const options = {
    // ...
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)
  // pdfReadableStream.pipe(fs.createWriteStream('document.pdf')); // old syntax for piping
  // pipeline(pdfReadableStream, fs.createWriteStream('document.pdf')) // new syntax for piping (we don't want to pipe pdf into file on disk right now)
  pdfReadableStream.end()
  return pdfReadableStream
}