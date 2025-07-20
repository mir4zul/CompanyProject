import DistributionTable from "./components/DistributionTable.jsx";
import ThemeToggle from "./components/DarkMode.jsx";

function App() {

  return (
    <>
      <div className="bg-secondary">
        <DistributionTable />
      </div>

      <ThemeToggle />
    </>
  )
}

export default App
