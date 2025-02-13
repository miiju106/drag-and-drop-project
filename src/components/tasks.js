import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoClose } from "react-icons/io5";

const Tasks = () => {
  const [createdList, setCreatedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [formOutput, setFormOutput] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormOutput({
      ...formOutput,
      [e.target.name]: e.target.value,
      id: Math.random().toString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formOutput.title && formOutput.desc && formOutput.body) {
      setCreatedList([...createdList, formOutput]);
      setFormOutput({});
      setShowModal(false);
    }
    return;
  };

 

  const handleDrag = (results) => {
    console.log(results);
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    // moving items in the same box(created box)
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === "ROOT"
    ) {
      const reordered = [...createdList];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setCreatedList(reordered);
    }

    // moving items in the same box(completed box)
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === "NEW"
    ) {
      const reordered = [...completedList];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setCompletedList(reordered);
    }

    // moving items in the same box(pending box)
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId === "MIDDLE"
    ) {
      const reordered = [...pendingList];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setPendingList(reordered);
    }

    // moving items from the created box to the completed box
    if (destination.droppableId === "NEW" && source.droppableId === "ROOT") {
      const reordered = [...createdList];
      const newReordered = [...completedList];
      const [removed] = reordered.splice(source.index, 1);
      newReordered.splice(destination.index, 0, removed);
      setCompletedList([...newReordered]);
      setCreatedList([...reordered]);
    }

    // moving items from the completed box to the created box
    if (destination.droppableId === "ROOT" && source.droppableId === "NEW") {
      const reordered = [...completedList];
      const newReordered = [...createdList];
      const [removed] = reordered.splice(source.index, 1);
      newReordered.splice(destination.index, 0, removed);
      // console.log({reordere})
      setCompletedList([...reordered]);
      setCreatedList([...newReordered]);
    }

    // moving items from the created box to the pending box
    if(destination.droppableId === "MIDDLE" && source.droppableId === "ROOT"){
      const reordered = [...createdList]
      const newReordered = [...pendingList]
      const [removed] = reordered.splice(source.index, 1)
      newReordered.splice(destination.index, 0, removed)
      setPendingList([...newReordered])
      setCreatedList([...reordered])
    }

    // moving items from pending box to the created box
    if(destination.droppableId==="ROOT" && source.droppableId==="MIDDLE"){
      const reordered = [...pendingList]
      const newReordered = [...createdList]
      const [removed] = reordered.splice(source.index, 1)
      newReordered.splice(destination.index, 0, removed)
      setPendingList([...reordered])
      setCreatedList([...newReordered])
    }

    // moving items from the completed box to the pending box
    if(destination.droppableId === "MIDDLE" && source.droppableId === "NEW"){
      const reordered = [...completedList]
      const newReordered = [...pendingList]
      const [removed] = reordered.splice(source.index, 1)
      newReordered.splice(destination.index, 0, removed)
      setPendingList([...newReordered])
      setCompletedList([...reordered])
    }

    // moving items from pending box to the completed box
    if(destination.droppableId==="NEW" && source.droppableId==="MIDDLE"){
      const reordered = [...pendingList]
      const newReordered = [...completedList]
      const [removed] = reordered.splice(source.index, 1)
      newReordered.splice(destination.index, 0, removed)
      setPendingList([...reordered])
      setCompletedList([...newReordered])
    }

  };
  return (
    <section>
      <div className="container mb-5">
        <button
          className="bg-btn-main px-3 py-2 text-white font-semibold rounded-md"
          onClick={() => setShowModal(true)}
        >
          Create Task
        </button>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-3 container">
        <DragDropContext onDragEnd={handleDrag}>
          {/* Created box */}
          <Droppable droppableId="ROOT">
            {(provided) => (
              <div
                className="bg-black rounded-lg text-white  w-full py-5 px-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4 className="text-white">Created Tasks</h4>
                {createdList &&
                  createdList?.map((list, index) => (
                    <Draggable
                      draggableId={list?.id}
                      index={index}
                      key={list?.id}
                    >
                      {(provided) => (
                        <div
                          className=" bg-[#ffffed]  m-auto text-black py-3 px-2 mt-2 "
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h4 className="">{list?.title}</h4>
                          <p className="">{list?.desc}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>

          {/* Pending box */}
          <Droppable droppableId="MIDDLE">
            {(provided) => (
              <div
                className="bg-black rounded-lg text-white  w-full py-5 px-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4 className="text-white">Pending Tasks</h4>
                {pendingList &&
                  pendingList?.map((list, index) => (
                    <Draggable
                      draggableId={list?.id}
                      index={index}
                      key={list?.id}
                    >
                      {(provided) => (
                        <div
                          className=" bg-[#ffffed]  m-auto text-black py-3 px-2 mt-2 "
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h4 className="">{list?.title}</h4>
                          <p className="">{list?.desc}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>



          {/* Completed box */}
          <Droppable droppableId="NEW">
            {(provided) => (
              <div
                className="bg-black rounded-lg text-white w-full py-5 px-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4 className="text-white">Completed Tasks</h4>
                {completedList &&
                  completedList?.map((list, index) => (
                    <Draggable
                      draggableId={list?.id}
                      index={index}
                      key={list?.id}
                    >
                      {(provided) => (
                        <div
                          className="bg-[#ffffed]  m-auto text-black py-3 px-2 mt-2 "
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h4 className="">{list?.title}</h4>
                          <p className="">{list?.desc}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] ">
            <form
              onSubmit={handleSubmit}
              className="bg-white lg:w-[50%] w-[80%] p-10 rounded-lg shadow-md  max-w-[1024px] space-y-8 flex flex-col flex-wrap justify-start"
            >
              <div
                className="w-full flex flex-row-reverse cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <IoClose size="24" />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formOutput.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="desc"
                  value={formOutput.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Body</label>
                <textarea
                  type="text"
                  placeholder="Body"
                  name="body"
                  value={formOutput.body}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={`${
                  !formOutput.title || !formOutput.desc || !formOutput.body
                    ? "bg-btn-main/50"
                    : "bg-btn-main"
                } p-2 text-white rounded-md`}
                disabled={
                  !formOutput.title || !formOutput.desc || !formOutput.body
                }
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tasks;
