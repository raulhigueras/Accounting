// Returns the total income of a certain month
// If month = -1, returns the total income
function getIncome(month) {
  Logger.log("Calculating income...");
  var ventasSheet = SpreadsheetApp.getActive().getSheetByName("Ventas");
  var incomeData = getSheetData("Ventas");
  var income = 0;
  for (var i = 0; i < incomeData.length; i++) {
    if (incomeData[i]["Vendido"]) {
      if (month == -1 || incomeData[i]["Fecha"].getMonth() == month) {
        income += incomeData[i]["Ingreso"];
      }
    }
  }
  Logger.log("Income: " + income);
  return income;
}

// Returns the total outcome of a certain month
// If month = -1m returns the total outcome
function getOutcome(month) {
  Logger.log("Calculating outcome...");
  var gastosSheet = SpreadsheetApp.getActive().getSheetByName("Gastos");
  var outcomeData = getSheetData("Gastos");
  var outcome = 0;
  for (var i = 0; i < outcomeData.length; i++) {
    if (month == -1 || outcomeData[i]["Fecha"].getMonth() == month) {
      outcome += outcomeData[i]["Precio"];
    }
  }
  Logger.log("Outcome: " + outcome);
  return outcome;
}

// Returns the income and outcome of a certain month
// if month = -1, returns the total income and outcome
function getNums(month) {
  var income = getIncome(month);
  var outcome = getOutcome(month);
  return {
    "income" : income,
    "outcome" : - outcome,
    "total" : income - outcome,
  };
}
