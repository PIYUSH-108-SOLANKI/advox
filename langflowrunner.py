import json
import requests

# Base API URL
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "fb846b23-539e-4878-a440-5407cbca01c6"
FLOW_ID = "8f932964-2b5a-461e-b222-86286404e26a"
APPLICATION_TOKEN = "AstraCS:ikDfuzuAUvYxtjJJbazBoynJ:00f94a81348c6e4ac9b727713a7c42933f5deed7394adb73bf55dcd14e6517d0"


def run_flow(message: str) -> dict:
    """
    Run a flow with a given message.
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID}"
    headers = {
        "Authorization": "Bearer " + APPLICATION_TOKEN,
        "Content-Type": "application/json"
    }
    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {}
    }
    
    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return {"error": str(e)}

def main():
    # Example usage
    message = input("Enter your message: ")
    response = run_flow(message)
    print(json.dumps(response, indent=2))

if __name__ == "__main__":
    main()

from flask import Flask, render_template

app = Flask(__name__)

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for the chat page
@app.route('/chat')
def chat():
    return render_template('chat.html')

# Ensure this part is not included if you're using flask run