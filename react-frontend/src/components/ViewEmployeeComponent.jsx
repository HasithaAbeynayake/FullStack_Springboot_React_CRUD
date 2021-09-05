import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

export default function ViewEmployeeComponent() {
    const params = useParams()
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        getEmployeeById();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getEmployeeById = () => {
        EmployeeService.getEmployeeById(params.id)
            .then(res => {
                let emp = res.data;
                setFirstName(emp.firstName);
                setLastName(emp.lastName);
                setEmail(emp.email);
                console.log('Employee => ' + JSON.stringify(emp));
            })
    };

    const cancelHandler = () => {
        history.push('/employees');
    }

    return (
        <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    Employee Details
                    <div className="card-body">
                        <div className="row">
                            <label>First Name: </label>
                            <div>{firstName}</div>
                        </div>
                        <div className="row">
                            <label>Last Name: </label>
                            <div>{lastName}</div>
                        </div>
                        <div className="row">
                            <label>Email: </label>
                            <div>{email}</div>
                        </div>
                        <br />
                        <button className="btn btn-danger"
                            onClick={cancelHandler}
                            style={{ marginLeft: "10px" }}>Cancel</button>
                    </div>
                </div>

        </div>
    )
}
