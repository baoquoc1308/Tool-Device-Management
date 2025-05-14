import { httpRequest } from "@/lib";
import { useState } from "react";
const DashboardPage = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const api = new httpRequest();
  const getUser = async () => {
    const response = await api.get("/user");
    if (!response.success) {
      setError(response.data);
      return;
    }
    return setData(response.data);
  };
  const addUser = async () => {
    const response = await api.post("/user", { name: "Quoc Dinh", age: 20 });
    if (!response.success) {
      setError(response.data);
      return;
    }
    return setResponse(response.data);
  };

  const updateUser = async () => {
    const response = await api.put("/user/1", { name: "Quoc Dinh 1" });
    if (!response.success) {
      setError(response.data);
      return;
    }
    return setResponse(response.data);
  };
  const deleteUser = async () => {
    const response = await api.delete("/user/1");
    if (!response.success) {
      setError(response.data);
      return;
    }
    return setResponse(response.data);
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      {data && (
        <div>
          {data.map((item) => (
            <div key={item.id}>Tên: {item.name}</div>
          ))}
        </div>
      )}
      {response && <div>{JSON.stringify(response)}</div>}
      <button
        className="cursor-pointer bg-gray-400 w-fit p-3"
        onClick={getUser}
      >
        Get user
      </button>
      <button
        className="cursor-pointer bg-gray-400 w-fit p-3"
        onClick={addUser}
      >
        Add user
      </button>
      <button
        className="cursor-pointer bg-gray-400 w-fit p-3"
        onClick={updateUser}
      >
        Update user
      </button>
      <button
        className="cursor-pointer bg-gray-400 w-fit p-3"
        onClick={deleteUser}
      >
        Delete user
      </button>
    </div>
  );
};

export default DashboardPage;
