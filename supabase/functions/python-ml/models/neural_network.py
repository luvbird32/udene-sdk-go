import numpy as np
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

class FraudNeuralNetwork:
    def __init__(self):
        self.model = self._build_model()
        self.scaler = StandardScaler()
        
    def _build_model(self):
        model = Sequential([
            Dense(64, activation='relu', input_shape=(20,)),
            Dropout(0.3),
            Dense(32, activation='relu'),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        return model
    
    def prepare_features(self, transaction_data):
        """Convert transaction data into neural network features"""
        features = []
        for tx in transaction_data:
            feature_vector = [
                float(tx.get('amount', 0)),
                float(tx.get('message_velocity', 0)),
                float(tx.get('device_count', 0)),
                float(tx.get('location_risk', 0)),
                float(tx.get('time_risk', 0)),
                float(tx.get('ip_risk', 0)),
                float(tx.get('profile_age_days', 0)),
                float(tx.get('avg_transaction_amount', 0)),
                float(tx.get('daily_transaction_count', 0)),
                float(tx.get('hour_of_day', 0)),
                float(tx.get('day_of_week', 0)),
                float(tx.get('device_age_days', 0)),
                float(tx.get('browser_risk', 0)),
                float(tx.get('network_risk', 0)),
                float(tx.get('hardware_risk', 0)),
                float(tx.get('behavior_risk', 0)),
                float(tx.get('pattern_match_score', 0)),
                float(tx.get('velocity_score', 0)),
                float(tx.get('geographical_variance', 0)),
                float(tx.get('historical_risk', 0))
            ]
            features.append(feature_vector)
        return np.array(features)
    
    def train(self, X_train, y_train, epochs=10, batch_size=32):
        """Train the neural network"""
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(
            X_scaled, 
            y_train, 
            epochs=epochs, 
            batch_size=batch_size,
            verbose=1
        )
    
    def predict(self, X):
        """Generate fraud probability predictions"""
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)
    
    def evaluate(self, X_test, y_test):
        """Evaluate model performance"""
        X_scaled = self.scaler.transform(X_test)
        return self.model.evaluate(X_scaled, y_test)