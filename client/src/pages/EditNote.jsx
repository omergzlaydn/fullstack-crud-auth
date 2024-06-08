import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";
import AddNote from "./AddNote";
import Loader from "../components/Loader";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: "note",
    queryFn: () => api.get(`/note/${id}`).then((res) => res.data.note),
    onError: () => {
      toast.error("Note not found");
      navigate("/my-notes");
    },
  });

  return <div>{isLoading ? <Loader /> : <AddNote editItem={data} />}</div>;
};

export default EditNote;
