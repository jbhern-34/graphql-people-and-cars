import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_PEOPLE, GET_PERSON_CARS } from "../../graphql/queries";

const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PERSON_CARS }],
  });

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
    });
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Form
      name="add-car-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="Year:"
        name="year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <InputNumber placeholder="2020" />
      </Form.Item>
      <Form.Item
      label="Make:"
        name="make"
        rules={[{ required: true, message: "Please enter a manufacturer" }]}
      >
        <Input placeholder="Toyota" />
      </Form.Item>
      <Form.Item
      label="Model:"
        name="model"
        rules={[{ required: true, message: "Please enter a model" }]}
      >
        <Input placeholder="Corolla" />
      </Form.Item>
      <Form.Item
      label="Price:"
        name="price"
        rules={[{ required: true, message: "Please enter a price" }]}
      >
        <InputNumber placeholder="20000" />
      </Form.Item>
      <Form.Item
      label="Person:"
        name="personId"
        rules={[{ required: true, message: "Please select a person" }]}
      >
        <Select placeholder="Select a person">
          {data.people.map(({ id, firstName, lastName }) => (
            <Option key={id} value={id}>
              {firstName} {lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>
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
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
