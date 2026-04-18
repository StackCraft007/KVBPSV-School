import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, Trash2, LogOut, Plus, Image as ImageIcon, Film, Newspaper, Calendar, Pencil, X } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("General");
  const [file, setFile] = useState<File | null>(null);
  
  // News state
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [newsTitleEn, setNewsTitleEn] = useState("");
  const [newsTitleMr, setNewsTitleMr] = useState("");
  const [newsDescEn, setNewsDescEn] = useState("");
  const [newsDescMr, setNewsDescMr] = useState("");
  const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
  const [newsFile, setNewsFile] = useState<File | null>(null);
  const [newsUploading, setNewsUploading] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/admin/login");
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/admin/login");
    });

    fetchItems();
    fetchNews();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setItems(data || []);
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .order("date", { ascending: false });

    if (!error) setNewsItems(data || []);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return toast.error("Please provide a title and a file");

    setUploading(true);
    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default");
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.error) throw data.error;

      // 2. Save to Supabase
      const { error: dbError } = await supabase.from("gallery_items").insert([
        {
          title,
          album,
          url: data.secure_url,
          public_id: data.public_id,
          type: data.resource_type, // 'image' or 'video'
        },
      ]);

      if (dbError) throw dbError;

      toast.success("Uploaded successfully!");
      setTitle("");
      setFile(null);
      fetchItems();
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase.from("gallery_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("Item deleted");
      fetchItems();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNewsId && (!newsFile || !newsTitleEn || !newsTitleMr)) {
      return toast.error("Please provide titles and an image");
    }

    setNewsUploading(true);
    try {
      let finalImageUrl = "";
      let finalPublicId = "";

      // 1. Upload to Cloudinary if a new file is provided
      if (newsFile) {
        const formData = new FormData();
        formData.append("file", newsFile);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default");
        formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudData = await res.json();
        if (cloudData.error) throw cloudData.error;
        finalImageUrl = cloudData.secure_url;
        finalPublicId = cloudData.public_id;
      }

      // 2. Save to Supabase (Update or Insert)
      if (editingNewsId) {
        const updateData: any = {
          title_en: newsTitleEn,
          title_mr: newsTitleMr,
          description_en: newsDescEn,
          description_mr: newsDescMr,
          date: newsDate,
        };
        if (finalImageUrl) {
          updateData.image_url = finalImageUrl;
          updateData.public_id = finalPublicId;
        }

        const { error: dbError } = await supabase
          .from("news_items")
          .update(updateData)
          .eq("id", editingNewsId);

        if (dbError) throw dbError;
        toast.success("News updated successfully!");
      } else {
        const { error: dbError } = await supabase.from("news_items").insert([
          {
            title_en: newsTitleEn,
            title_mr: newsTitleMr,
            description_en: newsDescEn,
            description_mr: newsDescMr,
            date: newsDate,
            image_url: finalImageUrl,
            public_id: finalPublicId,
          },
        ]);

        if (dbError) throw dbError;
        toast.success("News published successfully!");
      }

      cancelNewsEdit();
      fetchNews();
    } catch (error: any) {
      toast.error(error.message || "News operation failed");
    } finally {
      setNewsUploading(false);
    }
  };

  const handleNewsEdit = (item: any) => {
    setEditingNewsId(item.id);
    setNewsTitleEn(item.title_en);
    setNewsTitleMr(item.title_mr);
    setNewsDescEn(item.description_en);
    setNewsDescMr(item.description_mr);
    setNewsDate(item.date);
    setNewsFile(null); // Clear any pending file upload
    setActiveTab("news-add");
  };

  const cancelNewsEdit = () => {
    setEditingNewsId(null);
    setNewsTitleEn("");
    setNewsTitleMr("");
    setNewsDescEn("");
    setNewsDescMr("");
    setNewsDate(new Date().toISOString().split('T')[0]);
    setNewsFile(null);
  };

  const handleNewsDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const { error } = await supabase.from("news_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("News deleted");
      fetchNews();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-orange-600" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-500">Welcome back, Teacher</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={18} /> Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="upload" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Upload size={18} className="mr-2" /> Upload New
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <ImageIcon size={18} className="mr-2" /> Manage Gallery
            </TabsTrigger>
            <TabsTrigger value="news-add" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Newspaper size={18} className="mr-2" /> Add News
            </TabsTrigger>
            <TabsTrigger value="news-manage" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <Trash2 size={18} className="mr-2" /> Manage News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card className="shadow-lg border-t-4 border-t-orange-600">
              <CardHeader>
                <CardTitle>Add to Gallery</CardTitle>
                <CardDescription>Upload photos or videos. Cloudinary will optimize them automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Item Title</label>
                      <Input 
                        placeholder="e.g. Science Exhibition 2024" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Album / Category</label>
                      <Input 
                        placeholder="e.g. Sports, Cultural, Campus" 
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-orange-400 transition-colors bg-orange-50/10">
                    <Input 
                      type="file" 
                      className="hidden" 
                      id="gallery-file"
                      accept="image/*,video/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="gallery-file" className="cursor-pointer flex flex-col items-center">
                      <div className="p-4 bg-orange-100 rounded-full text-orange-600 mb-4">
                        <Plus size={32} />
                      </div>
                      <span className="text-lg font-medium text-gray-700">
                        {file ? file.name : "Click to select a photo or video"}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">Max file size depends on your Cloudinary plan</p>
                    </label>
                  </div>

                  <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg" disabled={uploading}>
                    {uploading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2" />}
                    {uploading ? "Uploading..." : "Publish to Gallery"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden group shadow hover:shadow-md transition-shadow">
                  <div className="relative aspect-video bg-gray-100">
                    {item.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Film size={48} />
                      </div>
                    ) : (
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="rounded-full shadow-lg"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold truncate" title={item.title}>{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.album}</p>
                  </CardContent>
                </Card>
              ))}
              {items.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No items in the gallery yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="news-add">
            <Card className="shadow-lg border-t-4 border-t-orange-600">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingNewsId ? "Edit News Entry" : "Add News / Announcement"}</CardTitle>
                  <CardDescription>
                    {editingNewsId ? "Update your existing news entry below." : "Post news in both English and Marathi for the bilingual website."}
                  </CardDescription>
                </div>
                {editingNewsId && (
                  <Button variant="ghost" onClick={cancelNewsEdit} className="text-gray-500 hover:text-red-600">
                    <X size={20} className="mr-1" /> Finish Editing
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-orange-600">English Title</label>
                        <Input 
                          placeholder="Headline in English" 
                          value={newsTitleEn}
                          onChange={(e) => setNewsTitleEn(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-orange-600">English Info / Description</label>
                        <textarea 
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Details in English"
                          value={newsDescEn}
                          onChange={(e) => setNewsDescEn(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-blue-600">Marathi Title (मराठी हेडलाईन)</label>
                        <Input 
                          placeholder="मराठीत शीर्षक" 
                          value={newsTitleMr}
                          onChange={(e) => setNewsTitleMr(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-blue-600">Marathi Info (मराठीत माहिती)</label>
                        <textarea 
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="मराठीत माहिती"
                          value={newsDescMr}
                          onChange={(e) => setNewsDescMr(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar size={16} /> News Date
                      </label>
                      <Input 
                        type="date" 
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium">News Image {editingNewsId && "(Leave empty to keep existing)"}</label>
                       <div className="border border-input rounded-md p-2 bg-white">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => setNewsFile(e.target.files?.[0] || null)}
                          required={!editingNewsId}
                        />
                       </div>
                    </div>
                  </div>

                  <Button className={`w-full h-12 ${editingNewsId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-lg`} disabled={newsUploading}>
                    {newsUploading ? <Loader2 className="animate-spin mr-2" /> : (editingNewsId ? <Pencil className="mr-2" /> : <Plus className="mr-2" />)}
                    {newsUploading ? "Processing..." : (editingNewsId ? "Update News Entry" : "Publish News Entry")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news-manage">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group shadow hover:shadow-md transition-shadow flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 aspect-square md:aspect-auto relative bg-gray-100">
                    <img src={item.image_url} alt={item.title_en} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold uppercase tracking-tighter">
                          {item.date}
                       </span>
                       <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-7 w-7 rounded-sm border-orange-200 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleNewsEdit(item)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="h-7 w-7 rounded-sm"
                          onClick={() => handleNewsDelete(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                       </div>
                    </div>
                    <h3 className="font-bold text-sm line-clamp-1 text-orange-600">{item.title_en}</h3>
                    <h3 className="font-bold text-sm line-clamp-1 text-blue-600 mb-2">{item.title_mr}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 italic">EN: {item.description_en}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-2 italic">MR: {item.description_mr}</p>
                  </CardContent>
                </Card>
              ))}
              {newsItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-xl border border-dashed">
                  <Newspaper size={48} className="mx-auto mb-4 opacity-10" />
                  <p className="text-lg">No news published yet.</p>
                </div>
              )}            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
