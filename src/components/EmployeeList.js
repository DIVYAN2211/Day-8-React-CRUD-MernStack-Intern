import React, { useState ,useEffect } from "react";
import { createEmployee, fetchEmployees ,editEmployees} from "../api/employeeAPI";

const EmployeeList = ()=>
{
    const [employees,setEmployees] = useState([]);
    const [empid, setEmpid] = useState("");
    const [empname,setEmpname ] = useState("");
    const [editingEmployee, setEditingEmployee] = useState(null);
    useEffect(() => {
        const loadEmployees = async () => {
            const {data} =await fetchEmployees();
            setEmployees(data);
       
        };
        loadEmployees();
    },[]);




    const insertEmployee = async() => {
        const newEmployee = {empid, empname};
        const { data } = await createEmployee(newEmployee);
        setEmployees([...employees,data]);
        setEmpid("");
        setEmpname("");

    }

    const editEmployee = (emp) => {
        setEditingEmployee(emp);
        setEmpid(emp.empid);
        setEmpname(emp.empname);
    }

    const updateEmployee = async() =>
    {
        const updatedEmployee = {empid,empname};
        const {data } = await editEmployees(editingEmployee._id,updatedEmployee);
        setEmployees(employees.map((emp) => (emp._id === editingEmployee._id ? data :emp )));
        setEmpid("");
        setEmpname("");
        setEditingEmployee(null);
    };

  
    
return(
        <div>
            <h1>Employee List </h1>
            {
                editingEmployee ? (
                    <div>
                        <h2>Edit Employee</h2>
                        <input type = "text" placeholder="Employee ID" value ={empid} onChange={(e) => setEmpid(e.target.value)} />
                        <input type = "text" placeholder= "Employee Name" value = {empname} onChange ={(e) => setEmpname(e.target.value)} />
                        <button onClick = {updateEmployee}>Save Changes</button> 
                        <button onClick = {insertEmployee}>Cancel</button>
                    </div>

                ):
         (
            <div>
                <h2>Create Employee</h2>
                <input type = "text" placeholder="Employee ID"
                onChange={(e) => setEmpid(e.target.value)} />
                <input type = "text" placeholder= "Employee Name" onChange ={(e) => setEmpname(e.target.value)} />
                <button onClick = {editEmployee}>Create Employee</button>
            </div>
         )
        }
            <u1> 
                {
                    employees.map((emp)=>(
                        <li key ={emp._id}>
                            {emp.empid} - {emp.empname}{" "}
                           <button onClick ={() => editEmployee(emp)}>Edit</button>
                           {/*<buttonn onClick ={() => deleteEmployee(emp._id)}>Delete</buttonn>  */}

                        </li>
                    ))}                      
            </u1>
        </div>               
);
};
export default EmployeeList;