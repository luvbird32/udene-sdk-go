
# frozen_string_literal: true

require "faraday"
require "faraday_middleware"
require "json"

module UdeneSDK
  class Client
    attr_reader :api_key, :base_url
    
    def initialize(api_key = nil, base_url = "https://udene.net/v1")
      @api_key = api_key || UdeneSDK.api_key
      @base_url = base_url
      
      raise ArgumentError, "API key is required" unless @api_key
      
      @connection = build_connection
    end
    
    def get_metrics
      response = @connection.get("metrics")
      handle_response(response)
    end
    
    def get_activity
      response = @connection.get("activity")
      handle_response(response)
    end
    
    def track_interaction(data)
      response = @connection.post("track") do |req|
        req.body = data
      end
      handle_response(response)
    end
    
    def analyze_transaction(transaction_data)
      response = @connection.post("analyze-transaction") do |req|
        req.body = transaction_data
      end
      handle_response(response)
    end
    
    private
    
    def build_connection
      Faraday.new(url: @base_url) do |conn|
        conn.request :json
        conn.response :json, content_type: /\bjson$/
        conn.headers = {
          "Authorization" => "Bearer #{@api_key}",
          "Content-Type" => "application/json",
          "X-Client-Version" => UdeneSDK::VERSION,
          "X-SDK-Type" => "ruby"
        }
        conn.adapter Faraday.default_adapter
      end
    end
    
    def handle_response(response)
      case response.status
      when 200..299
        OpenStruct.new(response.body)
      when 429
        retry_after = response.headers["retry-after"].to_i || 60
        raise RateLimitError.new("Rate limit exceeded", retry_after)
      when 400..499
        raise ClientError.new(response.body["error"] || "Client error", response.status, response.body)
      when 500..599
        raise ServerError.new(response.body["error"] || "Server error", response.status, response.body)
      else
        raise APIError.new("Unknown error", response.status, response.body)
      end
    end
  end
end
