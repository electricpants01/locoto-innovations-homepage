import json
from pymongo import MongoClient
from urllib.parse import unquote

# MongoDB connection
MONGO_URL = "mongodb+srv://locoto-user:lider123@portfolio.agellgk.mongodb.net/?retryWrites=true&w=majority&appName=portfolio"
client = MongoClient(MONGO_URL)
db = client['uagrm_db']
collection = db['students']

def handler(event, context):
  path = event.get("rawPath", "")
  method = event.get("requestContext", {}).get("http", {}).get("method", "")
  query_params = event.get("queryStringParameters", {})

  try:
    if method == "GET":
      # GET / to retrieve a limited list of documents
      if path == "/":
        return get_all_lists()

      # GET /search?name=<list_name> to search by name
      elif path == "/search" and "name" in query_params:
        list_name = unquote(query_params["name"])
        return search_list_by_name(list_name)

      else:
        return generate_response(400, {"message": "Invalid request path"})

    else:
      return generate_response(405, {"message": "Method not allowed"})

  except Exception as e:
    return generate_response(500, {"message": "Internal server error"})

def get_all_lists():
  try:
    # Retrieve up to 30 documents and handle datetime serialization
    results = list(collection.find({}, {"_id": 0}).limit(30))
    serialized_results = json.loads(json.dumps(results, default=str))
    return generate_response(200, serialized_results)
  except Exception as e:
    return generate_response(500, {"message": f"Error retrieving lists: {str(e)}"})

def search_list_by_name(fullName):
  try:

    # Use regex for case-insensitive search and limit to 30 results
    query = {"fullName": {"$regex": f"^{fullName}", "$options": "i"}}

    results = collection.find(query, {"_id": 0}).limit(30)  # Limit to the first 30 items

    # Convert cursor to list
    result_list = list(results)

    if result_list:
      serialized_results = json.loads(json.dumps(result_list, default=str))
      return generate_response(200, serialized_results)
    else:
      return generate_response(404, {"message": "No matching lists found"})
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
