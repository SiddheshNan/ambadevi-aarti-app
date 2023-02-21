import cv2
import os
from PIL import Image
import numpy as np


def merge_images_vertically(image1, image2):
 
    (width1, height1) = image1.size
    (width2, height2) = image2.size
 
    # result_width = width1 + width2
    result_width = width1
     # result_height = max(height1, height2)
    result_height = height1 + height2

    result = Image.new('RGB', (result_width, result_height))
    result.paste(im=image1, box=(0, 0))
    result.paste(im=image2, box=(0, height1))
    return result



def preprocess(pil_image):

    img = np.array(pil_image) 
    img = img[:, :, ::-1].copy() 
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # img = cv2.GaussianBlur(img, (1, 1), 0)
 
    # adaptive = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 61, 25)

    adjusted = cv2.convertScaleAbs(img, alpha=1.1, beta=8)

    adaptive_rgb = cv2.cvtColor(adjusted, cv2.COLOR_BGR2RGB)
    img_pil = Image.fromarray(adaptive_rgb)
    
    return img_pil


def process_and_save(opened_file, img_save_path):
    my_img = preprocess(opened_file)
    my_img.save(img_save_path)


root_dir = 'ap1'

for ashtak_folder in os.listdir(root_dir):
    ashtak_folder_path = os.path.join(root_dir, ashtak_folder)

    img_files = []

    for ashtak_img in os.listdir(ashtak_folder_path):
         ashtak_img_path = os.path.join(ashtak_folder_path, ashtak_img)
         img_files.append(ashtak_img_path)
    
    total_img_files = len(img_files)
    
    if total_img_files == 1:# only one file is there
        process_and_save(Image.open(img_files[0]), f"converted/{ashtak_folder}.png")

    elif total_img_files == 2:
        merged_img = merge_images_vertically(Image.open(img_files[0]), Image.open(img_files[1]))
        process_and_save(merged_img, f"converted/{ashtak_folder}.png")
  
    elif total_img_files >= 3:
        merged = merge_images_vertically(Image.open(img_files[0]), Image.open(img_files[1]))
        
        for i in range(2, total_img_files):
            merged = merge_images_vertically(merged, Image.open(img_files[i]))
        
        process_and_save(merged, f"converted/{ashtak_folder}.png")


    print("written:",ashtak_folder, f"with {total_img_files} images!")





  

