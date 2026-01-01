import React from 'react';

const EmployeeTable = ({ employees, editEmployee, deleteEmployee }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.EmployeeID}>
            <td>{emp.EmployeeID}</td>
            <td>{emp.Name}</td>
            <td>{emp.Position}</td>
            <td>Rp {Number(emp.Salary).toLocaleString('id-ID')}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editEmployee(emp)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteEmployee(emp.EmployeeID)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
