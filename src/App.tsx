import * as React from "react";
import { useState, useEffect } from "react";
import { fetchUntil } from "./services/fetchService";
import { TotalAmount } from "./components/TotalAmount";
import "./styles.css";

export const MainComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState(true);

  useEffect(() => {
    //loadingData();
    const interval = setInterval(() => {
      loadingData();
    }, 5000);
    return () => {
      // clear up
      clearInterval(interval);
    };
  }, []);

  const loadingData = async () => {
    const response = await fetchUntil();
    if (response) {
      setData(response);
      setIsLoading(false);
    }
  };

  var opa = 1;
  return (
    <div className={"masselitos"}>
      {!isLoading ? (
        <>
          {viewMode ? (
            <ul className={"unlist"}>
              <TotalAmount
                data={data.totalSum}
                viewMode={viewMode}
              ></TotalAmount>
              <span className={"divider"}></span>
              {data?.payments.map((payment, i) => {
                return (
                  <li
                    className={"masselist"}
                    style={{ opacity: (opa -= 0.08) }}
                    key={i}
                  >
                    <div className={"message"}>
                      {payment.message ? payment.message : "Inget meddelande"}
                    </div>
                    <div className={"amount"}>{payment.amount}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className={"unlistBig"}>
              <TotalAmount
                data={data.totalSum}
                viewMode={viewMode}
              ></TotalAmount>
              <span className={"dividerBig"}></span>
              {data?.payments.map((payment, i) => {
                return (
                  <li
                    className={"masselistBig"}
                    style={{ opacity: (opa -= 0.08) }}
                    key={i}
                  >
                    <div className={"name"}>{payment.name && payment.name}</div>
                    <div className={"messageBig"}>
                      {payment.message
                        ? payment.message
                        : "Köpte precis något i baren"}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div
            className={"button"}
            onClick={() => setViewMode(!viewMode)}
          ></div>
        </>
      ) : null}
    </div>
  );
};
