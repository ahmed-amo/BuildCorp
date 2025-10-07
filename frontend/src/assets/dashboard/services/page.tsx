"use client"

import axios from 'axios';
import type React from "react"
import { Upload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Service = {
  id: string
  title: string
  status: string
  description: string
  image_small?: string
}

axios.defaults.baseURL = "http://127.0.0.1:8000"; 
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAxiosAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Setting Axios token:', token ? 'Present' : 'Missing'); // Debug log
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    axios.defaults.withCredentials = true; // For CSRF cookies
  };

  useEffect(() => {
    setAxiosAuth(); // Set on mount
    fetchServices(); // Your existing fetch
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      
      // ✅ Debug log: Check raw status (should be "active" or "inactive")
      console.log('Raw services from backend:', response.data.data);
      
      // ✅ No conversion needed—status is already string 'active'/'inactive'
      const servicesData = response.data.data.map((service: any) => ({
        ...service,
        status: service.status || 'inactive'  // Fallback if null
      }));
      
      setServices(servicesData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch services. Please check your connection or backend.');
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingService(null)
    setFormData({ title: "", status: "", description: "" })
    setIsDialogOpen(true)
    setImageFile(null);
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      status: service.status,
      description: service.description,
    })
    setImageFile(null);
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeletingServiceId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    setAxiosAuth();
    if (deletingServiceId) {
      try {
        await axios.delete(`/api/services/${deletingServiceId}`);
        fetchServices(); // Refresh from backend
      } catch (err) {
        console.error('Failed to delete:', err);
        setError('Failed to delete service.');
      }
      setIsDeleteDialogOpen(false)
      setDeletingServiceId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      setAxiosAuth();
      // ✅ Create FormData for text + file
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('description', formData.description);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile); // ✅ Append file if selected
      }
  
      // ✅ Debug: Log FormData contents
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      if (editingService) {
        // Edit: PUT with ID
        await axios.put(`/api/services/${editingService.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for files
          },
        });
      } else {
        // Add: POST
        await axios.post('/api/services', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      // Success: Close, reset, refresh
      setIsDialogOpen(false);
      setFormData({ title: "", status: "", description: "" });
      setImageFile(null); // ✅ Reset file
      fetchServices();
    } catch (err: any) {
      console.error('Error saving service:', err.response?.data || err.message);
      if (err.response?.status === 422) {
        console.error('Validation errors:', err.response.data.errors);
        setError('Validation failed—check fields and file size.');
      } else {
        setError('Failed to save service.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Services Management</CardTitle>
              <CardDescription>Add, edit, or remove construction services</CardDescription>
            </div>
            <Button onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading services...</div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {service.status}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{service.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(service)}
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(service.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
              <DialogDescription>
                {editingService ? "Update the service details below." : "Fill in the details for the new service."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Service Image (Optional)</Label>
                <div className="relative">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*" // Only images
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)} // Set file state
                    className="cursor-pointer"
                    disabled={isSubmitting}
                  />
                  <Upload className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" /> {/* Optional icon */}
                </div>
                <p className="text-sm text-muted-foreground">Upload a JPG/PNG up to 5MB. Will be resized automatically.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingService ? "Update" : "Add"} Service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}