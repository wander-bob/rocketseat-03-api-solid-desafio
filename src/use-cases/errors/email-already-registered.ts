export class EmailAlreadyRegisterd extends Error {
   constructor() {
      super('This e-mail address is already registered.');
   }
}
