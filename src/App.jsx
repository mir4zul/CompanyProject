import {useState} from "react";
import DistributionTable from "./components/DistributionTable.jsx";
import ThemeToggle from "./components/DarkMode.jsx";
import {data} from "./assets/Data.jsx";

function App() {
  const [NewData, setNewData] = useState();

  return (
    <>
      <div className="bg-secondary">
        <DistributionTable data={data} />
      </div>

      <ThemeToggle />
    </>
  )
}

export default App
