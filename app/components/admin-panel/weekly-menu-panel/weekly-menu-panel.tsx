"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, ImageIcon, Trash2, Eye, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAdmin } from "@/app/context/admin-context"
import { fileToBase64 } from "@/app/actions/utils/file-to-base64"

interface MenuImage {
  id: string
  url: string
  filename: string
  uploadDate: string
  size: number
  isActive: boolean
}

 const placeholder = "/placeholder.svg?height=600&width=800";

export function WeeklyMenuPanel() {
  const { setWeeklyMenuData, weeklyMenuImage } = useAdmin();

  const [currentImage, setCurrentImage] = useState<string | null>(placeholder)

  useEffect(() => {
    setCurrentImage(weeklyMenuImage);
  }, [weeklyMenuImage]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Por favor selecciona un archivo de imagen válido")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("El archivo es demasiado grande. Máximo 5MB permitido")
      return
    }

    setSelectedFile(file)
    setUploadError(null)
    setUploadSuccess(false)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const image = await fileToBase64(selectedFile);
      setWeeklyMenuData(image);

      setCurrentImage(previewUrl)
      setUploadSuccess(true)
      setSelectedFile(null)
      setPreviewUrl(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      setUploadError("Error al subir la imagen. Por favor intenta nuevamente.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveSelected = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    setUploadError(null)
    setUploadSuccess(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Imagen del Menú Semanal</h1>
          <p className="text-gray-600 mt-1">Gestiona la imagen del menú que se muestra a los clientes</p>
        </div>
      </div>

      {/* Success Alert */}
      {uploadSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">¡Imagen del menú actualizada exitosamente!</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {uploadError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{uploadError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Menu Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Imagen Actual del Menú
            </CardTitle>
            <CardDescription>Esta es la imagen que actualmente ven los clientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentImage ? (
              <>
                <div className="relative group">
                  <img
                    src={currentImage || "/placeholder.svg"}
                    alt="Menú semanal actual"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Vista Previa del Menú</DialogTitle>
                      </DialogHeader>
                      <img
                        src={currentImage || "/placeholder.svg"}
                        alt="Menú semanal actual"
                        className="w-full h-auto rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                </div>

              </>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay imagen del menú configurada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload New Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Subir Nueva Imagen
            </CardTitle>
            <CardDescription>Selecciona una nueva imagen para reemplazar el menú actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-image">Seleccionar Imagen</Label>
              <Input
                id="menu-image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB</p>
            </div>

            {/* Preview of selected file */}
            {selectedFile && previewUrl && (
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Vista previa"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveSelected}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Archivo:</span>
                    <span className="text-sm text-gray-600">{selectedFile.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tamaño:</span>
                    <span className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="flex-1">
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Actualizar Menú
                  </>
                )}
              </Button>

              {selectedFile && (
                <Button variant="outline" onClick={handleRemoveSelected} disabled={isUploading}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Instrucciones de Uso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Recomendaciones:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Usa imágenes de alta calidad (mínimo 800x600px)</li>
                <li>• Formato recomendado: JPG o PNG</li>
                <li>• Asegúrate de que el texto sea legible</li>
                <li>• Incluye precios y descripciones claras</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Proceso:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• La imagen se actualiza inmediatamente</li>
                <li>• Los clientes verán el nuevo menú al instante</li>
                <li>• Se recomienda actualizar semanalmente</li>
                <li>• Mantén un backup de las imágenes anteriores</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
