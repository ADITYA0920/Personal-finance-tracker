import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';
import { parse, unparse } from 'papaparse';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import deleteImg from "../../assets/deleteImg.png"
import searchImg from "../../assets/searchImg.svg"
const TransactionTable = ({transactions,addTransaction,fetchTransactions}) => {
    console.log("inside transaction",transactions) ;
    const[search,setSearch] = useState("") ;
    const[sortKey,setSortKey] = useState("") ;
    const[typeFilter,setTypeFilter] = useState("") ;


    function getData(){
      const rows = document.querySelectorAll('.ant-table-tbody tr');

      // Add event listeners for mouseover and mouseout
      rows.forEach((row) => {
        row.style.color = "black" ;

      let btn = document.createElement('button') ;
      btn.className = "deleteBtn"
      btn.innerHTML = `
        <img 
        src=${deleteImg}/>
      `
      row.appendChild(btn) ;

        row.addEventListener('mouseover', () => {
          row.style.color = "red" ;
          row.classList.add('hover-effect'); // Apply hover effect
        });
  
        row.addEventListener('mouseout', () => {
          row.style.color = "black" ;
          row.classList.remove('hover-effect'); // Remove hover effect
        });
        
      });
    }
    useEffect(()=>{
      getData();
    },[transactions])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',   
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',   
        }
      ];
    let filteredData = transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())
     && item.type.toLowerCase().includes(typeFilter)) ;
     
     const sortedTransactions = [...filteredData].sort((a, b) => {
        if (sortKey === "date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
          return a.amount - b.amount;
        } 
        else if(sortKey === "daterev"){
          return new Date(b.date) - new Date(a.date);
        }
        else {
          return 0;
        }
      });

      function importFromCsv(event) {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {
              // Now results.data is an array of objects representing your CSV rows
              console.log(results.data) ;
              for (const transaction of results.data) {
                // Write each transaction to Firebase, you can use the addTransaction function here
                console.log("Transactions", transaction);
                // addTransaction(transaction) ;
                const newTransaction = {
                  ...transaction,
                  amount: parseInt(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }
            },
          });
          // toast.success("All Transactions Added");
           fetchTransactions();
          event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
      }
      
      function exportCSV(){
        // var csv = unparse({
        //   fields:["name","type","tag","date","amount"] ,
        //   transactions,
        // });
        const csv = unparse(transactions, {
          fields: ["name", "type", "date", "amount", "tag"],
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      }
     return <div
     style={{
       width: "95vw",
       padding: "0rem 2rem",
     }}
   >
     <div
       style={{
         display: "flex",
         justifyContent: "space-between",
         gap: "1rem",
         alignItems: "center",
         marginBottom: "1rem",
       }}
     >
       <div className="input-flex">
          <img src={searchImg} width="16" /> 
          <input
            value={search}
            placeholder="Search by Name"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
      
      <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
        </div>
        <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date incr</Radio.Button>
            <Radio.Button value="daterev">Sort by Date decr</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportCSV}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              
              id="file-csv"
              type="file"
              accept=".csv"
              onChange={importFromCsv}
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
      <Table dataSource={sortedTransactions} columns={columns} />
       </div>
      </div>;

}

export default TransactionTable ;