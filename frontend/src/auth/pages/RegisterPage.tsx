import RegisterForm from '../components/RegisterForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const RegisterPage = () => {
  return (
    <div className="py-40 md:py-20">
      <div className="w-5/6 md:w-2/5 bg-primary-foreground mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Start creating your inventory in minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
