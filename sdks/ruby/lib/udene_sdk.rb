
# frozen_string_literal: true

require "udene_sdk/version"
require "udene_sdk/client"
require "udene_sdk/errors"
require "udene_sdk/models"

module UdeneSDK
  class << self
    # Set the API key directly at the module level (optional)
    def api_key=(api_key)
      @api_key = api_key
    end

    def api_key
      @api_key
    end
  end
end
