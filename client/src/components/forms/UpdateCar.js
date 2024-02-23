import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PEOPLE, UPDATE_CAR } from "../../graphql/queries";

const { Option } = Select;

const UpdateCar = (props) => {
  const { id, make, model, year, price, personId } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);


  const onFinish = (values) => {
    updateCar({
      variables: {
        id,
        ...values,
      },
    });
    props.onButtonClick();
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Form
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      form={form}
      initialValues={{
        make,
        model,
        year,
        price,
        personId,
      }}
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
          <Button type="primary" htmlType="submit">
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
