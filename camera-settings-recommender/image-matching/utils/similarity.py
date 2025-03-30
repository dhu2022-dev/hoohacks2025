import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from utils.clip_model import embed_image
from utils.embedding_store import load_embeddings

def find_best_match(image_path):
    """Finds the most similar image in the dataset based on CLIP embeddings."""
    input_vector = embed_image(image_path)
    dataset = load_embeddings()

    vectors = np.array([entry["vector"] for entry in dataset])
    similarities = cosine_similarity([input_vector], vectors)[0]
    best_index = int(np.argmax(similarities))

    best_match = dataset[best_index]
    return {
        "match_filename": best_match["filename"],
        "similarity": float(similarities[best_index]),
        "settings": best_match["settings"]
    }
