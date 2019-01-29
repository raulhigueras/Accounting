function doGet(request) {
  return HtmlService.createTemplateFromFile('Page')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('Cuentas')
      .addItem('Nueva venta', 'ventaMenu')
      .addItem('Nuevo gasto', 'gastoMenu')
      .addSeparator()
      .addItem('Consultar estado', 'estadoMenu')
      .addToUi();
}

//Opens the sidebar for sales
function ventaMenu(){
  var html = HtmlService.createTemplateFromFile("ui/ventas").evaluate().setTitle("Ventas").setWidth(800)
  SpreadsheetApp.getUi().showSidebar(html)
}

//Opens the sidebar for spenses
function gastoMenu() {
  var html = HtmlService.createTemplateFromFile("ui/gastos").evaluate().setTitle("Gastos").setWidth(700);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Opens the sidebar for checking the numbers
function estadoMenu() {
  var html = HtmlService.createTemplateFromFile("ui/estado").evaluate().setTitle("Estado").setWidth(600);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Opens a window for adding a new product to the list
function productPrompt() {
  var ui = SpreadsheetApp.getUi()
  var result = ui.prompt(
    'Añadir nuevo producto',
    'Nombre del producto:',
    ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  var text = result.getResponseText();

  var price = ui.prompt(
    'Añadir nuevo producto',
    'Precio del producto:',
    ui.ButtonSet.OK_CANCEL);
  var button2 = price.getSelectedButton();
  var text2 = price.getResponseText();

  if (button == ui.Button.OK && button2 == ui.Button.OK) {
    if (text && text2) {
      var entry = {
        Nombre: text,
        Precio: parseInt(text2),
      }
      insertEntry("Productos", entry);
    }
  }
}

// Opens a window for adding a new client to the list
function clientPrompt() {
  var ui = SpreadsheetApp.getUi()
  var result = ui.prompt(
    'Añadir nuevo cliente',
    'Nombre del cliente:',
    ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  var text = result.getResponseText();

  var result2 = ui.prompt(
    'Añadir nuevo cliente',
    'Anotaciones:',
    ui.ButtonSet.OK_CANCEL);
  var button2 = result2.getSelectedButton();
  var text2 = result2.getResponseText();

  if (button == ui.Button.OK && button2 == ui.Button.OK) {
    if (text && text2) {
      var entry = {
        Nombre: text,
        Anotaciones: text2,
        Compras: "",
        Gasto: "",
        Productos: "",
      }
      insertEntry("Clientes", entry);
    }
  }
}
