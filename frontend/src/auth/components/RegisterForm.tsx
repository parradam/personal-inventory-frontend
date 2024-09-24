import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';

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
import { registerService } from '../services/registerService';
import { AxiosError } from 'axios';

interface RegisterFormParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrorResponse {
  error?: string;
}

const formSchema = z
  .object({
    username: z.string().min(6, {
      message: 'Username must be at least 6 characters.',
    }),
    email: z.string().email({ message: 'Email must be valid.' }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormParams> = async (
    values: z.infer<typeof formSchema>,
  ) => {
    try {
      // Remove confirmPassword from payload
      const { username, email, password } = values;

      await registerService({ username, email, password });
      await navigate({ to: '/login' });
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="hidden">
                  Enter your email.
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription className="hidden">
                  Confirm your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
