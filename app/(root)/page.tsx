import React from "react";

const Home = () => {
  const name = "Henrique Castor";
  return (
    <div className="h-screen">
      <h1 className="text-3xl font-bold text-center">
        Olá, <span className="text-cyan-500">{name}!</span>
      </h1>
    </div>
  );
};

export default Home;
