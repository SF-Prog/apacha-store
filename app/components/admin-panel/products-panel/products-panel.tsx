'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AddProductForm } from '@/components/admin-panel/add-product-form/add-product-form';
import { useAdmin } from '@/context/admin-context';
import { emptyProduct } from '@/lib/constants'

export function ProductsPanel() {
  const {
    productsList,
    removeProduct,
  } = useAdmin();

  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
  const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false);

  const onEdit = () => {
    setShowEditProductModal(true);
  };

  const onAdd = () => {
    setShowAddProductModal(true);
  };

  const handleRemoveProduct = (index: number) => {
    const product = productsList[index];
    const { id } = product;
    removeProduct(id);
  };

  const renderEditProductModal = () => {
    if (!showEditProductModal) return;
    return (
      <Dialog open={true} onOpenChange={() => setShowEditProductModal(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const renderAddProductModal = () => {
    if (!showAddProductModal) return;
    return (
      <Dialog open={true} onOpenChange={() => setShowAddProductModal(false)}>
        <DialogContent className="sm:max-h-[720px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <AddProductForm />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      {renderAddProductModal()}
      {renderEditProductModal()}
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Button className="mb-4" onClick={onAdd}>Add Product</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsList.map((product, index) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={onEdit}>
                      Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveProduct(index)}>
                      Remove
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}