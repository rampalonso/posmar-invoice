initialValues();
listeners();

var selectedRowIndex;

function initialValues() {
  formatDate();
}

function listeners() {
  ProductForm.listeners();
  InvoiceForm.listeners();
  // Escuchar el evento agregar producto
  document.getElementById("btnAddProduct").addEventListener("click", (e) => {
    // Obtener los datos del formulario
    if (ProductForm.isValid()) {
      ProductTable.addProduct(ProductForm.getRawValue());
    }
  });

  document
    .getElementById("btnCancelEditionProduct")
    .addEventListener("click", btnCancelEditionClickHandler);

  document
    .getElementById("btnEditProduct")
    .addEventListener("click", btnEditProductClickHandler);

  document
    .getElementById("btnGenerateInvoice")
    .addEventListener("click", (e) => {
      if (InvoiceForm.isValid()) {
        const invoice = {
          ...InvoiceForm.getRawValue(),
          products: ProductTable.getTableData(),
          total: ProductTable.getTotalPrince(),
        };
        window.localStorage.setItem("invoice", JSON.stringify(invoice));
        window.location.href = '/invoice';
      }
    });
}

function setTotalProducts() {
  document.getElementById("productTotalQuantity").innerHTML = formatCounter(
    ProductTable.getRowsLength()
  );
}

function calculateTotalPriceProducts() {
  document.getElementById("productTotalPrice").innerHTML = formatCurrency(
    ProductTable.getTotalPrince()
  );
}

function btnEditProductClickHandler(e) {
  if (ProductForm.isValid()) {
    const formValues = ProductForm.getRawValue();
    ProductTable.editProduct(formValues);
    showEditionAction(false);
  }
}

function btnCancelEditionClickHandler(e) {
  ProductForm.clear();
  showEditionAction(false);
  clearSelectedRowIndex();
}
