import Form from "../components/UI/Form";
import Header from "../components/UI/Header";

export default function Home() {


  return (
  <div className="relative min-h-screen">
    <div className="absolute w-full">
      <Header />
    </div>
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🔗 ChotaLink
        </h1>
        <Form />
      </div>
    </div>
  </div>
  );
}
