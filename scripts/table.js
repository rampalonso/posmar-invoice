var ProductTable = {
  addProduct: (formValues) => {
    const productTable = document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0];
    const row = productTable.insertRow(productTable.rows.length);
    const counterCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const detailCell = row.insertCell(2);
    const quantityCell = row.insertCell(3);
    const priceCell = row.insertCell(4);
    const actionCell = row.insertCell(5);
    const rowData = {
      ...formValues,
      index: productTable.rows.length - 1,
    };

    counterCell.innerHTML = formatCounter(productTable.rows.length);
    descriptionCell.innerHTML = formValues.description;
    detailCell.innerHTML =
      '<div class="table-cell-width">' + formValues.detail + "</div>";
    quantityCell.innerHTML = formValues.quantity;
    priceCell.innerHTML =
      '<div class="table-cell-price" data-price="' +
      formValues.price +
      '">' +
      formatCurrency(formValues.price) +
      "</div>";
    actionCell.innerHTML = buildTableActions();
    row.setAttribute("data-row", JSON.stringify(rowData));
    row.classList.add("data-row");
    ProductForm.clear();
    setTotalProducts();
    calculateTotalPriceProducts();
    ProductTable.listeners();
    clearSelectedRowIndex();
  },
  editProduct: (formValues) => {
    const productTable = document.getElementById("productTable");
    const row = productTable.tBodies[0].rows[selectedRowIndex];
    const rowData = {
      ...formValues,
      index: productTable.tBodies[0].rows.length - 1,
    };

    const descriptionCell = row.cells[1];
    const detailCell = row.cells[2];
    const quantityCell = row.cells[3];
    const priceCell = row.cells[4];
    const actionCell = row.cells[5];

    descriptionCell.innerHTML = formValues.description;
    detailCell.innerHTML =
      '<div class="table-cell-width">' + formValues.detail + "</div>";
    quantityCell.innerHTML = formValues.quantity;
    priceCell.innerHTML =
      '<div class="table-cell-price" data-price="' +
      formValues.price +
      '">' +
      formatCurrency(formValues.price) +
      "</div>";
    actionCell.innerHTML = buildTableActions();
    row.setAttribute("data-row", JSON.stringify(rowData));
    ProductForm.clear();
    setTotalProducts();
    calculateTotalPriceProducts();
    ProductTable.listeners();
  },
  getRowsLength: () => {
    const productTable = document
      .getElementById("productTable")
      .getElementsByTagName("tbody")[0];
    if (productTable) {
      return productTable.rows.length;
    }
    return 0;
  },
  getTotalPrince: () => {
    let totalPrice = 0;
    document.querySelectorAll(".table-cell-price").forEach((priceCell) => {
      if (isNumber(priceCell.dataset.price)) {
        const price = +priceCell.dataset.price;
        totalPrice = totalPrice + price;
      }
    });
    return totalPrice;
  },
  clearListeners: () => {
    document.querySelectorAll(".tableRowEdit").forEach((t) => {
      t.removeEventListener("click", tableRowEditClickHandler);
    });
    document.querySelectorAll(".tableRowDelete").forEach((t) => {
      t.addEventListener("click", tableRowDeleteCLickHandler);
    });
  },
  listeners: () => {
    ProductTable.clearListeners();
    document.querySelectorAll(".tableRowEdit").forEach((t) => {
      t.addEventListener("click", tableRowEditClickHandler);
    });
    document.querySelectorAll(".tableRowDelete").forEach((t) => {
      t.addEventListener("click", tableRowDeleteCLickHandler);
    });
  },
  getTableData: () => {
    let tableData = []
    document.querySelectorAll(".data-row").forEach((node) => {
      tableData.push(JSON.parse(node.dataset.row));
    })
    return tableData;
  },
};

function tableRowEditClickHandler(e) {
  e.preventDefault();
  const rowData = JSON.parse(
    e.currentTarget.parentNode.parentNode.parentNode.dataset.row
  );
  ProductForm.setProductFormValues(rowData);
  selectedRowIndex = rowData.index;
  showEditionAction(true);
}

function tableRowDeleteCLickHandler(e) {
  e.preventDefault();
  clearSelectedRowIndex();
  const productTable = document
    .getElementById("productTable")
    .getElementsByTagName("tbody")[0];
  const index = e.currentTarget.parentNode.parentNode.parentNode;
  productTable.deleteRow(index.rowIndex - 1);
  setTotalProducts();
  calculateTotalPriceProducts();
}
