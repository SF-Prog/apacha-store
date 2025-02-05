'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdmin } from '@/context/admin-context'
import { AddProductForm } from '@/components/admin-panel/add-product-form/add-product-form';

export function ProductsPanel() {
  const {
    showCreateProductModal,
    setShowCreateProductModal,
    productsList,
    removeProduct,
  } = useAdmin();

  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const handleRemoveProduct = (id: string) => {
    removeProduct(id);
  };

  const onEdit = (product: ProductItem) => {
    setShowEditProductModal(true);
    // You might want to set the product to edit in state here
    // setProductToEdit(product);
  };

  const renderProductImage = (image: string, title: string) => {
    return (
      <Image
        style={{ borderRadius: '5px', objectFit: 'cover' }}
        src={image || "/placeholder.svg"}
        alt={title}
        width={50}
        height={50} />
    );
  };

  const renderProductsList = () => {
    if (!productsList?.length) return;

    return productsList.map((product, index) => {
      if (!product) return;
      return (
        <TableRow key={product.id}>
          <TableCell>
            {renderProductImage(product.image, product.title)}
          </TableCell>
          <TableCell className="font-medium">{product.title}</TableCell>
          <TableCell className="max-w-xs truncate">{product.description}</TableCell>
          <TableCell>${product.price.toFixed(2)}</TableCell>
          <TableCell>{product.meassures}</TableCell>
          <TableCell>{product.category}</TableCell>
          <TableCell>{product.qty}</TableCell>
          <TableCell>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => onEdit(product)}>
                Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRemoveProduct(product.id)}>
                Remove
            </Button>
          </TableCell>
        </TableRow>
      )
    });
  };

  const renderCreateProductModal = () => (
    <DialogContent className="sm:max-w-[450px] overflow-y-scroll max-h-[90%]">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
      </DialogHeader>
      <AddProductForm />
    </DialogContent>
  );

  return (
    <div>
      <Dialog open={showCreateProductModal} onOpenChange={setShowCreateProductModal}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Product</Button>
        </DialogTrigger>
        {renderCreateProductModal()}
      </Dialog>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Measures</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderProductsList()}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}