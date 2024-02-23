import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Form
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName,
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="i.e. John" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="i.e. Smith" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
