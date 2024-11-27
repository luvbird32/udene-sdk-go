/**
 * MFASetup Component
 * Handles the setup of Multi-Factor Authentication methods.
 * Supports three authentication methods: authenticator app, SMS, and email.
 */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { QrCode, Smartphone, Mail } from "lucide-react"

export function MFASetup() {
  // State for tracking selected authentication method and loading state
  const [method, setMethod] = useState<string>("app")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  /**
   * Handles the MFA setup process
   * Makes API call to set up the selected authentication method
   */
  const handleSetup = async () => {
    setIsLoading(true)
    try {
      // Simulated API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "MFA Enabled",
        description: `Multi-factor authentication has been set up using ${
          method === "app" ? "authenticator app" : 
          method === "sms" ? "SMS" : "email"
        }.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Setup failed",
        description: "Failed to set up MFA. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Set Up Two-Factor Authentication</CardTitle>
        <CardDescription>
          Choose your preferred method for two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* MFA method selection radio group */}
        <RadioGroup
          defaultValue="app"
          onValueChange={setMethod}
          className="space-y-4"
        >
          {/* Authenticator app option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="app" id="app" />
            <Label htmlFor="app" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Authenticator App
            </Label>
          </div>
          {/* SMS authentication option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms" />
            <Label htmlFor="sms" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              SMS Authentication
            </Label>
          </div>
          {/* Email authentication option */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Authentication
            </Label>
          </div>
        </RadioGroup>

        {/* Setup confirmation button */}
        <Button 
          onClick={handleSetup} 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Setting up..." : "Enable 2FA"}
        </Button>
      </CardContent>
    </Card>
  )
}