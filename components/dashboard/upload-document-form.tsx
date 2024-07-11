'use client'
import * as React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoaderIcon } from 'lucide-react';
import { LoadingButton } from './loading-button';
import { title } from 'process';

const formSchema = z.object({
    title : z.string().min(2, 'Title must be at least 2 characters long').max(50, 'Title must be at most 50 characters long'),
    file: z.instanceof(File),
});

export const FormUpload = ({ onUpload }: { onUpload: () => void }) => {
    const createDocuments = useMutation(api.documents.createTask);
    const generateUrl = useMutation(api.documents.generateUploadUrl);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = await generateUrl();
        const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": values.file.type },
            body: values.file,
          });
        const {storageId} = await result.json();
        console.log(typeof storageId)
        
        await createDocuments({ text: values.title , fileId : storageId})
        onUpload()
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* file uploadation */}
                <FormField
                    name="file"
                    control={form.control}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                accept='.txt,.xml,.doc,.pdf,tsx,.jsx,.ts,.js,.py'
                                    type='file'
                                    {...fieldProps}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        onChange(file); // Correctly call the onChange function from field
                                    }}
                                />

                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton isLoading={form.formState.isSubmitting} />
            </form>
        </FormProvider>
    );
}
