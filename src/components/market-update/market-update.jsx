import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./market-update.scss";
import { Link } from "react-router-dom";
function MarketUpdate() {
  const [currencyData, setCurrencyData] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=${currentPage}&sparkline=false`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCurrencyData(data);
    };
    fetchData();
  }, [url]);

  // useEffect(() => {
  //   fetch(
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=4"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setCurrencyData(data));
  // }, []);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const paginationButtons = [];
  const start = currentPage > 2 ? currentPage - 2 : 1;
  const end = start + 4;
  for (let i = start; i <= end; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={i === currentPage ? "activePagi" : ""}
      >
        {i}
      </button>
    );
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(currencyData);
  return (
    <>
      <section className="market-section" id="market">
        <div className="market-container">
          <div className="market-content">
            <h2>Market Update</h2>
            <div className="coin-list">
              <div className="list-top">
                <p>Coin</p>
                <p>Price</p>
                <p>24 Change</p>
                <p>Market Cap</p>
              </div>
              {currencyData.length === 0 ? (
                <div className="loader"></div>
              ) : (
                <div className="list-row">
                  {currencyData.map(
                    ({
                      id,
                      name,
                      image,
                      current_price,
                      market_cap,
                      price_change_percentage_24h,
                    }) => (
                      <Link to={`/coin/${id}`}>
                        <div className="coin-row" key={id}>
                          <p>
                            <img src={image} alt={name} /> {name}
                          </p>

                          <p>{"$" + formatNumber(current_price.toFixed(2))}</p>
                          <p
                            className={
                              price_change_percentage_24h > 0
                                ? "green-text"
                                : "red-text"
                            }
                          >
                            {price_change_percentage_24h.toFixed(2) + "%"}
                          </p>
                          <p>{"$" + formatNumber(market_cap)}</p>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="pagination">
              <i
                class="fa-sharp fa-solid fa-arrow-left fa-2xl"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              ></i>
              {paginationButtons}
              <i
                class="fa-sharp fa-solid fa-arrow-right fa-2xl"
                onClick={handleNextPage}
              ></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketUpdate;
