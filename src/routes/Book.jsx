import { useParams } from "react-router-dom";

function Book() {
  const params = useParams();
  console.log(params.name);

  return <div>{params.name}</div>;
}

export default Book;
