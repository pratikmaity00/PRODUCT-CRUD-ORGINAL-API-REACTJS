import { Toaster } from "react-hot-toast"
import Routing from "./routing/Routing"

const App = () => {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Routing/>
    </>
    
  )
}

export default App