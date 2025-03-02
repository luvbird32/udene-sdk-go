
import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { FraudProvider, useFraud } from '@udene/react-native-sdk';

// Example API key (would be environment variable in real app)
const API_KEY = 'test-api-key';

// Demo component that uses the SDK
const FraudDemo = () => {
  const { trackInteraction, getMetrics, isInitialized } = useFraud();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prevLogs => [message, ...prevLogs.slice(0, 9)]);
  };

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await getMetrics();
      setMetrics(data);
      addLog(`Metrics fetched: Risk score ${data.riskScore}`);
    } catch (error) {
      addLog(`Error fetching metrics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const simulateLogin = async () => {
    addLog('Tracking login interaction...');
    try {
      await trackInteraction({
        action: 'login',
        metadata: { method: 'email' }
      });
      addLog('Login interaction tracked successfully');
    } catch (error) {
      addLog(`Error tracking login: ${error.message}`);
    }
  };

  const simulatePurchase = async () => {
    addLog('Tracking purchase interaction...');
    try {
      await trackInteraction({
        action: 'purchase',
        metadata: {
          productId: 'prod_123',
          amount: 49.99,
          currency: 'USD'
        }
      });
      addLog('Purchase interaction tracked successfully');
    } catch (error) {
      addLog(`Error tracking purchase: ${error.message}`);
    }
  };

  // Fetch metrics on initial load
  useEffect(() => {
    if (isInitialized) {
      fetchMetrics();
    }
  }, [isInitialized]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Udene Fraud SDK Demo</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fraud Metrics</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0066cc" />
        ) : metrics ? (
          <View>
            <Text style={styles.metric}>Risk Score: {metrics.riskScore}</Text>
            <Text style={styles.metric}>Active Users: {metrics.activeUsers}</Text>
            <Text style={styles.metric}>Alert Count: {metrics.alertCount}</Text>
            <Text style={styles.updated}>
              Updated: {metrics.lastUpdated || 'Just now'}
            </Text>
          </View>
        ) : (
          <Text>No metrics available</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={simulateLogin}
          disabled={!isInitialized}
        >
          <Text style={styles.buttonText}>Simulate Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={simulatePurchase}
          disabled={!isInitialized}
        >
          <Text style={styles.buttonText}>Simulate Purchase</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.refreshButton]} 
          onPress={fetchMetrics}
          disabled={!isInitialized}
        >
          <Text style={styles.buttonText}>Refresh Metrics</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>Activity Log</Text>
        <ScrollView style={styles.logs}>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logEntry}>{log}</Text>
          ))}
          {logs.length === 0 && (
            <Text style={styles.emptyLog}>No activity yet</Text>
          )}
        </ScrollView>
      </View>
      
      {!isInitialized && (
        <View style={styles.initializing}>
          <ActivityIndicator size="small" color="#0066cc" />
          <Text style={styles.initializingText}>Initializing SDK...</Text>
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FraudProvider apiKey={API_KEY}>
        <FraudDemo />
      </FraudProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  metric: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  updated: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  refreshButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  logs: {
    flex: 1,
  },
  logEntry: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    color: '#555',
  },
  emptyLog: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  initializing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  initializingText: {
    marginTop: 8,
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default App;
