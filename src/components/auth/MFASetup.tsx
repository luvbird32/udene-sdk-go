import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { QrCode, Smartphone, Mail } from "lucide-react"

export function MFASetup() {
  const [method, setMethod] = useState<string>("app")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSetup = async () => {
    setIsLoading(true)
    try {
      // Here we would normally call the API to set up MFA
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
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
        <RadioGroup
          defaultValue="app"
          onValueChange={setMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="app" id="app" />
            <Label htmlFor="app" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Authenticator App
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms" />
            <Label htmlFor="sms" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              SMS Authentication
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Authentication
            </Label>
          </div>
        </RadioGroup>

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