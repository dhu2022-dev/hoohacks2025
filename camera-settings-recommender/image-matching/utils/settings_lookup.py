import csv

def load_settings(csv_path="exif_data.csv"):
    settings_dict = {}
    with open(csv_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            filename = row["Filename"]
            settings_dict[filename] = {
                #"aperture": row.get("aperture", ""), # not in data
                "make": row.get("Make", ""),
                "model": row.get("Model", ""),
                "fnumber": row.get("FNumber", ""),
                "exposure time": row.get("ExposureTime", ""),
                "iso": row.get("ISOSpeedRatings", ""),
                "shutter speed": row.get("ShutterSpeedValue", ""), 
                "focal length": row.get("FocalLength", ""),
                "metering mode": row.get("MeteringMode", ""),
                "flash": row.get("Flash", ""),
            }
    return settings_dict
