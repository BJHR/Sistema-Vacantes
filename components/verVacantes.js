import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import StyledVacante from "./vacante/verVacantesStyles";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { Button } from "@mui/material";

const Vacantes = (props) => {
  const [vacantes, setVacantes] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [canidates, setCanidates] = useState([])
  useEffect(() => {
    getVacantes();
    console.log(props);
    if (props.user) {
      getProfile(props.user.id);
    }
    if (props.rol == "maestro") {
      getAllCandidates();
    }
  }, []);

  const getAllCandidates = async () => {
    let { data: canidates, error } = await supabase
      .from("profiles")
      .select("id_postulacion")
    if (error) {
      console.log("error", error.message);
    } else {
        let vacant = canidates.filter((canidate) => canidate.id_postulacion != null);
        setCanidates(vacant);
        console.log(vacant[0]);
    }
  };

  const getProfile = async (id) => {
    console.log(id);
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("error", error.message);
    } else {
      console.log(profiles);
      setProfileData(profiles[0]);
      //console.log(profileData, profiles);
    }
  };
  const getVacantes = async () => {
    let { data: vacantes, error } = await supabase.from("vacantes").select("*");
    if (error) {
      console.log("error", error);
    } else {
      setVacantes(vacantes);
      console.log(vacantes);
    }
  };
  const deleteVacante = async (id) => {
    let { data: vacantes, error } = await supabase
      .from("vacantes")
      .delete()
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      console.log("vacante eliminada", vacantes);
      getVacantes();
    }
  };

  const applyVacante = async (id, value) => {
    let status = value == "aplicar" ? id : null;
    const { data, error } = await supabase
      .from("profiles")
      .update({ id_postulacion: status })
      .eq("id", props.user.id);

    if (error) {
      console.log("error", error);
    } else {
      setProfileData(data[0]);
      console.log("vacante aplicada", data);
    }
  };

  return (
    <StyledVacante>
      <Masonry className="mason" columns={3} spacing={1}>
        {vacantes.map((item, index) => (
          <div className="vacante" key={index}>
            {props.rol == "maestro" && (
              <HighlightOffSharpIcon
                onClick={() => deleteVacante(item.id)}
                className="delete"
              />
            )}
            <p>{item.titulo}</p>
            <p>{item.nombre}</p>
            <p>{item.descripcion}</p>
            <p>{item.telefono}</p>
            <p>{item.carreras}</p>
            <p>Fecha_limite: {item.fecha_limite}</p>
            {props.rol == "alumni" && profileData.id_postulacion == null ? (
              <Button
                variant="contained"
                className="btn"
                onClick={() => applyVacante(item.id, "aplicar")}
              >
                Aplicar
              </Button>
            ) : profileData.id_postulacion == item.id ? (
              <Button
                variant="contained"
                className="btn"
                onClick={() => applyVacante(item.id, "cancelar")}
              >
                Cancelar
              </Button>
            ) : null}

            {props.rol == "maestro" && canidates.some(r => r.id_postulacion == item.id)
            ? 
            <Button
                variant="contained"
                onClick={() => props.changePage('postulados')}
            >
                Ver postulantes
            </Button>
                 : null}
          </div>
        ))}
      </Masonry>
    </StyledVacante>
  );
};

export default Vacantes;
