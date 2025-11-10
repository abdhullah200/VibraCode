export type Starmark = {
  isMarked?: boolean;
};

export type PlaygroundItem = {
  id: string;
  title: string;
  template?: string;
  Starmark?: Starmark[];
};

export async function getAllPlaygroundForUser(): Promise<PlaygroundItem[]> {
  return [
    {
      id: "pg-1",
      title: "Starter Playground",
      template: "REACT",
      Starmark: [{ isMarked: true }],
    },
    {
      id: "pg-2",
      title: "API Prototype",
      template: "EXPRESS",
      Starmark: [{ isMarked: false }],
    },
  ];
}
