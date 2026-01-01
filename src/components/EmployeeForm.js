import React from 'react';

const EmployeeForm = ({ form, setForm, handleSubmit, editingId }) => {
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Position"
            name="position"
            value={form.position}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Salary"
            name="salary"
            value={form.salary}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {editingId ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
