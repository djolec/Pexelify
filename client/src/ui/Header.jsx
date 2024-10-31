import MobileNav from "./MobileNav";
import MobileSearchBar from "../features/search/MobileSearchBar";
import SearchBar from "../features/search/SearchBar";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  return (
    <header className="flex justify-end items-center py-6 2xl:py-8 z-20 w-full sticky top-0 bg-[var(--background)] mb-4 border-b border-b-slate-400/20 sm:px-8 px-4">
      <MobileNav />
      <SearchBar />
      <MobileSearchBar />
      <ThemeBtn />
    </header>
  );
};

export default Header;
