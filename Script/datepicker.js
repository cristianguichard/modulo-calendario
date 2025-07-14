// =======================
// Date Picker Script Fluxscape – Versión Completa con cierre automático del popup
// =======================

// Salidas
Script.Outputs = {
  Value: "string",
  DateSelected: "signal",
};

// Detectar móvil/tablet
function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function isMobile() {
  return mobileAndTabletCheck();
}

const scriptUrl =
  "https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/datepicker-full.min.js";
const cssUrl =
  "https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/css/datepicker.min.css";

function injectDatePicker(onload) {
  if (!document.querySelector("#--ndl-datepicker-datepicker-js--")) {
    window.__ndl_datepicker_onload = [onload];

    var script = document.createElement("script");
    script.id = "--ndl-datepicker-datepicker-js--";
    script.setAttribute("src", scriptUrl);
    script.onload = () => {
      const lang = (
        navigator.language ||
        navigator.userLanguage ||
        "en-US"
      ).split("-")[0];
      if (lang === "es") {
        const locale = document.createElement("script");
        locale.setAttribute(
          "src",
          "https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/locales/es.js"
        );
        locale.onload = () => {
          window.__ndl_datepicker_lang = "es";
          window.__ndl_datepicker_onload.forEach((cb) => cb());
          window.__ndl_datepicker_onload = [];
        };
        document.head.appendChild(locale);
      } else {
        window.__ndl_datepicker_lang = "en";
        window.__ndl_datepicker_onload.forEach((cb) => cb());
        window.__ndl_datepicker_onload = [];
      }
    };
    document.head.appendChild(script);
  } else {
    if (window.__ndl_datepicker_onload.length > 0)
      window.__ndl_datepicker_onload.push(onload);
    else onload();
  }
}

function injectDatePickerStyles() {
  const datePickerStyles = `
  .ndl-datepicker-native-input {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    min-width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
  }
  .ndl-datepicker-native-input::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .datepicker {
    display:none;
    font-family: Roboto, sans-serif;
    border: 1px solid ${Script.Inputs.Accent};
    border-radius: 4px;
  }

  .datepicker-picker {
    background-color: ${Script.Inputs.Background};
    padding: 24px;
  }

  .datepicker-header {
    padding-bottom: 14px;
  }

  .datepicker-header .datepicker-controls {
    display: flex;
    justify-content: space-between;
  }

  .datepicker-header .datepicker-controls .button {
    background-color: transparent;
    color: ${Script.Inputs.Text};
  }

  .datepicker-header .datepicker-controls button.button:focus,
  .datepicker-header .datepicker-controls button.button:hover {
    background-color: ${Script.Inputs.HoverDateBackground};
    color: ${Script.Inputs.HoverDateText};
  }

  .datepicker-controls .button.view-switch {
    border: 1px solid ${Script.Inputs.Text};
    flex: 0 0 180px;
  }

  .days-of-week .dow {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    color: ${Script.Inputs.Accent}
  }

  .datepicker-grid {
    width: 315px;
  }

  .datepicker-grid .datepicker-cell.day {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .datepicker-grid .datepicker-cell {
    color: ${Script.Inputs.Text}
    font-size: 16px;
  }

  .datepicker-grid .datepicker-cell.next,
  .datepicker-grid .datepicker-cell.prev {
    color: ${Script.Inputs.TextMuted};
  }

  .datepicker-grid .datepicker-cell.focused {
  }

  .datepicker-grid .datepicker-cell.selected {
    background-color:  ${Script.Inputs.SelectedDateBackgroud};
    color: ${Script.Inputs.SelectedDateText};
  }

  .datepicker-grid .datepicker-cell:hover,
  .datepicker-grid .datepicker-cell:focus {
    color: ${Script.Inputs.HoverDateText};
    background-color: ${Script.Inputs.HoverDateBackground};
  }
`;

  if (!isMobile()) {
    if (document.querySelectorAll("#--ndl-datepicker-sheet--").length === 0) {
      let addSheet = document.createElement("link");
      addSheet.id = "--ndl-datepicker-sheet--";
      addSheet.setAttribute("rel", "stylesheet");
      addSheet.setAttribute("href", cssUrl);
      document.head.appendChild(addSheet);
    }
  }

  if (document.querySelectorAll("#--ndl-datepicker-styles--").length === 0) {
    const styles = document.createElement("style");
    styles.id = "--ndl-datepicker-styles--";
    styles.innerHTML = datePickerStyles;
    document.head.append(styles);
  }
}

