import React from 'react';
import Title from "../components/layout/Title";
import AddPerson from "../components/forms/AddPerson";
import People from "../components/list/People";
import AddCar from "../components/forms/AddCar";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";

const Home = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  return (
    <div className="App">
      <Title />
      <AddPerson />
      {data.people.length > 0 && <AddCar />}
      <People />
    </div>
  );
}

export default Home;
