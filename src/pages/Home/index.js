import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getQuote } from "../../store/home/actions";
import { selectQuote } from "../../store/home/selector";

export default function Home() {
  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);

  useEffect(() => {
    dispatch(getQuote());
  }, []);

  console.log("Quote?", quote);
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        color: "white",
      }}
    >
      {" "}
      <div></div>
      <div></div>
      <h2>
        {quote.map((quote) => {
          return quote.quote;
        })}
      </h2>{" "}
      <div></div>
      <h6>
        {" "}
        {quote.map((quote) => {
          return quote.author;
        })}
      </h6>{" "}
      <div></div>
    </div>
  );
}
