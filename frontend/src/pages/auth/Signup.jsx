import { register} from "@/store/auth-slice";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: '',
  email: '',
  password: '',
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);  // New state for loading
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Basic form validation before submitting
  function validateForm(data) {
    if (!data.email || !data.password) {
      return "All fields are required!";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return "Please enter a valid email address.";
    }
    if (data.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return null;
  }

  // Form submission handler
  async function onSubmit(event) {
    event.preventDefault();

    const validationError = validateForm(formData);
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true); // Set loading to true when submitting

      // Add the `role` field to the formData
      const customerFormData = { ...formData, role: "customer" };
      console.log(customerFormData);

      const result = await dispatch(register(customerFormData)).unwrap();
      toast({
        title: "Success",
        description: result.message || "Registration successful!", // Message from backend registerCustomer endpoint
        className: "bg-toastSuccess  text-white max-w-md h-16 z-50",
        duration: 3000,
      });
      // Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred.",
        className: "bg-toastError  text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    } finally {
      setIsLoading(false); // Set loading to false after request completion
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md space-y-4 md:space-y-6">
      <div className="text-center">
        <h1 className="text-xl md:text-3xl text-blue-700 font-bold tracking-tight">
          Create an Account
        </h1>
      </div>
      <p className="mt-2 text-center">
          Already have an account?
          <Link
            className="font-medium text-blue-900 hover:underline ml-2"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      <CommonForm
        formControls={registerFormControls}
        buttonText={isLoading ? 'Signing Up...' : 'Sign Up'} // Change button text based on loading state
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        disabled={isLoading} // Disable form while loading
      />
    </div>

  );
}

export default AuthRegister;
