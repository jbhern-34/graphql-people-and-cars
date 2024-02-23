import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_CARS } from "../graphql/queries";
import PersonCard from "../components/listItems/PersonCard";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PersonCars = () => {
  const { id: personId } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { personId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { personWithCars } = data;
  const { person, cars } = personWithCars;

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
        <div
          style={{ display: "flex", alignItems: "start", flexDirection: "column" }}
        >
          <Button
          icon={<ArrowLeftOutlined />}
            href="/"
            style={{
              margin: "10px",
            }}
          >
            Back
          </Button>
          <PersonCard
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
          />
        </div>
    </div>
  );
};

export default PersonCars;
