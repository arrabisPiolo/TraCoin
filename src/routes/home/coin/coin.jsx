import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  console.log(coin);
  return (
    <>
      <section className="coin-page">
        <div className="coin-content">
          <div className="image-side">
            <img src={coin.image.large} alt={coin.id} />
            <h2>{coin.name}</h2>
            <p>Rank: #{coin.coingecko_rank}</p>
          </div>
          <div iv className="text-side">
            <div className="top-details">
              <span>
                24h Change:{" "}
                <p>{coin.market_data.price_change_percentage_24h}</p>
              </span>
              <span>
                Price: <p>{coin.market_data.current_price.usd}</p>
              </span>
              <span>
                Symbol: <p>{coin.symbol}</p>
              </span>
              <div className="description"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Coin;
