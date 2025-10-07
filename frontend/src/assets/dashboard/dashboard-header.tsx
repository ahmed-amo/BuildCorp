import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
