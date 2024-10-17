import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileNavToggle from "./MobileNavToggle";
import MobileNavMenu from "./MobileNavMenu";
import Overlay from "./Overlay";

const MobileNav = () => {
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <MobileNavToggle setMobMenuOpen={setMobMenuOpen} navigate={navigate} />

      {mobMenuOpen && (
        <>
          <Overlay />
          <MobileNavMenu setMobMenuOpen={setMobMenuOpen} />
        </>
      )}
    </>
  );
};

export default MobileNav;
