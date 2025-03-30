import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from utils.clip_model import embed_image
from utils.embedding_store import load_embeddings

def find_best_match(image_path):
    """Finds the most similar image in the dataset based on CLIP embeddings."""
    input_vector = embed_image(image_path).reshape(1, -1)
    dataset = load_embeddings()

    # dataset is now a dict: {filename: vector}
    filenames = list(dataset.keys())
    vectors = np.array([dataset[filename] for filename in filenames])

    similarities = cosine_similarity(input_vector, vectors)[0]
    best_index = int(np.argmax(similarities))
    best_filename = filenames[best_index]

    return {
        "match_filename": best_filename,
        "similarity": float(similarities[best_index]),
        # optionally look up settings here if you want
    }
