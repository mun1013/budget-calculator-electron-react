import React, { useState } from "react";
import { Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { populateYears, populateMonths } from '../utils/Utils';
import { isEmpty } from "lodash";
import Modals from "../components/Modals";
import {v4 as uuid} from 'uuid';

function BudgetForm(props) {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [budget, setBudget] = useState({
    description: "",
    amount: "",
  });
  const [type, setType] = useState();
  const [isEmptyDialog, setEmptyDialog] = useState(false);

  function handleSelectYear(e) {
    props.onSelectYear(e);
    setYear(e);
  }

  function handleSelectMonth(e) {
    props.onSelectMonth(e);
    setMonth(e);
  }

  function handleTypeChange(e) {
    setType(e);
  }

  function handleInputChange(event) {
    const {name, value} = event.target;
    setBudget((prevBudget) => {
      return {
        ...prevBudget,
        [name]: value
      };
    });
    event.preventDefault();
  }

  function add(event) {
    if (isEmpty(type) || isEmpty(budget.description) || isEmpty(budget.amount)) {
      setEmptyDialog(true);
      return;
    }

    if (type === 'Income') {
      props.onAddIncome(budget);
    }
    else {
      props.onAddExpense(budget);
    }
    setBudget({
      description: "",
      amount: ""
    })
    event.preventDefault();
  };

  function onClickEmptyOk(bool) {
    setEmptyDialog(bool);
  }

  return (
    <div className="form-container">
      <DropdownButton key={uuid()} id="year" title={props.year ? props.year : "Year"} size="md" className="form-year" onSelect={handleSelectYear}>
        {populateYears().map((item, index) => <Dropdown.Item key={uuid()} eventKey={item.text}>{item.text}</Dropdown.Item> )}
      </DropdownButton>
      <DropdownButton key={uuid()} id="month" title={props.month ? props.month : "Month"} size="md" className="form-month" onSelect={handleSelectMonth}>
        {populateMonths().map((item, index) => <Dropdown.Item key={uuid()} eventKey={item.text}>{item.text}</Dropdown.Item> )}
      </DropdownButton>

      <InputGroup className="form-income-expenses">
      <FormControl
        placeholder="Description"
        name="description"
        onChange={handleInputChange}
        value={budget.description}
      />        
      <FormControl
        placeholder="Amount"
        name="amount"
        onChange={handleInputChange}
        value={budget.amount}
      />
      <DropdownButton
        key={uuid()}
        as={InputGroup.Prepend}
        variant="outline-secondary"
        title={type ? type : "Type"}
        id="expenses"
        onSelect={handleTypeChange}
      >
        <Dropdown.Item eventKey="Income">Income</Dropdown.Item>
        <Dropdown.Item eventKey="Expenses">Expenses</Dropdown.Item>
      </DropdownButton>

      </InputGroup>
      <button className="add-btn" onClick={add}><i className="fa fa-plus"></i></button>

      <Modals
        key={uuid()}
        show={isEmptyDialog}
        title="Fill up the form"
        body="Please fill up the description, amount and type of the form"
        primaryBtn="Ok"
        onClickOk={onClickEmptyOk}
      />
    </div>
  );
}

export default BudgetForm;