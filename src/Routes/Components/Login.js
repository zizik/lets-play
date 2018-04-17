import React from "react";
import { Container, Header, Input, Button, Form, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";

const Login = ({ submitForm, handleChange, values, errors, isSubmitting }) => (
  <Container text>
    <Form>
      <Header as="h1">Login</Header>
      {errors.length && <Message negative header="You have some propblems" list={errors} />}
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

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      data {
        accessToken
        refreshToken
      }
      errors {
        reason
        message
      }
    }
  }
`;

export default compose(
  graphql(loginMutation, {
    name: "loginMutation",
  }),
  withFormik({
    mapPropsToValues: props => ({
      email: "test@test.com",
      password: "test@test.com",
    }),
    handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
      setErrors({});
      const { data: { login } } = await props.loginMutation({
        variables: values,
      });
      if (login.ok) {
        const { accessToken, refreshToken } = login.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        const errors = login.errors.map(err => err.message);
        setErrors(errors);
      }
      setSubmitting(false);
    },
  }),
)(Login);
