/* eslint-disable react/prop-types */


export const Toast = ({ title, description, variant }) => {
    const variantClass = {
      default: "toast-default",
      destructive: "toast-destructive",
      success: "toast-success",
      info: "toast-info",
      warning: "toast-warning",
      loading: "toast-loading"
    }[variant || "default"];
  
    return (
      <div className={`toast ${variantClass}`}>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    );
  };