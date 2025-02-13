import Main from "./components/main";
import Project from "./components/project";
import Tasks from "./components/tasks";

function App() {
  return (
    <div className="App ">
      <div className="mt-8 flex align-center flex-col  m-auto  gap-6 ">
        {/* <Main/> */}
        {/* <Project /> */}
        <Tasks/>
      </div>
    </div>
  );
}

export default App;
