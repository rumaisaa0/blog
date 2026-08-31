# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

 Rails.application.config.middleware.insert_before 0, Rack::Cors do
   allow do
     origins 'localhost:5173', 'http://localhost:5173', 'http://company1.localhost:5173', 'http://company-two.localhost:5173', 'http://company3.localhost:5173', 'http://company4.localhost:5173', 'http://company5.localhost:5173', 'http://default.localhost:5173'

     resource '*',
       headers: :any,
       expose: ['Authorization'],
       methods: [:get, :post, :put, :patch, :delete, :options, :head]
   end
 end