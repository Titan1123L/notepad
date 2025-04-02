import { Client, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1')
client.setProject('6742b3830019a87f0dd2');

export const databases = new Databases(client);

export { ID } from 'appwrite';
