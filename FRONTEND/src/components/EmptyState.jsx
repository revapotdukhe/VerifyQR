import { FaRegFileAlt } from "react-icons/fa";

function EmptyState() {

  return (

    <div className="flex flex-col items-center justify-center py-20 text-gray-500">

      <FaRegFileAlt size={80} />

      <h2 className="text-3xl font-bold mt-5">

        No Certificate Generated

      </h2>

      <p className="mt-2">

        Generate your first certificate.

      </p>

    </div>

  );
}

export default EmptyState;