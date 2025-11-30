import React from "react";
import SolutionForm from "../../components/forms/SolutionForm.jsx";
import { useParams } from "react-router-dom";

const AddSolution = () => {
  const { problemId } = useParams();
  return <SolutionForm action="Add" problemId={problemId} />;
};
export default AddSolution;
