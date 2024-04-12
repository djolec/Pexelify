import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CollectionCard = ({ title, mediaCount, collectionID }) => {
  return (
    <Link
      aria-label={`View collection ${collectionID}`}
      to={`/collections/${collectionID}/${title}`}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex w-full flex-col items-start justify-center border-b-[1px] border-b-[var(--outline)] px-3 py-2 transition-colors duration-100 hover:bg-gray-600/10"
      >
        <h2 className="line-clamp-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl">
          {title}
        </h2>
        <p className="text-sm text-[var(--on-surface-variant)] 2xl:text-xl">{`${mediaCount} media`}</p>
      </motion.button>
    </Link>
  );
};

export default CollectionCard;
