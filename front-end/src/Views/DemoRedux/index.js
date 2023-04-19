import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DemoRedux() {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="value..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={() =>
            dispatch({
              type: "ADD_ITEM",
              payload: { id: Math.random(), data: value },
            })
          }
        >
          Send
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index}>
          <h2>{item.data}</h2>
          <p>{item.id}</p>
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
