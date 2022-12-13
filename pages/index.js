import { supabase } from '../lib/initSupabase'
import { Auth } from '@supabase/ui'
import TodoList from '../components/TodoList'
import Navbar from '../components/navbar/navbar';
import { useEffect, useState } from 'react';
import AddStudent from '../components/addStudent';
import Postulado from '../components/postulados/postulados';

export default function IndexPage() {
  const { user } = Auth.useUser();
  let userID = '';
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({})
  
  useEffect(() => {
    setTimeout( () => {
      setUserData(supabase.auth.user());
      userID = supabase.auth.user();
      console.log(userID);
    }, 200);

    if(userData){
      getProfile();

    }
  }, [userData]);

  
  const getProfile = async () => {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select("*")
      .eq('id', userData.id)
    if (error) {
      console.log('error', error.message)
    }
    else {
      setProfileData(profiles[0])
      console.log(profileData, profiles);
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
            {supabase.auth.user() ? (
              <Navbar 
                user={supabase.auth.user()}
                logout={() => {
                  setProfileData({})
                }}

                ></Navbar>
            ) : null}
            {profileData.role == null || profileData.role == '' ? (
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
                    <h1>Maestro </h1>
                    postulados
                    <Postulado></Postulado>
                  </div>
                ) : null
              )

            )}

          </div>
        )}
      </div>
    )
  }
