import SearchIcon from "../../assets/svg/search.svg?react";

const MobileSearchBarToggle = ({ setMobSearchOpen }) => {
  return (
    <button
      aria-label="open mobile search bar"
      onClick={() => setMobSearchOpen((prev) => !prev)}
      className="mr-3 rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)] sm:hidden"
    >
      <SearchIcon className="h-10 w-auto p-[10px] 2xl:h-12" />
    </button>
  );
};

export default MobileSearchBarToggle;
