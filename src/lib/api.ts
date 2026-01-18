const TIMEOUT_MS = 5000;

interface SensorData {
  voltage: number;
  current: number;
  power: number;
  energy: number;
}

async function fetchWithTimeout(url: string, timeout: number = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      mode: 'cors',
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function checkConnection(ipAddress: string): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(`http://${ipAddress}/status`);
    return response.ok;
  } catch {
    return false;
  }
}

export async function getStatus(ipAddress: string): Promise<SensorData> {
  const response = await fetchWithTimeout(`http://${ipAddress}/status`);
  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }
  return response.json();
}

export async function controlLight(ipAddress: string, turnOn: boolean): Promise<boolean> {
  const endpoint = turnOn ? 'lightOn' : 'lightOff';
  const response = await fetchWithTimeout(`http://${ipAddress}/${endpoint}`);
  return response.ok;
}

export async function controlFan(ipAddress: string, turnOn: boolean): Promise<boolean> {
  const endpoint = turnOn ? 'fanOn' : 'fanOff';
  const response = await fetchWithTimeout(`http://${ipAddress}/${endpoint}`);
  return response.ok;
}

// Current threshold for alerts (in Amperes)
export const CURRENT_THRESHOLD = 5.0;
