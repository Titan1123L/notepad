import { useEffect, useState } from "react";
import MainDashboard from "./components/Main/MainDashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Tasklist from "./components/TaskList/Tasklist";
import { databases } from "../appwrite-config";
import { toast } from "react-toastify";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    const promise = databases.listDocuments(
      "6742b42000277f9c263e",
      "6742b42d001ec2f9f2b2"
    );
    promise.then(
      function (response) {
        setNotes(response.documents);
      },
      function (error) {
        console.log(error);
        toast.error(`Error fetching notes: ${error}`, {
          autoClose: 2000,
        });
      }
    );
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="flex">
      <Sidebar notes={notes} setNotes={setNotes} fetchNotes={fetchNotes} />
      <MainDashboard
        notes={notes}
        setNotes={setNotes}
        fetchNotes={fetchNotes}
      />
      <Tasklist />
    </section>
  );
}

export default App;
