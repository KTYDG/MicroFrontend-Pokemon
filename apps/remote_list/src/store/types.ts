export interface IPokemon {
  id: number;
  name?: string;
  height?: number;
  weight?: number;
  sprites?: {
    front_default: string;
  };
}