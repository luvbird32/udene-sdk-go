# Fraud Detection Backend

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up Redis:
- Install Redis on your system
- Start Redis server (default port: 6379)

4. Set up Kafka:
- Install Apache Kafka
- Start Zookeeper server
- Start Kafka broker (default port: 9092)

5. Environment Variables:
```bash
# Redis Configuration
export REDIS_HOST=localhost
export REDIS_PORT=6379

# Kafka Configuration
export KAFKA_BOOTSTRAP_SERVERS=localhost:9092

# API Configuration
export ALLOWED_ORIGINS=http://localhost:5173
export UDENE_API_KEY=your_api_key_here
```

6. Run the server:
```bash
python main.py
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Services

### Redis Caching
- Metrics data cached for 5 minutes
- Recent activity cached for 5 minutes
- Improves response times for frequently accessed data

### Kafka Message Queue
- Handles user interaction events
- Enables asynchronous processing
- Provides reliable event streaming
```