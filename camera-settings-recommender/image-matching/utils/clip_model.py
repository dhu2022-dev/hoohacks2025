import torch
import clip
from PIL import Image

# Load model once on import
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def load_clip_model():
    """Returns the loaded CLIP model, preprocess function, and device."""
    return device, model, preprocess

def embed_image(image_path):
    """Returns a 512-d CLIP embedding vector for the given image."""
    image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        return model.encode_image(image).cpu().numpy()[0]

def preprocess_image(image_path, preprocess_fn=None):
    """Loads and preprocesses an image as a tensor for CLIP."""
    if preprocess_fn is None:
        preprocess_fn = preprocess
    image = Image.open(image_path).convert("RGB")
    return preprocess_fn(image)
