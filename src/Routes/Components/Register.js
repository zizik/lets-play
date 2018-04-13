import React from "react";
import { Container, Header, Input, Button, Form, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";

const Register = ({ submitForm, handleChange, values, errors, isSubmitting }) => (
  <Container text>
    <Form>
      <Header as="h1">Register</Header>
      {errors.length && <Message negative header="You have some propblems" list={errors} />}
      <Form.Field>
        <Input onChange={handleChange} value={values.name} name="name" placeholder="Username" fluid />
      </Form.Field>
      <Form.Field>
        <Input onChange={handleChange} value={values.email} name="email" placeholder="Email" fluid />
      </Form.Field>
      <Form.Field>
        <Input onChange={handleChange} value={values.password} type="password" name="password" placeholder="Password" fluid />
      </Form.Field>
      <Button disabled={isSubmitting} primary onClick={submitForm}>
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
      name: "ur",
      email: "us",
      password: "us",
    }),
    handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
      setErrors({});
      const { data: { createUser } } = await props.registerMutation({
        variables: values,
      });
      if (createUser.errors) {
        const errors = createUser.errors.map(err => err.message);
        setErrors(errors);
      }
      setSubmitting(false);
    },
  }),
)(Register);
