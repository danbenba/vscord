import { Base } from "../structures/base";
import { Extension } from "../extension";

/**
 * Provider is the main way for VSCord to figure out what variable name corospond to what
 */

export class Provider extends Base {
  constructor(extension: Extension, public priority = 0) {
    super(extension);
  }

  public subscribe() {

  }
}
