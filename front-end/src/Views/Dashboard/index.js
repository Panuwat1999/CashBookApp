import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CardStatus from "./components/CardStatus";
import DonutCharts from "./components/DonutCharts";
import BarCharts from "./components/BarCharts";
import TableData from "./components/TableData";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Dashboard() {
  //redux
  const userlogin = useSelector((state) => state.userlogin.user);

  //useState
  const [allData, setAlldata] = useState([]);
  const [sumAmountData, setSumAmountData] = useState(0);
  const [filterlistdata, setfilterlistdata] = useState({
    income: [],
    expenses: [],
  });
  const [lastIncome, setLastIncome] = useState();
  const [lastExpenses, setLastExpenses] = useState();
  //fetchdata
  const fetchData = async () => {
    try {
      let config = {
        headers: { Authorization: `Bearer ${userlogin?.token}` },
      };
      const res = await axios.get(`http://localhost:3003/cashList`, config);
      if (res?.data?.success) {
        setAlldata(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //filter รายการล่าสุด
  useEffect(() => {
    let all_income = allData?.filter((itm) => itm?.cash_type === "รายรับ");
    let all_expenses = allData?.filter((itm) => itm?.cash_type === "รายจ่าย");
    setLastIncome(all_income[all_income?.length - 1]);
    setLastExpenses(all_expenses[all_expenses?.length - 1]);
  }, [allData]);

  //filter ผมรวมของแต่ละประเภท
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
    setfilterlistdata({
      income: sumIncome,
      expenses: sumExpenses,
    });
  }, [allData]);

  //หาผมรวมทั้งหมด
  useEffect(() => {
    let allAmount = allData?.map((itm) => itm?.cash_amount);
    const initialValue = 0;
    const sumWithInitial = allAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    setSumAmountData(sumWithInitial);
  }, [allData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={3} sm={6} xs={12}>
        <CardStatus type="list" allData={lastIncome} title="รายรับล่าสุด" />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CardStatus type="list" allData={lastExpenses} title="รายจ่ายล่าสุด" />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CardStatus type="amount" allData={filterlistdata} title="ยอดรวม" />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CardStatus type="all" allData={sumAmountData} title="ยอดเงินคงเหลือ" />
      </Grid>
      <Grid item md={7} sm={12} xs={12}>
        <BarCharts allData={allData} />
      </Grid>
      <Grid item md={5} sm={12} xs={12}>
        <DonutCharts allData={allData} />
      </Grid>
      <Grid item xs={12}>
        <TableData allData={allData} fetchData={fetchData} />
      </Grid>
    </Grid>
  );
}
