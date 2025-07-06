from fastapi import FastAPI, HTTPException
import httpx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow frontend requests during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_API_URL = "https://api.github.com/users/{username}/repos"

@app.get("/repos/{username}")
async def get_repos(username: str):
    url = GITHUB_API_URL.format(username=username)
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="GitHub user not found or error fetching repos.")
        repos = response.json()
        result = [
            {
                "name": repo["name"],
                "description": repo["description"],
                "stargazers_count": repo["stargazers_count"]
            }
            for repo in repos
        ]
        return result
