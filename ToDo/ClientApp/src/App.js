import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import './App.css';
import './custom.css';



function App() {

	const baseUrl = "https://localhost:44387/api/ToDo";
	const [data, setData] = useState([]);
	const [modalEdit, setModalEdit] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);
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
	const putRequest = async () => {
		await axios.put(baseUrl, selectedDuty)
		.then(response => {
			var responseData = response.data;
			var auxData = data;
			auxData.map(duty=>{
				if (duty.id === selectedDuty.id) {
					duty.description = responseData.description;
				}
			});
			openCloseModalEdit();
		}).catch(error => {
			console.log(error);
		})
	}

	const deleteRequest = async () => {
		await axios.delete(baseUrl+"/"+selectedDuty.id, selectedDuty)
			.then(response => {
				setData(data.filter(duty => duty.id !== response.data))
				openCloseModalDelete();
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
	const selectDuty = (duty, operation) => {
		setSelectedDuty(duty);
		(operation === "Edit") ?
			openCloseModalEdit() : openCloseModalDelete();
	}
	const openCloseModalEdit = () => {
		setModalEdit(!modalEdit);
	}
	const openCloseModalDelete = () => {
		setModalDelete(!modalDelete);
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
										<input className="form-check-input" variant="secondary" type="checkbox" value="" id="flexCheckDefault" />
										<label className="form-check-label" for="flexCheckDefault">
											{duty.description}
										</label>
									</div>
								</td>
								<td className="">
									<button className="btn btn-primary mx-5" onClick={() => selectDuty(duty, "Edit")}>Edit</button>
									<button className="btn btn-danger" onClick={() => selectDuty(duty, "Delete")}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="form-group">
					<input type="text" clasName="form-control" placeholder="new task" name="description" onChange={handleChange} />
					<button className="btn btn-success " onClick={() => postRequest()}>Add</button>
				</div>
				<Modal isOpen={modalEdit}>
					<ModalHeader>Editing task "{selectedDuty.description}"</ModalHeader>
					<ModalBody>
						<div className="form-group">

							<input type="hidden" clasName="form-control" name="id" onChange={handleChange} value={selectedDuty && selectedDuty.id} />
						</div>
						<div className="form-group">

							<input type="text" clasName="form-control" name="description" onChange={handleChange} value={selectedDuty && selectedDuty.description} />
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-primary mx-5" onClick={() => putRequest()}>Save</button>
						<button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancel</button>
					</ModalFooter>
				</Modal>


				<Modal isOpen={modalDelete}>
					<ModalHeader>Editing task "{selectedDuty.description}"</ModalHeader>
					<ModalBody>
						Are you sure you want to delete task "{selectedDuty && selectedDuty.description}"?
						<div className="form-group">

							<input type="hidden" clasName="form-control" name="id" onChange={handleChange} value={selectedDuty && selectedDuty.id} />
						</div>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger mx-5" onClick={() => deleteRequest()}>Delete</button>
						<button className="btn btn-primary" onClick={() => openCloseModalDelete()}>Cancel</button>
					</ModalFooter>
				</Modal>
			</div>
		</Layout>

	);
}
export default App;
