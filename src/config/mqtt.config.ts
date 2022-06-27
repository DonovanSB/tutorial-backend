import { registerAs } from '@nestjs/config';

export interface MqttConnectionOptions {
  url: string;
  port: number;
  username: string;
  password: string;
  rejectUnauthorized: boolean;
}

export default registerAs('mqtt', () => ({
  url: process.env.MQTT_URL || 'mqtt://localhost:1883',
  port: parseInt(process.env.MQTT_PORT, 10) || 1884,
  username: process.env.MQTT_USER || 'user',
  password: process.env.MQTT_PASSWORD || 'password',
  rejectUnauthorized: process.env.MQTT_REJECT_UNAUTHORIZED || false,
}));
