import { LanguageProvider } from "./providers/languageProvider";
import { JupyterProvider } from "./providers/jupyterProvider";
import { type ExtensionContext, Disposable } from "vscode";
import { FileProvider } from "./providers/fileProvider";
import { GitProvider } from "./providers/gitProvider";
import { Provider } from "./providers/provider";
import { Logger } from "./structures/logger";

export class Extension extends Disposable {
  context: ExtensionContext | undefined;
  providers: Provider[] = [];
  logger = new Logger(this);

  constructor() {
    super(() => {
      this.dispose();
    });

    this.createProvider(LanguageProvider);
    this.createProvider(FileProvider);
    this.createProvider(JupyterProvider);
    this.createProvider(GitProvider);
  }

  public createProvider(cl: typeof Provider) {
    this.providers.push(new cl(this));
    this.providers.sort((a, b) => a.priority - b.priority);
  }

  public addProvider(provider: Provider) {
    this.providers.push(provider);
    this.providers.sort((a, b) => a.priority - b.priority);
  }

  public activate(ctx: ExtensionContext) {
    this.context = ctx;
    for (const provider of this.providers) {
      provider.subscribe();
    }

    this.logger.info("VSCord is activated!");
  }

  public deactivate() {
    this.dispose();
  }

  public dispose() {
    for (const subscription of this.context?.subscriptions ?? []) {
      subscription.dispose();
    }
  }
}
