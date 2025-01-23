from flask import Flask, render_template, request, jsonify
import json
import requests

app = Flask(__name__)

# Base API URL and configurations
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "fb846b23-539e-4878-a440-5407cbca01c6"
FLOW_ID = "8f932964-2b5a-461e-b222-86286404e26a"
APPLICATION_TOKEN = "AstraCS:ikDfuzuAUvYxtjJJbazBoynJ:00f94a81348c6e4ac9b727713a7c42933f5deed7394adb73bf55dcd14e6517d0"

def format_table_data(data):
    """Format the data into aligned columns"""
    try:
        # If data is already a list/table format, return as is
        if isinstance(data, list) and all(isinstance(row, list) for row in data):
            return {
                'type': 'table',
                'data': data
            }
        
        # If data is a string containing table-like content
        if isinstance(data, str) and '|' in data:
            rows = []
            for line in data.strip().split('\n'):
                if '|' in line and not line.strip().startswith('|-'):
                    cells = [cell.strip() for cell in line.split('|') if cell.strip()]
                    rows.append(cells)
            if rows:
                return {
                    'type': 'table',
                    'data': rows
                }
                
        # Default to text format
        return {
            'type': 'text',
            'data': str(data)
        }
    except Exception as e:
        print(f"Error formatting data: {e}")
        return {
            'type': 'text',
            'data': str(data)
        }

def run_flow(message: str) -> dict:
    """Run the Langflow with the given message"""
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
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error in run_flow: {e}")
        return {"error": str(e)}

def extract_message(response_data):
    """Extract the message from the response data"""
    try:
        if isinstance(response_data, dict):
            # Handle error cases
            if "error" in response_data:
                return {
                    'type': 'text',
                    'data': f"Error: {response_data['error']}"
                }
            
            # Navigate through the response structure
            outputs = response_data.get('outputs', [{}])[0]
            outputs_inner = outputs.get('outputs', [{}])[0]
            artifacts = outputs_inner.get('artifacts', {})
            
            # Get the message content
            message = artifacts.get('message', '')
            if not message:
                message = artifacts.get('content', '')  # Fallback to 'content' if 'message' is empty
            
            return format_table_data(message)
            
    except Exception as e:
        print(f"Error extracting message: {e}")
        return {
            'type': 'text',
            'data': "Sorry, I couldn't process that message properly."
        }

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/run_flow', methods=['POST'])
def process_flow():
    try:
        message = request.form['message']
        response = run_flow(message)
        
        formatted_response = extract_message(response)
        return jsonify({
            'response_type': formatted_response['type'],
            'data': formatted_response['data'],
            'model': 'gemini-1.5-pro',
            'user_message': message
        })
    except Exception as e:
        print(f"Error in process_flow: {e}")
        return jsonify({
            'response_type': 'text',
            'data': "Sorry, there was an error processing your request. Please try again.",
            'model': 'gemini-1.5-pro',
            'user_message': message
        })

if __name__ == '__main__':
    app.run(debug=True)

