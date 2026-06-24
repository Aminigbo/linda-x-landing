import { supabase } from "@/lib/supabase/client";

export const uploadImage = async (file, folder = "blog-images") => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage.from("book").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("book").getPublicUrl(filePath);

    return { success: true, url: publicUrl, path: filePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
};

export const deleteImage = async (filePath) => {
  try {
    const { error } = await supabase.storage.from("book").remove([filePath]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};
