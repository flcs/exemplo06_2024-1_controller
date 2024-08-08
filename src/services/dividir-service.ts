export interface IEntrada {
    num1: number;
    num2: number;
}

export interface ISaida {
    resultado: number;
}

export class DividirService {
    public perform(entrada: IEntrada): ISaida {
        if (entrada.num2 === 0) {
            throw new Error("Divisão por zero não é permitida.");
        }
        return {
            resultado: entrada.num1 / entrada.num2
        };
    }
}