import { Link, useNavigate } from "react-router-dom";
import api from "./../utils/api";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {
    api.post("/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">CASE</h1>
        </div>

        <div className="flex items-center gap-2 group relative">
          {user ? (
            <>
              <img
                className="h-[40px] w-[40px] rounded-full object-cover"
                src={user.photo}
              />
              <span className="font-semibold">{user.username}</span>

              <div className="w-[110px] text-[13px] hidden group-hover:flex  flex-col absolute top-[40px] left-[0px] transition bg-gray-200 rounded-md">
                <>
                  <Link
                    to={"/my-notes"}
                    className="px-5 py-2 hover:bg-gray-100"
                  >
                    Notes
                  </Link>
                  <Link
                    to={"/add-note"}
                    className="px-5 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    Create Note
                  </Link>
                </>

                <button
                  onClick={logout}
                  className="px-5 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="transition hover:text-green-500" to={"/"}>
                Login
              </Link>
              <Link
                className="border border-green-500 p-1 rounded transition hover:bg-green-500 hover:text-white"
                to={"/register"}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
