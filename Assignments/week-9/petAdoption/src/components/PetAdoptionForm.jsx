import React, { useState } from "react";
import AdopterData from "./AdopterData";
import { validation } from "../utils/validation"

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    petName: "",
    petType: "Dog",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",
  });

  const [showTable, setShowTable] = useState(false);
  const { petName, petType, breed, adopterName, email, phone } = values;
  console.log(petName, petType, breed, adopterName, email, phone);

  const [errors, setErrors] = useState({
    petName: "",
    petType: "",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value
    }));

    let errorsCopy = { ...errors };
    const errorR = validation(name, value, errorsCopy);
    setErrors(errorR);
  };

  const handleSubmit = () => {
    console.log(
      `Pet Name: ${petName}
      Pet Type: ${petType}
      Breed: ${breed}
      Adopter Name: ${adopterName}
      Email: ${email}
      Phone: ${phone}`
    );
    if (!petName || !adopterName || !email || !phone) {
      alert("Please fill out all fields");
      return;
    }

    const hasErrors = Object.values(errors).some((val) => val);
    if (hasErrors) {
      alert("Please fill out all fields");
      return;
    }

    const data = { petName, petType, breed, adopterName, email, phone };
    setFormData((prevData) => [...prevData, data]);
    setShowTable(true);
    setValues({
      petName: "",
      petType: "Dog",
      breed: "",
      adopterName: "",
      email: "",
      phone: "",
    });
    setErrors({
      petName: "",
      petType: "",
      breed: "",
      adopterName: "",
      email: "",
      phone: "",
    });
  };

  const handleGoBack = () => setShowTable(!showTable);

  if (!showTable) {
    return (
      <div className="form">
        <div>
          <label htmlFor="petName">Pet Name</label>
          <input
            type="text"
            name="petName"
            placeholder="Pet Name"
            value={petName}
            onChange={handleChange}
          />
          <small>{errors.petName}</small>
        </div>
        <div>
          <label htmlFor="petType">Pet Type</label>
          <select value={petType} name="petType" onChange={handleChange}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={breed}
            onChange={handleChange}
          />
          <small>{errors.breed}</small>
        </div>
        <div>
          <label htmlFor="adopterName">Your Name</label>
          <input
            type="text"
            name="adopterName"
            placeholder="Your Name"
            value={adopterName}
            onChange={handleChange}
          />
          <small>{errors.adopterName}</small>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <small>{errors.email}</small>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={handleChange}
          />
          <small>{errors.phone}</small>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdopterData formData={formData} handleGoBack={handleGoBack}></AdopterData>
  );
};

export default PetAdoptionForm;
