/* DEFINITIONS:
    - Entry: javascript object with key -> value
    - Row: array with the values of each column
    - Sheet: Spreadsheet sheet
    - Headers: first row of a sheet
*/

// Function that returns an array of objects with every entry of sheetName
function getSheetData(sheetName) {
  Logger.log("Getting data from " + sheetName);
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var list = []
  for (var i = 1; i < data.length; i++) {
    var entry = {};
    for (var j = 0; j < headers.length; j++) entry[headers[j]] = data[i][j]
    list.push(entry);
  }
  return list;
}

// Inserts a new entry in a sheet
function insertEntry(sheetName, entry) {
  Logger.log("Inserting entry " + JSON.stringify(entry) + " in " + sheetName + "...");
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var last_id = sheet.getLastRow() > 1 ? data[sheet.getLastRow()-1][0] : 0;
  var row = new Array(headers.length);
  for (var i = 0; i < headers.length; i++) {
    if (headers[i] == "Id") row[i] = last_id + 1;
    else row[i] = entry[headers[i]];
  }
  sheet.appendRow(row);
}

//Generates an entry from a row with its given headers
function generateEntryFromRow(headers, row) {
  Logger.log("Generating entry from " + row + " with headers " + headers);
  var entry = {};
  for (var i = 0; i < headers.length; i++) entry[headers[i]] = row[i];
  Logger.log("Entry generated: " + JSON.stringify(entry));
  return entry;
}

// Returns an array with the entry of a given name
// Returns -1 if it's not found
function findRowByName(data, name) {
  Logger.log("Looking for row with name: " + name);
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] == name) {
      Logger.log("Found!");
      return data[i];
    }
  }
  Logger.log("Entry not found");
  return -1;
}


function getEntry(sheetName, key, value) {
  Logger.log("Getting entry from " + sheetName + " with " + key + ": " + value + "...");
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var key_col = headers.indexOf(key);
  if (key_col == -1) {
    Logger.log("Key not found");
    return -1;
  }
  for (var i = 1; i < data.length; i++) {
    if (data[i][key_col] == value) {
      Logger.log("Found!");
      return generateEntryFromRow(headers, data[i]);
    }
  }
  Logger.log("Not found");
  return -1
}

// Returns an object with the list of values for the autocomplete function
function getAutocompleteObject() {
  Logger.log("Generating autocomplete object...")
  var productsData = getSheetData("Productos");
  var clientsData = getSheetData("Clientes");
  var autocomplete_object = {
    "Products" : {},
    "Clients" : {},
  };
  for (var i = 0; i < productsData.length; i++) {
    var entry = productsData[i];
    autocomplete_object["Products"][entry.Nombre] = null;
  }
  for (var i = 0; i < clientsData.length; i++) {
    var entry = clientsData[i];
    autocomplete_object["Clients"][entry.Nombre] = null;
  }
  Logger.log("Autocomplete_object: " + JSON.stringify(autocomplete_object));
  return autocomplete_object;
}
