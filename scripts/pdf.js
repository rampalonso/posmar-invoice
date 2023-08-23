setAllPageData();
generatePDF();

function generatePDF() {
  const invoice = document.getElementById("invoice");
  const invoiceData = GetInvoiceData();
  const opts = {
    margin: [10, 12],
    filename: fileName(invoiceData),
  };
  html2pdf().set(opts).from(invoice).save();
  window.localStorage.removeItem("invoice");
}

function setAllPageData() {
  const invoiceData = GetInvoiceData();

  document.getElementById(
    "invoiceDate"
  ).innerHTML = `Lima, ${invoiceData.invoiceDate}`;
  document.getElementById("sentTo").innerHTML = invoiceData.sentTo;
  document.getElementById("concept").innerHTML = invoiceData.concept;

  // Agregar productos a tabla
  invoiceData.products.forEach((product) => {
    const productTable = document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0];
    const row = productTable.insertRow(productTable.rows.length);
    const counterCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const detailCell = row.insertCell(2);
    const quantityCell = row.insertCell(3);
    const priceCell = row.insertCell(4);

    counterCell.innerHTML = formatCounter(productTable.rows.length);
    descriptionCell.innerHTML = product.description;
    detailCell.innerHTML = product.detail;
    quantityCell.innerHTML = product.quantity;
    priceCell.innerHTML = formatCurrency(product.price);
  });
}

function fileName(invoice) {
  return `${dashWord(invoice.sentTo)}-${dashWord(invoice.invoiceDate)}.pdf`;
}

function GetInvoiceData() {
  let invoiceData = window.localStorage.getItem("invoice");
  if (!invoiceData) {
    window.location.href = window.location.origin + '/posmar-invoice';
    return;
  }
  invoiceData = JSON.parse(invoiceData);
  return invoiceData;
}
