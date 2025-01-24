'use client'

import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdmin } from '@/context/admin-context';

interface Product {
  id: number
  name: string
  price: number
}

export function ProductsPanel() {
  const {
    productsList,
    addProduct,
    removeProduct,
    editProduct
  } = useAdmin();

  const [newProduct, setNewProduct] = useState({ name: '', price: 0 })
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)

  const handleAddProduct = (product) => {
    const newProductsList = [
      ...productsList,
      { ...product, id: Date.now() }
    ];

    addProduct(product);
  };

  const onEdit = () => {
    if (!editingProduct) return;
    editProduct(editingProduct);
    setEditingProduct(null)
  };

  const handleRemoveProduct = (index: number) => {
    removeProduct(index);
  };

  const renderEditProduct = () => {
    if (!editingProduct) return;
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mr-2">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Product Name"
              value={editingProduct?.title || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct!, title: e.target.value })}
            />
            <Input
              placeholder="Product Description"
              value={editingProduct?.description || ''}
              onChange={(e) => setEditingProduct({ ...editingProduct!, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={editingProduct?.price || 0}
              onChange={(e) => setEditingProduct({ ...editingProduct!, price: Number(e.target.value) })}
            />
            <Button onClick={onEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
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
                  {renderEditProduct()}
                  <Button variant="destructive" onClick={() => handleRemoveProduct(index)}>
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