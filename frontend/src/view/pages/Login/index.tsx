import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import useLoginController from './useLoginController';

export function Login(){
  const { handleSubmit, register, errors, isLoading } = useLoginController();
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-700 tracking-[-1px]">
       Entre em sua conta
        </h1>
        <p className="space-x-1">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <Link to="/register" className=" font-medium text-teal-900 tracking-[-0.5px]">Crie uma conta</Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
