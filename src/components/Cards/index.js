import React from 'react'
import "./style.css"
import { Card ,Row} from 'antd'
import Button from '../Button'
const Cards = ({showExpenseModal,showIncomeModal,income,expense,total}) => {
  {console.log(income,expense,total)};
  return (
    <div>
       <Row className='my-row'
    >
      <Card bordered={true} className="my-card">
        <h2>Current Balance</h2>
        <p>₹ {total}</p>
        <Button blue={true} text={"Reset Balance"} >
          
        </Button>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Income</h2>
        <p>₹ { income }</p>
        <Button blue={true} text={"Add Income"} onClick={showIncomeModal}></Button>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Expenses</h2>
        <p>₹ {expense}</p>
        <Button blue={true} text={"Add Expense"} onClick={showExpenseModal}></Button>
      </Card>
    </Row>
    </div>
  )
}

export default Cards ;