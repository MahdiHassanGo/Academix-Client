import { useState, useEffect } from "react";
import { FaTrashAlt, FaUserCog } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
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
        const response = await fetch("https://b10a12-server-side-mahdi-hassan-go.vercel.app/users", {
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

  const handleMakeAdmin = async (selectedUser) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${selectedUser.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.error("Access token missing. Please log in.");
        return;
      }

      try {
        const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/users/admin/${selectedUser._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to make user admin");
        }

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === selectedUser._id ? { ...u, role: "admin" } : u
          )
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${selectedUser.name} is now an Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error making admin:", error);
        Swal.fire("Error", error.message || "Failed to make user admin", "error");
      }
    }
  };

  const handleRemoveAdmin = async (selectedUser) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove ${selectedUser.name} from admin role?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("access-token");
      if (!token) {
        console.error("Access token missing. Please log in.");
        return;
      }

      try {
        const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/users/remove-admin/${selectedUser._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to remove admin role");
        }

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === selectedUser._id ? { ...u, role: "student" } : u
          )
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${selectedUser.name} is no longer an Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error removing admin:", error);
        Swal.fire("Error", error.message || "Failed to remove admin role", "error");
      }
    }
  };

  const handleDelete = (selectedUser) => {
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
          const response = await fetch(`https://b10a12-server-side-mahdi-hassan-go.vercel.app/users/${selectedUser._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to delete user");
          }

          setUsers((prevUsers) => prevUsers.filter((u) => u._id !== selectedUser._id));

          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-evenly my-4" data-aos="fade-up">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>

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
              <tr key={user._id} data-aos="fade-up">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button onClick={() => handleRemoveAdmin(user)} className="btn bg-red-500">
                      Remove Admin <TiCancel />
                    </button>
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-500">
                      <FaUserCog className="text-white text-xl" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(user)} className="btn btn-ghost">
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
