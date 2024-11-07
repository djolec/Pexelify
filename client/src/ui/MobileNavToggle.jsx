import MenuIcon from "../assets/svg/menu.svg?react";

const MobileNavToggle = ({ setMobMenuOpen, navigate }) => {
  return (
    <div className="mr-auto flex flex-row items-center gap-2 sm:hidden">
      <button
        onClick={() => setMobMenuOpen(true)}
        aria-label="menu"
        className="text-[var(--on-background)]"
      >
        <MenuIcon className="h-8 w-auto" />
      </button>
      <button
        aria-label="navigate to home"
        onClick={() => navigate("/homepage")}
      >
        <img
          height="250"
          width="250"
          className="h-10 w-auto"
          src={"/assets/logos/PexelifyLogo.webp"}
          alt=""
        />
      </button>
    </div>
  );
};

export default MobileNavToggle;
