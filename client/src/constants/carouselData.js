const carouselData = {
  textColor: ["--primary", "--secondary", "--tertiary"],
  bgColor: [
    "--primary-container",
    "--secondary-container",
    "--tertiary-container",
  ],
  borders: [
    "rounded-br-2xl",
    "rounded-b-2xl",
    "rounded-bl-2xl",
    "rounded-tr-2xl",
    "rounded-t-2xl",
    "rounded-tl-2xl",
  ],
  carousels: [
    {
      type: "curated photos",
      mainText: "High quality stock photos for free!",
      smallText:
        "Explore our exceptional collection of high-quality stock photos.",
      link: "/photos/curated",
      assets: [
        { link: "/images/photo-banner-1.webp", type: "photo" },
        { link: "/images/photo-banner-2.webp", type: "photo" },
        { link: "/images/photo-banner-3.webp", type: "photo" },
        { link: "/images/photo-banner-4.webp", type: "photo" },
        { link: "/images/photo-banner-5.webp", type: "photo" },
        { link: "/images/photo-banner-6.webp", type: "photo" },
      ],
    },
    {
      type: "popular videos",
      mainText: "Top rated stock videos for free!",
      smallText:
        "Our curated selection videos are sure to inspire and captivate.",
      link: "/videos/popular",
      assets: [
        {
          link: "/videos/video-banner-1.webm",
          type: "video",
          height: "420",
          width: "360",
        },
        {
          link: "/videos/video-banner-2.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/videos/video-banner-3.webm",
          type: "video",
          height: "360",
          width: "480",
        },
        {
          link: "/videos/video-banner-4.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/videos/video-banner-5.webm",
          type: "video",
          height: "360",
          width: "640",
        },
        {
          link: "/videos/video-banner-6.webm",
          type: "video",
          height: "360",
          width: "480",
        },
      ],
    },
    {
      type: "featured collections",
      mainText: "Best collections with best media!",
      smallText:
        "Discover a treasure trove of stunning images and captivating videos.",
      link: "/collections/featured",
      assets: [
        {
          link: "/images/collection-banner-1.webp",
          type: "photo",
        },
        {
          link: "/videos/collection-banner-2.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/images/collection-banner-3.webp",
          type: "photo",
        },
        {
          link: "/images/collection-banner-4.webp",
          type: "photo",
        },

        {
          link: "/videos/collection-banner-5.webm",
          type: "video",
          height: "360",
          width: "640",
        },
        {
          link: "/videos/collection-banner-6.webm",
          type: "video",
          height: "360",
          width: "480",
        },
      ],
    },
  ],
};

export default carouselData;
