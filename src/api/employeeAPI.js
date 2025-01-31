import axios from "axios";
const API_URL = "http://localhost:9000/api/employees";
export const fetchEmployees = async () =>                                                                                                                                       
{
    try{
        const response = await axios.get(API_URL);
        return response;
    }
    catch(err)
    {
        console.error("Error fetching employees:",err);
        throw err;
    }
};

export const createEmployee = async(employeeData) =>
{
    try{
        const response = await axios.post(API_URL, employeeData);
        return response;
    }
    catch(err)
    {
        console.error("Error creating employee:", err);
        throw err;
    }
};

export const editEmployees=async (id,employeeData) => {
    try{
        const response = await axios.put(`${API_URL}/${id}`,employeeData);
        return response;
    }
    catch(err){
        console.error("Error editing employee:",err);
        throw err;
    }
};