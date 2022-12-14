import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { supabase } from '../../lib/initSupabase';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Postulado() {
    const [postulados, setPostulados] = React.useState([]);
    React.useEffect(() => {
        const getPostulados = async () => {

            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
            if (error) console.log('error', error)
            else {
                setPostulados(profiles);
                console.log('profiles', profiles)       
            }
        }
        getPostulados();    
    }, [])  




            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre </TableCell>
                                <TableCell align="right">Carrera</TableCell>
                                <TableCell align="right">Curriculum Vitae </TableCell>
                                <TableCell align="right">Celular</TableCell>
                                <TableCell align="right">Correo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postulados.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.first_name}
                                    </TableCell>
                                    <TableCell align="right">{row.carrera}</TableCell>
                                    <TableCell align="right"><a target="_blanks" href="">Curriculum</a></TableCell>
                                    <TableCell align="right">{row.cellphone}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }