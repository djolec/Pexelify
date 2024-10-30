import Header from "../../ui/Header";
import DesktopNav from "../../ui/DesktopNav";
import { useRef } from "react";
import Footer from "../../ui/Footer";
import DisplayContent from "../../ui/DisplayContent";
import DisplayCollectionDetails from "./DisplayCollectionDetails";
import ScrollToTopBtn from "../../ui/ScrollToTopBtn";

const CollectionDetails = () => {
  const ref = useRef();

  return (
    <div className="flex w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref}>
        <Header />
        <DisplayCollectionDetails parentRef={ref} />
        <Footer />
        <ScrollToTopBtn scrollRef={ref} />
      </DisplayContent>
    </div>
  );
};

export default CollectionDetails;
