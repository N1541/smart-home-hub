import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, off } from 'firebase/database';

// Firebase configuration for the Smart Home project
const firebaseConfig = {
  databaseURL: "https://first-7e1c9-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Database references - using /first/smartHome path structure
export const smartHomeRef = ref(database, 'first/smartHome');
export const controlRef = ref(database, 'first/smartHome/control');
export const monitoringRef = ref(database, 'first/smartHome/monitoring');
export const statusRef = ref(database, 'first/smartHome/status');

// Export utilities
export { database, ref, onValue, set, off };
