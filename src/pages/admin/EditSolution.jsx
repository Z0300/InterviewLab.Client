import React from "react";
import { useParams } from "react-router-dom";
import useSolution from "../../hooks/useSolution.js";
import Spinner from "../../components/ui/Spinner.jsx";
import SolutionForm from "../../components/forms/SolutionForm.jsx";

const EditSolution = () => {
  const { id } = useParams();

  const { data, isPending } = useSolution(id);

  if (isPending) {
    return (
      <div className="flex-center w-full h-full">
        <Spinner />
      </div>
    );
  }
  return <SolutionForm action="Update" problemId={id} solution={data} />;
};
export default EditSolution;
