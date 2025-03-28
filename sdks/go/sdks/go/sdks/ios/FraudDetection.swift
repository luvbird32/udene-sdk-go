import Foundation

public class FraudClient {
    private let baseURL: String
    private let apiKey: String
    private let session: URLSession
    
    public init(apiKey: String, baseURL: String = "https://udene.net/v1") {
        self.apiKey = apiKey
        self.baseURL = baseURL
        
        let config = URLSessionConfiguration.default
        config.httpAdditionalHeaders = [
            "Authorization": "Bearer \(apiKey)",
            "Content-Type": "application/json",
            "X-Platform": "ios",
            "X-SDK-Version": "1.0.0",
            "X-SDK-Type": "ios-native"
        ]
        self.session = URLSession(configuration: config)
    }
    
    public func getMetrics(completion: @escaping (Result<MetricsResponse, Error>) -> Void) {
        guard let url = URL(string: "\(baseURL)/metrics") else {
            completion(.failure(FraudError.invalidURL))
            return
        }
        
        let task = session.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let data = data else {
                completion(.failure(FraudError.noData))
                return
            }
            
            do {
                let metrics = try JSONDecoder().decode(MetricsResponse.self, from: data)
                completion(.success(metrics))
            } catch {
                completion(.failure(error))
            }
        }
        task.resume()
    }
    
    public func trackInteraction(_ data: [String: Any], completion: @escaping (Result<InteractionResponse, Error>) -> Void) {
        guard let url = URL(string: "\(baseURL)/track") else {
            completion(.failure(FraudError.invalidURL))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: data)
        } catch {
            completion(.failure(error))
            return
        }
        
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let responseData = data else {
                completion(.failure(FraudError.noData))
                return
            }
            
            do {
                let response = try JSONDecoder().decode(InteractionResponse.self, from: responseData)
                completion(.success(response))
            } catch {
                completion(.failure(error))
            }
        }
        task.resume();
    }
}

public enum FraudError: Error {
    case invalidURL
    case noData
    case decodingError
}

public struct MetricsResponse: Codable {
    public let riskScore: Double
    public let activeUsers: Int
    public let alertCount: Int
}

public struct InteractionResponse: Codable {
    public let success: Bool
    public let transactionId: String?
}
