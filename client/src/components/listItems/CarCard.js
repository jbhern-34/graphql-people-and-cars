import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";

const CarCard = ({ car }) => {
  const styles = getStyles();
  const { id, make, model, personId, price, year } = car;
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          year={year}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          type="inner"
          title={
            <span style={{ fontWeight: "normal" }}>
              {year} {make} {model} =&gt; ${price}
            </span>
          }
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        ></Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    marginTop: "1rem",
    width: "450px",
  },
});

export default CarCard;
