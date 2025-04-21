const distance = 80;
export const generatePlayersTablePositions = (
  playersCount: number,
  tableHeight: number,
  tableWidth: number
) => {
  const opponentsCount = playersCount - 1;
  switch (opponentsCount) {
    case 5:
      return [
        { left: -distance + 5 },
        { left: tableHeight / 4 - distance, top: 0 },
        { top: -distance + 10 },
        { right: tableHeight / 4 - distance, top: 0 },
        { right: -distance + 5 },
      ];
    case 4:
      return [
        { left: -distance + 20, top: tableHeight / 4 },
        { left: tableWidth / 4 + distance / 2, top: -distance + 10 },
        { right: tableWidth / 4 + distance / 2, top: -distance + 10 },
        { right: -distance + 20, top: tableHeight / 4 },
      ];

    case 3:
      return [
        { left: -distance + 20, top: tableHeight / 4 },
        { top: -distance + 10 },
        { right: -distance + 20, top: tableHeight / 4 },
      ];

    case 2:
      return [
        { left: tableWidth / 4 + distance / 2, top: -distance + 10 },
        { right: tableWidth / 4 + distance / 2, top: -distance + 10 },
      ];
    case 1:
      return [{ top: -distance + 10 }];

    default:
      return [];
  }
};
