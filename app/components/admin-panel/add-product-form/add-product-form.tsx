'use client'

import React, { useState, useRef, FormEvent, Fragment } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useAdmin } from '@/app/context/admin-context'

interface FormData {
  title: string
  description: string
  price: number
  meassures: string
  image: string
  category: string
  qty: number
}

type FormErrors = {
  [K in keyof FormData]?: string
}

type FieldConfig = {
  name: keyof FormData
  label: string
  type: 'text' | 'number' | 'textarea' | 'select'
  placeholder: string
}

const fieldConfigs: FieldConfig[] = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Pastel de Zanahoria' },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Pastel de papa con zanahoria rallada y crema de hongos.' },
  { name: 'price', label: 'Price', type: 'text', placeholder: '0.00' },
  { name: 'meassures', label: 'Measure', type: 'text', placeholder: '100 ml' },
  { name: 'qty', label: 'Quantity', type: 'number', placeholder: '0' },
  { name: 'category', label: 'Category', type: 'select', placeholder: 'Panes' },
]

export function AddProductForm() {
  const { addProduct, isLoading, productCategories } = useAdmin();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: 0,
    meassures: '',
    category: null,
    image: '',
    qty: 0
  });

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {}
    if (!data.title) newErrors.title = 'Title is required'
    if (data.price <= 0) newErrors.price = 'Price must be positive'
    if (data.qty < 0) newErrors.qty = 'Quantity cannot be negative'
    if (!data.category) newErrors.category = 'Category is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreviewImage(base64String)
        setFormData(prev => ({ ...prev, image: base64String }))
      }
      reader.readAsDataURL(file)
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm(formData)) return;

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    });

    addProduct(formDataToSend);
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const renderSelectField = (config: FieldConfig) => {
    const categories = [...productCategories];

    return (
      <Fragment key={config.label}>
        <Label htmlFor="category">{config.label}</Label>
        <Select onValueChange={handleCategoryChange} value={formData.category ?? null}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={config.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat: ProductCategory) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </Fragment>
    );
  };

  const renderField = (field: FieldConfig) => {
    const { type } = field;

    if (type === 'select') return renderSelectField(field);

    const InputComponent = type === 'textarea' ? Textarea : Input

    return (
      <div key={field.name}>
        <Label htmlFor={field.name}>{field.label}</Label>
        <InputComponent
          id={field.name}
          name={field.name}
          type={field.type ?? 'text'}
          placeholder={field.placeholder}
          value={formData[field.name] as string|number}
          onChange={handleInputChange}
        />
        {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
      </div>
    )
  };

  const renderImageInput = () => {
    return (
      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            variant="outline"
          >
            Choose File
          </Button>
          <input
            id="image"
            name="image"
            type="file"
            ref={imageInputRef}
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
      </div>

    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {fieldConfigs.map(renderField)}
      {renderImageInput()}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  )
};