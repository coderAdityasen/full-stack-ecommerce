import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
	chat: [
		{
			id: 1,
			person: "user",
			text: "hii ai how are you",
			image : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
		},
		{
			id: 2,
			person: "Chat GPT",
			text: "hello man whatsup",
			image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH-MZs-QTuhsriguhrUoL1ONNGKumv_nOJSvQDm-KXw&s"

		}
	],
};

export const aiReducer = createSlice({
	name: "aichat",
	initialState,
	reducers: {
		adduserdata: (state, action) => {
			const { text, person , image } = action.payload;
			state.chat.push({ id: nanoid(), person,image, text });
		},
		addaidata: (state, action) => {
			state.chat.push({ id: nanoid(), person: "Chat GPT", text: action.payload , image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH-MZs-QTuhsriguhrUoL1ONNGKumv_nOJSvQDm-KXw&s"});
		},
	},
});

export const { adduserdata, addaidata } = aiReducer.actions;

export default aiReducer.reducer;
