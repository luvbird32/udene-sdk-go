import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface UserBehaviorMetrics {
  velocity: number;
  deviceCount: number;
  locationCount: number;
  avgAmount: number;
  unusualActivity: boolean;
  recentTransactions: Array<{
    amount: number;
    timestamp: string;
    deviceId: string;
    location: string;
  }>;
}

interface BehaviorPattern {
  patternType: string;
  confidence: number;
  indicators: Record<string, unknown>;
  timestamp: string;
}

interface ActivityMetadata {
  confidence: number;
  indicators: Record<string, unknown>;
}

export const userBehaviorService = {
  async getUserBehaviorMetrics(userId: string): Promise<UserBehaviorMetrics[]> {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('amount, created_at, device_id, location')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    // Group transactions by user patterns
    const patterns = (transactions || []).reduce((acc: any, transaction) => {
      const deviceId = transaction.device_id;
      if (!acc[deviceId]) {
        acc[deviceId] = {
          transactions: [],
          devices: new Set(),
          locations: new Set(),
          totalAmount: 0
        };
      }

      acc[deviceId].transactions.push({
        amount: transaction.amount,
        timestamp: transaction.created_at,
        deviceId: transaction.device_id,
        location: transaction.location
      });

      acc[deviceId].devices.add(transaction.device_id);
      acc[deviceId].locations.add(transaction.location);
      acc[deviceId].totalAmount += Number(transaction.amount);

      return acc;
    }, {});

    return Object.entries(patterns).map(([deviceId, data]: [string, any]) => {
      const transactions = data.transactions;
      const deviceCount = data.devices.size;
      const locationCount = data.locations.size;
      
      // Calculate transaction velocity (transactions per hour)
      const timeRange = transactions.length > 1 
        ? (new Date(transactions[0].timestamp).getTime() - 
           new Date(transactions[transactions.length - 1].timestamp).getTime()) / (1000 * 60 * 60)
        : 1;
      
      const velocity = transactions.length / timeRange;
      const avgAmount = data.totalAmount / transactions.length;
      const unusualActivity = deviceCount > 3 || locationCount > 3 || velocity > 5;

      return {
        velocity: Number(velocity.toFixed(2)),
        deviceCount,
        locationCount,
        avgAmount: Number(avgAmount.toFixed(2)),
        unusualActivity,
        recentTransactions: transactions.slice(0, 5)
      };
    });
  },

  async getBehaviorPatterns(userId: string): Promise<BehaviorPattern[]> {
    const { data: patterns, error } = await supabase
      .from('user_activities')
      .select('activity_type, metadata, created_at')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return (patterns || []).map(pattern => {
      const metadata = pattern.metadata as ActivityMetadata;
      return {
        patternType: pattern.activity_type,
        confidence: metadata?.confidence || 0,
        indicators: metadata?.indicators || {},
        timestamp: pattern.created_at
      };
    });
  },

  async logUserActivity(
    userId: string, 
    activityType: string, 
    metadata: ActivityMetadata
  ) {
    const { data, error } = await supabase
      .from('user_activities')
      .insert([{
        profile_id: userId,
        activity_type: activityType,
        metadata: metadata
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};