export interface BaseCommandOptions<N extends string = string, T extends any = any> {
  name: N;
  data: T;
}
