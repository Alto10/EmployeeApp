const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// TEST API
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// GET ALL EMPLOYEES
app.get('/api/employees', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query('SELECT * FROM Employees');

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD NEW EMPLOYEE
app.post('/api/employees', async (req, res) => {
  const { name, position, salary } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', name)
      .input('position', position)
      .input('salary', salary)
      .query(`
        INSERT INTO Employees (Name, Position, Salary)
        VALUES (@name, @position, @salary)
      `);

    res.json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE EMPLOYEE
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, position, salary } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .input('name', name)
      .input('position', position)
      .input('salary', salary)
      .query(`
        UPDATE Employees
        SET Name = @name, Position = @position, Salary = @salary
        WHERE EmployeeID = @id
      `);

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE EMPLOYEE
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query('DELETE FROM Employees WHERE EmployeeID = @id');

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

