import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const StoreList = ({ name, items, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="bg-[#]">
            <h1 className="font-bold text-lg">{name}</h1>
          </div>
          <div>
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
               
              </Draggable>
            ))}
             {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default StoreList;
