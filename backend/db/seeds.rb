# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# db/seeds.rb

# db/seeds.rb

# puts "Clearing old data..."
# Comment.destroy_all
# Blog.destroy_all
# Category.destroy_all
# User.destroy_all

admin = User.create!(
  email: 'admin@example.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'admin',
  username: 'user_11',
  organization_id: 1
)

users = User.create!([
                       { email: 'sara@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_12' },
                       { email: 'ali@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_13' },
                       { email: 'hina@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_14' },
                       { email: 'usman@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_15' },
                       { email: 'zara@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_16' },
                       { email: 'bilal@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_17' },
                       { email: 'mariam@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_18' },
                       { email: 'ahmed@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_19' },
                       { email: 'fatima@example.com', password: 'password123',
                         password_confirmation: 'password123', role: 'registered',
                         username: 'user_20' }
                     ])

tech = Category.create!(name: 'Technology', user: admin)
travel = Category.create!(name: 'Travel', user: users[0])
food = Category.create!(name: 'Food', user: users[1])

blogs = Blog.create!([
                       { title: 'Getting started with Rails',
                         content: 'Rails makes it easy to build APIs quickly once you get past the initial setup.',
                         category: tech, user: admin },
                       { title: 'A weekend trip to the mountains',
                         content: 'We packed light and drove up early Saturday morning. The weather was perfect.',
                         category: travel, user: users[0] },
                       { title: 'My favorite biryani recipe',
                         content: 'The secret is in how long you let the meat marinate before cooking it.',
                         category: food, user: users[1] },
                       { title: 'Why I switched to React',
                         content: 'It took a week to get comfortable, but component reuse saved me a lot of time.',
                         category: tech, user: users[2] },
                       { title: 'Backpacking through the north',
                         content: 'Signal was patchy most of the trip, which honestly made it more relaxing.',
                         category: travel, user: users[3] },
                       { title: 'Simple breakfast ideas',
                         content: 'Nothing fancy here, just a few things I make on busy mornings.',
                         category: food, user: users[4] },
                       { title: 'Learning ActiveRecord associations',
                         content: 'Polymorphic associations felt confusing at first but
                         make sense once you see them in use.',
                         category: tech, user: users[5] }
                     ])

Comment.create!([
                  { content: 'This helped me a lot, thanks for writing it up.', user: users[6], commentable: blogs[0] },
                  { content: 'Looks like a beautiful spot, adding it to my list.', user: users[7],
                    commentable: blogs[1] },
                  { content: 'Tried this last night, turned out great.', user: users[8], commentable: blogs[2] },
                  { content: 'Agreed, the learning curve is worth it.', user: admin, commentable: blogs[3] }
                ])

puts "#{User.count} users, #{Category.count} categories, #{Blog.count} blogs, #{Comment.count} comments"
