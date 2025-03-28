import { Input } from "@/components/ui/input";

interface LoginFormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

/**
 * Contains the email and password input fields for the login form
 * Manages the input state through props
 */
export const LoginFormFields = ({ 
  email, 
  setEmail, 
  password, 
  setPassword 
}: LoginFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full"
        />
      </div>
    </>
  );
};