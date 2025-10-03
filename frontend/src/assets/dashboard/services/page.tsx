"use client"

import axios from 'axios';
import type React from "react"

import { useEffect, useState } from "react"
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
  status:string
  description: string
  image_small?: string
}
axios.defaults.baseURL = "http://127.0.0.1:8000"; 
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true);
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
  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch services.');
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');  // Calls your Laravel endpoint
        setServices(response.data.data);  // response.data is the JSON array from backend
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services. Please check your connection or backend.');
        setLoading(false);
      }
    };
  
    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingService(null)
    setFormData({ title: "", status: "", description: "" })
    setIsDialogOpen(true)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      status: service.status,
      description: service.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeletingServiceId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deletingServiceId) {
      setServices(services.filter((s) => s.id !== deletingServiceId))
      setIsDeleteDialogOpen(false)
      setDeletingServiceId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingService) {
      // Update existing service
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? { ...s, title: formData.title, status: formData.status, description: formData.description }
            : s,
        ),
      )
    } else {
      // Add new service
      const response = await axios.post('/api/services', {
        title: formData.title,  // Or 'name' if backend uses that
        status: formData.status,
        description: formData.description,
      });
    }

    setIsDialogOpen(false)
    setFormData({ title: "", status: "", description: "" })
    fetchServices();
  }

  

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
              <div className="text-center py-4">Loading services...</div>) : error ? (
                    <div className="text-center py-4 text-destructive">{error}</div>) : (
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
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  placeholder="Active/Not Active"
                  required
                />
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
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
