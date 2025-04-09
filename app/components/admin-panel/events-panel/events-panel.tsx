"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAdmin } from "@/context/admin-context"
import { Mail, Phone, MessageSquare, Calendar, Eye, Filter } from "lucide-react"

export const EventsPanel = () => {
  const { eventRequests, updateEventRequestStatus } = useAdmin()
  const [selectedRequest, setSelectedRequest] = useState<EventRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const handleViewDetails = (request: EventRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true)
  };

  const handleStatusChange = async (requestId: string, newStatus: "pending" | "contacted" | "completed") => {
    setSelectedRequest({...selectedRequest, status: newStatus});
    await updateEventRequestStatus(requestId, newStatus);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pendiente
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Contactado
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Completado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getContactPreferenceIcon = (preference: string) => {
    switch (preference) {
      case "email":
        return <Mail className="h-4 w-4 text-gray-500" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-gray-500" />
      case "call":
        return <Phone className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const filteredRequests =
    statusFilter === "all" ? eventRequests : eventRequests.filter((request) => request.status === statusFilter)

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solicitudes de Eventos</h2>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="contacted">Contactados</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Tipo de Evento</TableHead>
                <TableHead>Preferencia</TableHead>
                <TableHead>Newsletter</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(request.created_at)}</TableCell>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.event_type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getContactPreferenceIcon(request.contact_preference)}
                        <span className="ml-2">{request.contact_preference}</span>
                      </div>
                    </TableCell>
                    <TableCell>{request.newsletter ? "Sí" : "No"}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No hay solicitudes de eventos que coincidan con el filtro actual.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la Solicitud</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                          <dd>{selectedRequest.name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd>
                            <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                              {selectedRequest.email}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                          <dd>
                            <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline">
                              {selectedRequest.phone}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Newsletter</dt>
                          <dd>{selectedRequest.newsletter ? "Suscrito" : "No suscrito"}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Detalles del Evento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Tipo de Evento</dt>
                          <dd>{selectedRequest.event_type}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Preferencia de Contacto</dt>
                          <dd className="flex items-center">
                            {getContactPreferenceIcon(selectedRequest.contact_preference)}
                            <span className="ml-2 capitalize">{selectedRequest.contact_preference}</span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Fecha de Solicitud</dt>
                          <dd className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {formatDate(selectedRequest.created_at)}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Mensaje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{selectedRequest.message}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Estado</CardTitle>
                    <CardDescription>Actualiza el estado de esta solicitud</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button
                        variant={selectedRequest.status === "pending" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedRequest.id, "pending")}
                      >
                        Pendiente
                      </Button>
                      <Button
                        variant={selectedRequest.status === "contacted" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedRequest.id, "contacted")}
                      >
                        Contactado
                      </Button>
                      <Button
                        variant={selectedRequest.status === "completed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(selectedRequest.id, "completed")}
                      >
                        Completado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
