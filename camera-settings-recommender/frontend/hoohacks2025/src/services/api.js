export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    return response.json();
  };