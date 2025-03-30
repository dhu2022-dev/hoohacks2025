import os
import json
from utils.clip_model import embed_image

EMBEDDINGS_FILE = "embeddings/image_vectors.json"
DATASET_DIR = "dataset"

def build_dataset_embeddings():
    """Generate embeddings for all images in the dataset directory."""
    embeddings = {}

    for filename in os.listdir(DATASET_DIR):
        if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        image_path = os.path.join(DATASET_DIR, filename)
        vector = embed_image(image_path)
        embeddings[filename] = vector.tolist()

    with open(EMBEDDINGS_FILE, "w") as f:
        json.dump(embeddings, f, indent=2)

    print(f"✅ Saved {len(embeddings)} image embeddings to {EMBEDDINGS_FILE}")

def load_embeddings(path="embeddings/image_vectors.json"):
    with open(path, "r") as f:
        return json.load(f)
