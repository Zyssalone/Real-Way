import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField, Button, Alert } from '@mui/material';
import * as Yup from 'yup';

interface LoginForm {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const { login, loading } = useAuth();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    try {
      setFormError('');
      await login(values);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            error={touched.username && !!errors.username}
            helperText={touched.username && errors.username}
          />
          <Field
            as={TextField}
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
          {formError && (
            <Alert severity="error" sx={{ my: 2 }}>
              {formError}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting || loading}
            sx={{ mt: 3 }}
          >
            {isSubmitting || loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}