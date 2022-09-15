import * as React from "react";
import { useState, useEffect } from "react";
import { fetchUntil } from "./services/fetchService";
import { TotalAmount } from "./components/TotalAmount";
import "./styles.css";

export const MainComponent = () => {
  const [data, setData] = useState(null);
  const [payments, setPayments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState(true);

  useEffect(() => {
    //loadingData();
    const interval = setInterval(() => {
      loadingData();
    }, 5000);
    return () => {
      // clear upp
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

  useEffect(() => {
    //slice the payments
    setPayments(data?.payments.slice(0, 20));
  }, [data]);

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
              {payments?.map((payment, i) => {
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
                data={Math.round(data.totalSum * 0.66)}
                viewMode={viewMode}
              ></TotalAmount>
              <span className={"dividerBig"}></span>
            
              <div className={"masseGrid"}>
                {payments?.map((payment, i: number) => {
                  return (
                    <div
                      className={"cellWrapper"}
                      style={{ opacity: i % 2 == 0 ? (opa -= 0.12) : opa }}
                      key={i}
                    >
                      <div className={"name"}>
                        {payment.name && payment.name}
                      </div>
                      <div
                        style={{
                          fontStyle: payment.message ? "italic" : "normal",
                        }}
                        className={"messageBig"}
                      >
                        {payment.message
                          ? '"' + payment.message + '"'
                          : "köpte precis något i baren"}
                      </div>
                    </div>
                  );
                })}
              </div>
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
