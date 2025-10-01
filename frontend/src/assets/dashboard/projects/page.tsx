"use client"

import type React from "react"

import { useState } from "react"
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
import { Plus, Pencil, Trash2, Search } from "lucide-react"

type Project = {
  id: string
  title: string
  city: string
  category: "Corporate" | "Residential" | "Civil" | "Specialty"
  description: string
  image: string
  year: string
}

const initialProjects: Project[] = [
  {
    id: "manhattan-tower",
    title: "Manhattan Business Tower",
    city: "New York",
    category: "Corporate",
    description:
      "45-story commercial complex featuring sustainable design and modern office spaces in the heart of Manhattan.",
    image: "/modern-skyscraper-manhattan-business-tower.jpg",
    year: "2024",
  },
  {
    id: "chicago-residential",
    title: "Lakefront Residences",
    city: "Chicago",
    category: "Residential",
    description: "Luxury waterfront residential development with 200 units overlooking Lake Michigan.",
    image: "/luxury-residential-building-chicago-lakefront.jpg",
    year: "2023",
  },
  {
    id: "miami-bridge",
    title: "Biscayne Bay Bridge",
    city: "Miami",
    category: "Civil",
    description: "State-of-the-art cable-stayed bridge connecting downtown Miami with enhanced pedestrian walkways.",
    image: "/modern-cable-bridge-miami-bay.jpg",
    year: "2024",
  },
  {
    id: "seattle-hospital",
    title: "Pacific Medical Center",
    city: "Seattle",
    category: "Specialty",
    description: "Advanced healthcare facility with specialized surgical suites and patient-centered design.",
    image: "/modern-hospital-building-seattle.jpg",
    year: "2023",
  },
  {
    id: "denver-stadium",
    title: "Rocky Mountain Arena",
    city: "Denver",
    category: "Specialty",
    description: "Multi-purpose sports and entertainment venue with retractable roof and sustainable features.",
    image: "/modern-stadium-denver-mountains.jpg",
    year: "2024",
  },
  {
    id: "austin-tech-campus",
    title: "Innovation Tech Campus",
    city: "Austin",
    category: "Corporate",
    description: "Collaborative workspace campus for tech companies with flexible office configurations.",
    image: "/modern-tech-campus-austin-texas.jpg",
    year: "2023",
  },
]

const categoryColors = {
  Corporate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Residential: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Civil: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Specialty: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    city: "",
    category: "Corporate",
    description: "",
    image: "",
    year: new Date().getFullYear().toString(),
  })

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.year.includes(searchQuery),
  )

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        city: project.city,
        category: project.category,
        description: project.description,
        image: project.image,
        year: project.year,
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        city: "",
        category: "Corporate",
        description: "",
        image: "",
        year: new Date().getFullYear().toString(),
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProject(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProject) {
      setProjects(
        projects.map((project) => (project.id === editingProject.id ? { ...formData, id: project.id } : project)),
      )
    } else {
      const newProject: Project = {
        ...formData,
        id: formData.title.toLowerCase().replace(/\s+/g, "-"),
      }
      setProjects([...projects, newProject])
    }

    handleCloseDialog()
  }

  const handleDelete = (id: string) => {
    setDeletingProjectId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deletingProjectId) {
      setProjects(projects.filter((project) => project.id !== deletingProjectId))
      setDeletingProjectId(null)
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projects Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your construction projects, add new projects, and update existing ones.
        </p>
      </div>

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
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by title, city, category, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No projects found. {searchQuery && "Try adjusting your search."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.city}</TableCell>
                      <TableCell>
                        <Badge className={categoryColors[project.category]}>{project.category}</Badge>
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
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Project["category"]) => setFormData({ ...formData, category: value })}
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
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/project-image.jpg"
                  required
                />
                <p className="text-sm text-muted-foreground">Enter the path or URL to the project image</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {editingProject ? "Update Project" : "Add Project"}
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
