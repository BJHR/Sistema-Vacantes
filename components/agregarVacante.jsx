import StyledAddVacante from "../components/vacante/agregarVacanteStyles"
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Alert } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
const AgregarVacante = () => {
    const isMobile = useMediaQuery("(max-width: 700px)");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    //user session data
    const { user: user } = Auth.useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            titulo: "",
            descripcion: "",
            skills: "",
            carrera: ""
        }
    });
    const sendVacanteData = async (info) => {
        console.log('sending data',info, user.id);
        const { data, error } = await supabase
            .from('vacantes')
            .insert([
                { id_maestro: user.id ,
                 titulo: info.titulo ,
                 descripcion: info.descripcion ,
                 fecha_limite: currentDate._d ,
                 skills: info.skills ,
                 carreras: info.carrera }
            ])
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    }

    const onSubmit = data => {
        console.log(data);
        if (data.titulo === "" 
        || data.descripcion === "" 
        || currentDate === "" 
        || data.skills === "" 
        || data.carrera === "") {
            setError(true);
        }
        else {
            sendVacanteData(data);
            setError(false);
        }

        reset();
    };


    return (
        <StyledAddVacante>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>Agregar Vacante</h4>
                <div className="doable">
                    <Controller
                        name="titulo"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Titulo" />}
                    />

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        {!isMobile ?
                            (
                                <Controller
                                    name="fecha limite"
                                    control={control}
                                    render={({ field }) =>
                                        <DesktopDatePicker
                                            label="Fecha limite"
                                            inputFormat="MM/DD/YYYY"
                                            disablePast={true}
                                            value={currentDate}
                                            onChange={(newValue) => {
                                                console.log(newValue);
                                                setCurrentDate(newValue);
                                                console.log(currentDate);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />}
                                />

                            )
                            :
                            (
                                <Controller
                                    name="fecha_limite"
                                    control={control}
                                    render={({ field }) =>
                                        <MobileDatePicker
                                            label="Fecha limite"
                                            inputFormat="MM/DD/YYYY"
                                            disablePast={true}
                                            value={currentDate}
                                            onChange={(newValue) => {
                                                setCurrentDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />}
                                />
                            )
                        }
                    </LocalizationProvider>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Skills" />}
                    />
                    <Controller
                        name="carrera"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Carrera" />}
                    />
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => <TextField
                            {...field}
                            label="Descripcion"
                            rows={4}
                            multiline
                        />}
                    />
                </div>
                <div className="sendBtn">
                    <Button variant="outlined" type="submit">Crear Vacante</Button>
                </div>
                {success == true ? (
                    <Alert severity="success">Se ha creado la vacante!</Alert>
                ) : null
                }
                {error == true ? (
                    <Alert severity="error">No está completo los campos!</Alert>

                ) : null

                }
            </form>
        </StyledAddVacante>
    );

}

export default AgregarVacante;
