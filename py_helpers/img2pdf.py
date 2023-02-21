from PIL import ImageGrab, Image
import os

ashtak_number_count = 1
img_count = 1


def grabImage():
    global img_count, ashtak_number_count
    img = None

    try:
        img = ImageGrab.grabclipboard()
        isExist = os.path.exists(f'ashtak-pustika1-{ashtak_number_count}')
        if not isExist:
            os.makedirs(f'ashtak-pustika1-{ashtak_number_count}')
        img.save(f'ashtak-pustika1-{ashtak_number_count}/{img_count}.png')

        print(f"Img Saved: {ashtak_number_count}/{img_count}.png")
        img_count+=1
        what_next = input(f"Add more img [y else stop]: \t ")

        if what_next == "y":
            grabImage()
        else:
            return
    except:
        print("Error grabbing..")
        inp2 = input("try again? [y/n] \t ")
        if inp2 == "y":
            grabImage()
        else:
            return




while True:
    print("--------------------------")
    print(f"Ashtak Number: \t {ashtak_number_count}")
    print("--------------------------")
    grabImage()
    ashtak_number_count+=1
    print(f"Ashtak Number: {ashtak_number_count} Finished!")
    print("--------------------------")

    stop = input(f"--------> Stop Loop? [yes/no] \t")
    if stop == 'yes':
        break




