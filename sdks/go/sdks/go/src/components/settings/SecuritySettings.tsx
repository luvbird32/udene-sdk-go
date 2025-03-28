import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import zod from "zod";

const passwordSchema = zod.string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string) => {
    try {
      passwordSchema.parse(password);
      return true;
    } catch (err) {
      if (err instanceof zod.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (passwords.new !== passwords.confirm) {
      setError("New passwords do not match.");
      return;
    }

    if (!validatePassword(passwords.new)) {
      return; // Error is already set by validatePassword
    }

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: passwords.new 
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed. Please use your new password next time you log in.",
      });
      
      // Clear form
      setPasswords({ current: "", new: "", confirm: "" });
      
      // Log the security event (without sensitive data)
      console.log("Password change successful", new Date().toISOString());
      
    } catch (err) {
      console.error("Password change error:", err);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handlePasswordChange} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Security Settings</h2>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="text-sm text-muted-foreground">
        Password must:
        <ul className="list-disc list-inside mt-2">
          <li>Be at least 12 characters long</li>
          <li>Include at least one uppercase letter</li>
          <li>Include at least one lowercase letter</li>
          <li>Include at least one number</li>
          <li>Include at least one special character</li>
        </ul>
      </div>

      <Button type="submit">Change Password</Button>
    </form>
  );
};