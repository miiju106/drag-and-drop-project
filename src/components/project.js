import React, { useState } from "react";
import { data } from "./data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Project = () => {
  const [storeList, setStoreList] = useState(data);
  const [newStoreList, setNewStoreList] = useState([]);

  const handleDrag = (results) => {
    console.log(results);
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    // moving items in the same box(left box)
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === "ROOT"
    ) {
      const reordered = [...storeList];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setStoreList(reordered);
    }

    // moving items in the same box(right box)
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === "NEW"
    ) {
      const reordered = [...newStoreList];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setNewStoreList(reordered);
    }

    // moving items from the left box to the right box
    if (destination.droppableId === "NEW" && source.droppableId === "ROOT") {
      const reordered = [...storeList];
      const newReordered = [...newStoreList];
      const [removed] = reordered.splice(source.index, 1);
      newReordered.splice(destination.index, 0, removed);
      setNewStoreList([...newReordered]);
      setStoreList([...reordered]);
    }

    // moving items from the right box to the left box
    if (destination.droppableId === "ROOT") {
      const reordered = [...newStoreList];
      const newReordered = [...storeList];
      const [removed] = reordered.splice(source.index, 1);
      newReordered.splice(destination.index, 0, removed);
      // console.log({reordere})
      setNewStoreList([...reordered]);
      setStoreList([...newReordered]);
    }
  };

  return (
    <section className="flex justify-between gap-3 container ">
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="ROOT">
          {(provided) => (
            <div
              className="bg-black rounded-lg text-white w-[50%] py-5 px-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2>Created Tasks</h2>
              {storeList &&
                storeList?.map((list, index) => (
                  <Draggable
                    draggableId={list?.id}
                    index={index}
                    key={list?.id}
                  >
                    {(provided) => (
                      <div
                        className="text-center bg-[#ffffed]  m-auto text-black py-3 mt-2 "
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <h1 className="font-bold">{list?.name}</h1>
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="NEW">
          {(provided) => (
            <div
              className="bg-black rounded-lg text-white w-[50%] py-5 px-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {newStoreList &&
                newStoreList?.map((list, index) => (
                  <Draggable
                    draggableId={list?.id}
                    index={index}
                    key={list?.id}
                  >
                    {(provided) => (
                      <div
                        className="text-center bg-[#ffffed]  m-auto text-black py-3 mt-2 "
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <h1 className="font-bold">{list?.name}</h1>
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Project;
