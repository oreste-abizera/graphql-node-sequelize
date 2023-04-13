const { Comment, Post } = require("../../database/models");

const { AuthenticationError, ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    createComment: async (_, { content, postId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must login to create a comment");
      }
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new ApolloError("Post not found");
      }
      return Comment.create({
        userId: user.id,
        content,
        postId,
      });
    },
  },
};
