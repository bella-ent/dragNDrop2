import React, { useState, useEffect } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";

const item = {
	id: v4(),
	name: "fire",
	img: "https://cdn-icons-png.flaticon.com/512/599/599502.png",
};
const item2 = {
	id: v4(),
	name: "rock",
	img: "https://cdn-icons-png.flaticon.com/512/4405/4405457.png",
};

const item3 = {
	id: v4(),
	name: "water",
	img: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png",
};

function App() {
	const [state, setState] = useState([
		{
			key: "todo",
			title: "Box1",
			items: [item, item2, item3],
		},
		{
			key: "in-progress",
			title: "Box2",
			items: [],
		},
		{
			key: "done",
			title: "Box3",
			items: [],
		},
	]);
	const handleDragEnd = ({ destination, source }) => {
		console.log("from", source);
		console.log("to", destination);
		if (!destination) {
			console.log("not dropped in droppable");
			return;
		}
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			console.log("dropped in same place");
			return;
		}
		// Creating a copy of item before removing it from state.
		const itemCopy = {
			...state.filter((el) => el["key"] === source.droppableId)[0].items[
				source.index
			],
		};
		setState((prev) => {
			prev = [...prev];
			// Remove from previous items array
			prev
				.filter((el) => el["key"] === source.droppableId)[0]
				.items.splice(source.index, 1);

			// Adding to new items array location
			prev
				.filter((el) => el["key"] === destination.droppableId)[0]
				.items.splice(destination.index, 0, itemCopy);

			return prev;
		});
	};
	useEffect(() => {
		state.forEach((el) => console.log(el.title, el.items));
	}, [state]);

	return (
		<div className="App">
			<DragDropContext onDragEnd={handleDragEnd}>
				{state.map((el) => (
					<div key={el.key} className="column">
						<h3>{el.title}</h3>
						<Droppable droppableId={el.key}>
							{(provided) => {
								return (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="droppable-col"
									>
										{el.items.map((item, index) => (
											<Draggable
												key={item.id}
												index={index}
												draggableId={item.id}
											>
												{(provided) => (
													<div
														className="item"
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														{/* {item.name} */}
														<img src={item.img} alt="item" className="items" />
														{/* <span {...provided.dragHandleProps}>
															Drag by me
														</span> */}
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								);
							}}
						</Droppable>
					</div>
				))}
			</DragDropContext>
		</div>
	);
}

export default App;
