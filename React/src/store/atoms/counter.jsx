import { atom, selector } from "recoil";

export const counterAtom = atom({
  key: "counterAtom",
  default: 0,
});

export const evenSelector = selector({
  key: "isEvenSelector",
  get: function({get}) {
    const currCount = get(counterAtom);
    const isEven = (currCount % 2 == 0);
    return isEven; 
  }
})