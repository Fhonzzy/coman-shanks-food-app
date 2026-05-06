const allowedOrigins = ['http://localhost:5173', 'https://comanshanks-client.onrender.com', 'http://localhost:8080'];

type CorsCallback = (err: Error | null, allow?: boolean) => void;

const corsOptions = (origin: string | undefined, callback: CorsCallback) => {
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
};

export { corsOptions };
