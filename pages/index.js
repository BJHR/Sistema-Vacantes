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
  const [editItem, setEditItem] = useState(null);
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({})
  const [vacancyId, setVacancyId] = useState('');
  const [page, setPage] = useState('home');
  useEffect(() => {

    // for scenario 2, this will fire a SIGNED_IN event shortly after page load once the session has been loaded from the server.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Supbase auth event: ${event}`); 
        console.log('sess',session);
        if(session){
          getProfile(session.user.id);
          setUserData(session.user);
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
                id={profileData}
                changePage={(page) => {setPage(page)}}
                page={page}
                logout={() => {
                  setProfileData({})
                }}

                ></Navbar>
            ) : null}
            {profileData.role == null ? (
              <AddStudent setProfile={(data) => { 
                console.log(data);
                setProfileData(data)
              }}/>
            ) : 
            (
               profileData.role == 'estudiante' ? (
                <div>
                  {page == 'ver' ? (
                      <Vacantes user={userData} rol={'alumni'} />
                      ):null}
                </div>

              ) : (
                profileData.role == 'maestro' ? (
                  <div>
                    {page == 'ver' ? (
                      <Vacantes 
                        rol={'maestro'}
                        changePage={(page) => {setPage(page)}}
                        vacancyId={(id) => {setVacancyId(id)}}
                      />
                      ): 
                      page == 'agregar' ? (
                        <AgregarVacante />
                      ) : 
                      page == 'postulados' ? (
                        <Postulado vacancyId={vacancyId}/>
                      ) : null


                      }
                  </div>
                ) : null
              )

            )}

          </div>
        )}
      </div>
    )
  }
