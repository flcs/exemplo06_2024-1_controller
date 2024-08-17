import { Request, Response } from "express";
import { IEntrada, ISaida } from "services/dividir-service";


export interface IUseCase {
    perform(entrada: IEntrada): ISaida | Error;
}

export class DividirController {
    constructor(private readonly useCase: IUseCase) {}

    public async handler(req: Request, res: Response): Promise<void> {
        const { num1, num2 } = req.body;

        if(num1 === undefined || num2 === undefined ){
            res.status(400).json({ message : "Faltando paramentros necessarios" })
            return;
        }
        if(typeof(num1) !== "number" || typeof(num2) !== "number"  ){
            res.status(400).json({ message : "Parametros inválidos" })
            return;
        }
            
        try {
            const entrada = { num1, num2 };
            const saida = this.useCase.perform(entrada);

            res.status(200).json(saida);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro desconhecido.";
            res.status(500).json({ message });
        }
    }
}