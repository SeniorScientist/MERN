import "@emotion/react";
import { MyTheme as CustomTheme } from "./theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}