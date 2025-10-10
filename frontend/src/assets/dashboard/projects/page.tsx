"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000"

interface Project {
  id: number
  title: string
  description?: string
  category: string
  year: number
  city: string
  slug?: string
  image_small?: string
  image_large?: string
  image_extra?: string
}

interface FormData {
  title: string
  city: string
  category: string
  description: string
  year: number
  image?: File | null
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    city: "",
    category: "Corporate",
    description: "",
    year: new Date().getFullYear(),
    image: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Set authorization token for all requests
  const setAxiosAuth = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }

  // Fetch all projects on component mount
  useEffect(() => {
    setAxiosAuth()
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/projects")
      setProjects(response.data.data || [])
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Open dialog for creating or editing
  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        city: project.city,
        category: project.category,
        description: project.description || "",
        year: project.year,
        image: null,
      })
      // Set preview to existing image
      if (project.image_extra) {
        setImagePreview(`http://127.0.0.1:8000/storage/${project.image_extra}`)
      }
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        city: "",
        category: "Corporate",
        description: "",
        year: new Date().getFullYear(),
        image: null,
      })
      setImagePreview(null)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProject(null)
    setImagePreview(null)
    setError(null)
  }

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit form (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("city", formData.city)
      submitData.append("category", formData.category)
      submitData.append("description", formData.description)
      submitData.append("year", formData.year.toString())
      
      if (formData.image) {
        submitData.append("image", formData.image)
      }

      if (editingProject) {
        // UPDATE existing project
        submitData.append("_method", "PUT") // Laravel method spoofing
        const response = await axios.post(
          `/api/projects/${editingProject.id}`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        
        // Update project in state
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id ? response.data.data : p
          )
        )
      } else {
        // CREATE new project
        const response = await axios.post("/api/projects", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        
        // Add new project to state
        setProjects([...projects, response.data.data])
      }

      handleCloseDialog()
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors ||
          "Failed to save project"
      )
      console.error("Submit error:", err.response?.data)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open delete confirmation dialog
  const handleDelete = (id: number) => {
    setDeletingProjectId(id)
    setIsDeleteDialogOpen(true)
  }

  // Confirm and execute delete
  const confirmDelete = async () => {
    if (!deletingProjectId) return

    try {
      await axios.delete(`/api/projects/${deletingProjectId}`)
      
      // Remove from state
      setProjects(projects.filter((p) => p.id !== deletingProjectId))
      setDeletingProjectId(null)
      setIsDeleteDialogOpen(false)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete project")
      console.error("Delete error:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projects Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your construction projects, add new projects, and update existing ones.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>A list of all projects in your portfolio</CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        {project.image_extra ? (
                          <img
                            src={`http://127.0.0.1:8000/storage/${project.image_extra}`}
                            alt={project.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            No img
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{project.city}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-800 text-white px-2 py-1 text-xs rounded-full">
                          {project.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.year}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(project)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit project</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(project.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete project</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update the project details below."
                : "Fill in the details to add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Manhattan Business Tower"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    placeholder="2024"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                    <SelectItem value="Specialty">Specialty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the project details, features, and highlights..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Project Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  {editingProject ? "Upload a new image to replace the existing one" : "Upload an image for this project"}
                </p>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {editingProject ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{editingProject ? "Update Project" : "Add Project"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project from your portfolio.
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