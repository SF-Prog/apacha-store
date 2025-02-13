'use client'

import React, { useState, useRef, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAdmin } from '@/app/context/admin-context'

type FormErrors = {
  [K in keyof Workshop]?: string
}

interface WorkshopFormProps {
  onSubmit: (workshop: FormData) => void
  initialValues?: Workshop
}

type FieldConfig = {
  name: keyof Workshop
  label: string
  type: 'text' | 'textarea' | 'date' | 'time' | 'number' | 'switch'
  placeholder: string
}

const fieldConfigs: FieldConfig[] = [
  { name: 'title', label: 'Título', type: 'text', placeholder: 'Taller de Cocina Vegana' },
  { name: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Aprende a cocinar deliciosos platos veganos...' },
  { name: 'date', label: 'Fecha', type: 'date', placeholder: 'YYYY-MM-DD' },
  { name: 'initial_time', label: 'Hora de inicio', type: 'time', placeholder: 'HH:MM' },
  { name: 'finalization_time', label: 'Hora de finalizacion', type: 'time', placeholder: 'HH:MM ' },
  { name: 'location', label: 'Ubicación', type: 'text', placeholder: 'Apacha Kitchen Studio' },
  { name: 'price', label: 'Precio', type: 'number', placeholder: '100' },
  { name: 'priority', label: 'Prioridad', type: 'number', placeholder: '0' },
  { name: 'is_published', label: 'Publicado', type: 'switch', placeholder: '' },
]

export function WorkshopForm({ onSubmit, initialValues }: WorkshopFormProps) {
  const { isLoading } = useAdmin()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<Workshop>({
    id: '',
    title: '',
    description: '',
    date: '',
    initial_time: '',
    finalization_time: '',
    location: '',
    image: '',
    priority: 0,
    price: 0,
    is_published: false,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
      setPreviewImage(initialValues.image)
    }
  }, [initialValues])

  const validateForm = (data: Workshop): boolean => {
    const newErrors: FormErrors = {}
    if (!data.title) newErrors.title = 'El título es requerido'
    if (!data.description) newErrors.description = 'La descripción es requerida'
    if (!data.date) newErrors.date = 'La fecha es requerida'
    if (!data.initial_time) newErrors.initial_time = 'La hora de inicio es requerida'
    if (!data.finalization_time) newErrors.finalization_time = 'La hora de finalizacion es requerida'
    if (!data.price) newErrors.price = 'El precio es Requerido'
    if (!data.location) newErrors.location = 'La ubicación es requerida'
    if (data.priority < 0) newErrors.priority = 'La prioridad no puede ser negativa'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_published: checked }))
  }

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
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm(formData))  return;

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    });

    onSubmit(formDataToSend);
  };

  const renderField = (field: FieldConfig) => {
    if (field.type === 'switch') {
      return (
        <div key={field.name} className="flex items-center space-x-2">
          <Switch
            id={field.name}
            checked={formData.is_published}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor={field.name}>{field.label}</Label>
        </div>
      )
    }

    const InputComponent = field.type === 'textarea' ? Textarea : Input

    return (
      <div key={field.name}>
        <Label htmlFor={field.name}>{field.label}</Label>
        <InputComponent
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] as string}
          onChange={handleInputChange}
        />
        {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
      </div>
    )
  }

  const renderImageInput = () => {
    return (
      <div>
        <Label htmlFor="image">Imagen del Taller</Label>
        <div className="flex items-center space-x-4">
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            variant="outline"
          >
            Elegir Archivo
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
                alt="Vista previa"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {fieldConfigs.map(renderField)}
      {renderImageInput()}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar Taller'}
      </Button>
    </form>
  )
}