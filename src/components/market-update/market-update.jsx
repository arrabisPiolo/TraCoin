import React, { useState, useEffect, useRef } from "react";

import "./market-update.scss";
import { Link } from "react-router-dom";

const arrow = (sortOrderName) => {
  return sortOrderName === "asc" ? <span>&uarr;</span> : <span>&darr;</span>;
};
function MarketUpdate() {
  const [currencyData, setCurrencyData] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [priceSortOrder, setPriceSortOrder] = useState();
  const [marketCapSortOrder, setMarketCapSortOrder] = useState();
  const [sortClicked, setSortClicked] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState();
  const dropdownRef = useRef();
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCurrencyData(data);
    };
    fetchData();
  }, [url]);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const paginationButtons = [];
  for (let i = 1; i <= 5; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => {
          // Check whether the current page is the same as the previous page.
          if (i === currentPage) {
            return;
          }
          setCurrentPage(i);
        }}
        className={i === currentPage ? "activePagi" : ""}
      >
        {i}
      </button>
    );
  }

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
    setSortClicked(true);
  };

  const handleDropdownItemClick = (item) => {
    if (selectedDropdownItem === item) {
      return;
    }
    setSelectedDropdownItem(item);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  console.log(currencyData);
  return (
    <>
      <section className="market-section" id="market">
        <div className="market-container">
          <div className="market-content">
            <div className="market-dropdown">
              <h2>Market Update</h2>
              <div className="dropdown" ref={dropdownRef}>
                <span
                  className="btn-dropdown"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  Sort By: {selectedDropdownItem} <span>&#9662;</span>
                </span>
                {dropdownVisible && (
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        handleDropdownItemClick(`Price`);
                        handleSort(
                          "current_price",
                          priceSortOrder,
                          setPriceSortOrder
                        );
                      }}
                    >
                      Price {sortClicked && arrow(priceSortOrder)}
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleDropdownItemClick("Change")}
                    >
                      Change Percentage
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        handleDropdownItemClick("Marketcap");
                        handleSort(
                          "market_cap",
                          marketCapSortOrder,
                          setMarketCapSortOrder
                        );
                      }}
                    >
                      Market Cap {sortClicked && arrow(marketCapSortOrder)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="coin-list">
              <div className="list-top">
                <p>Coin</p>
                <p onClick={handleSort}>Price </p>
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
                disabled={currentPage === 5}
              ></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketUpdate;
