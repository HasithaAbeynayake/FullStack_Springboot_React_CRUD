package com.javaguides.springbootbackend.controller;

import com.javaguides.springbootbackend.exception.ResourceNotFoundException;
import com.javaguides.springbootbackend.model.Employee;
import com.javaguides.springbootbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1/")
@CrossOrigin(origins = "http://localhost:3000/")
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;

    @GetMapping(path = "/employees")
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping(path = "/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping(path = "/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(
                employeeRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException("Employee does not exist for id: " + id)
                        ));
    }

    @PutMapping(path = "/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @RequestBody Employee employee, @PathVariable Long id) {
        Employee emp = employeeRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Employee not found for id: " + id));
        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setEmail(employee.getEmail());
        return ResponseEntity.ok(employeeRepository.save(emp));
    }

    @DeleteMapping(path = "/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Employee does not exist to delete"));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
