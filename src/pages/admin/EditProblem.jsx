import React from "react";
import { useParams } from "react-router";
import useProblem from "../../hooks/useProblem.js";
import Spinner from "../../components/ui/Spinner.jsx";
import ProblemForm from "../../components/forms/ProblemForm.jsx";

const EditProblem = () => {
  const { id } = useParams();
  const { data: problem, isPending } = useProblem(id);

  if (isPending) {
    return (
      <div className="flex-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return <ProblemForm action="Update" problem={problem} />;
};
export default EditProblem;
