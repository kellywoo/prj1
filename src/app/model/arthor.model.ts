export class AuthorModel {
  name: string ='';
  avatar: string = '';
  comment: string = '';

  private constructor(obj: AuthorModel) {
    Object.assign(this, obj);
  }

  static create(obj: {name: string, avatar: string, comment: string}){
    return new AuthorModel(obj);
  }
}
