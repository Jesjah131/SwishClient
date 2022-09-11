import * as React from "react";
import "../styles.css";

export const TotalAmount = (props) => {
  return (
    <>
      {props.viewMode ? (
        <div className={"highscore"}>{props?.data}</div>
      ) : (
        <div className={"highscoreBig"}>{props?.data}</div>
      )}
    </>
  );
};
