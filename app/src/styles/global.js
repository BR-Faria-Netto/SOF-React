import { createGlobalStyle } from "styled-components";
import px2vw from "../components/px2vw";
export const Global = createGlobalStyle
`
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    font-size: ${px2vw(11)};
      @media (minwidth: 768px) {
        fontsize: ${px2vw(11)};
      }
      @media (minwidth: 1024px) {
        fontsize: ${px2vw(11)};
      }
    }
`
export default Global;