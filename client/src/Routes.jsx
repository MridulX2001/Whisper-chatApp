import Register from "./Register";
import Chat from "./Chat.jsx"
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Routes () {

	const {username, id} = useContext(UserContext);

	if (username) {
		return <Chat />;
	}

	return (
		<Register />
	);
}