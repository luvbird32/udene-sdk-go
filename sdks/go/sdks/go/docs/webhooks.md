# Webhooks Setup Guide

## Overview
Webhooks allow you to receive real-time notifications when important events occur in your fraud prevention system.

## Configuration
1. Go to your dashboard
2. Navigate to Webhooks section
3. Add a new webhook URL
4. Select events to subscribe to

## Event Types

### Fraud Detection Events
- `fraud_detected`: High-confidence fraud detection
- `suspicious_activity`: Potentially suspicious behavior
- `transaction_blocked`: Transaction prevented due to risk
- `risk_score_change`: Significant changes in risk score

### Rewards Protection Events
- `reward_fraud_detected`: Suspicious reward program activity
- `rapid_points_redemption`: Unusually quick points redemption

### Compliance Events
- `data_retention_alert`: Data approaching retention limits
- `privacy_request_received`: GDPR/CCPA data request received

### System Events
- `model_performance_drop`: Significant decrease in fraud detection accuracy

## Handling Webhook Events
```javascript
// Example webhook handler
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  switch(event.type) {
    case 'fraud_detected':
      // Handle fraud detection
      break;
    case 'suspicious_activity':
      // Handle suspicious activity
      break;
    case 'transaction_blocked':
      // Handle blocked transaction
      break;
    // Handle other events...
  }
  
  res.sendStatus(200);
});
```