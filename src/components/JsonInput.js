import React, { useState } from "react";
import axios from "axios";
import "./JsonInput.css";

const JsonInput = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const validateJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJSON(input)) {
      setError("Invalid JSON format");
      return;
    }
    setError(null);

    try {
      const res = await axios.post("", JSON.parse(input));
      setResponse(res.data);
      setDropdownOptions([
        "Alphabets",
        "Numbers",
        "Highest lowercase alphabet",
      ]);
    } catch (err) {
      setError("Error fetching data from API");
    }
  };

  return (
    <div className="json-input-container">
      <label htmlFor="json-input">API Input</label>
      <input
        id="json-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter the Input"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Dropdown options={dropdownOptions} response={response} />
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ options, response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    let filteredResponse = { ...response };
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse = { ...filteredResponse, alphabets: response.alphabets };
    }
    if (selectedOptions.includes("Numbers")) {
      filteredResponse = { ...filteredResponse, numbers: response.numbers };
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredResponse = {
        ...filteredResponse,
        highestLowercase: response.highestLowercase,
      };
    }
    return JSON.stringify(filteredResponse, null, 2);
  };

  return (
    <div>
      <label htmlFor="multi-select">Multi Filter</label>
      <select id="multi-select" multiple={true} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <pre>Filtered Response{renderResponse()}</pre>
    </div>
  );
};

export default JsonInput;
