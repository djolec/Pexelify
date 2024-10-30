import { useRef } from "react";
import DesktopNav from "../../ui/DesktopNav";
import DisplayContent from "../../ui/DisplayContent";
import Header from "../../ui/Header";
import DisplayFeaturedCollections from "./DisplayFeaturedCollections";
import Footer from "../../ui/Footer";
import ScrollToTopBtn from "../../ui/ScrollToTopBtn";

const FeaturedCollectionsPage = () => {
  const ref = useRef();

  return (
    <div className="flex w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref}>
        <Header />
        <DisplayFeaturedCollections parentRef={ref} />
        <Footer />
        <ScrollToTopBtn scrollRef={ref} />
      </DisplayContent>
    </div>
  );
};

export default FeaturedCollectionsPage;
