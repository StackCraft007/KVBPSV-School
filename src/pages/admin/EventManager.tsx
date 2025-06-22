import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const EventManager = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
      setEvents(data || []);
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";
    if (image) {
      const filePath = `events/${Date.now()}_${image.name}`;
      const { error } = await supabase.storage.from("images").upload(filePath, image, { upsert: true });
      if (!error) {
        const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }
    }
    const { data: newEvent, error } = await supabase.from("events").insert([{ title, description, date, image_url: imageUrl }]).select().single();
    if (!error && newEvent) setEvents(evts => [newEvent, ...evts]);
    setTitle(""); setDescription(""); setDate(""); setImage(null);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    setEvents(evts => evts.filter(e => e.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
      <form onSubmit={handleAddEvent} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="p-2 border rounded col-span-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="col-span-2"
          onChange={e => setImage(e.target.files?.[0] || null)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">Add Event</button>
      </form>
      <div>
        {events.map(evt => (
          <div key={evt.id} className="border p-4 rounded mb-4 flex items-center gap-4">
            {evt.image_url && <img src={evt.image_url} alt={evt.title} className="h-20 rounded" />}
            <div>
              <div className="font-bold">{evt.title}</div>
              <div className="text-sm text-gray-500">{evt.date}</div>
              <div>{evt.description}</div>
            </div>
            <button className="ml-auto bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(evt.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManager;