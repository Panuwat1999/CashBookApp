import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import "./style.css";

export default function DonutCharts(props) {
  const { allData } = props;
  const [filterlistdata, setfilterlistdata] = useState([]);

  useEffect(() => {
    let all_income = allData
      ?.filter((itm) => itm?.cash_type === "รายรับ")
      .map((itm) => itm?.cash_amount);
    let all_expenses = allData
      ?.filter((itm) => itm?.cash_type === "รายจ่าย")
      .map((itm) => itm?.cash_amount);

    //sumincome
    const initialValue = 0;
    const sumIncome = all_income.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    //sumexpenses
    const sumExpenses = all_expenses.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    setfilterlistdata([Math.abs(sumExpenses), sumIncome]);
  }, [allData]);

  const options = {
    options: {
      series: filterlistdata,
      labels: ["รายจ่าย", "รายรับ"],
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                color: "#000",
                fontFamily: "Kanit, sans-serif",
                fontSize: "30px",
                fontWeight: 600,
                label: "ยอดเงินคงเหลือ",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return -a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      legend: { position: "bottom" },
      dataLabels: { enabled: false },
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
        <div className="donut-title">ยอดรวม</div>
        <div className="box-donut">
          <Chart
            options={options?.options}
            series={options?.options?.series}
            type={options?.options?.chart?.type}
            width="500"
          />
        </div>
      </div>
    </Paper>
  );
}
