export abstract class AbstractException extends Error {
  public readonly code!: number;
  
  protected constructor(message: string) {
    super(message);
  }
  
  getError() {
    return {
      statusCode: this.code,
      error: this.message,
    };
  }
}
