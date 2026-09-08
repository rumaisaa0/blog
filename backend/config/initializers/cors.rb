# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors


Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins do |origin|
      next true if origin == 'http://localhost:5173'

      uri = URI.parse(origin)

      next false unless uri.scheme == 'http'
      next false unless uri.port == 5173
      next false unless uri.host.end_with?('.localhost')

      subdomain = uri.host.delete_suffix('.localhost')

      Organization.exists?(subdomain: subdomain)
    end

    resource '*',
             headers: :any,
             expose: ['Authorization'],
             methods: %i[get post put patch delete options head]
  end
end