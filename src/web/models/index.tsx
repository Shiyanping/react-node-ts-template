import { createContext } from "react";
import { decorate, observable, computed } from "mobx";

export class store {
  str = "syp";
}

decorate(store, {
  str: observable
});

export default createContext(new store());
