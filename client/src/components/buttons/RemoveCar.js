import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PERSON_CARS, REMOVE_CAR } from "../../graphql/queries";

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update: (cache, { data: { removeCar } }) => {
      const data = cache.readQuery({ query: GET_PERSON_CARS, variables: { personId } });
      const updatedCars = data.personWithCars.cars.filter(car => car.id !== removeCar.id);
  
      cache.writeQuery({
        query: GET_PERSON_CARS,
        variables: { personId },
        data: {
          ...data,
          personWithCars: {
            ...data.personWithCars,
            cars: updatedCars,
          },
        },
      });
    },
  });  

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveCar;
