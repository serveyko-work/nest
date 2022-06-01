import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import ModelRole from '../../../models/role';

@ValidatorConstraint({ async: true })
class IsRoleExistConstraint implements ValidatorConstraintInterface {
  validate(role: string) {
    return ModelRole.findOne({ where: { role } }).then((findRole) => {
      if (findRole) {
        return false;
      }

      return true;
    });
  }
}

export function IsRoleExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleExistConstraint,
    });
  };
}
