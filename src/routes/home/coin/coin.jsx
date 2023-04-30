import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  return <div>{coin.name}</div>;
};

export default Coin;
