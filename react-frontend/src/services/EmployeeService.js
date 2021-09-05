import axios from 'axios'

class EmployeeService {

    getAllEmployees() {
        return axios.get('http://localhost:8080/api/v1/employees')
    }

    addEmployee(employee) {
        return axios.post('http://localhost:8080/api/v1/employees', employee)
    }

    getEmployeeById(employeeId) {
        return axios.get('http://localhost:8080/api/v1/employees/' + employeeId)
    }

    updateEmployee(employee, id) {
        return axios.put('http://localhost:8080/api/v1/employees/' + id, employee)
    }

    deleteEmployee(employeeId) {
        return axios.delete('http://localhost:8080/api/v1/employees/' + employeeId)
    }
}

export default new EmployeeService();