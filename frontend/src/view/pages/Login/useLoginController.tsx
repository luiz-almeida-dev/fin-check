import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';import { authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SigninParams } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';
;

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'A senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export default function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const {signin} = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const {accessToken} = await mutateAsync(data);

      signin(accessToken);
      toast.success('Login efetuado com sucesso!');
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {handleSubmit, register, errors, isLoading: isPending};
}



