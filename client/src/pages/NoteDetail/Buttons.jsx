import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const Buttons = ({ id }) => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return api.delete(`/note/${id}`);
    },

    onSuccess: () => {
      toast.warning("Note Deleted");

      navigate("/my-notes");
    },

    onError: () => {
      toast.warning("Failed to delete");
    },
  });

  return (
    <div className="flex justify-end gap-4 text-white">
      <Link
        to={`edit`}
        className="bg-blue-500 py-1 px-2 rounded-md hover:bg-blue-600"
      >
        Edit
      </Link>
      <button
        disabled={isLoading}
        onClick={() => mutate()}
        className="bg-red-500 py-1 px-2 rounded-md hover:bg-red-600"
      >
        {isLoading ? "..." : "Delete"}
      </button>
    </div>
  );
};

export default Buttons;
