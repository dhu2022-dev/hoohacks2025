import sys
from utils.embedding_store import build_dataset_embeddings
from utils.similarity import find_best_match

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage:")
        print("  python match_image_CLIP.py --build       # Build embeddings")
        print("  python match_image_CLIP.py <image_path>  # Match input image")
        sys.exit(1)

    arg = sys.argv[1]

    if arg == "--build":
        build_dataset_embeddings()
    else:
        result = find_best_match(arg)
        from pprint import pprint
        pprint(result)
