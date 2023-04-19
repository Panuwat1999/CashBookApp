import React from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";

export default function About() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const state = store.getState();
  console.log(state);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}
