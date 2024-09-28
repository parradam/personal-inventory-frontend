import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '../hooks/useAuth';
import { loginService } from '../services/loginService';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormErrorResponse {
  error?: string;
}

const formSchema = z.object({
  username: z.string().min(6, {
    message: 'Username must be at least 6 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<{
    username: string;
    password: string;
  }> = async (values: z.infer<typeof formSchema>) => {
    try {
      await loginService(values);
      setIsAuthenticated(true);
      await navigate({ to: '/items' });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData: FormErrorResponse = axiosError.response?.data || {};

      if (errorData.error) {
        form.setError('root', { type: 'manual', message: errorData.error });
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        {
          // Suppress TS error due to the way react-hook-form handles async code itself
        }
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="hidden">
                  Enter your username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription className="hidden">
                  Enter your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
