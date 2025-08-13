import { supabase } from "./supabase";

interface FileObject {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: any;
  bucket_id?: string;
  path?: string;
  publicURL?: string;
}

export async function getPublicFiles(
  bucket: string,
  folder: string
): Promise<FileObject[]> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Error listing files:", error.message);
    return [];
  }

  return data.map((file) => ({
    ...file,
    publicURL: supabase.storage
      .from(bucket)
      .getPublicUrl(`${folder}/${file.name}`).data.publicUrl,
  }));
}
