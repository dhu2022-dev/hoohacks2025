import os
import json
from utils.clip_model import embed_image

EMBEDDINGS_FILE = "embeddings/image_vectors.json"
DATASET_DIR = "dataset"

def build_dataset_embeddings():
    """Generate embeddings for all images in the dataset directory."""
    vectors = []
    for filename in os.listdir(DATASET_DIR):
        if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        image_path = os.path.join(DATASET_DIR, filename)
        vector = embed_image(image_path)

        # Dummy settings — replace with CSV or DB lookup
        settings = {
            "aperture": "f/2.8",
            "shutter": "1/250",
            "iso": "100"
        }

        vectors.append({
            "filename": filename,
            "vector": vector.tolist(),
            "settings": settings
        })

    with open(EMBEDDINGS_FILE, "w") as f:
        json.dump(vectors, f, indent=2)

    print(f"Saved {len(vectors)} embeddings to {EMBEDDINGS_FILE}")

def load_embeddings():
    with open(EMBEDDINGS_FILE, "r") as f:
        return json.load(f)
