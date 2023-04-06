import "./styles.css";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function App() {
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const [newFieldChoices, setNewFieldChoices] = useState("");

  const handleAddField = () => {
    let newField;
    if (
      newFieldType === "select" ||
      newFieldType === "checkbox" ||
      newFieldType === "radio"
    ) {
      const choices = newFieldChoices.split(",");
      newField = { name: newFieldName, type: newFieldType, choices };
    } else {
      newField = { name: newFieldName, type: newFieldType };
    }
    setFields([...fields, newField]);
    setNewFieldName("");
    setNewFieldType("");
    setNewFieldChoices("");
  };

  const handleRemoveField = (indexToRemove) => {
    const updatedFields = fields.filter((_, index) => index !== indexToRemove);
    setFields(updatedFields);
  };

  return (
    <div>
      <h1>Create Dynamic Form</h1>

      <div className="flex-container">
        <div className="flex-item">
          <input
            className="input-text-label"
            id="field-name"
            type="text"
            placeholder="Enter input label"
            value={newFieldName}
            onChange={(event) => setNewFieldName(event.target.value)}
          />
        </div>
        <div className="flex-item">
          <select
            className="input-select-label"
            id="field-type"
            placeholder="Input Type"
            value={newFieldType}
            onChange={(event) => setNewFieldType(event.target.value)}
          >
            <option value="">-- Select Input Type --</option>
            <option value="input">Input</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio Button</option>
            <option value="date">Choose a Date</option>
          </select>
        </div>
        {newFieldType === "select" ||
        newFieldType === "checkbox" ||
        newFieldType === "radio" ? (
          <div className="field-choices-text">
            <label htmlFor="field-choices" className="field-text">
              Field Choices (comma separated):{" "}
            </label>
            <input
              className="input-text-label"
              id="field-choices"
              type="text"
              value={newFieldChoices}
              onChange={(event) => setNewFieldChoices(event.target.value)}
            />
          </div>
        ) : null}
        <button onClick={handleAddField} className="add-button">
          Add Field
        </button>
      </div>

      <div>
        <h2>Form Fields:</h2>
        <form className="flex-container-form">
          {fields.map((field, index) => (
            <div key={index} className="flex-item" style={{ display: "flex" }}>
              <label htmlFor={field.name}>{field.name}: </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  className="flex-item"
                  style={{ width: "92%" }}
                >
                  {field.choices.map((choice, choiceIndex) => (
                    <option key={choiceIndex} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                field.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex-item">
                    <input
                      type="checkbox"
                      id={`${field.name}-${choice}`}
                      value={choice}
                    />
                    <label htmlFor={`${field.name}-${choice}`}>{choice}</label>
                  </div>
                ))
              ) : field.type === "radio" ? (
                field.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex-item">
                    <input
                      type="radio"
                      id={`${field.name}-${choice}`}
                      name={field.name}
                      value={choice}
                    />
                    {choice}
                  </div>
                ))
              ) : field.type === "date" ? (
                <div>
                  <input
                    type="date"
                    id={field.name}
                    style={{ padding: "3px" }}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  id={field.name}
                  className="input-text-label"
                />
              )}
              <DeleteIcon
                style={{ color: "red", margin: "10px" }}
                type="button"
                onClick={() => handleRemoveField(index)}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
