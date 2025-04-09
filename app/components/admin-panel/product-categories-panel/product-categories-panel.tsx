'use client'

import React, { useState, Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { useAdmin } from '@/context/admin-context'
import { emptyProductCategory } from '@/app/lib/constants'
import { Label } from '@radix-ui/react-label'

export function ProductCategoriesPanel() {
  const {
    addProductCategory,
    updateProductCategory,
    removeProductCategory,
    productCategories,
  } = useAdmin();

  const [newCategory, setNewCategory] = useState<ProductCategory>(emptyProductCategory);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)


  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;
    await addProductCategory({
      name: newCategory.name.trim(),
      priority: newCategory.priority
    })
    setNewCategory(emptyProductCategory);
    setIsAddDialogOpen(false)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name?.trim()) return;
    await updateProductCategory(editingCategory);
    setEditingCategory(null);
    setIsEditDialogOpen(false);
  }

  const handleRemoveCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    await removeProductCategory(id);
  };

  const renderAddCategoryModalAndTrigger = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <Label htmlFor="priority">Priority</Label>
          <Input
            name="priority"
            placeholder="Priority"
            value={newCategory.priority}
            onChange={(e) => setNewCategory({ ...newCategory, priority: Number(e.target.value) })}
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderEditCategoryModalAndTrigger = () => {
    return (
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <Label htmlFor="name">Name</Label>

            <Input
              placeholder="Category name"
              value={editingCategory?.name || ''}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
            />
                      <Label htmlFor="priority">Priority</Label>

            <Input
              placeholder="Category priority"
              value={editingCategory?.priority || ''}
              onChange={(e) => setEditingCategory({ ...editingCategory, priority: Number(e.target.value) })}
            />
            <Button onClick={() => handleUpdateCategory()}>Update Category</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
        {renderAddCategoryModalAndTrigger()}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productCategories.map((category) => (
              <Fragment key={category.id}>
                <TableRow>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.priority ?? 0}</TableCell>
                  <TableCell>{category.created_at}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => {
                        setEditingCategory(category)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {renderEditCategoryModalAndTrigger()}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}