import React from "react";
import {v4 as uuid} from 'uuid';

function BudgetList(props) {

  function onDeleteIncome(id) {
    props.onDeleteIncome(id);
  }

  function onDeleteExpenses(id) {
    props.onDeleteExpense(id);
  }

  return (
    <div>
      <h2 className="total-income">Income List</h2>
      <h2 className="total-expense">Expenses List</h2>
      <div className="row income-list">
        <div className="col-md-12">
          <ul className="list-group">
            {props.incomeList.map((item, index) => {
              return <li key={uuid()} className="list-group-item">
                <button
                  className="float-left btn btn-danger btn-sm"
                  style={{ marginRight: 10 }}
                  onClick={() => onDeleteIncome(item.id)}
                >
                <i className="fa fa-times"></i>
                </button>
                <h5 className="income-description">{item.description}</h5>
                <h5 className="income-value">{item.amount}</h5>
              </li>
            })}
          </ul>
        </div>
      </div>
    
      <div className="row expenses-list">
        <div className="col-md-12">
          <ul className="list-group">
              {props.expenseList.map((item, index) => {
                return <li key={uuid()} className="list-group-item">
                  <button
                    className="float-left btn btn-danger btn-sm"
                    style={{ marginRight: 10 }}
                    onClick={() => onDeleteExpenses(item.id)}
                  >
                  <i className="fa fa-times"></i>
                  </button>
                  <h5 className="income-description">{item.description}</h5>
                  <h5 className="income-value">{item.amount}</h5>
                </li>
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BudgetList;