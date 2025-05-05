"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Calendar, Mail, Phone, FileText, Filter, Eye } from "lucide-react"
import { FullScreenLoader } from "@/components/ui/fullscreen-loader";
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/app/context/admin-context"


export function SubscriptionsPanel() {
  const [filteredRequests, setFilteredRequests] = useState<Subscription[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<Subscription | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { subscriptions, loadSubscriptions, isLoading } = useAdmin();

  useEffect(() => {
    loadSubscriptions();
  }, [])

  useEffect(() => {
    let result = subscriptions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (request) =>
          request.email?.toLowerCase().includes(term) ||
          request.description?.toLowerCase().includes(term) ||
          request.phone?.toLowerCase().includes(term),
      )
    }

    // Filter by type
    if (typeFilter !== "all") {
      result = result.filter((request) => request.type === typeFilter)
    }

    setFilteredRequests(result)
  }, [searchTerm, typeFilter, subscriptions])

  const handleViewDetails = (request: Subscription) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "newsletter":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Newsletter
          </Badge>
        )
      case "workshop":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Taller
          </Badge>
        )
      case "menu":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            Menu
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            {type}
          </Badge>
        )
    }
  };

  const renderLoader = () => {
    if (!isLoading) return;
    return <FullScreenLoader />;
  };

  return (
    <>
      {renderLoader()}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solicitudes de Suscripción</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por email, teléfono o descripción"
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="workshop">Taller</SelectItem>
                  <SelectItem value="menu">Menu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(request.created_at)}</TableCell>
                    <TableCell>
                      <a href={`mailto:${request.email}`} className="text-blue-600 hover:underline">
                        {request.email}
                      </a>
                    </TableCell>
                    <TableCell>{getTypeLabel(request.type)}</TableCell>
                    <TableCell>
                      <a href={`tel:${request.phone}`} className="text-blue-600 hover:underline">
                        {request.phone}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(request)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <>no items</>
        )}

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
                      <CardTitle className="text-sm font-medium">Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                              {selectedRequest.email}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                          <dd className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline">
                              {selectedRequest.phone}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Detalles de la Solicitud</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                          <dd>{getTypeLabel(selectedRequest.type)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Fecha de Solicitud</dt>
                          <dd className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {formatDate(selectedRequest.created_at)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">ID</dt>
                          <dd className="text-xs text-gray-500 font-mono">{selectedRequest.id}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Descripción</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{selectedRequest.description}</p>
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
