import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupFormFieldsProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
}

export const SignupFormFields = ({
  name,
  email,
  password,
  confirmPassword,
  showPassword,
  isLoading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
}: SignupFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-green-400/80">
          Name
        </label>
        <Input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
          placeholder="Enter your name"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-green-400/80">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          placeholder="Enter your email"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-green-400/80">
          Password
        </label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="Enter your password"
            className="mt-1 glass-input text-green-400 placeholder:text-green-500/50 pr-10"
            disabled={isLoading}
            autoComplete="new-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-green-400/80" />
            ) : (
              <Eye className="h-4 w-4 text-green-400/80" />
            )}
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-green-400/80">
          Confirm Password
        </label>
        <Input
          id="signup-confirm-password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          required
          placeholder="Confirm your password"
          className="mt-1 glass-input text-green-400 placeholder:text-green-500/50"
          disabled={isLoading}
          autoComplete="new-password"
        />
      </div>
    </div>
  );
};