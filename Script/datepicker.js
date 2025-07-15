// =======================
// Date Picker Script Fluxscape - Versión Final
// =======================

// Salidas del componente Date Picker
Script.Outputs = {
  Value: 'string',
  DateSelected: 'signal'
};

// Entradas del script
Script.Inputs = {
  PopupMarginRight: "number",
  PopupMarginTop: "number",
  Text: "color",
  TextMuted: "color",
  Accent: "color",
  Background: "color",
  SelectedDateBackground: "color",
  SelectedDateText: "color",
  HoverDateBackground: "color",
  HoverDateText: "color",
  BorderColor: "color",
  TextInput: "component" // Componente TextInput conectado
};

// Señales del script
Script.Signals = {
  DidMount: "signal",
  WillUnmount: "signal"
};

// Variables globales
var dateInput, datepicker, datePopup;
let skipBlurProcessing = false;

// Detectar dispositivos móviles/tablets
function mobileAndTabletCheck() {
  // ... (código existente sin cambios)
}

function isMobile() {
  return mobileAndTabletCheck();
}

// Inyectar DatePicker JS
function injectDatePicker(onload) {
  // ... (código existente sin cambios)
}

// Inyectar estilos CSS
function injectDatePickerStyles() {
  // ... (código existente sin cambios)
}

// Formatear fecha a string legible
function formatDate(date) {
  // ... (código existente sin cambios)
}

// Parsear string a objeto Date
function parseDate(_dateString) {
  // ... (código existente sin cambios)
}

// Evento: Focus en el TextInput
const TextInputFocused = () => {
  Component.Object.TextInputIsFocused = true;
  
  if (!isMobile() && Script.Inputs.TextInput?.getDOMElement()) {
    const textInput = Script.Inputs.TextInput.getDOMElement().querySelector("input");
    const rect = textInput.getBoundingClientRect();

    // Eliminar popup existente
    if (datePopup?.parentNode) document.body.removeChild(datePopup);

    // Crear nuevo popup
    datePopup = document.createElement("div");
    datePopup.style.zIndex = 1000;
    datePopup.style.position = "fixed";
    datePopup.style.border = `1px solid ${Script.Inputs.BorderColor}`;
    datePopup.style.borderRadius = "4px";
    datePopup.style.top = `${rect.bottom + (Script.Inputs.PopupMarginTop || 5)}px`;
    datePopup.style.left = `${rect.left + (Script.Inputs.PopupMarginRight || 0)}px`;
    datePopup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    document.body.appendChild(datePopup);

    injectDatePicker(() => {
      datepicker = new Datepicker(datePopup, {
        prevArrow: "<",
        nextArrow: ">",
        language: window.__ndl_datepicker_lang,
        autohide: true
      });

      // Posicionamiento inteligente
      const popupRect = datePopup.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      if (popupRect.bottom > viewportHeight) {
        datePopup.style.top = `${Math.max(10, rect.top - popupRect.height)}px`;
      }
      
      if (popupRect.right > viewportWidth) {
        datePopup.style.left = `${Math.max(10, viewportWidth - popupRect.width - 10)}px`;
      }

      // Establecer fecha inicial
      if (Component.Object.Date) {
        datepicker.setDate(Component.Object.Date);
      }

      // Manejar selección de fecha
      datePopup.addEventListener("changeDate", (e) => {
        if (e.date) {
          skipBlurProcessing = true;
          const selectedDate = e.date;
          
          // Actualizar estado y salidas
          Component.Object.Date = selectedDate;
          Outputs.Value = selectedDate.toISOString();
          try {
            Outputs.DateSelected();
          } catch (error) {
            console.error('Error in DateSelected output:', error);
          }
          
          // Actualizar TextInput con formato correcto
          const formattedDate = formatDate(selectedDate);
          textInput.value = formattedDate;
          Component.Object["Formatted Date"] = formattedDate;
          
          // Cerrar popup
          if (datePopup.parentNode) {
            document.body.removeChild(datePopup);
            datePopup = null;
            datepicker = null;
          }
          
          // Restablecer bandera
          setTimeout(() => skipBlurProcessing = false, 100);
        }
      });
    });
  }
};

