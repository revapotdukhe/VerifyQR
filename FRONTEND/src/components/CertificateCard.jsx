export default function CertificateCard({
  certificate
}) {

  return (

    <div className="bg-white shadow rounded p-5">

      <h2 className="text-xl font-bold">
        {certificate.studentName}
      </h2>

      <p>{certificate.course}</p>

      <p>{certificate.issueDate}</p>

    </div>

  );
}