import { Link } from "react-router-dom";

const Error = ({ err }) => {
  return err.response.data?.message === "No notes found for current user" ? (
    <div className="flex flex-col items-center gap-4 justify-center">
      <h2 className="text-center">{err.response.data?.message}</h2>
      <Link
        to="/add-note"
        className="bg-blue-500 p-1 px-2 rounded-md text-white hover:bg-blue-600"
      >
        Create Your First Note
      </Link>
    </div>
  ) : (
    <div>
      <h1 className="text-center font-bold text-3xl text-red-500">
        {err.response.data?.statusCode}
      </h1>
      <h2 className="text-lg mt-5">Üzgünüz bir sorun oluştu</h2>
      <p className="text-lg font-semibold"> {err.response.data?.message}</p>
    </div>
  );
};

export default Error;
