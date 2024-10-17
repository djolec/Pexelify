import { useState } from "react";
import MobileSearchBarToggle from "./MobileSearchBarToggle";
import MobileSearchBody from "./MobileSearchBody";

const MobileSearchBar = () => {
  const [mobSearchOpen, setMobSearchOpen] = useState(false);

  return (
    <>
      <MobileSearchBarToggle setMobSearchOpen={setMobSearchOpen} />

      {mobSearchOpen && (
        <MobileSearchBody setMobSearchOpen={setMobSearchOpen} />
      )}
    </>
  );
};

export default MobileSearchBar;
