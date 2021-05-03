const fs = require('fs');

const exportTextFile = (filePath, year, month, incomes, expenses, totalIncome, totalExpenses) => {
  let printYearMonth = 'Year: ' + year + '\nMonth: ' + month + '\n---------------------------------------------------------------------\n';
  let printBudget = '\nIncomes\n---------------------------------------\n';
  incomes.map(i => {
    return printBudget += i.description + ' - ' + i.amount + '\n';
  })
  printBudget += '\n\nExpenses\n---------------------------------------\n';
  expenses.map(i => {
    return printBudget += i.description + ' - ' + i.amount + '\n';
  })
  let printTotal = '\n\nTotal Income: ' + totalIncome.toFixed(2);
  printTotal += '\nTotal Expenses: ' + totalExpenses.toFixed(2);
  printTotal += '\nBalance: ' + (totalIncome - totalExpenses).toFixed(2);
  let textReport = printYearMonth + printBudget + printTotal;
  
  fs.writeFile(filePath, textReport, function (err) {
    if (err) throw err;
  });
}

module.exports = {exportTextFile};