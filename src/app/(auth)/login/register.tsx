import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { useRouter } from 'next/router';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const router = useRouter();

  // Form initial values
  const initialValues: RegisterValues = { name: '', email: '', password: '', confirmPassword: '' };

  // Validation schema using Yup
  const validationSchema = Yup.object({
  name: Yup.string().required('Ad gereklidir'),
  email: Yup.string().email('Geçerli bir e-posta girin').required('E-posta gereklidir'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre gereklidir'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Şifreler eşleşmiyor') // null yerine boş string kullanıldı
    .required('Şifreyi onaylayın'),
});

  // Form submit handler
  const handleSubmit = async (values: RegisterValues) => {
  // Backend API isteği yapabilirsiniz
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Kayıt başarılı');
      // Kayıt sonrası giriş sayfasına yönlendirme
      router.push('/login'); // Login sayfasına yönlendir

      // Eğer token almak isterseniz:
      localStorage.setItem('authToken', data.token); // Kayıt sonrası token'ı alabilirsiniz
    } else {
      console.error('Kayıt hatası:', data.message);
    }
  } catch (error) {
    console.error('Hata:', error);
  }
};


  return (
    <div className="form-container">
      <h1>Kayıt Ol</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Adınız</label>
            <Field type="text" id="name" name="name" placeholder="Adınızı girin" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Şifreyi Onaylayın</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Şifreyi onaylayın" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </div>

          <button type="submit">Kayıt Ol</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
