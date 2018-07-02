export class Venue {
  public name: string;
  public address: string;
  public description: string;

  constructor(name: string, address: string, desc: string) {
    this.name = name;
    this.address = address;
    this.description = desc;
  }
}