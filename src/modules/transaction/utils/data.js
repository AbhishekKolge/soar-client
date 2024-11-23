export const transactionHeaders = [
  {
    title: "Date",
    key: "createdAt",
    sort: [
      {
        key: "latest",
        title: "Latest",
        type: "asc",
      },
      {
        key: "oldest",
        title: "Oldest",
        type: "desc",
      },
    ],
  },
  {
    title: "Recipient",
    key: "recipient",
    sort: [
      {
        key: "aToZ",
        title: "A-Z",
        type: "asc",
      },
      {
        key: "zToA",
        title: "Z-A",
        type: "desc",
      },
    ],
  },
  {
    title: "Category",
    key: "category",
    sort: [
      {
        key: "aToZ",
        title: "A-Z",
        type: "asc",
      },
      {
        key: "zToA",
        title: "Z-A",
        type: "desc",
      },
    ],
  },
  {
    title: "Type",
    key: "method",
  },
  {
    title: "Amount",
    key: "amount",
    sort: [
      {
        key: "highest",
        title: "Highest",
        type: "asc",
      },
      {
        key: "lowest",
        title: "Lowest",
        type: "desc",
      },
    ],
  },
  {
    title: "Balance",
    key: "balance",
  },
  {
    title: "Note",
    key: "note",
  },
];
