import { supabase } from '../lib/initSupabase'
import { Auth } from '@supabase/ui'
import TodoList from '../components/TodoList'
import Navbar from '../components/navbar/navbar';
import { useEffect, useState } from 'react';
import AddStudent from '../components/addStudent';
import Postulado from '../components/postulados/postulados';
import { useUser } from '@supabase/auth-helpers-react';
import AgregarVacante from '../components/agregarVacante';
import Vacantes from '../components/verVacantes';



export default function IndexPage() {
  const { user,error } = Auth.useUser();
  const loggeduser = useUser();
  let userID = '';
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({})
  
  const [page, setPage] = useState('home');
  useEffect(() => {

    // for scenario 2, this will fire a SIGNED_IN event shortly after page load once the session has been loaded from the server.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Supbase auth event: ${event}`); 
        console.log('sess',session);
        if(session){
          getProfile(session.user.id);
        }
      }
    );
   
    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  
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

   
    //console.log(userData);
    return (
      <div className="w-full h-full bg-gray-300">
        {!user ? (
          <div className="w-full h-full flex justify-center items-center p-4">
            <div>
              <Auth
                supabaseClient={supabase}
                providers={['google', 'github']}
                socialLayout="horizontal"
                socialButtonSize="xlarge"
                redirectTo='https://syexrciahcqhhjbewuuj.supabase.co/auth/v1/callback'
              />
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-center items-center p-4"
            style={{ margin: 'auto' }}
          >
            {profileData != null || profileData !={} ? (
              <Navbar 
                user={supabase.auth.user()}
                profileData={profileData}
                changePage={(page) => {setPage(page)}}
                page={page}
                logout={() => {
                  setProfileData({})
                }}

                ></Navbar>
            ) : null}
            {profileData == null || profileData == {} ? (
              <AddStudent setProfile={(data) => { 
                console.log(data);
                setProfileData(data)
              }}/>
            ) : 
            (
               profileData.role == 'estudiante' ? (
                <div>
                  <h1>Estudiante</h1>
                  vacantes
                </div>

              ) : (
                profileData.role == 'maestro' ? (
                  <div>
                    <div className='navMaestro'>
                      <h4>Vacantes disponibles</h4>
                     
                    </div>
                    {page == 'ver' ? (
                      <Vacantes />
                      ): (
                      <AgregarVacante />
                      )}
                  </div>
                ) : null
              )

            )}

          </div>
        )}
      </div>
    )
  }
