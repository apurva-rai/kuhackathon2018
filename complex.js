class Complex {
    constructor(real, imaginary){
        this.real = real;
        this.imaginary = imaginary;
    }
    
    add(Complex num1, Complex num2)
    {
        return new Complex(num1.real + num2.real, num1.imaginary +num2.imaginary);
    }
    
    subtract(Complex num1, Complex num2)
    {
        return new Complex(num1.real - num2.real, num1.imaginary - num2.imaginary);
    }
    
    mulitply(Complex num1, Complex num2)
    {
        return new Complex(num1.real * num2.real, num1.imaginary * num2.imaginary);
    }
    
    divide(Complex num1, Complex num2)
    {
        return new Complex(num1.real / num2.real, num1.imaginary / num2.imaginary);
    }
}