import React from "react";
import { data } from "./data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import StoreList from "./storeList";

const Main = () => {
  const [dataStore, setDataStore] = useState(data);

  const handleDrag = (results) => {
    
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    if (type === "group") {
      const reordered = [...dataStore];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      console.log({ results });
      return setDataStore(reordered);
    }

    console.log(results)

    // logic to know which  particular child item that was lifted
    const itemSourceIndex = source.index
    const itemDestinationIndex = source.index


// logic to know which of the parent group that was lifted
const dataSourceIndex = dataStore.findIndex((store)=> store.id === source.droppableId)
const dataDestinationIndex = dataStore.findIndex((store)=> store.id === destination.droppableId)
console.log({dataSourceIndex})

// these are the lifted child items from the initial position
const newSourceItems = [...dataStore[dataSourceIndex].items]

// these are the child items at where it was lifted to
const newDestinationItems = source.droppableId !== destination.droppableId ? [...dataStore[dataDestinationIndex].items] : newSourceItems

// the specific item that was removed
const [deleted] = newSourceItems.splice(itemSourceIndex, 1)

// the specific destination where the item was added
newDestinationItems.splice(itemDestinationIndex, 0, deleted)


// new array formed
const changedStore = [...dataStore]

// edited objects in the array where the items were moved
changedStore[dataSourceIndex] = {
  ...dataStore[dataSourceIndex],
  items:newSourceItems
}

// edited objects in the array where the items were added
changedStore[dataDestinationIndex] = {
  ...dataStore[dataDestinationIndex],
  items:newDestinationItems
}

// state updated when the items were lifted and added
setDataStore(changedStore)

  };
  return (
    <section className="text-center bg-[#26223e]  w-[100%] rounded-md px-3 py-5">
      <DragDropContext onDragEnd={handleDrag}>
        <div>
          <h1 className="font-bold text-[22px] mb-2 text-white">
            Shopping List
          </h1>
        </div>

        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              className="w-[80%] m-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dataStore.map((data, index) => (
                <Draggable draggableId={data.id} index={index} key={data.id}>
                  {(provided) => (
                    <div
                      className="bg-[#f8f9fa] py-2"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <StoreList name={data.name} items ={data.items} id={data.id}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Main;
