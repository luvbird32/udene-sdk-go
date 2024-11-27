import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const RESEND_COOLDOWN = 60; // 60 seconds cooldown
const OTP_LENGTH = 6;

export function EmailVerification() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const { toast } = useToast()

  const handleComplete = async (value: string) => {
    if (value.length !== OTP_LENGTH) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: `Please enter a ${OTP_LENGTH}-digit verification code.`,
      })
      return;
    }

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

  const startCooldown = useCallback(() => {
    setCooldown(RESEND_COOLDOWN);
    const timer = setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }, []);

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    try {
      // Here we would normally call the API to resend the code
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      })
      startCooldown();
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
            maxLength={OTP_LENGTH}
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
          disabled={isLoading || cooldown > 0}
        >
          {cooldown > 0 ? `Resend Code (${cooldown}s)` : 'Resend Code'}
        </Button>
      </CardContent>
    </Card>
  )
}