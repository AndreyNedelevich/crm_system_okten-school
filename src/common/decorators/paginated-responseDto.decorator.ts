import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PaginatedDto<TModel> {
  @ApiProperty({ example: 1, type: Number })
  page: number;

  @ApiProperty({ example: 20, type: Number })
  pages: number;

  @ApiProperty({ example: 100, type: Number })
  countItem: number;

  @ApiProperty()
  entities: TModel[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  property: string,
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(PaginatedDto) },
              {
                properties: {
                  [`${property}`]: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
