import DistributionTable from "./components/DistributionTable.jsx";
import ThemeToggle from "./components/DarkMode.jsx";
import {data} from "./assets/Data.jsx";
import Test from "./components/Test.jsx";

function App() {

  return (
    <>
      <div className="bg-secondary">
        {/* Distribution Table */}
        <DistributionTable data={data} />
      </div>

      <ThemeToggle />
    </>
  )
}

export default App
