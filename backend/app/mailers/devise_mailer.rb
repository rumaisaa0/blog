# frozen_string_literal: true

# devise mailer uses this for user email confirmation
class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers

  helper Rails.application.helpers

  def confirmation_instructions(record, token, opts = {})
    @frontend_confirmation_url =
      "http://#{record.organization.subdomain}.localhost:5173/verify-email" \
      "?confirmation_token=#{token}"

    super
  end
end
