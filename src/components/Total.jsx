import React, { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, User } from 'lucide-react'; 
import Aos from "aos";
import "aos/dist/aos.css";

const Card = ({ children, className, ...rest }) => (
  <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 ${className}`} {...rest}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-row items-center justify-between pb-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-sm font-medium text-gray-600 ${className}`}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={`pt-2 ${className}`}>{children}</div>
);

const Total = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [stats, setStats] = useState({
    users: 0,
    teachers: 0, 
    enrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/users/count');
        const usersCount = await usersResponse.json();
        console.log('Total Users:', usersCount);

        let teachersCount = { total: 0 }; 
        try {
          const teachersResponse = await fetch('http://localhost:5000/teachers/count');
          if (teachersResponse.ok) {
            teachersCount = await teachersResponse.json();
          } else {
            console.error('Failed to fetch teachers count:', teachersResponse.statusText);
          }
        } catch (error) {
          console.error('Error fetching teachers count:', error);
        }
        console.log('Total Teachers:', teachersCount);

        const enrollmentsResponse = await fetch('http://localhost:5000/enrollments/count');
        const enrollmentsCount = await enrollmentsResponse.json();
        console.log('Total Enrollments:', enrollmentsCount);

        setStats({
          users: usersCount.total || 0,
          teachers: teachersCount.total || 0, 
          enrollments: enrollmentsCount.total || 0,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Platform Statistics</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card data-aos="fade-up" data-aos-delay="100">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.users}</div>
              <p className="text-xs text-gray-500 mt-1">Active platform users</p>
            </CardContent>
          </Card>

          <Card data-aos="fade-up" data-aos-delay="200">
            <CardHeader>
              <CardTitle>Total Teachers</CardTitle>
              <User className="h-4 w-4 text-green-600" /> 
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.teachers}</div>
              <p className="text-xs text-gray-500 mt-1">Registered teachers</p>
            </CardContent>
          </Card>

          <Card data-aos="fade-up" data-aos-delay="300">
            <CardHeader>
              <CardTitle>Total Enrollments</CardTitle>
              <GraduationCap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.enrollments}</div>
              <p className="text-xs text-gray-500 mt-1">Student enrollments</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src="/assets/Total.jpg" 
          alt="Education Platform Statistics"
          className="rounded-lg shadow-lg object-cover"
          data-aos="fade-up" data-aos-delay="400"
        />
      </div>
    </div>
  );
};

export default Total;