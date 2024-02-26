import { ToastOptions, toast } from "react-toastify";

export class NotificationHandler {
  /**
   * Class instanceto Follow singleton design
   */
  private static _instance: NotificationHandler;

  /**
   * Get instance method or create if not exists
   */
  public static get instance(): NotificationHandler {
    if (!this._instance) {
      this._instance = new NotificationHandler();
    }

    return this._instance;
  }

  /**
   * Toastify common config
   */
  private _config: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  /**
   * Promise Notification
   *
   * @param pending Pending notification Text
   * @param error Error notification Text
   * @param success Success notification Text
   * @param promise Promise to wait
   */
  public promise(
    pending: string,
    success: string,
    error: string,
    promise: Promise<any>
  ): void {
    toast.promise(promise, { pending, error, success }, this._config);
  }

  /**
   * Info Notification
   *
   * @param text Notification Text
   */
  public info(text: string): void {
    toast.info(text, this._config);
  }

  /**
   * Success Notification
   *
   * @param text Notification Text
   */
  public success(text: string): void {
    toast.success(text, this._config);
  }

  /**
   * Error Notification
   *
   * @param text Notification Text
   */
  public error(err: any): void {
    let text;
    if (typeof err === "string") {
      text = err;
    } else if (err.message) {
      text = err.message;
    } else {
      text = "Unknown error.";
    }

    toast.error(text, this._config);
  }

  constructor() {}
}
