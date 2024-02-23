import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CAR, GET_PERSON_CARS, REMOVE_CAR } from "../../graphql/queries";
import filter from "lodash.filter";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const data = cache.readQuery({
        query: GET_PERSON_CARS,
        variables: { personId: id }, // use the correct personId here
      });
      const cars = data ? data.personWithCars : [];

      if (cars) {
        cache.writeQuery({
          query: GET_PERSON_CARS,
          variables: { personId: id }, // use the correct personId here
          data: {
            personWithCars: cars.filter((c) => c.id !== removeCar.id),
          },
        });
      }
    },
    refetchQueries: [{ query: GET_PERSON_CARS, variables: { personId: id } }],
    awaitRefetchQueries: true,
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
