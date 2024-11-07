import MobileNav from "./MobileNav";
import MobileSearchBar from "../features/search/MobileSearchBar";
import SearchBar from "../features/search/SearchBar";
import ThemeBtn from "./ThemeBtn";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 mb-4 flex w-full items-center justify-end border-b border-b-slate-400/20 bg-[var(--background)] px-4 py-6 sm:px-8 2xl:py-8">
      <MobileNav />
      <SearchBar />
      <MobileSearchBar />
      <ThemeBtn />
    </header>
  );
};

export default Header;
