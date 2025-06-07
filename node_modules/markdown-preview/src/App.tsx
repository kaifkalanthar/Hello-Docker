import MDProvider from "./lib/context/MDProvider";
import MD from "./components/MD";
import './globals.css';

export default function App() {   
    return (
        <MDProvider>
            <MD />
        </MDProvider>
    );
}