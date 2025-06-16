import { supabase } from "@/app/lib/supabase/client"

export async function getLastImagePublicUrl(bucket, folder) {

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder)

  if (error) {
    console.error('Error listing files:', error)
    return null
  }
  if (!data || data.length === 0) {
    console.warn('No files found in folder')
    return null
  }

  const sorted = data
    .sort((a, b) => {
      const timeA = parseInt(a.name)
      const timeB = parseInt(b.name)
      return timeB - timeA 
    })

  const latestFile = sorted[0]
  const fullPath = folder ? `${folder}/${latestFile.name}` : latestFile.name

  const { data: urlData } = await supabase.storage
    .from(bucket)
    .getPublicUrl(fullPath);

  return urlData?.publicUrl || null
}