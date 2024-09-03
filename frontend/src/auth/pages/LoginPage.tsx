import LoginForm from '../components/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-40 md:py-20">
        <div className="w-5/6 md:w-2/5 bg-primary-foreground mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Let&apos;s get you signed in.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
