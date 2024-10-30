import DisplayCuratedPhotos from "./DisplayCuratedPhotos";
import Header from "../../ui/Header";
import DesktopNav from "../../ui/DesktopNav";
import { useRef } from "react";
import Footer from "../../ui/Footer";
import DisplayContent from "../../ui/DisplayContent";
import ScrollToTopBtn from "../../ui/ScrollToTopBtn";

const CuratedPhotosPage = () => {
  const ref = useRef();

  return (
    <div className="flex w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref}>
        <Header />
        <DisplayCuratedPhotos parentRef={ref} />
        <Footer />
        <ScrollToTopBtn scrollRef={ref} />
      </DisplayContent>
    </div>
  );
};

export default CuratedPhotosPage;
