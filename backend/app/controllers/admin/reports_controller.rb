# frozen_string_literal: true

# Table name: reports
module Admin
  class ReportsController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin!

    def index
      blogs = Blog.includes(:user, :category)

      blogs = blogs.where(category_id: params[:category_id]) if params[:category_id].present?

      if params[:search].present?
        query = "%#{params[:search]}%"

        blogs = blogs.where(
          'blogs.title LIKE :query OR blogs.content LIKE :query', query: query
        )
      end

      render json: { summary: summary, categories: categories, blogs: blog_data(blogs),
                     most_commented: most_commented(blogs), most_contributors: most_contributors(blogs) }
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
      blogs.map do |blog|
        { id: blog.id, title: blog.title,
          category: blog.category.name, author: blog.user.username,
          comments_count: blog.comments.count, contributors_count: blog.contributors.distinct.count }
      end
    end

    def most_commented(blogs)
      blogs = blogs.except(:includes)
      blogs = blogs.left_joins(:comments)
      blogs = blogs.select('blogs.id', 'blogs.title', 'COUNT(comments.id) AS comments_count')

      blogs = blogs.group('blogs.id')
      blogs = blogs.order('comments_count DESC')
      blogs = blogs.limit(10)

      blogs.map do |blog|
        { id: blog.id, title: blog.title,
          comments_count: blog.comments_count.to_i }
      end
    end

    def most_contributors(blogs)
      blogs = blogs.except(:includes)
      blogs = blogs.left_joins(:blog_contributors)
      blogs = blogs.select('blogs.id', 'blogs.title',
                           'COUNT(DISTINCT blog_contributors.user_id) AS contributors_count')

      blogs = blogs.group('blogs.id')
      blogs = blogs.order('contributors_count DESC')
      blogs = blogs.limit(10)

      blogs.map do |blog|
        { id: blog.id, title: blog.title,
          contributors_count: blog.contributors_count.to_i }
      end
    end
  end
end
