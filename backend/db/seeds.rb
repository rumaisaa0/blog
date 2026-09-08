# frozen_string_literal: true

organization1 = Organization.create!(
  name: 'Default',
  subdomain: 'default'
)

organization2 = Organization.create!(
  name: 'Company-two',
  subdomain: 'company-two'
)

admin1 = User.create!(
  email: 'admin@acme.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'admin',
  username: 'acme_admin',
  organization: organization1
)

user1 = User.create!(
  email: 'sara@acme.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'registered',
  username: 'sara',
  organization: organization1
)

admin2 = User.create!(
  email: 'admin@globex.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'admin',
  username: 'globex_admin',
  organization: organization2
)

user2 = User.create!(
  email: 'ali@globex.com',
  password: 'password123',
  password_confirmation: 'password123',
  role: 'registered',
  username: 'ali',
  organization: organization2
)

tech1 = Category.create!(
  name: 'Technology',
  organization: organization1
)

travel1 = Category.create!(
  name: 'Travel',
  organization: organization1
)

tech2 = Category.create!(
  name: 'Technology',
  organization: organization2
)

food2 = Category.create!(
  name: 'Food',
  organization: organization2
)

blog1 = Blog.create!(
  title: 'Getting Started with Rails',
  content: 'Rails makes it easy to build APIs quickly.',
  category: tech1,
  user: admin1,
  organization: organization1
)

blog2 = Blog.create!(
  title: 'Weekend Trip',
  content: 'We visited the mountains last weekend.',
  category: travel1,
  user: user1,
  organization: organization1
)

blog3 = Blog.create!(
  title: 'Learning React',
  content: 'React makes it easier to build reusable interfaces.',
  category: tech2,
  user: admin2,
  organization: organization2
)

Blog.create!(
  title: 'Simple Food Ideas',
  content: 'Here are a few simple meals for busy days.',
  category: food2,
  user: user2,
  organization: organization2
)

Comment.create!(
  content: 'Great article!',
  user: user1,
  commentable: blog1,
  organization: organization1
)

Comment.create!(
  content: 'Very useful information.',
  user: admin1,
  commentable: blog2,
  organization: organization1
)

Comment.create!(
  content: 'This helped me understand React.',
  user: user2,
  commentable: blog3,
  organization: organization2
)

BlogContributor.create!(
  blog: blog1,
  user: user1,
  organization: organization1
)

BlogContributor.create!(
  blog: blog3,
  user: user2,
  organization: organization2
)

BlogEditRequest.create!(
  blog: blog1,
  requestor: user1,
  category: tech1,
  title: 'Getting Started with Rails - Updated',
  content: 'Updated content for the Rails article.',
  status: 'pending',
  organization: organization1
)

BlogEditRequest.create!(
  blog: blog3,
  requestor: user2,
  category: tech2,
  title: 'Learning React - Updated',
  content: 'Updated content for the React article.',
  status: 'pending',
  organization: organization2
)

puts "#{Organization.count} organizations"
puts "#{User.count} users"
puts "#{Category.count} categories"
puts "#{Blog.count} blogs"
puts "#{Comment.count} comments"
puts "#{BlogContributor.count} blog contributors"
puts "#{BlogEditRequest.count} blog edit requests"
