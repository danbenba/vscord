import { Extension } from "../extension";
import { Provider } from "./provider";

export class LanguageProvider extends Provider {
    constructor(extension: Extension) {
        super(extension, 0)
    }
}