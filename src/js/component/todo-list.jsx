import React, { useState, useEffect } from "react";
const INITIAL_STATE = {
	label: "",
	done: false,
};
const TodoList = () => {
	const [todolist, setTodolist] = useState([]);
	const [mensaje, setMensaje] = useState(INITIAL_STATE);
	const guardarDato = (evento) => {
		setMensaje({
			...mensaje,
			[evento.target.name]: evento.target.value,
		});
	};
	const clickguardar = () => {
		setTodolist([...todolist, mensaje]);
	};

	//Get
	const requiestApi = async () => {
		try {
			let response = await fetch(
				"http://assets.breatheco.de/apis/fake/todos/user/cotte"
			);
			if (response.status === 200) {
				let data = await response.json();
				setTodolist(data);
				console.log(todolist);
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log("Error ", error);
		}
	};
	//Put

	async function actualizar() {
		try {
			let response = await fetch(
				"http://assets.breatheco.de/apis/fake/todos/user/cotte",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([...todolist, mensaje]),
				}
			);
			if (response.status === 200) {
				setMensaje(INITIAL_STATE);
				requiestApi();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log("Ex´pte cpm este error", error);
		}
	}

	// borrar todo
	async function clearAll() {
		try {
			let response = await fetch(
				"http://assets.breatheco.de/apis/fake/todos/user/cotte",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([
						{ label: "First tastk", done: false },
					]),
				}
			);
			if (response.status === 200) {
				setMensaje(INITIAL_STATE);
				requiestApi();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log("Ex´pte cpm este error", error);
		}
	}
	//Borrar dato

	async function clearDate(id) {
		let newsdatos = todolist.filter((item, index) => index != id);
		setTodolist(newsdatos);
		try {
			let response = await fetch(
				"http://assets.breatheco.de/apis/fake/todos/user/cotte",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newsdatos),
				}
			);
			if (response.status === 200) {
				setMensaje(INITIAL_STATE);
				requiestApi();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log("Ex´pte cpm este error", error);
		}
	}

	useEffect(() => {
		requiestApi();
	}, []);

	return (
		<>
			<h1 className="titulos text-center mt-5">Todos</h1>
			<div className="Container">
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4 formulario">
						<div className="row">
							<div className="col-12 mt-3">
								<div className="input-group mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Escribe tu items"
										aria-label="Escribe tu items"
										aria-describedby="basic-addon2"
										name="label"
										value={mensaje.label}
										onChange={guardarDato}
									/>
									<div className="input-group-append">
										<button
											onClick={() => actualizar()}
											className="btn btn-outline-secondary"
											type="button">
											Button
										</button>
									</div>
								</div>
							</div>

							{todolist.map((item, index) => (
								<div
									key={index}
									className="items-list col-12 contador">
									<div className="row">
										<div className="col-8">
											<p>{item.label} </p>
										</div>
										<div className="col-4 d-flex justify-content-end">
											<button
												onClick={() => clearDate(index)}
												type="button"
												className="btn-close"
												aria-label="Close"></button>
										</div>
									</div>
								</div>
							))}

							<div className="col-12 contador py-2">
								<div className="row">
									<div className="col-6">
										<p className="mt-2">
											{todolist.length} Items
										</p>
									</div>
									<div className="col-6 d-flex justify-content-end">
										<div className="input-group-append ">
											<button
												onClick={() => clearAll()}
												className="btn btn-outline-secondary"
												type="button">
												Borrar tareas
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-4"></div>
				</div>
			</div>
		</>
	);
};

export default TodoList;
