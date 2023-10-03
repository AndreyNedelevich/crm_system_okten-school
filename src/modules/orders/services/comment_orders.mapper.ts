import { CommentsOrderResponseDto } from '../models/dtos/response';

export class Comment_ordersMapper {
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

  // public static toOrderResponseDto(order): CommentsOrderResponseDto {
  //   return {
  //     order_id: comment.order,
  //     comment: comment.comment,
  //     created_at: comment.created_at,
  //     user: {
  //       firstName: comment.user.profile.firstName,
  //       lastName: comment.user.profile.lastName,
  //     },
  //   };
  // }
}
