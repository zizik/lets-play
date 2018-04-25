import React from "react";
// import { Container, Header, Input, Button, Form, Message } from "semantic-ui-react";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";
import styled from "styled-components";

const StyledButton = styled(Button)`
  && {
    margin-top: 15px;
  }
`;

const Login = ({ handleSubmit, handleChange, values, errors }) => (
  <form>
    <Typography variant="title" gutterBottom align="center">
      Login
    </Typography>
    <FormControl error={errors.reason === "email"} margin="normal" fullWidth>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" value={values.email} onChange={handleChange} />
    </FormControl>
    <FormControl error={errors.reason === "password"} margin="normal" fullWidth>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input id="password" type="password" value={values.password} onChange={handleChange} />
    </FormControl>
    <StyledButton onClick={handleSubmit} color="primary" variant="raised">
      Submit
    </StyledButton>
  </form>
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
        setErrors(login.errors);
      }
      setSubmitting(false);
    },
  }),
)(Login);
