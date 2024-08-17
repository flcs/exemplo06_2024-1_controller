import { ISaida } from "services/dividir-service";
import { DividirController } from "../src/controllers/dividir-controller";
import { Request, Response } from "express";
import request from "supertest";

describe("DividirController", () => {
  test("should return 1 when receves 1 and 1", async () => {
    // Arrange (configuração)
    const expectativa: ISaida = { resultado: 1 };
    const useCaseMock = {
      perform: jest.fn().mockReturnValue(expectativa),
    };

    const sut = new DividirController(useCaseMock);

    const requestMock = {
      body: { num1: 1, num2: 1 },
    } as unknown as Request;

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Act
    await sut.handler(requestMock, responseMock);

    // Assert
    expect(useCaseMock.perform).toHaveBeenCalledWith({ num1: 1, num2: 1 });
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith({ resultado: 1 });
  });

  test("with only one parameter should return 0", async () => {
    // Arrange
    const expectativa: ISaida = { resultado: 0 };
    const useCaseMock = {
      perform: jest.fn().mockReturnValue(expectativa),
    };

    const sut = new DividirController(useCaseMock);

    const requestMock = {
      body: { num1: 1 },
    } as unknown as Request;

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Act
    await sut.handler(requestMock, responseMock);

    // Assert
    expect(useCaseMock.perform).not.toHaveBeenCalled();
    expect(useCaseMock.perform).toHaveBeenCalledTimes(0);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.json).toHaveBeenCalledWith({
      message : "Faltando paramentros necessarios"
    });
  })

  test("with zero as second parameter should return an error message", async () => {
    // Arrange
    const useCaseMock = {
      perform: jest.fn().mockImplementation(() => {
        throw new Error("Divisão por zero não é permitida.");
      }),
    };

    const sut = new DividirController(useCaseMock);

    const requestMock = {
      body: { num1: 1, num2: 0 },
    } as unknown as Request;

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Act
    await sut.handler(requestMock, responseMock);

    // Assert
    expect(useCaseMock.perform).toHaveBeenCalledWith({ num1: 1, num2: 0 });
    expect(responseMock.status).toHaveBeenCalledWith(500);
    expect(responseMock.json).toHaveBeenCalledWith({ message: "Divisão por zero não é permitida." });
  })

  test("with zero as second parameter should return an error message", async () => {
    // Arrange
    const useCaseMock = {
      perform: jest.fn().mockImplementation(() => {
        
      }),
    };

    const sut = new DividirController(useCaseMock);

    const requestMock = {
      body: { num1: "1", num2: "2" },
    } as unknown as Request;

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Act
    await sut.handler(requestMock, responseMock);

    // Assert
    expect(useCaseMock.perform).toHaveBeenCalledTimes(0);
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.json).toHaveBeenCalledWith({ message: "Parametros inválidos" });
  })

  // base para novos testes
  // test('', ()=>{
  //   // Arrange
  //   const expectativa: ISaida = { resultado: 0 };
  //   const useCaseMock = {
  //     perform: jest.fn().mockReturnValue(expectativa),
  //   };
  //   // Supertest
  //   const sut = new DividirController(useCaseMock);
  //   const requestMock = {
  //     body: { num1: 1, num2: 0 },
  //   } as unknown as Request;
  //   const responseMock = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   } as unknown as Response;
  //   // Act
  //   const retorno = sut.handler(requestMock, responseMock);
  //   // Assert
  //   expect(useCaseMock.perform).toHaveBeenCalledWith({ num1: 1, num2: 0 });
  // })
  
});
