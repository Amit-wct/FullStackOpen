import React from "react";

function Total({ parts }) {
  console.log(parts);
  let total = parts.reduce((s, p) => {
    return s + Number(p.exercises);
  }, 0);
  console.log("from parts");

  console.log(total);

  return <div>{total}</div>;
}

export default Total;
