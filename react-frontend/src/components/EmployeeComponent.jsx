import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useHistory } from 'react-router-dom';

export default function EmployeeComponent() {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        EmployeeService.getAllEmployees()
            .then((res) => {
                setEmployees(res.data)
                console.log(res.data)
            });
        // .catch
    };

    const editEmployee = (id) => {
        history.push(`/add-employee/${id}`);
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id)
            .then(res => {
                setEmployees(employees.filter(emp => emp.id !== id))
            })
    }

    const viewEmployee = (id) => {
        history.push(`/view-employee/${id}`)
    }

    const history = useHistory();
    const handleClick = () => history.push('/add-employee/_add');

    return (
        <div className="container">
            <h1 className="text-center">Employee List</h1>

            <div className="row">
                <button style={{ width: 150 }} className="btn btn-primary" onClick={handleClick}>Add Employee</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp) =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button onClick={() => editEmployee(emp.id)}
                                        className="btn btn-info"> Update </button>
                                    <button style={{marginLeft: "10px"}} onClick={() => deleteEmployee(emp.id)}
                                        className="btn btn-danger"> Delete </button>
                                    <button style={{marginLeft: "10px"}} onClick={() => viewEmployee(emp.id)}
                                        className="btn btn-info"> View Details </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}