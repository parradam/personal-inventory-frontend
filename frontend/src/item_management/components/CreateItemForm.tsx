/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { AxiosError } from 'axios';
import { createItem, ItemListResponseData } from '../services/itemService';

interface CreateItemFormProps {
  setItemList: React.Dispatch<React.SetStateAction<ItemListResponseData[]>>;
  setShowCreateItemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormErrorResponse = Record<string, string[]> | object;

type FieldNames = Record<string, boolean>;

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'Name must be at least 3 characters.',
      })
      .max(50, {
        message: 'Name must be less than 50 characters.',
      }),
    barcode: z.string().max(50, {
      message: 'Barcode must be less than 50 characters.',
    }),
    owner: z.string().max(50, {
      message: 'Owner must be less than 50 characters.',
    }),
    used_from: z.date({ message: 'A date must be chosen.' }),
    used_to: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.used_from && data.used_to) {
        return data.used_to >= data.used_from;
      }
      return true;
    },
    { message: 'Used to must be after used from.', path: ['used_to'] },
  );

const setDateToMidnight = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  return newDate;
};

const CreateItemForm: React.FC<CreateItemFormProps> = ({
  setItemList,
  setShowCreateItemModal,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      barcode: '',
      owner: '',
      used_from: setDateToMidnight(new Date()),
      used_to: undefined,
    },
  });

  const onSubmit: SubmitHandler<{
    name: string;
    barcode: string;
    owner: string;
    used_from: Date;
    used_to?: Date;
  }> = async (values: z.infer<typeof formSchema>) => {
    try {
      // Remove item from server
      const createdItem = await createItem(values);
      // Reflect change in local state
      setItemList((prev) => [...prev, createdItem]);
      form.reset();
      setShowCreateItemModal(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData: FormErrorResponse = axiosError.response?.data || {};

      const fieldNames: FieldNames = {
        name: true,
        barcode: true,
        owner: true,
        used_from: true,
        used_to: true,
      };

      Object.entries(errorData).forEach(([errorFieldName, errorMessages]) => {
        if (Array.isArray(errorMessages)) {
          const errorName = fieldNames[errorFieldName]
            ? errorFieldName
            : 'root';
          errorMessages.forEach((errorMessage: string) => {
            form.setError(
              errorName as
                | 'name'
                | 'barcode'
                | 'owner'
                | 'used_from'
                | 'used_to'
                | 'root',
              {
                type: 'manual',
                message: errorMessage,
              },
            );
          });
        }
      });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of item (required)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Give your item a name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  If you have a barcode or serial number, add it here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Who owns it?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="used_from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Used from (required)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          new Date(field.value).toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(setDateToMidnight(date));
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When you first started using the item.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="used_to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Used to</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          new Date(field.value).toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? field.value : undefined}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(setDateToMidnight(date));
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                    <Button
                      className="ml-4 mb-4"
                      onClick={(event) => {
                        event.preventDefault();
                        field.onChange(undefined);
                      }}
                    >
                      Clear date
                    </Button>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  If applicable, when you stopped using it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Create
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={(event) => {
                event.preventDefault();
                setShowCreateItemModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateItemForm;
