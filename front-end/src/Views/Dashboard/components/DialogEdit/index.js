import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Input, InputNumber } from "antd";
import axios from "axios";

export default function DialogEdit(props) {
  const { open, setOpen, recordEdit, setRecordEdit, fetchData } = props;

  const handleSubmit = async () => {
    try {
      let id = recordEdit?._id;
      if (recordEdit?.cash_name !== "" && recordEdit?.cash_amount > 0) {
        const res = await axios.put(`http://localhost:3003/cashList/${id}`, {
          cash_name: recordEdit?.cash_name,
          cash_amount:
            recordEdit?.cash_type === "รายจ่าย"
              ? -Math.abs(recordEdit?.cash_amount)
              : recordEdit?.cash_amount,
        });
        if (res?.data?.success) {
          handleClose();
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRecordEdit({
      cash_name: "",
      cash_amount: null,
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Form</DialogTitle>
        <DialogContent>
          <div className="input-group">
            <p className="title-input">รายการ</p>
            <Input
              value={recordEdit?.cash_name}
              placeholder="รายการ..."
              size="large"
              className="input-value"
              name="List"
              onChange={(e) => {
                setRecordEdit({ ...recordEdit, cash_name: e.target.value });
              }}
            />
          </div>
          <div className="input-group">
            <p className="title-input">จำนวนเงิน</p>
            <InputNumber
              value={Math.abs(recordEdit?.cash_amount)}
              placeholder="จำนวนเงิน..."
              size="large"
              className="input-value"
              name="Amount"
              style={{ width: "100%" }}
              onChange={(value) => {
                setRecordEdit({ ...recordEdit, cash_amount: value });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Edit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
