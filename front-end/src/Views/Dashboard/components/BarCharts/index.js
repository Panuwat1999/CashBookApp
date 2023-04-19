import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import "./style.css";
import moment from "moment";

export default function BarCharts(props) {
  const { allData } = props;
  const [sumExpensesMonth, setSumExpensesMonth] = useState([]);
  const [sumIncomeMonth, setSumIncomeMonth] = useState([]);

  useEffect(() => {
    let arr_ex = [];
    let arr_ic = [];
    let all_income = allData?.filter((itm) => itm?.cash_type === "รายรับ");

    let all_expenses = allData?.filter((itm) => itm?.cash_type === "รายจ่าย");

    for (let i = 1; i <= 12; i++) {
      let sumMonth_ex = all_expenses
        .filter(
          (itm_ex) =>
            moment(itm_ex?.cash_date).months() + 1 === i &&
            moment(itm_ex?.cash_date).years() === moment().years()
        )
        .map((map_ex) => map_ex?.cash_amount);

      let sumMonth_ic = all_income
        .filter(
          (itm_ic) =>
            moment(itm_ic?.cash_date).months() + 1 === i &&
            moment(itm_ic?.cash_date).years() === moment().years()
        )
        .map((map_ic) => map_ic?.cash_amount);

      const sumEx = sumMonth_ex.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const sumIc = sumMonth_ic.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      arr_ex.push(Math.abs(sumEx));
      arr_ic.push(Math.abs(sumIc));
    }
    setSumExpensesMonth(arr_ex);
    setSumIncomeMonth(arr_ic);
  }, [allData]);

  const options = {
    series: [
      {
        name: "รายจ่าย",
        data: sumExpensesMonth,
      },
      {
        name: "รายรับ",
        data: sumIncomeMonth,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      // stroke: {
      //   curve: "straight",
      // },
      // title: {
      //   text: "Product Trends by Month",
      //   align: "left",
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      colors: ["#E74C3C", "#58D68D"],
    },
  };

  return (
    <Paper
      sx={{
        padding: "1rem",
        borderRadius: "10px",
        height: 480,
      }}
      elevation={3}
    >
      <div>
        <div className="donut-title">
          ยอดรวมของแต่ละเดือน : {moment().years()}
        </div>
        <div className="box-bar">
          <Chart
            options={options?.options}
            series={options?.series}
            type={options?.options?.chart?.type}
            height={400}
            width={"100%"}
          />
        </div>
      </div>
    </Paper>
  );
}
