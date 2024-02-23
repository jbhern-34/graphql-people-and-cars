import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../../graphql/queries";

const UpdateCar = (props) => {
  const { id, make, model, year, price, personId } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = (values) => {
    updateCar({
      variables: {
        id,
        ...values
      },
    });
    props.onButtonClick();
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Form
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        make,
        model,
        year,
        price,
        personId
      }}
    >
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please enter a make" }]}
      >
        <Input placeholder="i.e. Toyota" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please enter a model" }]}
      >
        <Input placeholder="i.e. Corolla" />
      </Form.Item>
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please enter a year" }]}
      >
        <InputNumber placeholder="i.e. 2020" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please enter a price" }]}
      >
        <InputNumber placeholder="i.e. 20000" />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please enter a personId" }]}
      >
        <Input placeholder="i.e. 1" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );

};

export default UpdateCar;
