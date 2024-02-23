import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons";
import { GET_PERSON_CARS } from "../../graphql/queries";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

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
