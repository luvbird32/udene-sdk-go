# Database Functions Documentation

This document provides an overview of the database functions used in our fraud detection system.

## Core Functions

### `analyze_user_return_pattern()`
**Purpose**: Analyzes user return patterns to detect suspicious account behavior.
- Triggers on: User email history changes
- Checks inactivity periods
- Validates device fingerprints
- Creates investigation logs for suspicious patterns
- Risk scoring: 40-80 based on device match

### `calculate_reward_velocity()`
**Purpose**: Calculates the velocity of reward transactions for fraud prevention.
- Triggers on: New reward transactions
- Calculates transactions per hour
- Updates velocity score in real-time

### `check_rate_limit()`
**Purpose**: Implements rate limiting for API endpoints.
**Parameters**:
- `p_ip_address`: Client IP address
- `p_endpoint`: API endpoint being accessed
- `p_max_requests`: Maximum allowed requests (default: 100)
- `p_window_minutes`: Time window in minutes (default: 60)
**Returns**: Boolean indicating if request is within limits

### `handle_new_user()`
**Purpose**: Initializes profile for new users.
- Triggers on: User creation
- Creates associated profile record
- Security level: SECURITY DEFINER

### `handle_new_user_credits()`
**Purpose**: Initializes API credits for new users.
- Triggers on: User creation
- Allocates initial credit allowance
- Security level: SECURITY DEFINER

### `handle_updated_at()`
**Purpose**: Maintains updated_at timestamps.
- Updates timestamp on record modifications
- Used across multiple tables

### `log_detailed_error()`
**Purpose**: Comprehensive error logging system.
**Parameters**:
- `p_event_type`: Type of error event
- `p_user_id`: Associated user ID
- `p_error`: Error details in JSONB
- `p_request`: Request payload (optional)
**Logs**:
- Error details
- Performance metrics
- Memory usage statistics

### `notify_low_credits()`
**Purpose**: Credit monitoring and notification system.
- Triggers on: API credit updates
- Threshold: 80% of total credits
- Creates user notifications

### `update_promo_code_usage()`
**Purpose**: Tracks and updates promotion code usage.
- Increments usage counter
- Maintains promotion integrity

## Usage Guidelines

1. **Security Considerations**:
   - Functions marked as SECURITY DEFINER run with elevated privileges
   - Careful consideration needed when modifying these functions
   - Always validate input parameters

2. **Performance Impact**:
   - Rate limiting affects API responsiveness
   - Batch operations where possible
   - Consider index usage in queries

3. **Maintenance Best Practices**:
   - Test thoroughly before deploying changes
   - Monitor function performance
   - Review error logs regularly

4. **Error Handling**:
   - All errors are logged via `log_detailed_error`
   - Check audit_logs table for debugging
   - Monitor notification triggers

## Related Tables

- `user_activities`
- `device_fingerprints`
- `service_investigation_logs`
- `api_credits`
- `user_notifications`
- `audit_logs`
- `rate_limits`
- `promo_codes`

## Triggers

The following triggers utilize these functions:

1. `on_auth_user_created` -> `handle_new_user()`
2. `on_auth_user_created_add_credits` -> `handle_new_user_credits()`
3. `analyze_user_return` -> `analyze_user_return_pattern()`
4. `check_low_credits` -> `notify_low_credits()`
5. Multiple `set_timestamp` triggers -> `handle_updated_at()`
6. `increment_promo_code_usage` -> `update_promo_code_usage()`
7. `track_reward_velocity` -> `calculate_reward_velocity()`

## Testing

When testing these functions:

1. Verify trigger conditions
2. Check error logging
3. Validate security constraints
4. Test rate limiting thresholds
5. Verify notification delivery

## Monitoring

Monitor these aspects:

1. Function execution time
2. Error frequency
3. Credit usage patterns
4. Rate limit hits
5. Investigation log creation

## Troubleshooting

Common issues and solutions:

1. Rate Limit Exceeded
   - Check `rate_limits` table
   - Review `p_max_requests` parameter
   - Analyze traffic patterns

2. Credit Notifications
   - Verify trigger thresholds
   - Check notification delivery
   - Monitor credit usage

3. User Return Analysis
   - Review device fingerprint matching
   - Check inactivity thresholds
   - Monitor investigation logs

## Development Guidelines

When modifying functions:

1. Maintain SECURITY DEFINER where required
2. Update related triggers
3. Test thoroughly
4. Document changes
5. Monitor performance impact