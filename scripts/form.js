var ProductForm = {
  isValid: () => {
    const formValues = ProductForm.getRawValue();
    let isValid = true;
    ProductForm.getInputs().forEach((input) => {
      if (!isNotEmpty(formValues[input])) {
        addClass(input, "is-error");
        removeClass(input + "-error-hint", "d-none");
        isValid = false;
      }
    });

    /* if (!isNumber(formValues.price)) {
      addClass("price", "is-error");
      removeClass("price-number-error-hint", "d-none");
      isValid = false;
    } */

    return isValid;
  },
  setProductFormValues: (values) => {
    document.getElementById("description").value = values.description;
    document.getElementById("detail").value = values.detail;
    document.getElementById("quantity").value = values.quantity;
    document.getElementById("price").value = values.price;
  },
  getRawValue: () => {
    const description = document.getElementById("description").value;
    const detail = document.getElementById("detail").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    return {
      description,
      detail,
      quantity,
      price,
    };
  },
  getInputs: () => {
    return ["description", "detail", "quantity", "price"];
  },
  clear: () => {
    ProductForm.getInputs().forEach((input) => {
      document.getElementById(input).value = "";
    });
  },
  listeners: () => {
    ProductForm.getInputs().forEach((input) => {
      document.getElementById(input).addEventListener("input", (e) => {
        if (isNotEmpty(e.currentTarget.value)) {
          removeClass(input, "is-error");
          addClass(input + "-error-hint", "d-none");
        }
      });
    });
  },
};

var InvoiceForm = {
  isValid: () => {
    const formValues = InvoiceForm.getRawValue();
    let isValid = true;
    InvoiceForm.getInputs().forEach((input) => {
      if (!isNotEmpty(formValues[input])) {
        addClass(input, "is-error");
        removeClass(input + "-error-hint", "d-none");
        isValid = false;
        scrollToTop();
      }
    });

    if (ProductTable.getRowsLength() === 0) {
      const toastError = document.getElementById("toastError");
      fadeIn(toastError);
      setTimeout(() => {
        fadeOutAndHide(toastError);
      }, 5000);
      isValid = false;
    }

    return isValid;
  },
  getRawValue: () => {
    const invoiceDate = document.getElementById("invoiceDate").value;
    const sentTo = document.getElementById("sentTo").value;
    const concept = document.getElementById("concept").value;
    return {
      invoiceDate,
      sentTo,
      concept,
    };
  },
  getInputs: () => {
    return ["sentTo", "concept"];
  },
  listeners: () => {
    InvoiceForm.getInputs().forEach((input) => {
      document.getElementById(input).addEventListener("input", (e) => {
        if (isNotEmpty(e.currentTarget.value)) {
          removeClass(input, "is-error");
          addClass(input + "-error-hint", "d-none");
        }
      });
    });
  },
};
