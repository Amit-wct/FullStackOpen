import React from "react";
import Part from "./Part";

function Content({ content }) {
  console.log(content);

  return (
    <div>
      <Part part={content[0]} />
      <Part part={content[1]} />
      <Part part={content[2]} />
    </div>
  );
}

export default Content;
