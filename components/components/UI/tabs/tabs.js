import TabsItem from "./tabs-item";
import TabsTitle from "./tabs-title";

function Tabs({ children }) {
  return (
    <nav className="w-full p-5">
      <ul className="flex items-center justify-around">{children}</ul>
    </nav>
  );
}

export default Tabs;

Tabs.Item = TabsItem;
Tabs.Title = TabsTitle;
