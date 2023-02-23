from PIL import Image
import os

root_dir = os.path.join("..", "docs", "ashtak-pustika-2")

for ashtak_img_file in os.listdir(root_dir):
    img_full_path = os.path.join(root_dir, ashtak_img_file)
    img = Image.open(img_full_path)

    img_wo_ext = ashtak_img_file[:-4]

    pdf_path = "./ap2_pdfs/"+img_wo_ext+'.pdf'

    img.save(pdf_path, "PDF" ,resolution=100.0, save_all=True)

    print('written:', img_wo_ext)



