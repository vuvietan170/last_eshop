import "@/App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./hooks/useTheme";

function App() {
    return (
        <>
            <ThemeProvider>
                <div className="min-h-screen bg-paper text-ink ">
                    <Navbar />
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
