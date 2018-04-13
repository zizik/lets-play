import React from "react";
import { Container, Header, Input, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";

const Register = ({ submitForm, handleChange, values }) => (
  <Container text>
    <Form>
      <Header as="h1">Register</Header>
      <Form.Field>
        <Input onChange={handleChange} value={values.name} name="name" placeholder="Username" fluid />
      </Form.Field>
      <Form.Field>
        <Input onChange={handleChange} value={values.email} name="email" placeholder="Email" fluid />
      </Form.Field>
      <Form.Field>
        <Input onChange={handleChange} value={values.password} type="password" name="password" placeholder="Password" fluid />
      </Form.Field>
      <Button primary onClick={submitForm}>
        Submit
      </Button>
    </Form>
  </Container>
);

const registerMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      ok
      data {
        id
        name
        email
      }
      errors {
        reason
        message
      }
    }
  }
`;

export default compose(
  graphql(registerMutation, {
    name: "registerMutation",
  }),
  withFormik({
    mapPropsToValues: props => ({
      name: "",
      email: "",
      password: "",
    }),
    handleSubmit: async (values, { props }) => {
      await props.registerMutation({
        variables: values,
      });
    },
  }),
)(Register);
