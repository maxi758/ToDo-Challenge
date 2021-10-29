import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import './App.css';
import './custom.css';

function App(){
    
    const baseUrl = "https://localhost:44387/api/ToDo";
    const [data, setData] = useState([]);
    const getRequest = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const postRequest = async () => {
        delete selectedDuty.id;
        await axios.post(baseUrl, selectedDuty)
            .then(response => {
                setData(data.concat(response.data));
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        getRequest();
    }, []);

    const [selectedDuty, setSelectedDuty] = useState({
        id: '',
        description: '',
        isActive: true
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedDuty({
            ...selectedDuty,
            [name]: value
        });
	}
    return (
      <Layout>

         <div className="App">
            <table className="table table-responsive-lg table-bordered table-striped w-75"> 
                <tr>
                    <th>To-Do List</th>
                    <th>Options</th>
                </tr>
                <tbody>
                    {data.map(duty => (
                    <tr key={duty.Id}>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" variant="secondary" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    {duty.description}
                                </label>
                            </div>  
                            </td>
                        <td className="">
                            <button className="btn btn-primary mx-5">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-group">
                <input type="text" clasName="form-control" placeholder="new task" name= "description" onChange={handleChange} />
                <button className="btn btn-success " onClick={()=>postRequest()}>Add</button>
            </div>
        </div>
      </Layout>
      
    );
}
export default App;
