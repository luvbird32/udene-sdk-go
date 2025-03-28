
# frozen_string_literal: true

module UdeneSDK
  class APIError < StandardError
    attr_reader :status_code, :response
    
    def initialize(message, status_code = nil, response = nil)
      @status_code = status_code
      @response = response
      super(message)
    end
  end
  
  class ClientError < APIError; end
  
  class ServerError < APIError; end
  
  class RateLimitError < APIError
    attr_reader :retry_after
    
    def initialize(message, retry_after)
      @retry_after = retry_after
      super(message)
    end
  end
end
