import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useRouter } from 'next/router';

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  // Form initial values
  const initialValues: LoginValues = { email: '', password: '' };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Geçerli bir e-posta girin').required('E-posta gereklidir'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre gereklidir'),
  });

  // Form submit handler
  const handleSubmit = async (values: LoginValues) => {
    // Backend API isteği yapabilirsiniz
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Başarı durumunda token'ı localStorage'a kaydediyoruz
        localStorage.setItem('authToken', data.token);

        console.log('Giriş başarılı:', data.token);
        router.push('/dashboard'); // Dashboard'a yönlendir
      } else {
        console.error('Giriş hatası:', data.message);
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Giriş Yap</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <Field type="email" id="email" name="email" placeholder="E-posta girin" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <Field type="password" id="password" name="password" placeholder="Şifre girin" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <button type="submit">Giriş Yap</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
