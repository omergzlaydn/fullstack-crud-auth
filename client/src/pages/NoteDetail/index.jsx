import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../../components/Loader";
import Info from "./Info";
import Error from "../../components/Error";
import Buttons from "./Buttons";

const NoteDetail = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery("note", () =>
    api.get(`/note/${id}`).then((res) => res.data.note)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error err={error} />
      ) : (
        <>
          <Buttons id={data?._id} />
          <Info data={data} />
        </>
      )}
    </div>
  );
};

export default NoteDetail;
