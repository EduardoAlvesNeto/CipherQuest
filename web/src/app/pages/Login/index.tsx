import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { PageTransition } from '../../components/PageTransition';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import './styles.css';

const schema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email obrigatório'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(22, 'Senha deve ter no máximo 22 caracteres')
    .min(1, 'Senha obrigatória')
});


export type FormValues = z.infer<typeof schema>;

export default function Login() {
  document.title = 'Login';

  const navigate = useNavigate();

  if (window.localStorage.getItem('token')) {
    window.localStorage.removeItem('token');
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const axiosData = await axios.post('http://localhost:3001/auth/signin', data);

      if (axiosData.data) {
        window.localStorage.setItem('token', axiosData.data);
      }
      navigate('/dashboard');

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTransition>
      <div className="container">
        <Header />
        <main className='login-main'>
          <header>
            <h1>Login</h1>
          </header>
          <form action="" onSubmit={handleSubmit(onSubmit)} >
            <Input
              {...register('email')}
              type="text"
              id="email"
              placeholder="seuemail@email.com"
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              id="password"
              placeholder="*********"
              error={errors.password?.message}
            />
            <Button type='submit'>Enter</Button>
          </form>
          <footer>
            <p>Not registered? <strong><Link to="/register">Create an account</Link></strong></p>
          </footer>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
