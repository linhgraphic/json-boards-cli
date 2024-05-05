export type JsonBoardsSchema = {
  boards: [
    {
      name: string;
      vendor: string;
      core: string;
      has_wifi: boolean;
    }
  ];
};

export type JsonBoardsExportSchema = {
  boards: JsonBoardsSchema["boards"];
  _metadata: {
    total_vendors: number;
    total_boards: number;
  };
};
