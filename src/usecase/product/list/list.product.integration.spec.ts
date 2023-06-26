import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "Product A", 100);
    const productB = ProductFactory.create("b", "Product B", 150);

    await productRepository.create(productA);
    await productRepository.create(productB);

    const output = {
      products: [
        {
          id: productA.id,
          name: productA.name,
          price: productA.price,
        },
        {
          id: productB.id,
          name: productB.name,
          price: productB.price,
        }
      ]
    };

    const result = await usecase.execute({});

    expect(result).toEqual(output);
  });
});
