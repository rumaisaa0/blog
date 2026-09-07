# frozen_string_literal: true

# Table name: reports
module Admin
  # admin dashboard paths
  class ReportsController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin!

    def index
      blogs = filtered
      render json: { summary: summary, categories: categories, blogs: blog_data(blogs),
                     most_commented: top_blogs_by_count(blogs, join: :comments, count_column: 'comments.id',
                                                               alias_name: 'comments_count'),
                     most_contributors: top_blogs_by_count(blogs, join: :blog_contributors,
                                                                  count_column: 'blog_contributors.user_id',
                                                                  alias_name: 'contributors_count') }
    end

    private

    def organization
      ActsAsTenant.current_tenant
    end

    def authorize_admin!
      return if current_user&.role == 'admin'

      render json: { error: 'Forbidden' }, status: :forbidden
    end

    def summary
      { total_blogs: organization.blogs.count,
        total_authors: organization.users.joins(:blogs).distinct.count,
        total_comments: organization.comments.count }
    end

    def categories
      organization.categories.select(:id, :name)
    end

    def blog_data(blogs)
      blogs.left_joins(:comments, :blog_contributors)
           .select('blogs.id', 'blogs.title', 'COUNT(DISTINCT comments.id) AS comments_count',
                   'COUNT(DISTINCT blog_contributors.user_id) AS contributors_count').group('blogs.id')
           .map do |blog|
             { id: blog.id, title: blog.title,
               category: blog.category.name, author: blog.user.username,
               comments_count: blog.comments_count.to_i,
               contributors_count: blog.contributors_count.to_i }
           end
    end

    def top_blogs_by_count(blogs, join:, count_column:, alias_name:)
      blogs = blogs.except(:includes).left_joins(join)
      blogs = blogs.select('blogs.id', 'blogs.title', "COUNT(DISTINCT #{count_column}) AS #{alias_name}")
      blogs = blogs.group('blogs.id').order("#{alias_name} DESC").limit(10)
      blogs.map { |blog| { id: blog.id, title: blog.title, alias_name.to_sym => blog[alias_name].to_i } }
    end

    def filtered
      blogs = Blog.includes(:user, :category)

      blogs = blogs.where(category_id: params[:category_id]) if params[:category_id].present?

      if params[:search].present?
        query = "%#{params[:search]}%"

        blogs = blogs.where(
          'blogs.title LIKE :query OR blogs.content LIKE :query', query: query
        )
      end
      blogs
    end
  end
end
