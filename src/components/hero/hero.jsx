import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./hero.scss";

function Hero() {
  const [currencyData, setCurrencyData] = useState([]);
  // const [priceSortOrder, setPriceSortOrder] = useState("asc");
  // const [marketCapSortOrder, setMarketCapSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=4"
      );
      const data = await response.json();
      setCurrencyData(data);
    };
    fetchData();
  }, []);

  const handleSort = (key, sortState, setSortState) => {
    const sortedData = [...currencyData].sort((a, b) => {
      if (sortState === "asc") {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setCurrencyData(sortedData);
    setSortState(sortState === "asc" ? "desc" : "asc");
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <h1>TRACK YOUR</h1>
          <span>CRYPTOCURRENCIES</span>

          {currencyData.length === 0 ? (
            <div className="loader"></div>
          ) : (
            <div className="coin-container">
              {currencyData.map(
                ({
                  id,
                  name,
                  price_change_percentage_24h,
                  current_price,
                  image,
                }) => (
                  <>
                    <Link to={`/coin/${id}`} key={id}>
                      <div className="slider-coin" key={id}>
                        <img src={image} alt="" />
                        <div className="name_coin">
                          <p>{name}</p>
                          <span
                            className={
                              price_change_percentage_24h > 0
                                ? "green-text"
                                : "red-text"
                            }
                          >
                            {price_change_percentage_24h.toFixed(2)}{" "}
                            {price_change_percentage_24h > 0 ? (
                              <li className="fa fa-arrow-up"></li>
                            ) : (
                              <li className="fa fa-arrow-down"></li>
                            )}
                          </span>
                        </div>
                        <p>
                          {"$" + numberWithCommas(current_price.toFixed(2))}
                        </p>
                      </div>
                    </Link>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Hero;

// const handleSort = () => {
//   const sortedData = [...currencyData].sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.current_price - b.current_price;
//     } else {
//       return b.current_price - a.current_price;
//     }
//   });
//   setCurrencyData(sortedData);
//   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// };
