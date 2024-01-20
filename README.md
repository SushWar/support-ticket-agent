# Handle Tickets and Agent

You can create Agent and you can also create the Ticket. The ticket will auto assign to the active agents 

## Installation

Clone the repo on your local setup and create .env file in both the backend and frontend

```
//backend
BASE_URL = your frontend URL (eg: http://localhost:3000)
MONGODB_URI = your MongoDB database URI
```
```
//frontend
NEXT_PUBLIC_BACKEND = your backend URL (eg: http://localhost:8000)
```

After setting up the environment variable run these commands 

```
//backend
npm install

#devlopment 
npm run start

#production
npm run build
node dist/index.js
```
```
//frontend
npm install

#devlopment 
npm run dev

#production
npm run build
npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
