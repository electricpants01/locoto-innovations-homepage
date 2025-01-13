import json
from pymongo import MongoClient
from urllib.parse import unquote

# MongoDB connection
MONGO_URL = "mongodb+srv://locoto-user:lider123@portfolio.agellgk.mongodb.net/?retryWrites=true&w=majority&appName=portfolio"
client = MongoClient(MONGO_URL)
db = client['uagrm_db']
collection = db['students']

def handler(event, context):
  print("Chris handler triggered :D")
  print("Event: ", json.dumps(event, indent=2))

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
    print("Unexpected error: ", str(e))
    return generate_response(500, {"message": "Internal server error"})


def get_all_lists():
  try:
    print("Fetching all lists")
    # Retrieve up to 30 documents
    results = list(collection.find({}, {"_id": 0}).limit(30))
    return generate_response(200, results)
  except Exception as e:
    print("Error retrieving lists: ", str(e))
    return generate_response(500, {"message": f"Error retrieving lists: {str(e)}"})


def search_list_by_name(name):
  try:
    print(f"Searching for list with name: {name}")
    result = collection.find_one({"name": name}, {"_id": 0})
    if result:
      return generate_response(200, result)
    else:
      return generate_response(404, {"message": "List not found"})
  except Exception as e:
    print("Error searching list: ", str(e))
    return generate_response(500, {"message": f"Error searching list: {str(e)}"})


def generate_response(status_code, body):
  return {
    "statusCode": status_code,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": json.dumps(body)
  }
