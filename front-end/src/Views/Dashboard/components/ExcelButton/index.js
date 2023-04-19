import React from "react";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import moment from "moment";

export default function ExcelButton(props) {
  const { allData } = props;
  const headers = [
    { label: "ประเภท", key: "cash_type" },
    { label: "วันที่", key: "cash_date" },
    { label: "รายการ", key: "cash_name" },
    { label: "จำนวน", key: "cash_amount" },
  ];

  return (
    <CSVLink
      data={allData}
      headers={headers}
      filename={`reportdata-file-${moment().format("YYYY-MM-DD")}`}
      style={{ textDecoration: "none" }}
    >
      <Button variant="outlined" sx={{ borderRadius: "30px" }}>
        Export
      </Button>
    </CSVLink>
  );
}
