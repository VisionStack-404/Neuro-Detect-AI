import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/predict", (req, res) => {
    // In a real application, this endpoint would forward the data 
    // to a Flask/FastAPI microservice running the PyTorch PyTorch model, 
    // or execute a Python script directly.
    const { mriData, speechData } = req.body;
    
    // Simulate inference delay
    setTimeout(() => {
      // Return simulated probability outputs
      res.json({
        success: true,
        prediction: "MCI",
        probabilities: {
          CN: 0.12,
          MCI: 0.75,
          AD: 0.13
        },
        message: "Inference completed using PyTorch ResNet50 + LSTM Hybrid model."
      });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