// Formatea un objeto Date a string
function formatDate(date) {
  if (!(date instanceof Date)) return;

  return date.toLocaleDateString(navigator.language || "en", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Parsea un string en formato personalizado a objeto Date
function parseDate(_dateString) {
  if (_dateString === undefined || _dateString.length < 3) return null;

  let dateString = _dateString.trim().toLowerCase();

  const months = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  let month = months[dateString.substring(0, 3)];
  if (month === undefined) return new Date();

  dateString = dateString.substring(3).trim();

  let sepIndex = dateString.indexOf(",");
  let dayString = dateString.substring(
    0,
    sepIndex == -1 ? dateString.length : sepIndex
  );

  let day = parseInt(dayString) || 1;

  let year = new Date().getFullYear();
  if (sepIndex !== -1) {
    dateString = dateString.substring(sepIndex + 1).trim();

    if (dateString.length === 4) year = parseInt(dateString);
  }

  return new Date(year, month, day);
}

// Compara dos fechas ignorando hora
function compareDates(a, b) {
  if (
    a.getFullYear() === b.getFullYear() &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth()
  )
    return true;

  return false;
}

// Helper robusto para obtener el input de texto (soporta textinput y reference)
function getInputElement() {
  if (Script.Inputs.TextInput && Script.Inputs.TextInput.getDOMElement) {
    const el = Script.Inputs.TextInput.getDOMElement();
    if (!el) return null;
    // Si es un input directo
    if (el.tagName && el.tagName.toLowerCase() === "input") return el;
    // Si es un contenedor, busca el input dentro
    const input = el.querySelector("input");
    if (input) return input;
    // Si es reference, puede ser el propio input
    if (el instanceof HTMLInputElement) return el;
  }
  return null;
}

function formatDateForNativeInput(date) {
  if (!(date instanceof Date)) return "";
  // yyyy-mm-dd
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
}

var dateInput, datepicker, datePopup;

const TextInputFocused = () => {
  Component.Object.TextInputIsFocused = true;

  if (!isMobile()) {
    const textInput = getInputElement();
    if (!textInput) return;
    const rect = textInput.getBoundingClientRect();

    datePopup = document.createElement("div");
    datePopup.style.zIndex = 100;
    datePopup.style.position = "absolute";
    datePopup.style.border = "1px solid " + Script.Inputs.BorderColor;
    datePopup.style.borderRadius = "4px";
    datePopup.style.top = rect.bottom + Script.Inputs.PopupMarginTop + "px";
    datePopup.style.left = rect.left + Script.Inputs.PopupMarginRight + "px";
    document.body.appendChild(datePopup);

    injectDatePicker(() => {
      datepicker = new Datepicker(datePopup, {
        prevArrow: "<",
        nextArrow: ">",
        language: window.__ndl_datepicker_lang,
      });

      const rect = datePopup.getBoundingClientRect();
      if (rect.top + rect.height > window.innerHeight) {
        datePopup.style.top =
          Math.max(0, window.innerHeight - rect.height) + "px";
      }
      if (rect.left + rect.width > window.innerWidth) {
        datePopup.style.left =
          Math.max(0, window.innerWidth - rect.width) + "px";
      }

      if (Component.Object.Date !== undefined) {
        datepicker.setDate(Component.Object.Date);
      }

      // Aquí cerramos el popup y emitimos la señal al seleccionar
      const closeAndEmit = () => {
        const date = datepicker.getDate();
        if (!date) return;
        Component.Object.Date = date;
        Script.Outputs.Value = date.toISOString();
        Script.Outputs.DateSelected();
        // Actualiza el input de texto inmediatamente
        const textInput = getInputElement();
        if (textInput) textInput.value = formatDate(date);
        if (dateInput) dateInput.value = formatDateForNativeInput(date);
        if (datePopup && datePopup.parentNode)
          datePopup.parentNode.removeChild(datePopup);
        datePopup = undefined;
        datepicker = undefined;
      };

      // Solo cerrar el popup en changeDate (selección de fecha)
      datePopup.addEventListener("changeDate", closeAndEmit);
    });
  }
};

const TextInputBlurred = () => {
  Component.Object.TextInputIsFocused = false;
  const textInput = getInputElement();
  if (!textInput) return;
  const dateString = textInput.value;
  const date = parseDate(dateString);
  Component.Object.Date = date;
  Script.Outputs.Value = date ? date.toISOString() : "";
  Script.Outputs.DateSelected();
  // Actualiza el input de texto tras blur
  if (textInput) textInput.value = formatDate(date);
  if (dateInput) dateInput.value = formatDateForNativeInput(date);
  if (datePopup && datePopup.parentNode) {
    datePopup.parentNode.removeChild(datePopup);
    datePopup = undefined;
    datepicker = undefined;
  }
};

const DateStringChanged = (e) => {
  const dateString = e.target.value;
  if (Component.Object.TextInputIsFocused) {
    const date = parseDate(dateString);
    if (datepicker !== undefined) {
      datepicker.setDate(date);
    }
    if (dateInput !== undefined && date instanceof Date) {
      dateInput.value = formatDateForNativeInput(date);
    }
  }
};

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
};

Script.Signals.DidMount = () => {
  Script.Outputs.IsMobile = isMobile();
  injectDatePickerStyles();
  const textInput = getInputElement();
  if (textInput) {
    textInput.addEventListener("focus", TextInputFocused);
    textInput.addEventListener("blur", TextInputBlurred);
    textInput.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) textInput.blur();
    });
    textInput.addEventListener("keyup", DateStringChanged);
  }
  if (Component.Object.Date !== undefined) {
    let formattedDate = formatDate(Component.Object.Date);
    Component.Object["Formatted Date"] = formattedDate;
    if (textInput) textInput.value = formattedDate;
    if (dateInput)
      dateInput.value = formatDateForNativeInput(Component.Object.Date);
  }
  Component.Object.on("change", (ev) => {
    if (ev.name === "Date") {
      const date = Component.Object.Date;
      if (datepicker !== undefined) {
        datepicker.setDate(date);
      }
      if (dateInput !== undefined) {
        dateInput.value = formatDateForNativeInput(date);
      }
      const textInput = getInputElement();
      if (textInput) textInput.value = formatDate(date);
      Component.Object["Formatted Date"] = formatDate(date);
    }
  });
  if (isMobile()) {
    const elem = getInputElement();
    if (!elem) return;
    dateInput = document.createElement("input");
    dateInput.className = "ndl-datepicker-native-input";
    elem.parentNode.appendChild(dateInput);
    dateInput.type = "date";
    if (Component.Object.Date instanceof Date) {
      dateInput.value = formatDateForNativeInput(Component.Object.Date);
    }
    dateInput.onchange = () => {
      var date = new Date(dateInput.value);
      Component.Object.Date = date;
      Script.Outputs.Value = date.toISOString();
      Script.Outputs.DateSelected();
      // Actualiza el input de texto también
      const textInput = getInputElement();
      if (textInput) textInput.value = formatDate(date);
    };
  }
};
