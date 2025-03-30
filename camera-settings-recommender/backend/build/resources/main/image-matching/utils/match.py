import torch
from utils.clip_model import load_clip_model, preprocess_image
from utils.similarity import cosine_similarity
from utils.embedding_store import load_embeddings
from utils.settings_lookup import load_settings
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
EMBEDDINGS_PATH = "../embeddings/image_vectors.json"
SETTINGS_PATH = "../exif_data.csv"

device, model, preprocess = load_clip_model()
image_embeddings = load_embeddings(EMBEDDINGS_PATH)
image_settings = load_settings(SETTINGS_PATH)

def match_top_k(image_path, k=3):
    image_tensor = preprocess_image(image_path, preprocess).unsqueeze(0).to(device)
    with torch.no_grad():
        input_embedding = model.encode_image(image_tensor).squeeze()

    similarities = []
    for filename, vector in image_embeddings.items():
        ref_tensor = torch.tensor(vector).to(device)
        sim = cosine_similarity(
            input_embedding.reshape(1, -1),
            ref_tensor.reshape(1, -1)
        )[0][0]
        similarities.append((filename, sim))

    top_k = sorted(similarities, key=lambda x: x[1], reverse=True)[:k]

    results = []
    for filename, score in top_k:
        settings = image_settings.get(filename, {})
        results.append({
            "image": filename,
            "similarity": round(score, 4),
            "settings": settings
        })

    return results
