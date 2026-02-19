import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';

export interface ProductAttributeFilterDto {
  attributeId: number;
  attributeName: string;
  attributeValues: AttributeValue[];
}
