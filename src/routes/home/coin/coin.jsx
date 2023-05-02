import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./coin.scss";

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      setCoin(data);
    };
    fetchData();
  }, []);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(coin);
  return (
    <>
      <section className="coin-page">
        <div className="coin-content">
          <div className="image-side">
            {coin.image ? <img src={coin.image.large} alt={coin.id} /> : ""}

            <h2>{coin.name}</h2>
            <p>Rank: #{coin.coingecko_rank}</p>
          </div>
          <div className="text-side">
            <div className="top-details">
              <div className="change">
                <span>24h Change: </span>
                {coin.market_data ? (
                  <p
                    className={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data.price_change_percentage_24h.toFixed(2) +
                      "%"}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="current">
                <span>Price: </span>
                {coin.market_data ? (
                  <p className="green-text">
                    {"$" + numberWithCommas(coin.market_data.current_price.usd)}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="symbol">
                <span>Symbol:</span>
                <p>{coin.symbol}</p>
              </div>
            </div>
            <div className="description">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    coin.description ? coin.description.en : ""
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Coin;
