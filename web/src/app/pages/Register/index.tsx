import { useState } from 'react'

import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'

import { PageTransition } from '../../components/PageTransition'
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Input } from "../../components/Input"
import { Button } from '../../components/Button'

import "./styles.css"

const schema = z.object({
  document: z.string()
    .min(1, 'Documento obrigatório')
    .length(14, 'Documento deve ter 11 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email obrigatório'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(22, 'Senha deve ter no máximo 22 caracteres')
    .min(1, 'Senha obrigatória')
})

type FormValues = z.infer<typeof schema>

export default function Register() {
  document.title = 'Register'

  console.log('Renderizou Register')

  const [serverError, setServerError] = useState<string>('')
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(JSON.stringify(data))
      await axios.post('http://localhost:3001/auth/signup', data)

      navigate('/login')
    } catch (err) {
      console.log(err)
      setServerError('CPF ou Email já estão em uso')
    }
  }

  return (
    <PageTransition>
      <div className="container">
        <Header />
        <main className="register-main">
          <header>
            <h1>Register</h1>
          </header>
          <form action='POST' onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("document")}
              type="text"
              name="document"
              id="document"
              maxLength={14}
              formatCPF
              placeholder="000.000.000-00"
              error={errors.document?.message}
            />

            <Input
              {...register("email")}
              type="text"
              id="email"
              name="email"
              placeholder="seuemail@email.com"
              error={errors.email?.message}
            />

            <Input
              {...register("password")}
              type="password"
              name="password"
              placeholder="*********"
              id="password"
              error={errors.password?.message}
            />

            <Button type="submit">Enter</Button>
            {serverError && <span className='error-message'>{serverError}</span>}
          </form>
          <footer>
            <p>Already registered? <Link to="/login">Login</Link></p>
          </footer>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
