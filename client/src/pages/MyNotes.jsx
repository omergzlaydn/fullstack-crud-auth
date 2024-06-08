import Error from "../components/Error";
import NoteCard from "../components/NoteCard";
import Loader from "../components/Loader";
import api from "../utils/api";
import { useQuery } from "react-query";
import FilterArea from "../components/FilterArea";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const MyNotes = () => {
  const [searchParams] = useSearchParams();

  const params = {
    userId: JSON.parse(localStorage.getItem("user"))._id,
    search: searchParams.get("query"),
    tag: searchParams.get("tag"),
    page: searchParams.get("page"),
    perPage: 2,
  };

  const { isLoading, error, data } = useQuery(
    ["gigs", params.search, params.tag, params.page],
    () => api.get(`/note`, { params }).then((res) => res.data)
  );

  return (
    <div>
      <h1 className="text-2xl mb-5">My Notes</h1>

      <FilterArea />

      <div className="flex-1 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error err={error} />
          ) : (
            data.notes.map((note) => <NoteCard key={note._id} note={note} />)
          )}
        </div>

        <Pagination total={data?.totalPages} />
      </div>
    </div>
  );
};

export default MyNotes;
