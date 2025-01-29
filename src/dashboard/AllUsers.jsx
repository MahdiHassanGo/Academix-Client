import { useState, useEffect } from "react";
import { FaTrashAlt, FaUserCog } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import Aos from "aos";
import "aos/dist/aos.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "All Users | Academix";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.error("Access token missing. Please log in.");
        setError("Access token missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://server-ecru-nu-72.vercel.app/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async (user) => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      console.error("Access token missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`https://server-ecru-nu-72.vercel.app/users/admin/${user._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to make user admin");
      }

      const data = await response.json();

      const updatedUsers = users.map((u) =>
        u._id === user._id ? { ...u, role: "admin" } : u
      );
      setUsers(updatedUsers);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name} is now an Admin`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to make user admin",
      });
    }
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("access-token");
        if (!token) {
          console.error("Access token missing. Please log in.");
          return;
        }

        try {
          const response = await fetch(`https://server-ecru-nu-72.vercel.app/users/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (data.deletedCount > 0) {
            const updatedUsers = users.filter((u) => u._id !== user._id);
            setUsers(updatedUsers);

            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete user",
          });
        }
      }
    });
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-evenly my-4" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>

      {/* Table container with overflow handling */}
      <div className="w-11/12 mx-auto overflow-auto">
        <table className="ml-5 table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-orange-300 text-white"></th>
              <th className="bg-orange-300 text-white">Name</th>
              <th className="bg-orange-300 text-white">Email</th>
              <th className="bg-orange-300 text-white">Role</th>
              <th className="bg-orange-300 text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                data-aos="fade-up"
                data-aos-delay={index < users.length - 2 ? 200 + index * 100 : 0} // Adjust delay for last two rows
                data-aos-once="true" // Ensure animation runs only once
              >
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-orange-500"
                    >
                      <FaUserCog className="text-white text-xl" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;