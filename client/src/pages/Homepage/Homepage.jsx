import Carousel from "../../ui/Carousel";
import DesktopNav from "../../ui/DesktopNav";
import DisplayContent from "../../ui/DisplayContent";
import Footer from "../../ui/Footer";
import Header from "../../ui/Header";
import HomepageCollections from "./HomepageCollections";
import HomepagePhotos from "./HomepagePhotos";
import HomepageVideos from "./HomepageVideos";
import { useRef } from "react";

const Homepage = () => {
  const ref = useRef();

  return (
    <div className="flex flex-row w-full">
      <DesktopNav />

      <DisplayContent scrollRef={ref} grid={false}>
        <Header />
        <Carousel />
        <HomepagePhotos />
        <HomepageVideos />
        <HomepageCollections />
        <Footer />
      </DisplayContent>
    </div>
  );
};

export default Homepage;
