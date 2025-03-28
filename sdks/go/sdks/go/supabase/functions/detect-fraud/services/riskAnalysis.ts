export async function analyzeFraudRisk(type: string, currentData: any, historicalData: any[]) {
  // Call Python ML function for sophisticated analysis
  const mlResponse = await fetch(
    `${Deno.env.get('SUPABASE_URL')}/functions/v1/python-ml`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        analysis_type: type,
        current_data: currentData,
        historical_data: historicalData
      })
    }
  );

  if (!mlResponse.ok) {
    throw new Error('ML analysis failed');
  }

  return await mlResponse.json();
}