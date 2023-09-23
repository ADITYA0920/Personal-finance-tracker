import React from 'react'
import { useState ,useEffect} from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import {Modal} from 'antd' ;
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
// import { moment } from 'moment';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import TransactionTable from '../components/TransactionTable';
import ChartComp from '../components/Charts';
import Notransactions from '../components/Notransactions';
const Dashboard = () => {
  const[income,setIncome] = useState(0) ;
  const[expense,setExpense] = useState(0) ;
  const[total,setTotal] = useState(0) ;

  const[user] = useAuthState(auth);
  const[loading,setLoading] = useState(false) ;
  const[transactions,setTransactions] = useState([]) ;
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    console.log("onfinsh calls");
    console.log(values) ;
    const newTransaction = {
      type: type,
      date: (values.date).format("YYYY-MM-DD"), // bydefault its provide moment no need to add expllicitly
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    calculateBalance();
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    
    console.log("from calcute",transactions,incomeTotal,expensesTotal);
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotal(incomeTotal - expensesTotal);
    
  };


  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
        console.log(transaction);
        let newArr = transactions ;
        newArr.push(transaction);

        setTransactions(newArr) ;
        calculateBalance() ;
        toast.success("Transaction Added!");

    } catch (e) {
      console.error("Error adding document: ", e);
        toast.error("Couldn't add transaction");
    }
  }




  // function addStyling(){

  //   const rows = document.querySelectorAll('.ant-table-row');

  //       rows.forEach(row => {
  //           // Find the cell with income or expense content (adjust this part based on your actual table structure)
  //           const cells = row.querySelectorAll('.ant-table-cell');
  //           cells.forEach(cell => {
  //               if (cell.textContent.includes('income')) {
  //                   cell.classList.add('income');
  //               } else if (cell.textContent.includes('expense')) {
  //                   cell.classList.add('expense');
  //               }
  //           });
  //       });

  // }
  useEffect(()=>{
    //get all docs of transactions
    fetchTransactions();

  },[user]) ;

  useEffect(()=>{
    calculateBalance();
  },[transactions])
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      console.log("inside fetdata1",transactionsArray);
      setTransactions(transactionsArray);
      console.log("inside fetdata2",transactions) ;

      toast.success("Transactions Fetched!");
    }
  
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date) ;
  })

  return (
    <div>
      <Header/>
      {
      loading ? <p>loading</p> :
      <>
      <Cards
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
      income = {income}
      expense= {expense}
      total={total}
      />
      {transactions && transactions.length > 0 ? <ChartComp sortedTransactions = {sortedTransactions}/> : <Notransactions/>}
        <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions = {fetchTransactions}/>
      </>
    }
    </div>
  )
}

export default Dashboard ;