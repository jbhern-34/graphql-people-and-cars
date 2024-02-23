import { GET_PERSON_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { List } from "antd";
import CarCard from "../listItems/CarCard";

const Cars = ({ id }) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { personId: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("data", data);
  const cars = data && data.personWithCars && data.personWithCars.cars;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {cars && cars.map(
        (car => (
          <List.Item key={car.id}>
            <CarCard
              car={car}
            />
          </List.Item>
        ))
      )}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

export default Cars;
