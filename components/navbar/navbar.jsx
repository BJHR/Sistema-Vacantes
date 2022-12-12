import StyledNavbar from "./navbarStyles"
import { supabase } from '../../lib/initSupabase'
import { useEffect, useState } from "react"
import { Auth } from "@supabase/ui";


const Navbar = (props) => {
    const user=Auth.useUser();

    useEffect(() => {
        //console.log(user.user.user_metadata);
    }, [])

    
    return (
        <StyledNavbar>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <p>Hola! {user.user.user_metadata.full_name ? user.user.user_metadata.full_name : user.user.user_metadata.email }</p>
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