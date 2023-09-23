import React from 'react'
import { Line, Pie } from '@ant-design/charts';
import { Transaction } from 'firebase/firestore';
const ChartComp = ({sortedTransactions}) => {

    // const data = [
    //     { year: '1991', value: 3 },
    //     { year: '1992', value: 4 },
    //     { year: '1993', value: 3.5 },
    //     { year: '1994', value: 5 },
    //     { year: '1995', value: 4.9 },
    //     { year: '1996', value: 6 },
    //     { year: '1997', value: 7 },
    //     { year: '1998', value: 9 },
    //     { year: '1999', value: 13 },
    //   ];
    const data = sortedTransactions.map((item)=>{
        return { date:item.date , amount : item.amount} ;
    })

     const spendingData = sortedTransactions.filter((Transaction)=>{
      if(Transaction.type == "expense"){
        return { tag : Transaction.tag, amount : Transaction.amount} ;
      }
     })
    //  let finalData = spendingData.reduce((acc,obj)=>{
    //   let key = obj.tag ;
    //   if(!acc[key]){
    //     acc[key] = {tag : obj.tag,amount : obj.amount} ;
    //   }
    //   else{
    //     acc[key].amount += obj.amount ; 
    //   }
    //  })
    let spendings = [
      {tag:"food",amount : 0},
      {tag:"education",amount : 0},
      {tag:"office",amount : 0},
    ]
    spendingData.forEach(element => {
      if(element.tag == "food"){
        spendings[0].amount += element.amount ;
      }
      else if(element.tag == "education"){
        spendings[1].amount += element.amount ;
      }
      else{
        spendings[2].amount += element.amount ;
      }
    });
      const config = {
        data:data,
        width: 400,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };

      const spendingconfig = {
        data:spendings,
        width: 500,
        height: 400,
        angleField: "amount",
        colorField: "tag",
      };

      let chart ;
      let pieChart ;
  return (
    <div className="charts-wrapper">
        
        <div>
          <h2>YOUR ANALYTICS</h2>
            <Line {...config} 
            onReady={(chartInstance) => (chart = chartInstance)}
            />
         </div>
         
        <div>
         <h2>YOUR SPENDINGS</h2>
            <Pie {...spendingconfig} 
            onReady={(chartInstance) => (pieChart = chartInstance)}
            />
         </div>

    </div>
  )
}

export default ChartComp ;