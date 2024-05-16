import TabsItem from "./tabs-item";
import TabsTitle from "./tabs-title";

function Tabs({ children, className }) {
  return (
    <nav className={className}>
      <ul className="flex items-center justify-center">{children}</ul>
    </nav>
  );
}

export default Tabs;

Tabs.Item = TabsItem;
Tabs.Title = TabsTitle;
