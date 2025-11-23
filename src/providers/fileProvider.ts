import { Extension } from "../extension";
import { Provider } from "./provider";

export class FileProvider extends Provider {
    constructor(extension: Extension) {
        super(extension, 0)
    }
}