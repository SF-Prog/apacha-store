'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdmin } from '@/context/admin-context'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { ProductForm } from '@/components/forms/product-form/product-form';

export function ProductsPanel() {
  const {
    showCreateProductModal,
    setShowCreateProductModal,
    productsList,
    removeProduct,
    addProduct,
    updateProduct,
    productCategories
  } = useAdmin();

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductItem|null>(null);

  const handleRemoveProduct = (id: string) => {
    const hasConfirmed = window.confirm('Confirma eliminar este producto?');
    if (!hasConfirmed) return;

    removeProduct(id);
  };

  const handleEdit = (product: ProductItem) => {
    setShowEditProductModal(true);
    setProductToEdit(product);
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

    return productsList.map((product) => {
      if (!product) return;
      return (
        <TableRow key={product.id}>
          <TableCell>
            {renderProductImage(product.image, product.title)}
          </TableCell>
          <TableCell className="font-medium">{product.title}</TableCell>
          <TableCell className="max-w-xs truncate">{product.description}</TableCell>
          <TableCell>${product.price?.toFixed(2)}</TableCell>
          <TableCell>{product.meassures}</TableCell>
          <TableCell>{product.category?.name}</TableCell>
          <TableCell>{product.qty}</TableCell>
          <TableCell>{product.priority}</TableCell>
          <TableCell>{product.is_published ? 'true' : 'false'}</TableCell>
          <TableCell>
            <Button
              variant="outline"
              className="mb-2"
              onClick={() => handleEdit(product)}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRemoveProduct(product.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      )
    });
  };

  const renderCreateProductModal = () => (
    <Dialog open={showCreateProductModal} onOpenChange={setShowCreateProductModal}>
      <DialogTrigger asChild>
        <Button className="mb-4"><Plus className="mr-2" />Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] overflow-y-scroll max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <ProductForm onSubmit={addProduct} />
      </DialogContent>
    </Dialog>
  );

  const renderEditProductModal = () => (
    <Dialog open={showEditProductModal} onOpenChange={setShowEditProductModal}>
      <DialogContent className="sm:max-w-[450px] overflow-y-scroll max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSubmit={updateProduct}
          initialValues={productToEdit} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      {renderCreateProductModal()}
      {renderEditProductModal()}
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
              <TableHead>Priority</TableHead>
              <TableHead>Is published</TableHead>
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