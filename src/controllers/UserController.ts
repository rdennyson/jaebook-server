import { JsonController, Get, Res, HttpCode, Param } from "routing-controllers";
import { Response } from "express";
import { UserService } from "../services/UserService";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Get("/:id")
  @OpenAPI({
    summary: "사용자 정보",
    description: "UserId로 사용자 정보를 반환한다",
    statusCode: "200",
    responses: {
      "400": {
        description: "Bad request",
      },
    },
  })
  public async getOne(@Param("id") id: string, @Res() res: Response) {
    const user = await this.userService.getUserById(id);

    if (!user) {
      return res.status(400).send({ message: "일치하는 사용자가 없습니다." });
    }

    return user;
  }

  @HttpCode(200)
  @Get("/:id/posts")
  @OpenAPI({
    summary: "사용자 게시글 정보",
    description: "UserId로 사용자가 작성한 게시글을 반환한다",
    statusCode: "200",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  public async getAllPosts(@Param("id") id: string, @Res() res: Response) {
    const posts = await this.userService.getPostsByUserId(id);

    if (posts.length === 0) {
      return res.status(204).send(posts);
    }

    return posts;
  }

  @HttpCode(200)
  @Get("/:id/comments")
  @OpenAPI({
    summary: "사용자 댓글 정보",
    description: "UserId로 사용자가 작성한 댓글을 반환한다",
    statusCode: "200",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  public async getAllComments(@Param("id") id: string, @Res() res: Response) {
    const comments = await this.userService.getCommentsByUserId(id);

    if (comments.length === 0) {
      return res.status(204).send(comments);
    }

    return comments;
  }
}
