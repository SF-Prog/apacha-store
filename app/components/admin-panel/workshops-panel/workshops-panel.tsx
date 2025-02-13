'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdmin } from '@/context/admin-context'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { WorkshopForm } from '@/components/admin-panel/workshop-form/workshop-form'

export function WorkshopsPanel() {
  const {
    workshops,
    removeWorkshop,
    addWorkshop,
    editWorkshop,
  } = useAdmin()

  const [showAddWorkshopModal, setShowAddWorkshopModal] = useState<boolean>(false)
  const [showEditWorkshopModal, setShowEditWorkshopModal] = useState<boolean>(false)
  const [workshopToEdit, setWorkshopToEdit] = useState<Workshop | null>(null)

  const handleRemoveWorkshop = (id: string) => {
    removeWorkshop(id)
  }

  const handleEdit = (workshop: Workshop) => {
    setShowEditWorkshopModal(true)
    setWorkshopToEdit(workshop)
  }

  const renderWorkshopImage = (image: string, title: string) => {
    return (
      <Image
        style={{ borderRadius: '5px', objectFit: 'cover' }}
        src={image || "/placeholder.svg"}
        alt={title}
        width={50}
        height={50}
      />
    )
  }

  const renderWorkshopsList = () => {
    if (!workshops?.length) return null

    return workshops.map((workshop) => (
      <TableRow key={workshop.id}>
        <TableCell>
          {renderWorkshopImage(workshop.image, workshop.title)}
        </TableCell>
        <TableCell className="font-medium">{workshop.title}</TableCell>
        <TableCell className="max-w-xs truncate">{workshop.description}</TableCell>
        <TableCell>{workshop.date}</TableCell>
        <TableCell>{workshop.initial_time}</TableCell>
        <TableCell>{workshop.finalization_time}</TableCell>
        <TableCell>{workshop.location}</TableCell>
        <TableCell>{workshop.priority}</TableCell>
        <TableCell>{workshop.is_published ? 'True' : 'False'}</TableCell>
        <TableCell>{workshop.author ?? ''}</TableCell>
        <TableCell>{workshop.capacity ?? ''}</TableCell>
        <TableCell>{workshop.social_media_link ?? ''}</TableCell>
        <TableCell>
          <Button
            variant="outline"
            className="mb-2"
            onClick={() => handleEdit(workshop)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleRemoveWorkshop(workshop.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }

  const renderCreateWorkshopModal = () => (
    <Dialog open={showAddWorkshopModal} onOpenChange={setShowAddWorkshopModal}>
      <DialogTrigger asChild>
        <Button className="mb-4"><Plus className="mr-2" />Add Workshop</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] overflow-y-scroll max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Add New Workshop</DialogTitle>
        </DialogHeader>
        <WorkshopForm onSubmit={addWorkshop} />
      </DialogContent>
    </Dialog> 
  )

  const renderEditWorkshopModal = () => (
    <Dialog open={showEditWorkshopModal} onOpenChange={setShowEditWorkshopModal}>
      <DialogContent className="sm:max-w-[450px] overflow-y-scroll max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Edit Workshop</DialogTitle>
        </DialogHeader>
        <WorkshopForm
          onSubmit={editWorkshop}
          initialValues={workshopToEdit}
        />
      </DialogContent>
    </Dialog>
  )

  return (
    <div>
      {renderCreateWorkshopModal()}
      {renderEditWorkshopModal()}
      <h2 className="text-2xl font-bold mb-4">Workshops</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Initial Time</TableHead>
              <TableHead>Finalization Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Social</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderWorkshopsList()}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}