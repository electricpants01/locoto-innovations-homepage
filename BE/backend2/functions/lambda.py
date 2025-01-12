import json
import pymongo
from pymongo import MongoClient
from urllib.parse import unquote

# MongoDB connection
MONGO_URL = "mongodb+srv://locoto-user:lider123@portfolio.agellgk.mongodb.net/?retryWrites=true&w=majority&appName=portfolio"
client = MongoClient(MONGO_URL)
db = client['uagrm_db']
collection = db['students']

def handler(event, context):
  # Determine the request path
  print("chris handler trigger :D")
  print(f"Event: {json.dumps(event)}")
  print(event.get("httpMethod"))
  path = event.get("path", "")
  method = event.get("httpMethod", "")
  query_params = event.get("queryStringParameters", {})

  if method == "GET":
    # GET / to retrieve a limited list of documents
    if path == "/":
      return get_all_lists()

    # GET /search?name=<list_name> to search by name
    elif path == "/search" and "name" in query_params:
      list_name = unquote(query_params["name"])
      return search_list_by_name(list_name)

    else:
      return generate_response(400, {"message": "Invalid request"})

  return generate_response(405, {"message": "Method not allowed"})

def get_all_lists():
  try:
    print("chris entro a get all list")
    # Retrieve up to 30 documents
    results = list(collection.find({}, {"_id": 0}).limit(30))
    return generate_response(200, results)
  except Exception as e:
    return generate_response(500, {"message": f"Error retrieving lists: {str(e)}"})

def search_list_by_name(name):
  try:
    print("chris entro al search by name")
    result = collection.find_one({"name": name}, {"_id": 0})
    if result:
      return generate_response(200, result)
    else:
      return generate_response(404, {"message": "List not found"})
  except Exception as e:
    return generate_response(500, {"message": f"Error searching list: {str(e)}"})

def generate_response(status_code, body):
  return {
    "statusCode": status_code,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": json.dumps(body)
  }
