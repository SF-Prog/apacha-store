'use client'

import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useAdmin } from '@/app/context/admin-context'

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  meassures: z.string().optional(),
  image: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

export function AddProductForm() {
  const { addProduct, isLoading } = useAdmin();
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      meassures: '',
      image: '',
    },
  })

  const onSubmit = async (data: ProductFormValues) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    })

    if (previewImage) {
      formData.set('image', previewImage)
    };

    addProduct(formData);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreviewImage(base64String)
        form.setValue('image', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormDescription>Enter the product title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormDescription>Enter a description for the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter the product price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meassures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Measure</FormLabel>
              <FormControl>
                <Input placeholder="e.g., kg, lbs, pcs" {...field} />
              </FormControl>
              <FormDescription>Enter the unit of measure for the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Product Image</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Choose File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewImage && (
                <div className="relative w-20 h-20">
                  <Image
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>Upload an image for the product</FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </Form>
  )
}