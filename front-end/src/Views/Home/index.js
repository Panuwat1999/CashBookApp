import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Input, InputNumber, Radio } from "antd";
import "./style.css";
//import { useSelector } from "react-redux";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  //const userlogin = useSelector((state) => state.userlogin.user);
  // const [allData, setAllData] = useState([]);
  const [listData, setListData] = useState({
    type: "",
    List: "",
    Amount: null,
  });

  const [alertMess, setAlertMess] = useState({
    type: "",
    message: "",
  });

  const onClose = (e) => {
    setAlertMess({
      type: "",
      message: "",
    });
  };

  const InputData = (e) => {
    try {
      let { name, value } = e?.target;
      setListData({ ...listData, [name]: value });
    } catch (error) {
      console.log(error);
    }
  };

  const SubmitData = async () => {
    try {
      if (
        listData?.List !== "" &&
        listData?.Amount > 0 &&
        listData?.type !== ""
      ) {
        //setAllData([...allData, listData]);
        const res = await axios.post(`http://localhost:3003/cashList`, {
          cash_type: listData?.type,
          cash_name: listData?.List,
          cash_amount:
            listData?.type === "รายรับ" ? listData?.Amount : -listData?.Amount,
        });
        if (res?.data?.success) {
          setAlertMess({
            type: "success",
            message: `เพิ่มรายการ ${listData?.List} จำนวน ${listData?.Amount} สำเร็จ`,
          });
        }
        setListData({ type: "", List: "", Amount: null });
      } else {
        setAlertMess({
          type: "error",
          message: `กรุณากรอกข้อมูลให้ครบ`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertMess]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: "6rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid xs></Grid>
        <Grid item xs={10} sm={8} md={4} sx={{ height: "100vh" }}>
          <Paper
            style={{ padding: "1rem", borderRadius: "10px" }}
            elevation={3}
          >
            {alertMess?.message && (
              <Snackbar
                open={alertMess?.message}
                autoHideDuration={3000}
                onClose={onClose}
              >
                <Alert
                  onClose={onClose}
                  severity={alertMess?.type || "success"}
                  sx={{ width: "100%" }}
                >
                  {alertMess?.message}
                </Alert>
              </Snackbar>
            )}
            <h1 className="Home-Title">รายรับ - ราบจ่าย</h1>
            <div className="Input-Box">
              <div className="input-group">
                <Radio.Group
                  className="radio-input"
                  name="type"
                  onChange={(e) => {
                    InputData(e);
                  }}
                >
                  <Radio value="รายรับ">รายรับ</Radio>
                  <Radio value="รายจ่าย">รายจ่าย</Radio>
                </Radio.Group>
              </div>
              <div className="input-group">
                <p className="title-input">รายการ</p>
                <Input
                  value={listData?.List}
                  placeholder="รายการ..."
                  size="large"
                  className="input-value"
                  name="List"
                  onChange={(e) => {
                    InputData(e);
                  }}
                />
              </div>
              <div className="input-group">
                <p className="title-input">จำนวนเงิน</p>
                <InputNumber
                  value={listData?.Amount}
                  placeholder="จำนวนเงิน..."
                  size="large"
                  className="input-value"
                  name="Amount"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setListData({ ...listData, Amount: value });
                  }}
                />
              </div>
              <div>
                <Button
                  size="large"
                  variant="contained"
                  className="button-input"
                  onClick={SubmitData}
                >
                  บันทึกข้อมูล
                </Button>
                <Button
                  className="button-clean"
                  onClick={() => {
                    setListData({ type: "", List: "", Amount: null });
                  }}
                >
                  ล้างข้อมูล
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid xs></Grid>
      </Grid>
    </Box>
  );
}
