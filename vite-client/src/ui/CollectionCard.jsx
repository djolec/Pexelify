import { Link } from "react-router-dom";

const CollectionCard = ({ title, mediaCount, collectionID }) => {
  return (
    <Link
      aria-label={`View collection ${collectionID}`}
      to={`/collections/${collectionID}/${title}`}
    >
      <button className="flex w-full flex-col items-start justify-center border-b-[1px] border-b-[var(--outline)] px-3 py-2 transition-colors duration-100 hover:bg-gray-600/10">
        <h2 className="line-clamp-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-[var(--on-surface-variant)] 2xl:text-xl">{`${mediaCount} media`}</p>
      </button>
    </Link>
  );
};

export default CollectionCard;
