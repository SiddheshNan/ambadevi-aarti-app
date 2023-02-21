from PIL import Image

def merge_images(file1, file2):
    image1 = Image.open(file1)
    image2 = Image.open(file2)
 
    (width1, height1) = image1.size
    (width2, height2) = image2.size
 
    # result_width = width1 + width2
    result_width = width1
     # result_height = max(height1, height2)
    result_height = height1 + height2

    print (height2)

    result = Image.new('RGB', (result_width, result_height))
    result.paste(im=image1, box=(0, 0))
    result.paste(im=image2, box=(0, height1))
    return result

f1 = "ap1/ashtak-pustika1-2/1.png"
f2 = "ap1/ashtak-pustika1-2/2.png"
mer = merge_images(f1, f2)
mer.save("merg.png")