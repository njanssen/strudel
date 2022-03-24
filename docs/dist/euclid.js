import {Pattern, timeCat} from "../_snowpack/link/strudel.js";
import bjork from "../_snowpack/pkg/bjork.js";
import {rotate} from "../_snowpack/link/util.js";
import Fraction from "../_snowpack/link/fraction.js";
const euclid = (pulses, steps, rotation = 0) => {
  const b = bjork(steps, pulses);
  if (rotation) {
    return rotate(b, -rotation);
  }
  return b;
};
Pattern.prototype.euclid = function(pulses, steps, rotation = 0) {
  return this.struct(euclid(pulses, steps, rotation));
};
Pattern.prototype.euclidLegato = function(pulses, steps, rotation = 0) {
  const bin_pat = euclid(pulses, steps, rotation);
  const firstOne = bin_pat.indexOf(1);
  const gapless = rotate(bin_pat, firstOne).join("").split("1").slice(1).map((s) => [s.length + 1, true]);
  return this.struct(timeCat(...gapless)).late(Fraction(firstOne).div(steps));
};
export default euclid;