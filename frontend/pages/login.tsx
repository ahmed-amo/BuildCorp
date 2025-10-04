import React, { useState } from "react";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../src/components/ui/card";
import { Alert, AlertDescription } from "../src/components/ui/alert";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ✅ Step 1: Fetch Sanctum CSRF cookie (sets XSRF-TOKEN for security)
      await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        credentials: "include", // Include cookies for SPA auth
      });

      // ✅ Step 2: Now send login POST with CSRF protection
      const response = await fetch("http://127.0.0.1:8000/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Send the CSRF cookie with the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.status) {
        setError(data.message || "Invalid credentials");
      } else {
        // ✅ Save with context (token will flow to localStorage via AuthContext)
        login({ token: data.token, id: data.id });

        console.log("Login successful:", data);
        navigate("/dashboard/stats");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mt-10">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="flex flex-col space-y-2 text-sm text-center">
              <a
                href="/forgot-password"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset not implemented");
                }}
              >
                Forgot your password?
              </a>
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Signup not implemented");
                  }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}