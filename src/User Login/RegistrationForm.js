import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    occupation: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors }));
  };

  const validateField = (name, value) => {
    const newErrors = {};
    const namePattern = /^[A-Za-z]+$/;

    switch (name) {
      case "firstName":
        if (!value) {
          newErrors.firstName = "First Name is required";
        } else if (!namePattern.test(value)) {
          newErrors.firstName = "First Name can only contain letters";
        } else if (value.length > 60) {
          newErrors.firstName = "First Name must not exceed 60 characters";
        }
        break;

      // Validation for other fields (lastName, email, mobile, etc.)

      default:
        break;
    }

    return newErrors[name];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formData).reduce((acc, field) => {
      const fieldError = validateField(field, formData[field]);
      if (fieldError) {
        acc[field] = fieldError;
      }
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post("http://localhost:8989/register", formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        gender: "",
        occupation: "",
      });

      navigate("/user-login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Account already exists with this email.",
          showConfirmButton: false,
          timer: 1500,
        });
        setErrors({ email: "Account already exists with this email." });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to register user. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        setErrors({ api: "Failed to register user. Please try again." });
      }
    }
  };

  return (
    <div className="container" style={{ width: "500px" }}>
      <h2>Registration Form</h2>
      {errors.api && <div className="error">{errors.api}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`form-control ${errors.occupation ? "is-invalid" : ""}`}
          />
          {errors.occupation && <div className="invalid-feedback">{errors.occupation}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <div className="form-group">
        <p>
          Already registered? <a href="/user-login">Click here for login</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
