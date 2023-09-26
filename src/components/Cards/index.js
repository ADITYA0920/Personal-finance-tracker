import React from 'react'
import "./style.css"
import { Card ,Row} from 'antd'
import Button from '../Button'
const Cards = ({showExpenseModal,showIncomeModal,deleteData,income,expense,total}) => {
  {console.log(income,expense,total)};
  return (
    <div>
       <Row className='my-row'
    >
      <Card bordered={true} className="my-card  my-card-total">
        <h2>Current Balance</h2>
        <p>₹ {total}</p>
        <Button blue={true} text={"Reset Balance"} onClick = {deleteData}>
          
        </Button>
      </Card>

      <Card bordered={true} className="my-card  my-card-income">
        <h2>Total Income</h2>
        <p>₹ { income }</p>
        <Button blue={true} text={"Add Income"} onClick={showIncomeModal}></Button>
      </Card>

      <Card bordered={true} className="my-card  my-card-expense">
        <h2>Total Expenses</h2>
        <p>₹ {expense}</p>
        <Button blue={true} text={"Add Expense"} onClick={showExpenseModal}></Button>
      </Card>
    </Row>
    </div>
  )
}

export default Cards ;