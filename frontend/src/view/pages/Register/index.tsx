import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRegisterController } from './useRegisterController';

export function Register(){
  const {errors, register, handleSubmit, isLoading} = useRegisterController();
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-700 tracking-[-1px]">
      Crie sua conta
        </h1>
        <p className="space-x-1">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
          <Link to="/login" className="font-medium text-teal-900 tracking-[-0.5px]">Fazer login</Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className='mt-[60px] flex flex-col gap-4'
      >
        <Input
          placeholder='Nome'
          {...register('name')}
          error={errors.name?.message}/>
        <Input
          type='email'
          placeholder='Email'
          {...register('email')}
          error={errors.email?.message}/>
        <Input
          type="password"
          placeholder='Senha'
          {...register('password')}
          error={errors.password?.message}/>

        <Button
          type="submit"
          className='mt-2'
          isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
