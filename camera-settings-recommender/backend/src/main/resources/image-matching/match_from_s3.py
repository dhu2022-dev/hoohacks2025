import boto3
import os
import json
from dotenv import load_dotenv
from utils.match import match_top_k
from utils.settings_lookup import load_settings

load_dotenv()

# --- Config ---
BUCKET_NAME = "shuttersense-bucket"
UPLOAD_PREFIX = "uploads/"
LOCAL_DOWNLOAD_DIR = "temp_uploads"
os.makedirs(LOCAL_DOWNLOAD_DIR, exist_ok=True)

# --- S3 Client ---
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

def get_latest_uploaded_file():
    response = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=UPLOAD_PREFIX)
    files = response.get("Contents", [])
    if not files:
        raise Exception("No files found in S3 uploads folder.")
    
    latest = max(files, key=lambda x: x["LastModified"])
    key = latest["Key"]
    filename = key.split("/")[-1]
    local_path = os.path.join(LOCAL_DOWNLOAD_DIR, filename)

    s3.download_file(BUCKET_NAME, key, local_path)
    return local_path, filename

def main():
    latest_image_path, uploaded_filename = get_latest_uploaded_file()
    top_matches = match_top_k(latest_image_path, k=3)
    
    settings_dict = load_settings()

    results = []
    for match in top_matches:
        matched_filename = match["image"]
        similarity = match["similarity"]
        settings = settings_dict.get(matched_filename, {})

        results.append({
            "matched_image": matched_filename,
            "similarity": float(similarity),
            "settings": settings
        })

    output = {
        "uploaded_image": uploaded_filename,
        "matches": results
    }

    # Save results locally
    with open("match_results.json", "w") as f:
        json.dump(output, f, indent=2)

    # Upload to S3 under 'results/' folder
    upload_results_to_s3("match_results.json", f"results/{uploaded_filename}".replace('jpg', 'json'))
    url = s3.generate_presigned_url('get_object', Params={'Bucket': 'shuttersense-bucket', 'Key': uploaded_filename}, ExpiresIn=3600)

def upload_results_to_s3(local_path, s3_key):
    s3.upload_file(local_path, BUCKET_NAME, s3_key)
    print(f"Uploaded results to s3://{BUCKET_NAME}/{s3_key}")

if __name__ == "__main__":
    main()
