import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    document.title = "Profile | Academix";
  }, []);

 
  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
         
          const userResponse = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/users/email/${user.email}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
              'Content-Type': 'application/json',
            },
          });

          if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
          }

          const userData = await userResponse.json();
       
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <p><Loading></Loading></p>;
  }

 
  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="bg-gradient-to-b min-h-screen text-white">
      <div className="flex flex-col items-center justify-center min-h-screen py-12" data-aos="fade-up">
        <div className="group bg-Buttons p-8 rounded-lg shadow-lg hover:shadow-2xl ease-in-out w-full max-w-md mx-auto">
          <h2 className="text-center font- text-Profile text-5xl mb-6">My Profile</h2>

       
          <img
            src={userData.photoURL || userData.image || 'https://via.placeholder.com/150'}
            alt={userData.name || 'User'}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-Buttons shadow-xl"
          />

        
          <h3 className="text-center text-xl font-semibold">
            {userData.name || 'Anonymous User'}
          </h3>

     
          <p className="text-center text-Profile">{userData.email}</p>

         
          <p className="text-center text-Profile">Role: {userData.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;