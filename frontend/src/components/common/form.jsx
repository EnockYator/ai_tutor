/* eslint-disable react/prop-types */

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function renderInputsByComponentType(controlItem, formData, setFormData) {
    const value = formData[controlItem.name] || "";
  
    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            type={controlItem.type || "text"}
            placeholder={controlItem.placeholder || "Enter value"}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
  
    case "select":
      return (
        <Select
          onValueChange={(value) =>
            setFormData({
              ...formData,
              [controlItem.name]: value, // Update the form data with the selected value
            })
          }
          value={formData[controlItem.name]} // Bind the value to the selected value in form data
          >
          <SelectTrigger className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <SelectValue
            placeholder={controlItem.placeholder || "Select an option"}
            >
              {formData[controlItem.name] &&
              controlItem.options.find(
                (option) => option.id === formData[controlItem.name]
                )?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border border-gray-300 rounded-lg bg-white shadow-lg">
              {controlItem.options?.length > 0 ? (
                controlItem.options.map((optionItem) => (
                  <SelectItem
                  key={optionItem.id}
                  value={optionItem.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {optionItem.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No options available</SelectItem>
              )}
            </SelectContent>
          </Select>
        );


  
      case "radio":
        return (
          <div className="flex gap-3">
            {controlItem.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                  <input
                  type="radio"
                  id={`${controlItem.name}-${option.id}`}
                  name={controlItem.name}
                  value={option.id}
                  checked={value === option.id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [controlItem.name]: e.target.value,
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                  <label 
                    htmlFor={`${controlItem.name}-${option.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {option.label}
                  </label>
              </div>
            ))}
          </div>
        );
  
      case "textarea":
        return (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder || "Enter value"}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
  
      default:
        return null;
    }
  }
  

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="flex flex-col gap-2">
          <Label htmlFor={controlItem.name} className="text-sm font-medium">
            {controlItem.label || controlItem.name}
          </Label>
          {renderInputsByComponentType(controlItem, formData, setFormData)}
        </div>
      ))}
      <Button type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
