import React from "react";
import { Input } from "antd";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput(props) {
  const { setSearch } = props;

  return (
    <div>
      <Input
        placeholder="Search..."
        size="large"
        suffix={
          <SearchIcon
            style={{
              color: "rgba(0,0,0,.45)",
            }}
          />
        }
        style={{ borderRadius: "30px" }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}
