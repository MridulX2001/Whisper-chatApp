import { useState } from 'react';
import axios from 'axios';
import {UserContext} from "./UserContext.jsx";
import {createContext} from "react";
import { useContext } from 'react';

export default function Register() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

	const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

	async function handleSubmit(ev) {
		ev.preventDefault();
		const url = isLoginOrRegister === 'register' ? 'register' : 'login';
		try {
			const {data} = await axios.post(url, {username, password});
			setLoggedInUsername(username);
			setId(data.id);
		} catch(err) {
			if (err) throw err;
		}
		
	}

	return (
			<div className="bg-blue-50 h-screen flex items-center">
				<form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
					<input  value={username}
							onChange={ev => setUsername(ev.target.value)}
							type="text" placeholder="username" 
							className="block w-full rounded-sm p-2 mb-2 border" />
					<input  value={password}
							onChange={ev => setPassword(ev.target.value)}
							type="password" placeholder="password" 
							className="block w-full rounded-sm p-2 mb-2 border" />
					<button className="bg-blue-500 text-white block w-full rounded-sm p-2">
						{isLoginOrRegister === 'register' ? 'Register' : 'Login'}
					</button>
					
					<div className="text-center mt-2">
						{isLoginOrRegister === 'register' && (
							<div>
								Already a User? 
								<button className='text-blue-600' onClick={() => setIsLoginOrRegister("login")}>
									Login Here
								</button>
							</div>
						)}

						{isLoginOrRegister==='login' && (
							<div>
							Don't have an account? 
							<button className='text-blue-600' onClick={() => setIsLoginOrRegister("register")}>
								Register Here
							</button>
						</div>
						)}
						
					</div>
				</form>
			</div>
		);
}

