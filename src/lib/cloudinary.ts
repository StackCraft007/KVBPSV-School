export async function uploadToCloudinary(file: File): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/dosowvwzi/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'gallery_unsigned'); // Set in Cloudinary dashboard

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Cloudinary upload failed');
  return data.secure_url;
}