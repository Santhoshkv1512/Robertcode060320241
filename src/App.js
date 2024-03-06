import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App as Canvas } from './Components/Canvas';
import { Overlay } from './Components/Overlay';
import { state } from './store';
import axios from "axios";

const Main = () => {
    const [isControl, setIsControl] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await axios.post("api/initial_data");
            state.name = data.name;
            state.email = data.email;
            state.phone = data.phone;
            state.company = data.company;
            state.style = data.styles;
            state.initialMaterial = data.materials;
            state.initialPrintSpec = data.inks;
            state.initialPrintSurface = data.printings;
            state.initialCoating = data.coatings;
            setLoading(true);
        })()
    }, []);

    return (
        loading &&
        <>
            <Canvas isControl={isControl} setIsControl={setIsControl} />
            <Overlay isControl={isControl} setIsControl={setIsControl} />
        </>
    )
}

const Configurator = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </Router>
    )
}



export default Configurator;