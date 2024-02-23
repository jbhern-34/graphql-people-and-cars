import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_CAR, GET_PERSON_CARS } from "../../graphql/queries";

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const { Option } = Select;

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values; // Change person to personId

    console.log("Year:", year);
    console.log("Make:", make);
    console.log("Model:", model);
    console.log("Price:", price);
    console.log("Person ID:", personId);

    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId, // Change person to personId
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({
          query: GET_PERSON_CARS,
          variables: { carsOwnedByPersonId: personId }, // Pass personId as variables to the query
        });

        cache.writeQuery({
          query: GET_PERSON_CARS,
          variables: { carsOwnedByPersonId: personId }, // Pass personId as variables to the query
          data: {
            ...data,
            carsOwnedByPerson: {
              ...data.carsOwnedByPerson,
              cars: [...data.carsOwnedByPerson.cars, addCar], // Add the new car to the existing cars array
            },
          },
        });
      },
    });
  };

  return (
    <Form
      name="add-contact-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Year:"
        name="year"
        rules={[{ required: true, message: "Please enter year" }]}
      >
        <InputNumber placeholder="Year i.e 2012" min={1990} />
      </Form.Item>

      <Form.Item
        label="Make:"
        name="make"
        rules={[{ required: true, message: "Please enter a manufacturer" }]}
      >
        <Input placeholder="Manufacturer" />
      </Form.Item>

      <Form.Item
        label="Model:"
        name="model"
        rules={[{ required: true, message: "Please Enter Model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>

      <Form.Item
        label="Price:"
        name="price"
        rules={[{ required: true, message: "Please Enter Price" }]}
      >
        <InputNumber prefix="$" placeholder="20,000" />
      </Form.Item>

      {/* <Form.Item
        label="Person"
        name="personId"
        rules={[{ required: true, message: "Please Select a Person" }]}
      >
        <Select style={{ width: 200 }} placeholder="Select a Person">
          {people.map(({ id, firstName, lastName }) => (
            <Option key={id} value={id}>
              {firstName} {lastName}
            </Option>
          ))}
        </Select>
      </Form.Item> */}

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
