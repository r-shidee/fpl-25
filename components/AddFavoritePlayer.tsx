"use client";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddFavoritePlayer = ({ playerID }: { playerID: number }) => {
	const handleAddFavorite = async () => {
		try {
			const docRef = await addDoc(collection(db, "watchlist"), {
				name: "John Doe",
				email: "john.doe@example.com",
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return <button onClick={handleAddFavorite}>Add Data</button>;
};

export default AddFavoritePlayer;
