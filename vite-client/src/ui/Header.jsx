import MobileNav from "./MobileNav";
import MobileSearchBar from "../features/search/MobileSearchBar";
import SearchBar from "../features/search/SearchBar";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  return (
    <header className="flex justify-end relative items-center py-6 2xl:py-8 z-20 w-full">
      <MobileNav />
      <SearchBar />
      <MobileSearchBar />
      <ThemeBtn />
    </header>
  );
};

export default Header;
