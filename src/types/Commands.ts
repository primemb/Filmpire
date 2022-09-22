export interface ICommands {
  command: string;
  genres?: { id: number; name: string }[];
  [key: string]: any;
}
