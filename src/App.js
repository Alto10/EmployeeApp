import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

const API_URL = 'http://localhost:5000/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', position: '', salary: '' });
  const [editingId, setEditingId] = useState(null);

  const loadEmployees = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { loadEmployees(); }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.position || form.salary <= 0) return alert("Form belum valid!");

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({ name: '', position: '', salary: '' });
      setEditingId(null);
      loadEmployees();
    });
  };

  const editEmployee = emp => {
    setEditingId(emp.EmployeeID);
    setForm({ name: emp.Name, position: emp.Position, salary: emp.Salary });
  };

  const deleteEmployee = id => {
    if (!window.confirm('Hapus data ini?')) return;
    fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => loadEmployees());
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Management</h2>
      <EmployeeForm form={form} setForm={setForm} handleSubmit={handleSubmit} editingId={editingId} />
      <EmployeeTable employees={employees} editEmployee={editEmployee} deleteEmployee={deleteEmployee} />
    </div>
  );
}

export default App;

