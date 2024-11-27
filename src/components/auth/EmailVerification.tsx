import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function EmailVerification() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleComplete = async (value: string) => {
    setIsLoading(true)
    try {
      // Here we would normally verify the code with the API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Please check the code and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      // Here we would normally call the API to resend the code
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend code. Please try again.",
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Enter the verification code sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={6}
            onComplete={handleComplete}
            disabled={isLoading}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResend}
          disabled={isLoading}
        >
          Resend Code
        </Button>
      </CardContent>
    </Card>
  )
}