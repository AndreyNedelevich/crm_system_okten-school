import {
  CommentsOrderResponseDto,
  Orders_exelResponseDto,
  OrdersResponseDto,
} from '../models/dtos/response';

export class OrdersMapper {
  public static toCommentResponseDto(comment): CommentsOrderResponseDto {
    return {
      order_id: comment.order,
      comment: comment.comment,
      created_at: comment.created_at,
      user: {
        firstName: comment.user.profile.firstName,
        lastName: comment.user.profile.lastName,
      },
    };
  }

  public static toOrderExelResponseDto(
    data: OrdersResponseDto,
  ): Orders_exelResponseDto {
    return {
      id: data.id,
      name: data.name ?? '',
      surname: data.surname ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      age: data.age ?? 0,
      course: data.course ?? '',
      course_format: data.course_format ?? '',
      course_type: data.course_type ?? '',
      alreadyPaid: data.alreadyPaid ?? 0,
      sum: data.sum ?? 0,
      utm: data.utm ?? '',
      created_at: data.created_at,
      msg: data.msg ?? '',
      status: data.status ?? '',
      manager: data?.user?.profile.firstName ?? '',
      groups: data?.groups?.name ? data.groups.name : '',
    };
  }
}
