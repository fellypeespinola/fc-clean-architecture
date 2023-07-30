import Product from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";
import ValidatorInterface from "../../@shared/validator/validator.interface";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}
