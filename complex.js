class Complex {
    constructor(real, complex){
        this.real = real;
        this.complex = complex;
    }
    
    add(Complex num1, Complex num2)
    {
        return new Complex(num1.real + num2.real, num1.complex +num2.complex);
    }
    
    subtract(Complex num1, Complex num2)
    {
        return new Complex(num1.real - num2.real, num1.complex - num2.complex);
    }
    
    mulitply(Complex num1, Complex num2)
    {
        return new Complex(num1.real * num2.real, num1.complex * num2.complex);
    }
    
    divide(Complex num1, Complex num2)
    {
        return new Complex(num1.real / num2.real, num1.complex / num2.complex);
    }
}