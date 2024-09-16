import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CreateItemModalProps {
  children: React.ReactNode;
  showCreateItemModal: boolean;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  children,
  showCreateItemModal,
}) => {
  return (
    <div className={showCreateItemModal ? '' : 'hidden'}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="w-5/6 md:w-2/5 bg-primary-foreground mx-auto max-h-[90vh] overflow-y-auto no-scrollbar">
          <Card>
            <CardHeader>
              <CardTitle>Add an item</CardTitle>
              <CardDescription>Provide some details below.</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateItemModal;
