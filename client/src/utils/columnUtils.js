export const distributeMedia = (
  data,
  finalColumns,
  finalColumnHeights,
  type,
  numberOfColumns,
) => {
  const calculateColumns = (mediaData, columnHeights, columns) => {
    mediaData.forEach((mediaObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights),
      );
      columns[smallestColumnIndex].push(mediaObj);
      columnHeights[smallestColumnIndex] += mediaObj.height / mediaObj.width;
    });
  };

  data?.pages.forEach((page) => {
    const columns = Array.from({ length: numberOfColumns }, () => []);
    const columnHeights = Array(numberOfColumns).fill(0);
    calculateColumns(page.data[type], columnHeights, columns);
    columns.forEach(() => {
      const shortestFinalColumnIndex = finalColumnHeights.indexOf(
        Math.min(...finalColumnHeights),
      );
      const longestColumnIndex = columnHeights.indexOf(
        Math.max(...columnHeights),
      );
      finalColumns[shortestFinalColumnIndex].push(
        ...columns[longestColumnIndex],
      );
      finalColumnHeights[shortestFinalColumnIndex] +=
        columnHeights[longestColumnIndex];
      columnHeights[longestColumnIndex] = -1;
    });
  });
  return finalColumns;
};
