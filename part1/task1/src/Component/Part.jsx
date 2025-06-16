import React from "react";

function Part({ part }) {
  console.log(part);

  let { name, exercises } = part;
  console.log(exercises);

  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
}

export default Part;
