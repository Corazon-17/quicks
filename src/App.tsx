import axios from "axios";
import Layout from "./components/layout";
import Quicks from "./components/quicks";

function App() {
  axios.get("https://mockend.com/mockend/demo/posts/1").then((response) => console.log(response))

  return (
    <Layout>
      <Quicks />
    </Layout>
  );
}

export default App;
