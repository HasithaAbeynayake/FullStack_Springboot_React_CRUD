import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

export default function AddEmployeeComponent() {

    const params = useParams()
    const history = useHistory();

    useEffect(() => {
        if (params.id === "_add") {
            return;
        }
        else {
            getEmployeeById();
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value)
    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value)
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
    }

    const getEmployeeById = () => {
        EmployeeService.getEmployeeById(params.id)
            .then(res => {
                let emp = res.data;
                setFirstName(emp.firstName);
                setLastName(emp.lastName);
                setEmail(emp.email);
            })
    };

    const saveHandler = (e) => {
        e.preventDefault();
        let emp = { firstName: firstName, lastName: lastName, email: email };

        if (params.id === "_add") {
            EmployeeService.addEmployee(emp)
                .then(res => {
                    history.push('/employees');
                })
        }
        else {
            EmployeeService.updateEmployee(emp, params.id)
                .then(res => {
                    history.push('/employees');
                })
        }
    }

    const cancelHandler = () => {
        history.push('/employees');
    }

    const getTitle = () => {
        if (params.id === "_add") {
            return <h3 className="text-center">Add Employee</h3>
        }
        else {
           return <h3 className="text-center">Update Employee</h3>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name: </label>
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={changeFirstNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name: </label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={changeLastNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={changeEmailHandler}
                                    />
                                </div>
                                <br />
                                <button className="btn btn-success"
                                    onClick={saveHandler}>Save</button>
                                <button className="btn btn-danger"
                                    onClick={cancelHandler}
                                    style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
