const API_URL = 'http://localhost:3000/api/employees';
const table = document.getElementById('employeeTable');

function loadEmployees() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach(emp => {
        table.innerHTML += `
          <tr>
            <td>${emp.EmployeeID}</td>
            <td>${emp.Name}</td>
            <td>${emp.Position}</td>
            <td>Rp ${emp.Salary.toLocaleString('id-ID')}</td>
            <td>
              <button onclick="editEmployee(${emp.EmployeeID}, '${emp.Name}', '${emp.Position}', ${emp.Salary})">Edit</button>
              <button onclick="deleteEmployee(${emp.EmployeeID})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

loadEmployees();

// EDIT
function editEmployee(id, name, position, salary) {
  const newName = prompt('Nama:', name);
  const newPosition = prompt('Posisi:', position);
  const newSalary = prompt('Gaji:', salary);

  if (!newName || !newPosition || !newSalary) return;

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: newName,
      position: newPosition,
      salary: newSalary
    })
  }).then(() => loadEmployees());
}

// DELETE
function deleteEmployee(id) {
  if (!confirm('Yakin mau hapus data ini?')) return;

  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(() => loadEmployees());
}
