import DistributionTable from "./components/DistributionTable.jsx";
import ThemeToggle from "./components/DarkMode.jsx";
import {data} from "./assets/Data.jsx";
import SalesPage from "./components/SalesPage.jsx";

function App() {

  return (
    <>
      <div className="bg-secondary">
        {/* Distribution Table */}
        {/*<DistributionTable data={data} />*/}

      {/*  Sales Page */}
        <SalesPage />
      </div>

      <ThemeToggle />
    </>
  )
}

export default App
