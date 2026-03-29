export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );
  formData.append("folder", "obume/works");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
    { method: "POST", body: formData },
  );

  const data = await res.json();

  if (!data.secure_url) throw new Error("Cloudinary upload failed");

  return {
    url: data.secure_url as string,
    publicId: data.public_id as string,
  };
}
