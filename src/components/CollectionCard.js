import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../App";

const CollectionCard = ({ title, mediaCount, collectionID }) => {
  const { setCurrentCollTitle } = useContext(AppContext);

  return (
    <Link to={`/media/collection/${collectionID}`}>
      <motion.button
        onClick={() => setCurrentCollTitle(title)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hover:bg-gray-600/10 transition-colors duration-100 px-3 w-full py-2 border-b-[1px] border-b-[var(--outline)] flex flex-col items-start justify-center"
      >
        <h2 className="text-lg text-[var(--on-background)] text-left line-clamp-1">
          {title}
        </h2>
        <p className="text-[var(--on-surface-variant)] text-sm">{`${mediaCount} media`}</p>
      </motion.button>
    </Link>
  );
};

export default CollectionCard;
