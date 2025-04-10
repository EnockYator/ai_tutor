import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { requestNote } from "@/store/request-slice";

const initialState = {
  fullName: "",
  email: "",
  healthCareFacility: "",
  beginningDate: "",
  returnDate: "",
  reason: "",
  acceptedTerms: false,
  createdAt: new Date().toISOString(),
};


const RequestNote = () => {
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Basic form validation before submitting
  function validateForm(data) {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.healthCareFacility ||
      !formData.beginningDate ||
      !formData.returnDate ||
      !formData.reason
    ) {
      return "All fields are required.";
    }
    if (!formData.acceptedTerms) {
      return "You must accept the terms of service.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);


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
      setIsLoading(true);
      const result = await dispatch(requestNote(formData)).unwrap();

      // // console.log("Login Result:", result); // Check what you're getting back
      // // console.log("User after setAuth:", result.user); // Check what you're setting
      
      // // Dispatch the setAuth action to update the Redux state
      // dispatch(setAuth({
      //   isAuthenticated: result.isAuthenticated,
      //   user: result.user,  // User data from the response (including role, etc.)
      //   accessToken: result.accessToken, // accessToken from the response
      // }));

      toast({
        title: "Success",
        description: result.message, // Backend response message
        className: "bg-toastSuccess text-white max-w-md h-16 z-50",
        duration: 3000,
      });

      // Refresh form
      setFormData(initialState);

    } catch (error) {
      toast({
        title: "Failed",
        description: error.message || "An error occurred while sending your request.",
        className: "bg-toastError text-white max-w-md h-16 z-50",
        duration: 3000,
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  // console.log(formData);

  return (
    <div className="w-full min-h-full flex flex-col">
      <div>
        <h1 className="text-lg font-bold text-center mb-4 tracking-tight text-blue-600">Request a Note</h1>
      </div>
      <div className="w-full flex flex-col  bg-white rounded-lg p-4 md:p-10 shadow-lg space-y-2">
        <p className="font-semibold text-gray-700 tracking-tighter mx-2">Please provide your details below to request for a new note.</p>
        {/* Form */}
        <form className="w-full max-w-md space-y-5 py-2">
          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="fullName">Full Name:</label>
            <input 
            type="text" 
            name="fullName" 
            value={formData.fullName || ""}
            id="fullName" 
            placeholder="Enter your name" 
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px]"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="email">Email:</label>
            <input 
            type="email" 
            name="email" 
            value={formData.email || ""}
            id="email" 
            placeholder="Enter your email address" 
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px]"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="facilityName">Name of health care facility:</label>
            <input 
            type="text" 
            name="healthCareFacility" 
            value={formData.healthCareFacility || ""}
            id="healthCareFacility" 
            placeholder="Add name of the facilty you want to get the note from" 
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px]"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="beginningDate">Beginning Date:</label>
            <input 
            type="date" 
            name="beginningDate" 
            value={formData.beginningDate || ""}  
            id="beginningDate"
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px]"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="returnDate">Return Date:</label>
            <input 
            type="date" 
            name="returnDate" 
            value={formData.returnDate || ""}  
            id="returnDate"
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px]"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex flex-col justify-between space-y-2">
            <label htmlFor="reason">Reason for requesting note:</label>
            <textarea
            name="reason" 
            value={formData.reason || ""}  
            id="reason" 
            placeholder="Add reason for requesting the note"  
            className="border-[1.5px] border-blue-400 rounded-md px-2 py-[6px] h-20 max-h-28"
            onChange={handleInputChange}
            required />
          </div>

          <div className="max-w-md flex justify-center space-x-2">
            <input 
            type="checkbox" 
            name="acceptedTerms" 
            checked={formData.acceptedTerms}
            id="acceptedTerms"
            onChange={handleInputChange}
            required />
            <p>I have read and accept the
              <Link to="/terms-of-service"
              className="text-blue-700 ml-1"
              >Terms Of Service</Link>
            </p>
          </div>

          <div>
            <Button
            type="submit"
            onClick={onSubmit}
            className="w-full px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-900"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default RequestNote;
