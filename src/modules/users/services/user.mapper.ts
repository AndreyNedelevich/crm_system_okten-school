import { IUserData } from '../../../common/models/interfaces';
import { UserEntity } from '../../../database/entities';
import { User_responseDto } from '../models/dtos/response';

export class UserMapper {
  public static toResponseDto(entity: UserEntity): User_responseDto {
    return {
      id: entity.id,
      email: entity.email,
      is_active: entity.is_active,
      profile: entity.profile,
      role: entity.role,
      last_login: entity.last_login,
    };
  }

  public static toUserData(entity: UserEntity): IUserData {
    return {
      id: entity.id,
      email: entity.email,
    };
  }
}
