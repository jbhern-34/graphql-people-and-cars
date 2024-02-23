import React from 'react';
import Title from "../components/layout/Title";
import AddPerson from "../components/forms/AddPerson";
import People from "../components/list/People";
import AddCar from "../components/forms/AddCar";

const Home = () => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
}

export default Home;
