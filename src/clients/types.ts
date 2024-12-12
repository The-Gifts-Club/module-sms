export type StatsResult = {
  success: boolean;
  monthlyResult: [
    {
      month: string;
      year: string;
      m: string;
      date: number;
      type: "day" | "month";
      cost: string;
      nb_send: string;
    },
  ];
};
