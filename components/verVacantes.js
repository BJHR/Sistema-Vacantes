import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import StyledVacante from "./vacante/verVacantesStyles";


const Vacantes = () => {
    const [vacantes, setVacantes] = useState([]);
    useEffect(() => {
        getVacantes();
    }, []);

    const getVacantes = async () => {
        let { data: vacantes, error } = await supabase
            .from('vacantes')
            .select('*')
        if (error) {
            console.log('error', error)
        }
        else {
            setVacantes(vacantes);
            console.log(vacantes);
        }
    }

    return (
        <StyledVacante>
            <Masonry className="mason" columns={4} spacing={2}>
                {vacantes.map((item, index) => (
                    <div  
                    className="vacante"
                    key={index} >
                        <p>{item.titulo}</p>
                        <p>{item.nombre}</p>
                        <p>{item.descripcion}</p>
                        <p>{item.telefono}</p>
                        <p>{item.carreras}</p>
                        <p>Fecha_limite: {item.fecha_limite}</p>
                    </div>
                ))}
            </Masonry>
        </StyledVacante>
    );
}

export default Vacantes;
