import { Request, Response } from "express";
import { IEntrada, ISaida } from "services/dividir-service";

interface IUseCase {
    perform(entrada: IEntrada): ISaida | Error;
}

export class DividirController {
    constructor(private readonly useCase: IUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        const { num1, num2 } = req.body;

        try {
            const entrada = { num1, num2 };
            const saida = this.useCase.perform(entrada);

            res.status(200).json(saida);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro desconhecido.";
            res.status(400).json({ message });
        }
    }
}