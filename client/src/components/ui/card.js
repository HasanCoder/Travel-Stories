import React from "react";
import "./card.css";

export default function Card(props) {
  return <div className="card w-30">{props.children}</div>;
}
