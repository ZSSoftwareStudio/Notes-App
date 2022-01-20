import React, { useState } from "react";

function Form({ notes, setNotes, closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("notes", JSON.stringify([...notes, formData]));
    setNotes([...notes, formData]);
    closeModal();
  };

  return (
    <form className="mt-4 w-full" onSubmit={handleFormSubmit}>
      <div>
        <span className="input-label">Note Title</span>
        <input
          className="input focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Enter Note Title Here"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <span className="input-label">Note Description</span>
        <textarea
          className="input h-32 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter Note Description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className="mt-8">
        <button
          className="btn focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add to Notes
        </button>
      </div>
    </form>
  );
}

export default Form;
