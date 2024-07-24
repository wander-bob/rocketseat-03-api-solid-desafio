export class InvalidAuthError extends Error {
   constructor() {
      super('Invalid -mail or password.');
   }
}
