abstract class Figure{
    readonly color: string;
    readonly name: string;

    protected constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }

    abstract calculateArea(): number;
}
interface Printable{
    print(): void;
}

class Circle extends Figure{
    private readonly radius: number;

    constructor(color: string, radius: number) {
        super(color, 'Circle');
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Figure implements Printable{
    private readonly side: number;

    constructor(color: string, side: number) {
        super(color, 'Square');
        this.side = side;
    }

    calculateArea(): number {
        return this.side * this.side
    }

    print(): void {
        console.log(`${this.side} * ${this.side}`);
    }
}

class Triangle extends Figure{
    private readonly base: number;
    private readonly height: number;

    constructor(color: string, base: number, height: number) {
        super(color, 'Triangle');
        this.base = base;
        this.height = height;
    }

    calculateArea(): number {
        return (this.base * this.height) / 2;
    }
}

class Rectangle extends Figure implements Printable{
    private readonly length: number;
    private readonly width: number;

    constructor(color: string, length: number, width: number) {
        super(color, 'Rectangle');
        this.length = length;
        this.width = width;
    }

    calculateArea(): number {
        return this.length * this.width;
    }

    print(): void {
        console.log(`${this.length} * ${this.width}`);
    }
}