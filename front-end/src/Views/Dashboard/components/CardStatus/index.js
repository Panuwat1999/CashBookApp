import React from "react";
import Paper from "@mui/material/Paper";
import "./style.css";

export default function CardStatus(props) {
  const { type, allData, title } = props;

  return (
    <Paper sx={{ padding: "1rem", borderRadius: "10px" }} elevation={3}>
      <div className="box-card-status">
        {type !== "amount" && <div className="card-title">{title}</div>}
        {type === "list" ? (
          <div className="box-list">
            <div className="content-list">{allData?.cash_name}</div>
            <div
              className="amount-list"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  color: allData?.cash_amount > 0 ? "#2ECC71" : "#CB4335",
                }}
              >
                {Math.abs(allData?.cash_amount)}
              </div>
              <span>บาท</span>
            </div>
          </div>
        ) : type === "amount" ? (
          <div className="box-list">
            <div className="box-content-amount">
              <div className="content-list-amount">รายรับ</div>
              <div className="amount-list" style={{ color: "#2ECC71" }}>
                {Math.abs(allData?.income) + " "}
              </div>
            </div>
            <div className="box-content-amount">
              <div className="content-list-amount">รายจ่าย</div>
              <div className="amount-list" style={{ color: "#CB4335" }}>
                {Math.abs(allData?.expenses) + " "}
              </div>
            </div>
          </div>
        ) : type === "all" ? (
          <div className="box-all">
            <div className="amount-list">
              <span style={{ color: allData > 0 ? "#2ECC71" : "#CB4335" }}>
                {Math.abs(allData) + " "}
              </span>
              <span>บาท</span>
            </div>
          </div>
        ) : (
          <div className="amount-list">0</div>
        )}
      </div>
    </Paper>
  );
}
