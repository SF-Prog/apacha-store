'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, CalendarDays, Mail, MessageSquare, Phone } from 'lucide-react'
import { Label } from '@/components/ui/label';
import { useStore } from '@/app/context/store-context'

// Define form values interface
interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
  contactPreference: 'email' | 'whatsapp' | 'call'
  newsletter: boolean,
  quantity: string
}

// Define form errors interface
interface FormErrors {
  name?: string
  email?: string
  phone?: string
  eventType?: string
  message?: string
  contactPreference?: string,
  quantity?: string
}

interface EventInfoRequestModalProps {
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function EventInfoRequestModal({
  buttonText = "Solicitar Información",
  buttonVariant = "default",
  buttonSize = "default",
  className = ""
}: EventInfoRequestModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formValues, setFormValues] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
    contactPreference: "whatsapp",
    newsletter: false,
    quantity: ""
  });
  const { sendEventRequest } = useStore();


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormValues(prev => ({
      ...prev,
      newsletter: checked
    }))
  }

  // Validate form
  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!data.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (data.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Validate email
    if (!data.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Por favor ingresa un email válido"
    }

    // Validate phone
    if (!data.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    } else if (data.phone.trim().length < 8) {
      newErrors.phone = "Por favor ingresa un número de teléfono válido"
    }

    // Validate event type
    if (!data.eventType) {
      newErrors.eventType = "Por favor selecciona un tipo de evento"
    }

    // Validate message
    if (!data.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Tu mensaje debe tener al menos 10 caracteres"
    } else if (data.message.length > 500) {
      newErrors.message = "Tu mensaje no puede exceder los 500 caracteres"
    }

    // Validate contact preference
    if (!data.contactPreference) {
      newErrors.contactPreference = "Por favor selecciona una preferencia de contacto"
    }

    // Update errors state
    setErrors(newErrors)

    // Return true if no errors
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData()
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString())
      }
    });

    if (!validateForm(formValues)) return;

    try {
      const response = await sendEventRequest(formDataToSend);
      if (!response) throw new Error('Algo salio mal');

      setIsSubmitting(true);
      setIsSuccess(true);
      setTimeout(() => {
        setFormValues({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
          contactPreference: "whatsapp",
          newsletter: false,
          quantity: ""
        });
        setErrors({});
        setIsSuccess(false);
        setOpen(false);
      }, 3000);
    } catch (error) {
      setIsSuccess(false);
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      setOpen(newOpen)
      if (!newOpen) {
        // Reset form and states when modal is closed
        setTimeout(() => {
          setFormValues({
            name: "",
            email: "",
            phone: "",
            eventType: "",
            message: "",
            contactPreference: "whatsapp",
            newsletter: false,
            quantity: ""
          })
          setErrors({})
          setIsSuccess(false)
        }, 300)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className="bg-white text-apacha_purple-100 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg group"
          size={buttonSize}
        >
          <CalendarDays className="mr-2 h-4 w-4 group-hover:animate-pulse" />
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90%] p-0 overflow-auto">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h3>
              <p className="text-gray-600 mb-4">
                Gracias por tu interés en nuestros eventos. Un miembro de nuestro equipo se pondrá en contacto contigo pronto.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader className="px-6 pt-6">
                <DialogTitle className="text-2xl font-bold text-apacha-brown">Coordina tu evento</DialogTitle>
                <DialogDescription>
                  Completa el formulario y nos pondremos en contacto contigo para brindarte más detalles sobre nuestros eventos.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 px-6 pt-4 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-sm font-medium text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="tu@email.com"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-sm font-medium text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+598 98 650-560"
                      value={formValues.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-sm font-medium text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">Tipo de evento</Label>
                    <div className="flex">
                      <Select
                        name="eventType"
                        value={formValues.eventType}
                        onValueChange={(value) => handleSelectChange("eventType", value)}
                      >
                        <SelectTrigger id="eventType" className="w-full">
                          <SelectValue placeholder="Selecciona un tipo de evento" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="workshop">Taller de cocina</SelectItem>
                          <SelectItem value="catering">Servicio de catering</SelectItem>
                          <SelectItem value="mealplan">Plan de comidas</SelectItem>
                          <SelectItem value="private">Evento privado</SelectItem>
                          <SelectItem value="corporate">Evento empresarial</SelectItem>
                          <SelectItem value="birthday">Cumpleaños</SelectItem>
                          <SelectItem value="retreat">Retiro</SelectItem>
                          <SelectItem value="breakfast">Desayuno corporativo</SelectItem>
                          <SelectItem value="afteroffice">After office</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> 
                    {errors.eventType && (
                      <p className="text-sm font-medium text-destructive">{errors.eventType}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad de personas (aprox)</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="120 personas adultas"
                    value={formValues.quantity}
                    onChange={handleChange}
                  />
                  {errors.quantity && (
                    <p className="text-sm font-medium text-destructive">{errors.quantity}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos más sobre lo que estás buscando..."
                    className="min-h-[100px]"
                    value={formValues.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <p className="text-sm font-medium text-destructive">{errors.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>¿Cómo prefieres que te contactemos?</Label>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      type="button"
                      variant={formValues.contactPreference === "email" ? "default" : "outline"}
                      className={`flex items-center ${formValues.contactPreference === "email" ? "bg-apacha_purple-100" : ""}`}
                      onClick={() => handleSelectChange("contactPreference", "email")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>

                    <Button
                      type="button"
                      variant={formValues.contactPreference === "whatsapp" ? "default" : "outline"}
                      className={`flex items-center ${formValues.contactPreference === "whatsapp" ? "bg-apacha_purple-100" : ""}`}
                      onClick={() => handleSelectChange("contactPreference", "whatsapp")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>

                    <Button
                      type="button"
                      variant={formValues.contactPreference === "call" ? "default" : "outline"}
                      className={`flex items-center ${formValues.contactPreference === "call" ? "bg-apacha_purple-100" : ""}`}
                      onClick={() => handleSelectChange("contactPreference", "call")}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Llamada
                    </Button>
                  </div>
                  {errors.contactPreference && (
                    <p className="text-sm font-medium text-destructive">{errors.contactPreference}</p>
                  )}
                </div>
                <DialogFooter className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-apacha_purple-100 hover:bg-apacha_purple-100/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : "Enviar solicitud"}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}