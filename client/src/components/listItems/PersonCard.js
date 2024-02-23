import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons";
import Cars from "../list/Cars";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {firstName} {lastName}
          <div>
            <Cars id={id} />
          </div>
          <div>
            <Link to={`/person/${id}`}>Learn More</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

export default PersonCard;
