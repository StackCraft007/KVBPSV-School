import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const imageLabels = [
  { key: "classroom", label: "Classrooms with Students" },
  { key: "cultural", label: "Annual Cultural Festival Coming Soon" },
  { key: "sports", label: "Sports Day Competition Results" },
  { key: "science", label: "New Science Laboratory Inauguration" },
];

const ImageManager = () => {
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  useEffect(() => {
    // Optionally, fetch image URLs from a table or storage list
    // For demo, you may store mapping in a table or just use storage
  }, []);

  const handleFileChange = (key: string, file: File | null) => {
    setFiles(f => ({ ...f, [key]: file }));
  };

  const handleUpload = async (key: string) => {
    if (!files[key]) return;
    const file = files[key]!;
    const filePath = `${key}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("images").upload(filePath, file, { upsert: true });
    if (error) return alert(error.message);
    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
    setImages(imgs => ({ ...imgs, [key]: urlData.publicUrl }));
    setFiles(f => ({ ...f, [key]: null }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageLabels.map(({ key, label }) => (
          <div key={key} className="border p-4 rounded shadow">
            <div className="mb-2 font-medium">{label}</div>
            {images[key] && (
              <img src={images[key]} alt={label} className="h-32 mb-2 rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileChange(key, e.target.files?.[0] || null)}
            />
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => handleUpload(key)}
              disabled={!files[key]}
            >
              Upload
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;