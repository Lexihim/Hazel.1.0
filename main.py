from fastapi import FastAPI
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv() # Loads your key from .env

app = FastAPI()

# Security Check: Your API Key is pulled from the system environment
API_KEY = os.getenv("HAZEL_API_KEY") 

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
async def hazel_chat(request: ChatRequest):
    url = "https://api.openai.com/v1/chat/completions" # Or your specific provider
    headers = {"Authorization": f"Bearer {API_KEY}"}
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": request.prompt}]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)
        data = response.json()
        return {"reply": data['choices'][0]['message']['content']}
