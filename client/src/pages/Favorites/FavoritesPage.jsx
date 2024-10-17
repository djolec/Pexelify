import DisplayFavorites from "./DisplayFavorites";
import Header from "../../ui/Header";
import DesktopNav from "../../ui/DesktopNav";
import { useRef } from "react";
import Footer from "../../ui/Footer";
import DisplayContent from "../../ui/DisplayContent";

const FavoritesPage = () => {
  const ref = useRef();

  return (
    <div className="flex w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref}>
        <Header />
        <DisplayFavorites parentRef={ref} />
        <Footer />
      </DisplayContent>
    </div>
  );
};

export default FavoritesPage;