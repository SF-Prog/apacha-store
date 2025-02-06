import { supabase } from '@/lib/supabase/client';
import { isAdmin } from '@/actions/is-current-user-admin';

export async function updateProduct(userId, productId, updatedData) {
  // Check if the user is an admin
  const adminCheck = await isAdmin(userId);
  if (!adminCheck) {
    throw new Error('Unauthorized: You are not allowed to modify products.');
  }

  // Proceed with the update
  const { data, error } = await supabase
    .from('products')
    .update(updatedData)
    .eq('id', productId);

  if (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }

  return data;
}