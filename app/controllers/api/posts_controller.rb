class Api::PostsController < ApplicationController
  respond_to :json

  def index
    respond_with Post.order(id: :DESC)
  end

  def show
    respond_with Post.find(params[:id])
  end

  def create
    respond_with :api, Post.create(post_params)
  end

  def destroy
    respond_with Post.destroy(params[:id])
  end

  def update
    post = Post.find(params['id'])
    post.update(post_params)
    respond_with Post, json: post
  end

  private

  def post_params
    params.require(:post).permit(
      :id,
      :title,
      :description,
      :image
    )
  end
end
