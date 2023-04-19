import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Table } from "antd";
import "./style.css";
import SearchInput from "../SearchInput";
import ExcelButton from "../ExcelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogEdit from "../DialogEdit";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default function TableData(props) {
  const { allData, fetchData } = props;
  const [open, setOpen] = useState(false);
  const [recordEdit, setRecordEdit] = useState({
    cash_name: "",
    cash_amount: null,
  });
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const handleSearch = () => {
    const filterdata = allData?.filter(
      (itm) =>
        itm?.cash_name.toLowerCase().includes(search) ||
        itm?.cash_amount.toString().includes(search)
    );

    setDataSearch(filterdata);
  };

  const checkDelete = async (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูลนี้ไหม?",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3003/cashList/${id}`);
      if (res?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const columns = [
    {
      title: "ประเภท",
      dataIndex: "cash_type",
      key: "cash_type",
      render: (_, record) => (
        <div
          style={{
            color: record?.cash_type === "รายรับ" ? "#2ECC71" : "#CB4335",
          }}
        >
          {record?.cash_type}
        </div>
      ),
      filters: [
        {
          text: "รายรับ",
          value: "รายรับ",
        },
        {
          text: "รายจ่าย",
          value: "รายจ่าย",
        },
      ],
      onFilter: (value, record) => record.cash_type.indexOf(value) === 0,
    },
    {
      title: "วันที่",
      dataIndex: "cash_date",
      key: "cash_date",
      render: (_, record) => (
        <div>{moment(record?.cash_date).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "รายการ",
      dataIndex: "cash_name",
      key: "cash_name",
    },
    {
      title: "จำนวน",
      dataIndex: "cash_amount",
      key: "cash_amount",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: record?.cash_type === "รายรับ" ? "#2ECC71" : "#CB4335",
            }}
          >
            {Math.abs(record?.cash_amount)}
          </div>

          <h4>บาท</h4>
        </div>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div>
          {" "}
          <IconButton
            aria-label="Edit"
            component="label"
            sx={{ color: "#000" }}
            onClick={() => {
              setRecordEdit(record);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>{" "}
          <IconButton
            aria-label="Delete"
            component="label"
            sx={{ color: "#000" }}
            onClick={() => checkDelete(record?._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        padding: "1rem",
        borderRadius: "10px",
      }}
      elevation={3}
    >
      <div>
        <DialogEdit
          open={open}
          setOpen={setOpen}
          recordEdit={recordEdit}
          setRecordEdit={setRecordEdit}
          fetchData={fetchData}
        />
        <div className="table-box-header">
          <div className="table-title">รายละเอียด</div>
          <div className="box-action">
            <ExcelButton allData={allData} />
            <SearchInput setSearch={setSearch} />
          </div>
        </div>
        <div>
          <Table
            className="table-data"
            dataSource={search?.length > 0 ? dataSearch : allData}
            columns={columns}
            bordered
            rowKey={(record) => record?._id}
          />
        </div>
      </div>
    </Paper>
  );
}
