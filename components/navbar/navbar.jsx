import StyledNavbar from "./navbarStyles"
import { supabase } from '../../lib/initSupabase'
import { useEffect, useState } from "react"
import { Auth } from "@supabase/ui";


const Navbar = (props) => {
    const user=Auth.useUser();
    const [profileData, setProfileData] = useState({})
    const getProfile = async (id) => {
        console.log(id);
        let { data: profiles, error } = await supabase
          .from('profiles')
          .select("*")
          .eq('id', id)
        if (error) {
          console.log('error', error.message)
        }
        else {
            console.log(profiles);
          setProfileData(profiles[0])
          //console.log(profileData, profiles);
        }
    
      }

    useEffect(() => {
        //console.log(props);
        if(props.user){
            getProfile(props.user.id)
        }
    }, [props])

    
    return (
        <StyledNavbar>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p>Hola! {user.user.user_metadata.full_name ? user.user.user_metadata.full_name : user.user.user_metadata.email }</p>
                    {props.profileData != {} ? (
                        <div className="links">
                            <p
                        onClick={() => {
                            props.changePage('ver')
                        }}
                        >Ver Vacante</p>
                        {profileData?.role === 'maestro' ? (
                            <p
                        onClick={() => {
                            props.changePage('agregar')
                        }}
                        >Agregar Vacantes</p>
                        ) : null

                        }
                        
                        </div>
                        
                    ):
                        null                        
                    }
                        <button
                            className="btn-black w-full my-2"
                            onClick={async () => {
                                const { error } = await supabase.auth.signOut();
                                //props.logout()
                                if (error) console.log('Error logging out:', error.message)
                            }}
                        >
                            Salir
                        </button>
                </nav>
            </div>

        </StyledNavbar>
    )
}

export default Navbar