import useIsMobile from "./useIsMobile";

const useDistributeMedia = () => {
  const isMobile = useIsMobile();

  // takes data from a single page and distributes it into 3 columns, balancing the height
  const calculateColumns = (mediaData) => {
    let columns = Array.from({ length: isMobile ? 2 : 3 }, () => []);
    let columnHeights = Array(isMobile ? 2 : 3).fill(0);

    mediaData.forEach((mediaObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[smallestColumnIndex].push(mediaObj);
      columnHeights[smallestColumnIndex] += mediaObj.height / mediaObj.width;
    });

    return { columns, columnHeights };
  };

  //
  const distributeMedia = (data, type) => {
    const finalColumns = Array.from({ length: isMobile ? 2 : 3 }, () => []);
    let finalColumnHeights = Array(isMobile ? 2 : 3).fill(0);

    data?.pages.forEach((page) => {
      let { columns, columnHeights } = calculateColumns(page.data[type]);

      columns.forEach(() => {
        const shortestFinalColumnIndex = finalColumnHeights.indexOf(
          Math.min(...finalColumnHeights)
        );
        const longestColumnIndex = columnHeights.indexOf(
          Math.max(...columnHeights)
        );

        finalColumns[shortestFinalColumnIndex].push(
          ...columns[longestColumnIndex]
        );
        finalColumnHeights[shortestFinalColumnIndex] +=
          columnHeights[longestColumnIndex];
        columnHeights[longestColumnIndex] = -1;
      });
    });

    return finalColumns;
  };

  return distributeMedia;
};

export default useDistributeMedia;