// Evento: Blur en el TextInput
const TextInputBlurred = () => {
  Component.Object.TextInputIsFocused = false;
  
  if (skipBlurProcessing) return;

  setTimeout(() => {
    // Cerrar popup si existe
    if (datePopup?.parentNode) {
      document.body.removeChild(datePopup);
      datePopup = null;
      datepicker = null;
    }
    
    // Procesar fecha ingresada manualmente
    if (Script.Inputs.TextInput?.getDOMElement()) {
      const textInput = Script.Inputs.TextInput.getDOMElement().querySelector("input");
      const dateString = textInput.value;
      
      if (dateString) {
        const date = parseDate(dateString);
        if (date) {
          Component.Object.Date = date;
          Outputs.Value = date.toISOString();
          Outputs.DateSelected();
          
          // Asegurar formato consistente
          textInput.value = formatDate(date);
        }
      }
    }
  }, 200);
};

// Evento: Cambio de texto en el input
const DateStringChanged = (e) => {
  if (Component.Object.TextInputIsFocused && datepicker) {
    const date = parseDate(e.target.value);
    if (date) datepicker.setDate(date);
  }
};

// =======================
// MANEJO DE SEÑALES
// =======================

// Señal: DidMount (Inicialización)
Script.Signals.DidMount = () => {
  // Inyectar estilos CSS
  injectDatePickerStyles();

  // Configurar TextInput
  if (Script.Inputs.TextInput?.getDOMElement()) {
    const textInput = Script.Inputs.TextInput.getDOMElement().querySelector("input");
    
    if (textInput) {
      // Configurar eventos
      textInput.addEventListener("focus", TextInputFocused);
      textInput.addEventListener("blur", TextInputBlurred);
      keydownHandler = (e) => {
        if (e.key === "Enter") textInput.blur();
      };
      textInput.addEventListener("keydown", keydownHandler);
      textInput.addEventListener("input", DateStringChanged);
      
      // Inicializar con fecha actual si no hay valor
      if (!textInput.value && !Component.Object.Date) {
        const today = new Date();
        Component.Object.Date = today;
        textInput.value = formatDate(today);
      }
    }
  }

  // Inicializar para dispositivos móviles
  if (isMobile() && Script.Inputs.TextInput?.getDOMElement()) {
    const elem = Script.Inputs.TextInput.getDOMElement();
    
    dateInput = document.createElement("input");
    dateInput.className = "ndl-datepicker-native-input";
    elem.parentNode.appendChild(dateInput);
    dateInput.type = "date";

    dateInput.onchange = () => {
      if (dateInput.value) {
        const date = new Date(dateInput.value);
        Component.Object.Date = date;
        Outputs.Value = date.toISOString();
        try {
          Outputs.DateSelected();
        } catch (error) {
          console.error('Error in DateSelected output:', error);
        }
        
        if (Script.Inputs.TextInput?.getDOMElement()) {
          const textInput = Script.Inputs.TextInput.getDOMElement().querySelector("input");
          if (textInput && typeof formatDate === 'function') {
            textInput.value = formatDate(date);
          }
        }
      }
    };
  }
};

// Store event handler references for proper cleanup
let keydownHandler = null;

// Señal: WillUnmount (Limpieza)
Script.Signals.WillUnmount = () => {
  // Limpiar popup
  if (datePopup?.parentNode) {
    document.body.removeChild(datePopup);
    datePopup = null;
    datepicker = null;
  }
  
  // Limpiar event listeners
  if (Script.Inputs.TextInput?.getDOMElement()) {
    const textInput = Script.Inputs.TextInput.getDOMElement().querySelector("input");
    if (textInput) {
      textInput.removeEventListener("focus", TextInputFocused);
      textInput.removeEventListener("blur", TextInputBlurred);
      if (keydownHandler) {
        textInput.removeEventListener("keydown", keydownHandler);
      }
      textInput.removeEventListener("input", DateStringChanged);
    }
  }
};