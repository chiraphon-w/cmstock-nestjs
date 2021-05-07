import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as ChangeCase from 'change-case';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('data class in pipes ', JSON.stringify(value));
    value.name = ChangeCase.capitalCase(value.name);
    return value;
  }
}
