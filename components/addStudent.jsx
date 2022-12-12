import { useForm, Controller } from "react-hook-form";
import { Input, Select, TextField, Typography, Switch, MenuItem, Button, Label, Alert, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import StyledAddRoles from "./addRoles/addRoles";
import { Auth } from "@supabase/ui";
import { Stack } from "@mui/system";
import { useEffect, useId, useState } from "react";
import { supabase } from "../lib/initSupabase";
import { uuid } from "uuidv4";

const AddStudent = (profile) => {
    //recieve profile data from parent component
    //generate random id for file name
    const uid = uuid()
    const { user: user } = Auth.useUser();
    const [selectOptions, setSelectOptions] = useState([
        "Ingeniería Industrial",
        "Licenciatura en Administración",
        "Ingeniería en Informática",
        "Ciencias de la Informática",
    ]);

    const [curriculum, setCurriculum] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [showfields, setShowfields] = useState('');
    const [error, setError] = useState(false);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: user.user_metadata.full_name,
            role: 'maestro',
            email: user.email,
            carrera: '',
            cellphone: '',
            cv: null
        }
    });

    const sendStudentData = async (info, cv) => {

        const { data, error } = await supabase
            .from('profiles')
            .update({
                first_name: info.firstName,
                role: info.role,
                carrera: info.carrera,
                cellphone: info.cellphone,
                cv: cv,
                email: info.email
            })
            .eq('id', user.id)
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
        }
    }

    const onSubmit = (data) => {
        //validate if role is student
        console.log(data);
        if (data.role == 'estudiante') {
            if (data.firstName == ''
                || data.carrera == ''
                || data.cellphone == ''
                || data.cv == null
                || data.email == ''
            ) {
                console.log('error en datos');
                setError(true);
                return;
            }
            else {
                //upload file to storage to get stored url
                console.log(data.cv);
                uploadAvatar(data.cv).then((info) => {
                    console.log(info);
                    sendStudentData(data, info);

                })
                    .then(() => {

                        profile.setProfile(data);

                    })
                //update profile data
                setError(false);
            }
        }
        //validate if role is teacher
        if (data.role == 'maestro') {
            if (data.firstName == ''
                || data.cellphone == ''
                || data.email == '') {
                setError(true);
                return;
            }
            else {
                setError(false);
                sendStudentData(data, null).then(() => {
                    profile.setProfile(data);
                })

            }
        }


    }
    useEffect(() => {
        console.log(control._formValues);
    }, [control._formValues])

    const uploadAvatar = async (event) => {
        console.log(event);
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Debe seleccionar un archivo')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${uid}.${fileExt}`
            const filePath = `${fileName}`

            let { data, error: uploadError } = await supabase.storage
                .from('curriculums')
                .upload(filePath, file, { upsert: true })

            control._formValues.cv = data.Key;
            setCurriculum(data.Key);
            console.log(curriculum);
            if (uploadError) {
                throw uploadError
            }
            else {
                return data.Key;
            }

        } catch (error) {
            alert('Error subiendo el archivo', error)
            console.log(error)
        } finally {
            setUploading(false)
        }
    }

    //console.log(user);
    return (
        <StyledAddRoles>
            <h6>Actualiza tu cuenta</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                {control._formValues.role == '' && (
                    <div></div>
                )
                }

                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Rol</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={showfields}
                                onChange={(e) => {
                                    control._formValues.role = e.target.value;
                                    setShowfields(e.target.value);
                                    }
                                }
                            >
                                <FormControlLabel value="maestro" control={<Radio />} label="Profesor@" />
                                <FormControlLabel value="estudiante" control={<Radio />} label="Estudiante" />
                                
                            </RadioGroup>
                        </FormControl>

                    )}
                />

                <Controller
                    className="form-control"
                    name="firstName"
                    control={control}
                    render={({ field }) => <TextField
                        label="Nombre"
                        {...field} />}
                />
                <Controller
                    className="form-control"
                    name="email"
                    control={control}
                    render={({ field }) => <TextField
                        label="Correo Electrónico"
                        {...field} />}
                />
                <Controller
                    className="form-control"
                    name="cellphone"
                    control={control}
                    render={({ field }) => <TextField
                        label="Número de celular"
                        {...field} />}
                />

                {showfields == 'estudiante' ? (

                    <>
                        <Controller
                            name="carrera"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} >
                                    <MenuItem disabled value="">
                                        <em>Escoge tu carrera</em>
                                    </MenuItem>
                                    {selectOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}

                                </Select>
                            )

                            }
                        />
                        <Controller
                            className="form-control"
                            name="cv"
                            control={control}
                            render={({ field }) => (
                                <Button
                                    className="filepicker"
                                    variant="contained" component="label">
                                    Subir CV
                                    <input
                                        onChange={(e) => control._formValues.cv = e}
                                        hidden
                                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                                        type="file"
                                        id="filepicker"
                                    />
                                </Button>
                            )
                            }
                        />

                    </>

                )
                    : null
                }
                <Button variant="outlined" type="submit">Guardar</Button>
                {error == true ? (
                    <Alert severity="error">No está completo los campos!</Alert>

                ) : null

                }
            </form>
        </StyledAddRoles>
    );

};

export default AddStudent;