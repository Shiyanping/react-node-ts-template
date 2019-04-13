class Shape {
  area: number;
  color: string;
  constructor(name: string, width: number, height: number) {
    this.area = width * height;
    this.color = 'yellow';
  }

  shoutout() {
    return "I'm " + this.color + ' with an area of ' + this.area + ' cm squared.';
  }
}

var square = new Shape('square', 30, 30);

export default square;
