import Content from "../components/Content";
import NavBar from "../components/NavBar";
import { navItems } from "../utils/data";

const Main = () => {
  return (
      <div className="min-h-screen flex">
        <NavBar items={navItems} />
        <Content />
      </div>
  );
};

export default Main;
