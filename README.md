# Sistema de Inventario Installation Instructions

## Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/AleH14/desafio-dps-3.git
   cd desafio-dps-3
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory based on the `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration:
   ```bash
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

## Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Configure the API endpoint in `api.js`:
   ```javascript
   const apiBaseURL = 'http://your_api_ip_address';
   ```
4. Start the frontend application:
   ```bash
   npm start
   ```

## Additional Notes
- Ensure that your backend server is running before starting the frontend application.
- Adjust your firewall settings to allow requests to your API IP address.