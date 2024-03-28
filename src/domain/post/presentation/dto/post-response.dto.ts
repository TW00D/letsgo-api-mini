export class PostResponse {
  id: number;
  user: number;
  category: number;
  title: string;
  content: string;
  picture: string;
  viewed: number;
  liked: number;
  commented: number;
  isLike: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(post: any) {
    this.id = post.id;
    this.user = post.user_id;
    this.category = post.category_id;
    this.title = post.title;
    this.content = post.content;
    this.picture = post.picture;
    this.viewed = post.viewed;
    this.liked = post._count.like;
    this.commented = post._count.comment;
    this.isLike = post.like ? false : true;
    this.createdAt = post.created_at;
    this.updatedAt = post.updated_at;
  }
}
