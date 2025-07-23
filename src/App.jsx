import DistributionTable from "./components/DistributionTable.jsx";
import ThemeToggle from "./components/DarkMode.jsx";
import {data} from "./assets/Data.jsx";

function App() {

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
