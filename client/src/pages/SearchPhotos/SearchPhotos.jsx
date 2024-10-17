import DesktopNav from "../../ui/DesktopNav";
import DisplayContent from "../../ui/DisplayContent";
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import { useRef } from "react";
import DisplaySearchPhotos from "./DisplaySearchPhotos";

const SearchPhotos = () => {
  const ref = useRef();

  return (
    <div className="flex w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref}>
        <Header />
        <DisplaySearchPhotos parentRef={ref} />
        <Footer />
      </DisplayContent>
    </div>
  );
};

export default SearchPhotos;