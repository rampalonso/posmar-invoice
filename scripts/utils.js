function isNotEmpty(value) {
  if (value === undefined || value === null || value === "") {
    return false;
  }
  return true;
}

function isNumber(price) {
  if (price === undefined || price === null) {
    return false;
  }
  if (price === "") {
    return false;
  }
  return !isNaN(price);
}

function formatCurrency(number) {
  // Asegurarse de que el número sea de tipo numérico
  number = parseFloat(number);

  // Verificar si el número es válido
  if (isNaN(number)) {
    return "No válido";
  }

  // Formatear el número con dos decimales y el símbolo de soles
  var formattedNumber = "S/ " + number.toFixed(2);

  return formattedNumber;
}

function formatCounter(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value.toString();
  }
}

function addClass(elementId, cssClass) {
  const element = document.getElementById(elementId);
  if (element) {
    if (!element.classList.contains(cssClass)) {
      element.classList.add(cssClass);
    }
  }
}

function removeClass(elementId, cssClass) {
  const element = document.getElementById(elementId);
  if (element) {
    if (element.classList.contains(cssClass)) {
      element.classList.remove(cssClass);
    }
  }
}

function formatDate() {
  flatpickr("#invoiceDate", {
    dateFormat: "d \\d\\e F \\d\\e\\l Y",
    locale: "es",
    disableMobile: "true",
    defaultDate: new Date(),
    maxDate: new Date().fp_incr(14),
  });
}

// Hacer scroll hacia la parte superior de la página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Para un desplazamiento suave
  });
}

// Función para aplicar un efecto de desvanecimiento
function fadeIn(element) {
  element.style.opacity = 0;
  element.style.display = "block"; // Mostrar el elemento antes de aplicar el efecto de desvanecimiento

  var opacity = 0;
  var fadeInInterval = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.05; // Cambia la velocidad del desvanecimiento ajustando este valor
      element.style.opacity = opacity;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 10); // Cambia la velocidad de la transición ajustando este valor
}

// Función para aplicar un efecto de desvanecimiento
function fadeOutAndHide(element) {
  var opacity = 1;
  var fadeOutInterval = setInterval(function () {
    if (opacity > 0) {
      opacity -= 0.05; // Cambia la velocidad del desvanecimiento ajustando este valor
      element.style.opacity = opacity;
    } else {
      clearInterval(fadeOutInterval);
      element.style.display = "none"; // Ocultar el elemento cuando la opacidad llega a 0
    }
  }, 10); // Cambia la velocidad de la transición ajustando este valor
}

function buildTableActions() {
  return `
    <div class="action-icons">
      <i class="tableRowEdit icon icon-edit mx-2 px-2"></i>
      <i class="tableRowDelete icon icon-delete mx-2 px-2"></i>
    </div>
  `;
}

/**
 * Si se envia true, mostrara la seccion de editar
 * @param {boolean} show
 */
function showEditionAction(show) {
  if (show) {
    removeClass("btnEditionContainer", "d-none");
    addClass("btnAddProductContainer", "d-none");
  } else {
    addClass("btnEditionContainer", "d-none");
    removeClass("btnAddProductContainer", "d-none");
  }
}

function clearSelectedRowIndex() {
  selectedRowIndex = undefined;
}

function dashWord(value) {
  return value.split(" ").join("-")
}