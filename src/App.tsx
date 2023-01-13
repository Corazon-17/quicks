import axios from "axios";
import { useEffect } from "react";
import Layout from "./components/layout";
import Quicks from "./components/quicks";
import { useUserStore } from "./store";

function App() {
  const setUserId = useUserStore((state) => state.setId);

  useEffect(() => {
    const updateUserId = async () => {
      axios
        .get("https://mockend.com/Corazon-17/quicks/users")
        .then((response) => {
          const users = response.data;
          const activeUser = users.filter(
            (user: any) => user.name === "Corazon17"
          )[0];

          setUserId(activeUser.id);
        })
        .catch((error) => console.log(error));
    };

    updateUserId();
  }, []);

  return (
    <Layout>
      <Quicks />
    </Layout>
  );
}

export default App;
