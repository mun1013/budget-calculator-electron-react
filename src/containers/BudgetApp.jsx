import React, { useState, useEffect} from 'react';
import { sumBy } from 'lodash';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import {v4 as uuid} from 'uuid';
import { exportTextFile } from '../utils/ReportTemplate';
const { ipcRenderer } = require('electron');

function BudgetApp() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    sumOfIncome();
    sumOfExpenses();
    selectYear();
  }, [incomes, expenses]);

  function sumOfIncome() {
    setTotalIncome(sumBy(incomes, o => parseFloat(o.amount)).toFixed(2));
  }

  function sumOfExpenses() {
    setTotalExpenses(sumBy(expenses, o => parseFloat(o.amount)).toFixed(2));
  }

  function addIncome(budget) {
    setIncomes((prevIncome) => {
      return [...prevIncome, {id: uuid(), description: budget.description, amount: budget.amount}]
    });
    sumOfIncome();
  }

  function addExpense(budget) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, {id: uuid(), description: budget.description, amount: budget.amount}]
    });
    sumOfExpenses();
  }

  function selectYear(year) {
    setYear(year);
  }

  function selectMonth(month) {
    setMonth(month);
  }

  function deleteIncome(id) {
    const newIncome = incomes.filter(item => item.id !== id)
    setIncomes(newIncome);
  }

  function deleteExpense(id) {
    const newExpenses = expenses.filter(item => item.id !== id)
    setExpenses(newExpenses);
  }

  /**
   * IPC event listener for exporting text file
   */
  ipcRenderer.on('textFile', (event, data) => { // IPC event listener
    return Promise.resolve()
      .then(() => {
        exportTextFile(data, year, month, incomes, expenses, parseFloat(totalIncome), parseFloat(totalExpenses));
      })
      .then(() => {
        ipcRenderer.send('exported');
      })
  });  

  /**
   * IPC event listener for reading text file
   */
  ipcRenderer.once('read', (event, data) => {
    return Promise.resolve()
      .then(() => {
        let dataArray = data.split(/\r?\n/);
        setYear(parseInt(dataArray[0].split(': ')[1]));
        setMonth(dataArray[1].split(': ')[1]);
        setTotalIncome(dataArray[dataArray.length - 3].split(': ')[1]);
        setTotalExpenses(dataArray[dataArray.length - 2].split(': ')[1]);
    
        let indexIn = dataArray.indexOf("Incomes");
        let indexOut = dataArray.indexOf("Expenses");
        for (let i = indexIn + 2; i < indexOut - 2; i++) {
          setIncomes((prevIncome) => {
            return [...prevIncome, {id: uuid(), description: dataArray[i].split(' - ')[0], amount: dataArray[i].split(' - ')[1]}]
          });
        }
    
        for (let i = indexOut + 2; i < dataArray.length - 5; i++) {
          setExpenses((prevExpenses) => {
            return [...prevExpenses, {id: uuid(), description: dataArray[i].split(' - ')[0], amount: dataArray[i].split(' - ')[1]}]
          });
        }
      })
      .then(() => {
        ipcRenderer.send('read-it');
      })
  }); 

  return (
    <div className="top-container">
      <h1 className="budget-title">TRACK EXPENSES</h1>
      <h2 className="budget-balance">BALANCE</h2>
      <h2 className="budget-balance">{(totalIncome - totalExpenses).toFixed(2)}</h2>
      <h2 className="income-title">TOTAL INCOME</h2>
      <h2 className="expense-title">TOTAL EXPENSES</h2>
      <h2 className="total-income">{totalIncome}</h2>
      <h2 className="total-expense">{totalExpenses}</h2>
      <BudgetForm 
        key={uuid()}
        onAddIncome={addIncome}
        onAddExpense={addExpense}
        onSelectYear={selectYear}
        onSelectMonth={selectMonth}
        year={year}
        month={month}
      />
      <BudgetList 
        key={uuid()}
        incomeList={incomes}
        expenseList={expenses}
        onDeleteIncome={deleteIncome}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
}

export default BudgetApp;