// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
// import { AddProductForm } from '@/components/admin-panel/add-product-form/add-product-form';
// import { useAdmin } from '@/context/admin-context';

// export function ProductsPanel() {
//   const {
//     productsList,
//     removeProduct,
//   } = useAdmin();

//   const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
//   const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false);

//   const onEdit = () => {
//     setShowEditProductModal(true);
//   };

//   const onAdd = () => {
//     setShowAddProductModal(true);
//   };

//   const handleRemoveProduct = (index: number) => {
//     const product = productsList[index];
//     const { id } = product;
//     removeProduct(id);
//   };

//   const renderEditProductModal = () => {
//     if (!showEditProductModal) return;
//     return (
//       <Dialog open={true} onOpenChange={() => setShowEditProductModal(false)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Product</DialogTitle>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     );
//   };

//   const renderAddProductModal = () => {
//     if (!showAddProductModal) return;
//     return (
//       <Dialog open={true} onOpenChange={() => setShowAddProductModal(false)}>
//         <DialogContent className="sm:max-h-[720px] overflow-auto">
//           <DialogHeader>
//             <DialogTitle>Add New Product</DialogTitle>
//           </DialogHeader>
//           <AddProductForm />
//         </DialogContent>
//       </Dialog>
//     );
//   };

//   const renderProductsList = () => {
//     if (!productsList.length) return;

//     return productsList.map((product, index) => {
//         return (
//           <TableRow key={product.id}>
//             <TableCell>{product.title}</TableCell>
//             <TableCell>${product.price}</TableCell>
//             <TableCell>
//               <Button
//                 variant="outline"
//                 className="mr-2"
//                 onClick={onEdit}>
//                   Edit
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={() => handleRemoveProduct(index)}>
//                   Remove
//               </Button>
//             </TableCell>
//           </TableRow>
//         )
//       });
//   };

//   return (
//     <div>
//       {renderAddProductModal()}
//       {renderEditProductModal()}
//       <h2 className="text-2xl font-bold mb-4">Products</h2>
//       <Button className="mb-4" onClick={onAdd}>Add Product</Button>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {renderProductsList()}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdmin } from '@/context/admin-context'
import Image from 'next/image'
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

  const renderProductsList = () => {
    if (!productsList.length) return null;

    return productsList.map((product, index) => (
      <TableRow key={product.id}>
        <TableCell>
          {product.image && (
            <Image
              style={{ borderRadius: '5px', objectFit: 'cover' }}
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={50}
              height={50} />
          )}
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
    ));
  };

  const renderCreateProductModal = () => (
    <DialogContent className="sm:max-w-[425px]">
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