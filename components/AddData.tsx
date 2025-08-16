"use client";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddData = () => {
	const addData = async () => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				name: "John Doe",
				email: "john.doe@example.com",
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return <button onClick={addData}>Add Data</button>;
};

export default AddData;
